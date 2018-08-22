"use babel";

import { BufferedProcess } from "atom";
// Uint8Array to String
var textEncoding = require('text-encoding');
var TextDecoder = textEncoding.TextDecoder;
const respawn = require('respawn');
var runner = {};
var createRunner = function(dir, action) {
  runner = respawn(['node','bin/dev-server.js'], {
    cwd: dir,
    env: {
      NODE_ENV:'dev',  // 设置环境变量NODE_ENV，本地服务运行需要
      npm_config_argv: JSON.stringify({"remain":[],"cooked":["run","dev"],"original":["run","dev"]}) // 设置npm_config_argv，地服务运行需要
    }
  });
};
import { isVerbose } from "./Notifications";

export default {
  /*
  * 关闭进程方法
  * @param <String> dir 执行命令路径
  * */
  runServer(dir) {
   const that = this;
    this.consolePane.notice('start..');
    // runner需要在外面存起来，确保触发stop时可以取到
    createRunner(dir);
    runner.start();
    runner.on('stdout', (data)=>{
      // Uint8Array数据转成string输出
      var string = new TextDecoder("utf-8").decode(data);
      that.consolePane.notice(string);
    });
    
    runner.on('stderr', function(data) { // 异常停止后抛出信息
      // Uint8Array数据转成string输出
      var string = new TextDecoder("utf-8").decode(data);
      that.consolePane.notice(string);
      runner.stop(()=>{
        that.consolePane.notice('error, close process');
      });
    });
  },
  // 停止服务
  stopServer() {
		const that = this;
		// TODO:程序异常退出时关闭进程
		if (runner.stop){
				runner.stop(()=>{
					that.consolePane.notice('stop Server');
				});
		}
  },

	/**

	* Send git command with arguments
	* @param {string} cwd Current Working Directory
	* @param {string[]} [args=[]] Argument list. Any empty strings will be removed.
	// * @param {string[]} [stdin=[]] String to write to stdin
	* @return {Promise} {string} The result of the command
	*/
	initConsolePane(consolePane){
		this.consolePane = consolePane;
	},
	coracleCmd(cwd, args = [],corCommand,isConsole = true,stdin = [],cb) {
		return new Promise((resolve, reject) => {
			let output = "";
			args = args.filter(i => i !== "");
			global.bp = new BufferedProcess({
				command: corCommand,
				args,
				options: {
					cwd: cwd,
					env: process.env,
				},
				stdout: data => {
					output += data.toString();

					if (isConsole) {
						this.consolePane.notice(output);
					}

				},
				stderr: data => {
					output += data.toString();

					if (isConsole) {
						this.consolePane.error(output);
					}
				},
				exit: code => {
					output = output.trimRight();
					if (isVerbose()) {
						if (process.platform === "win32") {
							output = "> " + bp.process.spawnargs[bp.process.spawnargs.length - 1].replace(/^"(.+)"$/g, "$1") + "\n\n" + output;
						} else {
							output = "> " + git + " " + args.join(" ") + "\n\n" + output;
						}
					}

					if (code === 0) {
						resolve(output);
					} else {
						reject("Error code: " + code + "\n\n" + output);
					}
					if (isConsole) {
						setTimeout(() => this.consolePane.toggle(),2000);
					}
					if (cb) {
					  cb();
					}
				},
			});
 
			if (stdin) {
				for (let index = 0; index < stdin.length; index++) {
					const element = stdin[index];
					bp.process.stdin.write(element);
					bp.process.stdin.end();
				}
			}

		});
	},
};

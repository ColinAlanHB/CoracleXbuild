"use babel";

import { BufferedProcess } from "atom";
// Uint8Array to String
var textEncoding = require('text-encoding');
var TextDecoder = textEncoding.TextDecoder;
const respawn = require('respawn');
var runners = [];
var createRunner = function(dir, action) {
  runner = respawn(['node','bin/dev-server.js'], {
    cwd: dir,
    env: {
      NODE_ENV:'dev',  // 设置环境变量NODE_ENV，本地服务运行需要
      npm_config_argv: JSON.stringify({"remain":[],"cooked":["run","dev"],"original":["run","dev"]}) // 设置npm_config_argv，地服务运行需要
    }
	});
	return runner;
};
import { isVerbose } from "./Notifications";

export default {
  /*
  * 关闭进程方法
  * @param <String> dir 执行命令路径
  * */
  runServer(dir,cb) {
   const that = this;
    // runner需要在外面存起来，确保触发stop时可以取到
    var runner = createRunner(dir);
    runner.start();
    runner.on('stdout', (data)=>{
      // Uint8Array数据转成string输出
      var string = new TextDecoder("utf-8").decode(data);
			that.consolePane.notice(string);
			if (string.indexOf("Listening") != -1) {
				if (cb){
					cb(1);
				}
			}			
    });
    
    runner.on('stderr', function(data) { // 异常停止后抛出信息
      // Uint8Array数据转成string输出
      var string = new TextDecoder("utf-8").decode(data);
      that.consolePane.notice(string);
      runner.stop(()=>{
				atom.notifications.addSuccess('服务启动失败');
        that.consolePane.notice('error, close process');
      });
		});
		
		runners.push(runner);
  },
  // 停止服务
  stopServer(str) {
		const that = this;
		runners.forEach(runner => {
				// TODO:程序异常退出时关闭进程
				if (runner.stop){
					runner.stop(()=>{
						if(str){
							that.consolePane.notice(str);
							atom.notifications.addSuccess(str);
						}
					});
			}
		});
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
					//为发布失败做的特殊处理
					if (output.indexOf('Error: Command failed: gulp upload -m') !==-1) {
						reject("Error code: " + code + "\n\n" + output);
						if (cb) {
							cb(2);
						}
					} else {
						if (code === 0) {
							resolve(output);
							if (cb) {
								cb(1);
							}
						} else {
							reject("Error code: " + code + "\n\n" + output);
							if (cb) {
								cb(2);
							}
						}
					}
					if (isConsole) {
						setTimeout(() => this.consolePane.toggle(),2000);
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

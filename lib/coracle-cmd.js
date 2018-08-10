"use babel";

import { BufferedProcess } from "atom";
import { isVerbose } from "./Notifications";

export default {

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
			const bp = new BufferedProcess({
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

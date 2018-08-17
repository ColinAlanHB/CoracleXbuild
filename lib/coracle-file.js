"use babel";

const fs = require("fs")
const Path = require("path")
export default {
	getCMDProjectPath({event}){
		let projectPaths = atom.project.getPaths()

		let targetPath = '';
		let target = event.target;
  
		if (target.classList.contains('name')) {
		  targetPath = target.dataset.path;
		} else {
		  target = target.querySelector('.name');
		  if (target !== null) {
			targetPath = target.dataset.path;
		  }
		}
		let projectPath = '';
        projectPaths.forEach(function(path) {
			console.log("path" + path);
			if(targetPath.startsWith(path)){
				projectPath = path;
			}
		});	
		return projectPath;
		},
		
		getOriginProjectPath({event}){
			let projectPaths = atom.project.getPaths()
	
			let targetPath = '';
			let target = event.target;
		
			if (target.classList.contains('name')) {
				targetPath = target.dataset.path;
			} else {
				target = target.querySelector('.name');
				if (target !== null) {
				targetPath = target.dataset.path;
				}
			}
			return targetPath;
		},

		/* 获取当前活跃的工程目录,如果event存在,将优先使用event中文件路径所在的路径. */
		fetchProjectRootPath({event}){
		// 优先 event 里的.
		let projectPaths = atom.project.getPaths()
	
		let textEditor = atom.workspace.getActiveTextEditor()
		let textPath = textEditor && textEditor.getPath()
		let targetPath = '';
		let target = event.target;
	
		if (target.classList.contains('name')) {
			targetPath = target.dataset.path;
		} else {
			target = target.querySelector('.name');
	
			if (target !== null) {
			targetPath = target.dataset.path;
			}
		}
	
		let targetProjectPath = [targetPath, textPath].reduce(
			(targetProjectPath,domPath, index)=>{
			if(targetProjectPath || ! domPath){
				return targetProjectPath
			}
			let targetPath = domPath
			for (let i = 0; i < projectPaths.length; i++) {
				let projectPath = projectPaths[i]
	
				if(targetPath.startsWith(projectPath) &&
					fs.existsSync(Path.resolve(targetPath, "config.xml"))
				){
				return targetPath
				}
		
				if(targetPath.startsWith(projectPath) &&
					fs.existsSync(Path.resolve(projectPath, "config.xml"))
				){
				return projectPath
				}
			}
			},null)
		return targetProjectPath ? targetProjectPath : projectPaths[0]
		},


};

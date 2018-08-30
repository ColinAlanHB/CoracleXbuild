"use babel";

const fs = require("fs")
const Path = require("path")
export default {

	/*
* 写入路由配置方法
* @param <String> pageName 页面名称
*/
  writeRoute(filePath, pageName) {
		// 判断当前文件夹是否是page文件夹
	let pathArr = filePath.split(path.sep); //区分mac,window的目录分隔符。
	console.log(__dirname);
	let routePath = path.join(filePath, '../route.json');
	if (pathArr.pop() === 'page') {
		fs.readFile(routePath,function(err, data) {
			if (err) {
				return atom.notifications.addWarning('路由配置文件写入异常。');
			}
			let routeData = data.toString(); //讲二进制的数据转换为字符串
			let routeExit = false;
			routeData = JSON.parse(routeData); // 将字符串转换成对象

			if (!routeData.page) {
				return atom.notifications.addWarning('路由配置文件写入异常。');
			}
			// 防止写入重复配置
			routeData.page.map(function(item) {
			if (item.name === pageName) {
				routeExit = true;
			}
			});
			if (!routeExit) {
			// 新增路由配置
			routeData.page.push({
				"path": "/" + pageName,
				"name": pageName,
				"component": pageName + ".vue"
				});
			let str = JSON.stringify(routeData, null, 2);
			fs.writeFile(routePath, str, function(err){
					if (err) {
						return atom.notifications.addWarning('路由配置文件写入异常。');
	
					} else {
						return atom.notifications.addSuccess('路由配置更新成功');
					}
				});
			}
		});
		} else {
		  return atom.notifications.addWarning('该目录不是标准的COUI的功能模块的page目录，无法修改路由配置。');
		}
    },

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

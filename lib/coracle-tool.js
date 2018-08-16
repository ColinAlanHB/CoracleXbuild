'use babel';
const {ipcRenderer} = require('electron')
import { CompositeDisposable,TextEditor,Directory ,Emitter} from 'atom';

import WebView from './coracle-webview'

import CoracleManager from './coracle-manager'
import MyListView from './dialogs/searchList';
import AboutView from './about-xbuilder';
import git from './git-cmd';
import coracleCmd from './coracle-cmd';
import coracleFile from './coracle-file';
import Url from 'url';
import WifiSync from './WifiSync';
import { setTimeout } from 'timers';
const Shell = require('shell')
const Path = require("path")
const os =require("os")
const fs = require("fs")
const homedir = os.homedir();
var fse = require('fs-extra')
var package = require('../package')

export default {

  config:{
    MxmUrlSetting:{
      title:"工作区地址配置",
      type:"string",
      default:"http://test.coracle.com:10129/web-standard"
    },
    MxmAccountSetting:{
      title:"管理员帐号",
      type:"string",
      default:"admin"
    },
    MxmPassWordSetting:{
      title:"管理员密码",
      type:"string",
      default:"12345678"
    },
    DevSetting:{
      title:"本地调试命令",
      type:"string",
      default:"npm run dev"
    },
    BuildSetting:{
      title:"编译测试包命令",
      type:"string",
      default:"npm run build"
    },
    DiskSetting:{
      title:"编译正式包命令",
      type:"string",
      default:"npm run dist"
    }
  },

  subscriptions: null,
  modalPanel: null,
  port: null,
  svnUrl:null,
  dirPath:null,

  copyFile (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
      if (err) {
      console.log('read error', srcPath)
      }
      cb && cb(err)
    })
    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
      if (err) {
      console.log('write error', tarPath)
      }
      cb && cb(err)
    })
    ws.on('close', function(ex) {
      cb && cb(ex)
    })
    rs.pipe(ws)
  },
  copyFolder(srcDir, tarDir, cb) {
    const _this = this;
    fs.readdir(srcDir, function(err, files) {
      var count = 0
      if (!files){
        atom.notifications.addWarning(`请按教程设置svn配置!`)
        return
      }

      var checkEnd = function() {
      ++count == files.length && cb && cb()
      }
      
      if (err) {
      checkEnd()
      return
      }
    
      files.forEach(function(file) {
      var srcPath = Path.join(srcDir, file)
      var tarPath = Path.join(tarDir, file)
      
      fs.stat(srcPath, function(err, stats) {
        if (stats.isDirectory()) {
        fs.mkdir(tarPath, function(err) {
          if (err) {
          console.log(err)
          return
          }
          _this.copyFolder(srcPath, tarPath, checkEnd)
        })
        } else {
        _this.copyFile(srcPath, tarPath, checkEnd);
        }
      })
      })

      files.length === 0 && cb && cb()
    })
  },
  copyAotuSvn(cb){
    const username = atom.config.get('userName');
    if (username.length === 0) {
      return;
    }
    const isCopy = atom.config.get('svnCopyKey');
    if (!isCopy) {
      const oldSvnAuto = Path.join(homedir, '/AppData/Roaming/Subversion/auth/svn.simple');
      const newSvnAuto = Path.join(homedir, '/.subversion/auth/svn.simple')
      this.copyFolder(oldSvnAuto, newSvnAuto, (err)=> {
      if (err) {
        atom.notifications.addWarning('请先下载svn代码管理工具');
        return
      }
         cb && cb();
      })
    } else {
      cb && cb();
    }
  },

  checkCoUI() {  
     coracleCmd.coracleCmd(homedir,['i','-g','slush','slush-coui'],'npm',false,null,null);
  },


  activate(state) {

    this.initCorWebView();

    /* 真机同步服务自启动. */
    this.startWifi({port: 0})

    WifiSync.on("log",(log)=>{
      this.consolePanel.log(log.content,log.level);
    })

    this.subscriptions = new CompositeDisposable()

      /* wifi 同步指令. */
      atom.commands.add('atom-workspace', 'coracle:previewWifi',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:syncWifi',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:syncAllWifi',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:wifiLog',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:wifiInfo',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:startWifi',
        (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:endWifi',
        (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:cloudBuild',
            (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:cloudBuildRunner',
            (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:moduleManage',
            (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:chectoutfromGit',
          (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:chectoutfromCoracle',
              (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:synctoCloud',
          (event)=>(this.convertCommandToMethod({event:event})))
      atom.commands.add('atom-workspace', 'coracle:syncfromCloud',
              (event)=>(this.convertCommandToMethod({event:event})))

      /* 创建项目 */
      atom.commands.add('atom-workspace', 'coracle:createProject',
              (event)=>(this.convertCommandToMethod({event:event})))

      /* 登录 */
      atom.commands.add('atom-workspace', 'coracle:welcomeorlogin',
              (event)=>(this.convertCommandToMethod({event:event})))

      /* 注销 */
      atom.commands.add('atom-workspace', 'coracle:exitorlogin',
              (event)=>(this.convertCommandToMethod({event:event})))

      /* 关于 */
      atom.commands.add('atom-workspace', 'coracle:newXBuilderMobileApp',
              (event)=>(this.convertCommandToMethod({event:event})))

      /* xBuilder 移动应用 */
      atom.commands.add('atom-workspace', 'coracle:aboutStudio',
      (event)=>(this.convertCommandToMethod({event:event})))
      
      /* CoUI 命令 */
      atom.commands.add('atom-workspace', 'coracle:runDist',
      (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:runDev',
      (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:stopDev',
      (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:runBuild',
      (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:buildCoUIModule',
      (event)=>(this.convertCommandToMethod({event:event})))

      atom.commands.add('atom-workspace', 'coracle:buildCoUIPage',
      (event)=>(this.convertCommandToMethod({event:event})))

      /* 实时预览 */
      atom.commands.add('atom-workspace', 'coracle:realTimeLook',
              (event)=>(this.convertCommandToMethod({event:event})))

      this.subscriptions.add(atom.workspace.addOpener(this.opener.bind(this)));

      /* 验证用户是否登录 */
      this.userName = atom.config.get('userName');
      if (this.userName == null) {
        atom.notifications.addInfo('登录体验更多云功能');
        this.login();
      }else {
        let name = atom.config.get('userName');
        this.welcome();
      }

  },

  deactivate() {
    coracleCmd.killProcess();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  cloneCode(appInfo,dir) {
    let that = this;
    git.cmd(null, ['svn','clone',appInfo.svn,dir])
    .then(()=>{
      atom.workspace.getLeftDock().show();
      /* 默认打开一个文件 */
      atom.project.addPath(dir);
      setTimeout(() => that.syncfromCloudFirst(dir,appInfo),6000);
    })
    .catch((err) => atom.notifications.addError(err));
  },

  initCorWebView(){
    let that = this;
    this.corWebView = new WebView();
    this.corWebView.addIpcMessageListener('after-logined', (userInfo) => {
      atom.config.set('userName',userInfo.userName);
      atom.config.set('userPwd',userInfo.password);
      atom.notifications.addInfo(userInfo.userName+'登录成功');
      CoracleManager.sendLogin(userInfo.userName,userInfo.password);
      this.loginSuccess(userInfo.userName);
     });
    
  this.corWebView.addIpcMessageListener('create-createApp', (appInfo) => {
      console.log(appInfo);
      const userName = atom.config.get('userName');
      atom.notifications.addInfo('正在创建应用'+appInfo.name);
      this.destoryView(true);
        atom.workspace.getActivePane().activate();
        responseChannel = "atom-pick-folder-response";
        ipcRenderer.on(responseChannel, function(event, path) {
          ipcRenderer.removeAllListeners(responseChannel);
          if (path != null) {
            var dir = Path.resolve(path+'/'+appInfo.name);
            fs.mkdir(dir);
            git.cmd(null, ['ls',appInfo.svn,'--username',userName,'--password','coracle2017fk2'],'',false,false);
            atom.notifications.addInfo('创建项目'+appInfo.name+'成功,正在拉取代码');
            if (process.platform === 'win32'){
              setTimeout(() => that.copyAotuSvn(err=>{
                that.cloneCode(appInfo,dir);
              }),1000);
            } else {
                that.cloneCode(appInfo,dir);
            }
             const password = atom.config.get('userPwd');
             CoracleManager.sendLogin(userName,password);
          }
        });
        ipcRenderer.send("pick-folder", responseChannel);

  });

  this.corWebView.addIpcMessageListener('create-cancelApp', (data) => {
       this.welcome();
  });

  this.corWebView.addIpcMessageListener('create-Project', (data) => {
    if(data == 1) {
      this.createProject();
    }else {
      this.synProject();
    }
 });

  this.corWebView.addIpcMessageListener('after-url', (url) => {
      Shell.openExternal(url)
  });


  this.corWebView.addIpcMessageListener('create-syncApp', (data) => {
      this.syncProject(data)
      this.welcome();
  });

  this.corWebView.addIpcMessageListener('create-cancelSync', (data) => {
      this.welcome();
  });

  this.corWebView.addIpcMessageListener('create-CoUIModule', (data) => {
    const version = 'slush-coui@'+data;
    atom.notifications.addInfo('正在已下载并更新CoUI..');
    coracleCmd.coracleCmd(null,['i','-g','slush',version],'npm',true,null,function(){
      atom.notifications.addSuccess('CoUI已下载并更新');
    });
  });

  this.corWebView.addIpcMessageListener('create-CoUIProject', (data) => {

    responseChannel = "atom-pick-folder-response";
    ipcRenderer.on(responseChannel, function(event, path) {
      ipcRenderer.removeAllListeners(responseChannel);
      if (path != null) {
        var dir = Path.resolve(path[0]);
        fs.mkdir(dir);
        coracleCmd.coracleCmd(dir,['coui'],'slush',true,['123'],function (){
          atom.notifications.addInfo('创建项目成功,正在初始化代码,请稍等..');
          coracleCmd.coracleCmd(dir,['config','set','production','false'],'npm',true,null,function(){
            coracleCmd.coracleCmd(dir,['install'],'npm',true,null,function(){
              atom.notifications.addSuccess('初始化代码成功');
            });
          });
          atom.workspace.getLeftDock().show();
          atom.project.addPath(dir);
        });
      }
    });
    return ipcRenderer.send("pick-folder", responseChannel);      
  });

  this.corWebView.addIpcMessageListener('sync-projectInfo', ()=>{

    const that = this.corWebView.getWebVieElement();
    let prejectsInfo = atom.config.get('prejectsInfo');
    const projectList = new Array();
    try {
      prejectsInfo = JSON.parse(prejectsInfo)
      for(const projects of prejectsInfo){
          projectList.push(projects);
      }
    } catch (e) {

    }
    that.send('sendProjectInfo',projectList);
  });
  },

 
  opener (url) {

      const urlInfo = Url.parse(url);
      if (urlInfo.protocol == 'coracle-create:') {
        this.corWebView.setUri(package.host+'/cormobi/ide/project.html');
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-login:') {
        this.corWebView.setUri(package.host+"/cormobi/login");
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-welcome:') {
        this.corWebView.setUri(package.host+"/cormobi/ide/welcome.html");
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-cloud:') {
        console.log(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/compile');
        this.corWebView.setUri(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/compile');
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-cloud-build-apprunner:') {
        console.log(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/plugin?type=3');
        this.corWebView.setUri(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/plugin?type=3');
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-module:') {
        console.log(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/plugin');
        this.corWebView.setUri(package.host+'/cormobi/console/hybrid/'+urlInfo.query+'/plugin');
        return this.corWebView;
      }

      if (urlInfo.protocol == 'coracle-sync:') {

        this.corWebView.setUri(package.host+'/cormobi/ide/sync.html');
        return this.corWebView;
      }

      if (urlInfo.protocol == 'about-studio:') {
        return new AboutView();
      }

  },

  /*获取一个范围的随机数,可选范围内包含最大与最小值.*/
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  getUserHome() { // 获取用户目录.
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  },

  /* 将指令解析为对应的参数与方法,指令与方法对应的规则为: 命令空间:方法名,参数1=值1,参数2=值2,
        event 为保留参数,用于传递完整字段. */
    convertCommandToMethod({event:event}){
      const namespace = "coracle:"
      let command = event.type
      if( ! (new RegExp(`^${namespace}`)).test(command)){ // 说明不是自己插件的方法.
        return
      }

      let methodName = ""
      let params = {event:event}

      let methodInfo = command.substring(namespace.length, command.length).split(",")
      methodInfo.map((item,idx)=>{
        if(0 === idx){
          methodName = item
        }else{
          let paramPair = item.split("=")
          if(paramPair && 2 === paramPair.length){
            params[paramPair[0]] = paramPair[1]
          }
        }
      })

      if("function" === typeof this[methodName]){
        this[methodName](params)
      }else{
        console.warning(`${methodName} 似乎不是一个有效的方法`)
      }
    },
    previewWifi({event}){
      let {port,ip,clientsCount} = WifiSync.wifiInfo()
      let tip = "同步成功,请在手机上查看运行效果!"
      if(0 === clientsCount){
        tip = "没有手机连接到 WiFi 同步服务。请使用自定义 Runer 或者 AppRunner 进行连接。"
      }

      let filePath = event.target.dataset.path

      if( ! filePath){
        let textEditor = atom.workspace.getActiveTextEditor()
        filePath = textEditor && textEditor.getPath()
      }

      if ( ! filePath) {
        atom.notifications.addInfo("似乎没有可供预览的文件")
        return
      }

      WifiSync.previewWifi({file:filePath})
      atom.notifications.addInfo(tip,{'dismissable':true})
    },
    syncWifi({event}){
      this.syncAllWifi({event:event, syncAll:false})
    },
    syncAllWifi({event,syncAll=true}){
      let tip = "同步成功,请在手机上查看运行效果!"

      let {port,ip,clientsCount} = {ip:WifiSync.localIp(),
      port:WifiSync.port,clientsCount:WifiSync.clientsCount}

      if(0 === clientsCount){
        tip = "没有手机连接到 WiFi 同步服务。请使用自定义 Runer 或者 AppRunner 进行连接。"
      }

      let projectRootPath = coracleFile.fetchProjectRootPath({event:event})
       
      console.log('projectRootPath' + projectRootPath);

      if (projectRootPath == undefined || projectRootPath == null) {
        return
      }
      if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
         atom.notifications.addWarning(`${projectRootPath} 不是有效的coralce项目!`)
         return
      }

      const paths = projectRootPath.split("/");
      if (paths.length >1) {
          if (projectRootPath.indexOf("/src/")!=-1&& paths[paths.length-2] === 'src'){
            paths[paths.length-2] = 'build';
            const newPath = paths.join("/");
            console.log('newPath ' + newPath);
            atom.notifications.addInfo('正在编译中,请稍等..')
            const cmd = atom.config.get('coracle-build.BuildSetting');
            var cmds = cmd.split(" ");
            var cmdFirst = cmds[0];
            var arg =[];
            if (cmds.length >1){
                arg = cmds.splice(1,cmds.length-1);
            }
  
            coracleCmd.coracleCmd(projectRootPath,arg,cmdFirst,true,null,function(){
              syncAll = syncAll ? 1 : 0
              WifiSync.sync({project:newPath,updateAll:syncAll});
              atom.notifications.addInfo(tip,{'dismissable':true})
            });
              
             return;
          }
      }
 
      syncAll = syncAll ? 1 : 0

      WifiSync.sync({project:projectRootPath,updateAll:syncAll});
      atom.notifications.addInfo(tip,{'dismissable':true})
    },
    wifiLog({event}){
      atom.openDevTools()
          .then(()=>{
            const defaultSuccessTip = "请在Xbuild开发控制台查看日志信息"
            atom.notifications.addInfo(defaultSuccessTip)
          })
    },
    wifiInfo({event}){
      let {port,ip,clientsCount} = {ip:WifiSync.localIp(),
            port:WifiSync.port,clientsCount:WifiSync.clientsCount}

            let title = 'WiFi 真机同步调试'
            atom.notifications.addInfo(title,{
              "detail":`IP  :${JSON.stringify(ip)} \n端口:${port} \n提示:请下载并打开AppRunner 或 自定义AppRunner, 点击小圆球, 输入 IP 和端口连接,以进行 WiFi 调试.`,"dismissable":true
            })
    },
    startWifi({event,port}){
      WifiSync.start({port:port});
      console.log("Coracle WiFi 真机同步服务已启动")
    },
    endWifi({event}){
      WifiSync.end({});
      console.log("Coracle WiFi 真机同步服务已关闭")
    },

    realTimeLook({event}){
      const selectedFileTreeView = document.querySelector('.list-item.selected>span');
        if(selectedFileTreeView) {
            var path =  selectedFileTreeView.getAttribute('data-path');
            atom.notifications.addInfo(path);        
            ipcRenderer.send ('realtime-look',path);
        } else {
            atom.notifications.addWarning('找不到指定文件');
        }
    },

    synctoCloud({event}){
        const userName = atom.config.get('userName');
        let projectRootPath = coracleFile.fetchProjectRootPath({event:event})
        if (projectRootPath == undefined || projectRootPath == null) {
          atom.notifications.addWarning(`${projectRootPath} 请至少打开一个有效的coralce项目!`)
          return
        }
        if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
           atom.notifications.addWarning(`${projectRootPath} 不是有效的coralce项目!`)
           return
         }
        atom.notifications.addSuccess('成功与云端同步数据',{'dismissable':true,'detail':'* 在做云端同步前,开发者需要将变更的文件,做一次本地提交: \n* 右键文件或目录或项目根目录 -> Git ->  Git add + commit \n* 云端同步,指的是将已提交到本地 GIT 仓库的变更,同步到云端SVN/GIT服务器;\n* 未做本地提交的文件变更,不会提交到云端 SVN/GIT 服务器'});

        // git.cmd(projectRootPath, ['svn','rebase']);
        git.cmd(projectRootPath,['svn','dcommit','--username',userName]).catch((err)  => {atom.notifications.addWarning('检测到云端代码与本地未提交代码有冲突',{'dismissable':true,'title':'检测到云端代码与本地未提交代码有冲突','detail':'在解决每个冲突后,在左侧树状图右键该文件执行Git ->  Git add + commit,以使修改冲突真正生效'})
             git.cmd(projectRootPath, ['rebase','--skip']);
             git.cmd(projectRootPath, ['svn','rebase']);
           }
        );
    },

    syncfromCloud({event}){
      let projectRootPath = coracleFile.fetchProjectRootPath({event:event})
      if (projectRootPath == undefined || projectRootPath == null) {
        atom.notifications.addWarning(`${projectRootPath} 请至少打开一个有效的coralce项目!`)
        return
      }
      if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
         atom.notifications.addWarning(`${projectRootPath} 不是有效的coralce项目!`)
         return
       }
       git.cmd(projectRootPath, ['rebase','--skip']);
       git.cmd(projectRootPath, ['svn','rebase'])
            .catch((err) => {atom.notifications.addWarning('检测到云端代码与本地未提交代码有冲突',{'dismissable':true,'detail':'在解决每个冲突后,在左侧树状图右键该文件执行Git ->  Git add + commit,以使修改冲突真正生效'});
         });
    },

    syncfromCloudFirst(projectRootPath,appInfo){
      if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
        let workspacePath = Path.resolve(projectRootPath,"../")
        git.cmd(projectRootPath, ['svn','rebase']).then(()=>{
        })
        .catch((err) => atom.notifications.addError(err));
      }
    },

    runDist({event}) {
      
      const cmd = atom.config.get('coracle-build.DiskSetting');
      var cmds = cmd.split(" ");
      var cmdFirst = cmds[0];
      var arg =[];
      if (cmds.length >1){
          arg = cmds.splice(1,cmds.length-1);
      }
     
      let projectPath = coracleFile.getCMDProjectPath({event:event});
      coracleCmd.coracleCmd(projectPath,arg,cmdFirst,true,null,null);
    },

    runDev({event}) {

      coracleCmd.killProcess();
      const cmd = atom.config.get('coracle-build.DevSetting');
      var cmds = cmd.split(" ");
      var cmdFirst = cmds[0];
      var arg =[];
      if (cmds.length >1){
          arg = cmds.splice(1,cmds.length-1);
      }
      let projectPath = coracleFile.getCMDProjectPath({event:event});
      coracleCmd.coracleCmd(projectPath,arg,cmdFirst,true,null,null);

    },

    stopDev({event}) {
      coracleCmd.killProcess();
    },

    runBuild({event}) {

      const cmd = atom.config.get('coracle-build.BuildSetting');
      var cmds = cmd.split(" ");
      var cmdFirst = cmds[0];
      var arg =[];
      if (cmds.length >1){
          arg = cmds.splice(1,cmds.length-1);
      }

      let projectPath = coracleFile.getCMDProjectPath({event:event});
      coracleCmd.coracleCmd(projectPath,arg,cmdFirst,true,null,null);
    },

    cloudBuild({event}){
      this.build("coracle-cloud://localhost",{event:event});
    },

    cloudBuildRunner({event}){
      this.build("coracle-cloud-build-apprunner://localhost",{event:event});
    },

    build(url,{event}){
      const that = this;
      let projectRootPath = coracleFile.fetchProjectRootPath({event:event})
      if (projectRootPath == undefined || projectRootPath == null) {
        atom.notifications.addWarning(`${projectRootPath} 请至少打开一个有效的coralce项目!`)
        return
      }
      if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
        atom.notifications.addWarning(`${projectRootPath} 不是有效的coralce项目!`)
        return
      }

        let configFilePath =Path.resolve(projectRootPath, "config.xml");
        let configText = fse.readFileSync(configFilePath, 'utf8');
        let appIdInfo = configText.match(/widget.*appId\s*=\s*[\"\'](.*)[\"\']\s+appKey\s*=\s*[\"\']([\d\w]+)[\"\']/)
        if (appIdInfo === null){
          atom.notifications.addWarning(`${projectRootPath} 无有效的项目id或应用id!`)
          return
        }
        let appId = appIdInfo[1];
        if (appId.length === 0){
          atom.notifications.addWarning(`${projectRootPath} 无有效的项目id或应用id!`)
          return
        }
        if (appId.length === 14) {
          CoracleManager.requestAppId(appId,(appRealId)=>{
            that.destoryView(false);
            atom.workspace.open(url+'?'+appRealId).then(view => {
             });
          });  
        } else {
            that.destoryView(false);
  
            atom.workspace.open(url+'?'+appId).then(view => {
             });
        }
    },

    moduleManage({event}){
        const that = this;
        let projectRootPath = coracleFile.fetchProjectRootPath({event:event})
        if (projectRootPath == undefined || projectRootPath == null) {
          atom.notifications.addWarning(`${projectRootPath} 请至少打开一个有效的coralce项目!`)
          return
        }
        if ( ! fs.existsSync(Path.resolve(projectRootPath, "config.xml"))){
          atom.notifications.addWarning(`${projectRootPath} 不是有效的coralce项目!`)
          return
        }

        let configFilePath =Path.resolve(projectRootPath, "config.xml");
        let configText = fse.readFileSync(configFilePath, 'utf8');
        let appIdInfo = configText.match(/widget.*appId\s*=\s*[\"\'](.*)[\"\']\s+appKey\s*=\s*[\"\']([\d\w]+)[\"\']/)
        if (appIdInfo === null){
          atom.notifications.addWarning(`${projectRootPath} 无有效的项目id或应用id!`)
          return
        }
        let appId = appIdInfo[1];
        if (appId.length === 0){
          atom.notifications.addWarning(`${projectRootPath} 无有效的项目id或应用id!`)
          return
        }

        if (appId.length === 14) {
          CoracleManager.requestAppId(appId,(appRealId)=>{
            that.destoryView(false);
            atom.workspace.open('coracle-module://localhost?'+appRealId).then(view => {
            });
          });  
        } else {
            that.destoryView(false);
            atom.workspace.open('coracle-module://localhost?'+appId).then(view => {
            });
        }
        
    },

    chectoutfromGit({event}){

    },

    chectoutfromCoracle({event}){
      const userName = atom.config.get('userName');
      if (userName == null || userName == '' || userName == undefined) {
        atom.notifications.addInfo('登录体验更多云功能');
        return;
      }
      let prejectsInfo = atom.config.get('prejectsInfo');
      const projectList = new Array();
      try {
        prejectsInfo = JSON.parse(prejectsInfo)
        for(const projects of prejectsInfo){
          for(const project of projects.projects){
            projectList.push(project);
          }
        }
      } catch (e) {

      }

      const list = new MyListView();
      list.setItems(projectList);
      list.on('navigate-to', (e, project) => {

        const destroyPanel = list.panel;
        list.panel = null;
        if (destroyPanel) {
          destroyPanel.destroy();
        }
        atom.workspace.getActivePane().activate();
        this.syncProject(project)
      });
    },

    syncProject(project){
      let that = this;
      responseChannel = "atom-pick-folder-response";
      const userName = atom.config.get('userName');
      ipcRenderer.on(responseChannel, function(event, path) {
        ipcRenderer.removeAllListeners(responseChannel);
        if (path != null) {
          var dir = Path.resolve(path+'/'+project.projectName);
          fs.mkdir(dir);

          git.cmd(null, ['ls',project.svn,'--username',userName,'--password','coracle2017fk2'],'',false,false);

          if (process.platform === 'win32'){
            setTimeout(() => that.copyAotuSvn(err=>{
              git.cmd(null, ['svn','clone',project.svn, dir])
              .catch((err) => atom.notifications.addError(err));
            }),1000);
          } else {
            setTimeout(()=>{
              git.cmd(null, ['svn','clone',project.svn, dir])
              .catch((err) => atom.notifications.addError(err));
            },2000)
          }
            atom.workspace.getLeftDock().show();
            atom.project.addPath(dir);
        }
      });
      return ipcRenderer.send("pick-folder", responseChannel);
    },


    welcomeorlogin(event){
      this.userName = atom.config.get('userName');
      if (this.userName == null) {
        atom.notifications.addInfo('登录体验更多云功能');
        this.login();
      }else {
        let name = atom.config.get('userName');
        this.welcome();
      }
    },

    login(event){
       this.destoryView(false);
       activePane = atom.workspace.paneForItem||atom.workspace.getActiveTextEditor()
       atom.workspace.open('coracle-login://login').then(view => {
            // this.webView = view;
        });
    },

    loginSuccess(userName){
        this.welcome();
    },

    welcome(event){
      
      this.destoryView(true);
      const that = this;
      atom.workspace.open('coracle-welcome://welcome').then(view => {
        that.checkCoUI();
      });
    },

    cancleCreateProject(){
      this.welcome();
    },

    createProject (event){
      this.destoryView(false);
      atom.workspace.open('coracle-create://project')
      .then(view => {
      });
    },


    synProject(){
       this.destoryView(false);
       atom.workspace.open('coracle-sync://project')
       .then(view => {
       });
    },

    exitorlogin(event){

      this.userName = atom.config.get('userName');
      if (this.userName == null) {
        atom.notifications.addInfo('登录体验更多云功能');
        this.login();
      }else {
        atom.config.set('userName', null);
        atom.config.set('userPwd', null);
        atom.config.set('prejectsInfo', null);
        atom.notifications.addSuccess('注销用户成功!部分云功能将受限制');
      }
    },

    aboutStudio(event){
      that = this;
      atom.workspace.open('about-studio://about')
      .then(view => {
          that.aboutView = view;
      });
    },

    newXBuilderMobileApp(event){
      this.destoryView(false);
      atom.workspace.open('coracle-create://project')
      .then(view => {
      });
    },

    destoryView(isDestory){
      if (this.corWebView) {
        this.corWebView.destroy();
      }
    },

    consumeConsolePanel(consolePanel){
       this.consolePanel = consolePanel;
       git.initConsolePane(consolePanel);
       coracleCmd.initConsolePane(consolePanel);
    },

    buildCoUIModule(event){
      console.log(event);
    },

    buildCoUIPage(event){
      console.log(event);
    }
};

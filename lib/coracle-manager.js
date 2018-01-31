'use babel';
/** @jsx etch.dom */

import etch from 'etch';
import React from 'react';
import {CompositeDisposable,TextEditor,Emitter} from 'atom';
const Path = require("path")

var fse = require('fs-extra')
var package = require('../package')

// const app_template_config = require(`./../app_template/config.json`)
// const app_template_path = "../app_template"

export default {

 sendLogin(userName,userPwd) {

   xmlHttp = this.createXMLHttpRequest();
   var url = package.host+"/portal/ide/svnLogin?username="+userName+"&password="+userPwd;
   xmlHttp.open("POST", url, true);// 异步处理返回
   that = this;
   xmlHttp.onreadystatechange = function(){
     if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
       json = JSON.parse(xmlHttp.responseText);
       if (json.code === 1) {
          atom.config.set('userName', null);
          atom.config.set('userPwd', null);
          atom.notifications.addSuccess('项目获取失败');
          return;
       }
       atom.config.set('prejectsInfo',JSON.stringify(json.data));
     }
   };
   xmlHttp.setRequestHeader("Content-Type",
           "application/x-www-form-urlencoded;");
   xmlHttp.send();
 },

 requestAppId(appKey,done){
  xmlHttp = this.createXMLHttpRequest();
  var url = package.host+"/portal/ide/getProjectIdByAppId/"+appKey;
  var params = {
  };
  xmlHttp.open("POST", url,params,true);// 异步处理返回
  that = this;
  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
       json = JSON.parse(xmlHttp.responseText);
       done(json.projectId);
    }
  };
  xmlHttp.setRequestHeader("Content-Type",
          "application/x-www-form-urlencoded;");
  xmlHttp.send();
 },

 sendCreatApp(appInfo,done){
  xmlHttp = this.createXMLHttpRequest();
   var url = package.host+"portal/project/saveProject";
   var params = {
    projectName:appInfo.name,
    extField2:appInfo.projetcid,
    remark:appInfo.desc,
   };
   alert(JSON.stringify(params));
   xmlHttp.open("POST", url,params,true);// 异步处理返回
   that = this;
   xmlHttp.onreadystatechange = function(){
     if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
        json = JSON.parse(xmlHttp.responseText);
        alert(xmlHttp.responseText);
        done(json);
     }
   };
   xmlHttp.setRequestHeader("Content-Type",
           "application/x-www-form-urlencoded;");
   xmlHttp.send();
 },

/* 创建http请求 */
 createXMLHttpRequest(){
   var xmlHttp;
   if (window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();
       if (xmlHttp.overrideMimeType)
           xmlHttp.overrideMimeType('text/xml');
   } else if (window.ActiveXObject) {
       try {
           xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
       } catch (e) {
           try {
               xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (e) {
           }
       }
   }
   return xmlHttp;
 },

   createAppProject(appInfo, output) {

     var root = Path.resolve(output,appInfo.name)

     if (!fse.existsSync(root)) {
       fse.mkdirSync(root);
     }

     try {
      //  let templatePath = Path.join(__dirname, app_template_path, appInfo.template)
      //  fse.copySync(templatePath,root)
       let configFilePath =  Path.join(root, "config.xml")
       let configText = fse.readFileSync(configFilePath, 'utf8')
       configText = configText.replace(/\<name\>.*\<\/name\>/g, `<name>${appInfo.name}</name>`);
       configText = configText.replace(/\<widget appId=.*\>/g, `<widget appId = "${appInfo.appKey}" pId = "${appInfo.projectId}">`);
       fse.writeFileSync(configFilePath, configText, 'utf8');

       return
     } catch (err) {
       console.error(`创建coralce项目失败:` + err)
       return
     }
   }
}

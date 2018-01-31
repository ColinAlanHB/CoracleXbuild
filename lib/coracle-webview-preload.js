

(function (global, nodeRequire, undefined) {

  /**
   * polyfill.js
  */
  // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength,padString) {
          targetLength = targetLength>>0; //floor if number or convert non-number to 0;
          padString = String(padString || ' ');
          if (this.length > targetLength) {
              return String(this);
          }
          else {
              targetLength = targetLength-this.length;
              if (targetLength > padString.length) {
                  padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
              }
              return padString.slice(0,targetLength) + String(this);
          }
      };
  }

  var ipcRenderer = nodeRequire('electron').ipcRenderer;
  var CoracleStudio = {};

  CoracleStudio.afterLogined = function (date) {
  console.log(date);

    ipcRenderer.sendToHost('after-logined',date);
  }

  global.openurl = (url)=>{
      ipcRenderer.sendToHost('after-url',url);
   }

  CoracleStudio.createProject = function (date) {
    ipcRenderer.sendToHost('create-Project',date);
  }

  CoracleStudio.syncApp = function (date) {
    ipcRenderer.sendToHost('create-syncApp',date);
  }

  CoracleStudio.cancelSync = function (date) {
    ipcRenderer.sendToHost('create-cancelSync',date);
  }

  CoracleStudio.syncProjectInfo = function (callback) {
    ipcRenderer.on('sendProjectInfo', (event, json) => {
      callback(json);
    })
    ipcRenderer.sendToHost('sync-projectInfo');
  }

  CoracleStudio.createApp = function (date) {
    ipcRenderer.sendToHost('create-createApp',date);
  }

  CoracleStudio.cancelApp = function (date) {
    ipcRenderer.sendToHost('create-cancelApp',date);
  }

  global.CoracleStudio = CoracleStudio;

  // preset for CommonJS Module
  global.require = undefined;

  // alert(2);
})(window, require)

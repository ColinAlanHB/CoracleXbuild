'use babel';

import path from 'path';

Shell = require('shell')

let _webviewElement = null;

const _handlerKeyboardEvent = function() {
  _webviewElement.addEventListener('keydown', (event) => {
    
    if (event.keyCode === 8) {
      _webviewElement.sendInputEvent({
        type: 'keyDown',
        keyCode: 'Backspace'
      });
    } else if (event.keyCode === 67 && (event.metaKey || event.ctrlKey)) {
      _webviewElement.copy();
    } else if (event.keyCode === 86 && (event.metaKey || event.ctrlKey)) {
      _webviewElement.paste(); 
    }
  });
};

export default class WebView{
  constructor(props) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('co-webview-container');

    // Create webview element
    _webviewElement = document.createElement('webview');
    _webviewElement.style.height = '100%';
    console.log(path.resolve('./coracle-webview-preload.js').split(path.sep).join(path.posix.sep))
    console.log(path.join(__dirname,'coracle-webview-preload.js'));
    _webviewElement.setAttribute('preload', path.join(__dirname,'coracle-webview-preload.js'));
  
    this.element.appendChild(_webviewElement);

    _handlerKeyboardEvent();
    _webviewElement.addEventListener('dom-ready', () => {
    });
  }

  setUri(uri){
    _webviewElement.setAttribute('src', uri);
  }

  // Tear down any state and detach
  destroy() {
    var pane = atom.workspace.getActivePane();
    pane.destroyItem(this);
    // 如果当前窗口容器中只有文档视图，那么把容器都销毁掉
    if (pane.getItems().length === 0) {
        pane.destroy();
    }
  }

  getWebVieElement(){
    return _webviewElement;
  }

  getTitle() {
    // return '正在加载...';
    const urlSrc = _webviewElement.src.split('/').pop();
    if(urlSrc === 'login'){
         return '登录页';
    } else if (urlSrc === 'welcome.html') {
         return '欢迎页';
    } else if (urlSrc === 'project.html') {
         return '创建应用'
    } else if (urlSrc === 'sync.html') {
         return '同步应用'
    } else if (urlSrc === 'compile'){
         return '云编译'
    } else if (urlSrc === 'plugin') {
         return '插件管理'
    } else if (urlSrc === 'plugin?type=3'){
         return '自定义AppRunner'
    }
     return 'webview'; 
  }

  addIpcMessageListener(channel, handler) {
    _webviewElement.addEventListener('ipc-message', (event) => {
      if (event.channel ===  channel) {
        handler.apply(_webviewElement, event.args);
      }
    });
  }

}

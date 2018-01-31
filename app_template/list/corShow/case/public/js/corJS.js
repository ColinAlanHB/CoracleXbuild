/*
 * Vue.js v2.3.4
 * corJS.js v1.0.0
 * (c) Coracel
 */
!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
var isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = (window.navigator.userAgent.indexOf('Android')>=0)?true : false;
/*判断pc*/
function IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //判断是否pc或手机端
    if(typeof(corNative) == "undefined"){
        return true;
    }else{
        return false;
    }
}
var sysTag = IsPC();
if(isPhone&&!sysTag){
    document.getElementsByTagName("body")[0].className+=" uh_ios7";
}
window.onload = function(){
    //解决点击延迟
    FastClick.attach(document.body);
    //pc端兼容原生api调用
    var nativeInfo = "此功能请在手机上开发调试";
    if(sysTag){//模拟器调试时使用(sysTag||isPhone) 打包时使用(sysTag)
        window.corNative = {
            getAppName:function(){
                return nativeInfo;
            },
            getAppKey:function(){
                return nativeInfo;
            },
            getAppVersion:function(){
                return nativeInfo;
            },
            getSystemType:function(){
                return nativeInfo;
            },
            getSystemVersion:function(){
                return nativeInfo;
            },
            getDeviceId:function(){
                return nativeInfo;
            },
            getDeviceModel:function(){
                return nativeInfo;
            },
            getDeviceName:function(){
                return nativeInfo;
            },
            getDeviceToken:function(){
                return nativeInfo;
            },
            getConnectionType:function(){
                return nativeInfo;
            },
            getScreenWidth:function(){
                return nativeInfo;
            },
            getScreenHeight:function(){
                return nativeInfo;
            },
            getStatusBarAppearance:function(){
                return nativeInfo;
            },
            getHtmlRootDir:function(){
                return nativeInfo;
            },
            getPageParams:function(){
                return nativeInfo;
            },
            //打开新界面
            openNewWeb:function(params){
                if(isAndroid){
                    var params = corJS.strToJson(params);
                }
                window.parent.location.href = params.url;
                console.log(nativeInfo);
            },
            //打开浮动窗口
            openPopover:function(name,url,x,y,w,h){
                  if(w==""||w==null||w=="null"){
                      w = corJS.getWidth();
                  }
                  var iframe = document.createElement('iframe'); 
                  iframe.id=name;
                  iframe.src=url;  
                  iframe.name = name;
                  iframe.width = w;
                  iframe.height = h;
                  iframe.frameBorder = "0"
                  iframe.scrolling = "yes";
                  iframe.style.position="absolute";
                  iframe.style.left="0";
                  iframe.style.zIndex="9999";
                  iframe.style.top = y+"px";
                  document.documentElement.appendChild(iframe);
            },
            //关闭浮动窗口
            closePopover:function(name){
                document.getElementById(name).parentNode.removeChild(document.getElementById(name));
            },
            //主窗口调用浮动窗口
            evaluatePopoverScript:function(name,fuc){
                var ifreame = window.frames[name];  
                if (ifreame != null && ifreame != undefined) {  
                    document.getElementById(name).contentWindow.eval(fuc);
                }  
            },
            //浮动窗口执行主窗口方法
            evaluateScript:function(fuc){
                console.log(99)
                window.parent.eval(fuc);
            },
            //窗口之间通讯
            subscribeChannelNotification:function(id,fuc){
                console.log(nativeInfo);
            },
            publishChannelNotification:function(id){
                console.log(nativeInfo);
            },
            //返回上一个界面
            prevPage:function(){
                //window.history.go(-1);
                window.history.back();
            },
            //安装应用
            installApp:function(params){
               console.log(nativeInfo);
            },
            //打开应用
            openApp:function(params){
                console.log(nativeInfo);
            },
            //判断应用是否已经安装
            appInstalled:function(params){
                console.log(nativeInfo);
            },
            //下载
            download:function(params){
                console.log(nativeInfo);
            },
            //上传
            upload:function(params){
                console.log(nativeInfo);
            },
            //网络请求
            requestProxy:function(params){
                var xmlHttp;
                if (window.ActiveXObject) { 
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
                } else if (window.XMLHttpRequest) { 
                    xmlHttp=new XMLHttpRequest();
                }
                var timeout = params.timeout || "30000";//保存超时时间，默认30秒  
                var requestDone = false;
                if(params.method=="POST"||params.method=="post"){
                    var postData = params.data;
                    postData = (function(obj){ // 转成post需要的字符串.
                        var str = "";
                        for(var prop in obj){
                            str += prop + "=" + obj[prop] + "&"
                        }
                        return str;
                    })(postData);
                    xmlHttp.open("POST",params.url);  
                    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
                    if(params.headers&&params.headers!={}){
                        for(var key in params.headers){
                            xmlHttp.setRequestHeader(key,params.headers[key]);
                        }
                    }
                    xmlHttp.send(postData);
                }else if(params.method=="GET"||params.method=="get"){
                    var urlP = params.url;
                    if(params.data && params.data != {}){
                        var newP = [];
                        for(var key in params.data){
                            newP.push({keys:key,values:params.data[key]});
                        }
                        for(var i=0;i<newP.length;i++){
                            if(i==0){
                                urlP +="?"+newP[i].keys+"="+newP[i].values
                            }else{
                                urlP+="&"+newP[i].keys+"="+newP[i].values
                            }
                        }
                    }
                    xmlHttp.open("GET",params.url); 
                    xmlHttp.send(null);
                }
                var setTime = setTimeout(function(){  
                    requestDone = true; 
                    eval(params["__callback"])({status:false,data:"",errorMsg:"请求超时"});
                    xmlHttp.close();
                },timeout);
                xmlHttp.onreadystatechange = function() { 
                    //响应成功,并且没有超时
                    if(xmlHttp.readyState == 4 && !requestDone){
                        clearTimeout(setTime);
                        if(xmlHttp.status==200||xmlHttp.status==304){
                            if(corJS.isArray(xmlHttp.responseText)||corJS.isObject(xmlHttp.responseText)){
                                eval(params["__callback"])({status:true,data:xmlHttp.responseText,errorMsg:""});
                            }else{
                                eval(params["__callback"])({status:true,data:JSON.parse(xmlHttp.responseText),errorMsg:""});
                            }
                        }
                        if(xmlHttp.status==404||xmlHttp.status==403||xmlHttp.status==500||xmlHttp.status==401){
                            eval(params["__callback"])({status:false,data:"",errorMsg:"请求失败,请检查服务"});
                        }
                    }
                }
            },
            //设置数据偏好
            setPrefData:function(){
                console.log(nativeInfo);
            },
            getPrefData:function(){
                console.log(nativeInfo);
            },
            removePrefData:function(){
                console.log(nativeInfo);
            },
            removeAllPrefData:function(){
                console.log(nativeInfo);
            },
            //消息事件
            //订阅广播通知
            addNotification:function(params){
                console.log(nativeInfo);
            },
            //移除广播通知
            removeNotification:function(key){
                console.log(nativeInfo);
            },
            //清除缓存
            cleanCache:function(){
                console.log(nativeInfo);
            },
            //发送广播通知
            sendNotification:function(params){
                console.log(nativeInfo);
            },
            //设备
            //拨打电话或视频通话
            call:function(params){
                console.log(nativeInfo);
            },
            //发短信
            sms:function(params){
                console.log(nativeInfo);
            },
            //发邮件
            mail:function(params){
                console.log(nativeInfo);
            },
            //打开手机通讯录
            openSystemContacts:function(params){
                console.log(nativeInfo);
            },
            //设置状态栏样式
            setStatusBarStyle:function(params){
                console.log(nativeInfo);
            },
            //获取本机号码
            getPhoneNumber:function(){
                return nativeInfo;
            },
            //设置应用旗标数
            setAppBadge:function(number){
                console.log(nativeInfo);
            },
            setStatusBarStyle:function(params){
                console.log(nativeInfo);
            },
            alert:function(params){
                console.log(nativeInfo);
            },
            confirm:function(params){
                console.log(nativeInfo);
            },
            prompt:function(params){
                console.log(nativeInfo);
            },
            actionSheet:function(params){
                console.log(nativeInfo);
            },
            showLoading:function(params){
                console.log(nativeInfo);
            },
            closeLoading:function(params){
                console.log(nativeInfo);
            },
            toast:function(params){
                console.log(nativeInfo);
            },
            openDateTimePicker:function(params){
                console.log(nativeInfo);
            },
            closeLoading:function(params){
                console.log(nativeInfo);
            },
            //多媒体
            //从系统相机、相册或图片库获取照片或视频
            getPicture:function(params){
                console.log(nativeInfo);
            },
            //保存图片、视频到系统相册
            saveToAlbum:function(params){
                console.log(nativeInfo);
            },
            //图片预览
            showPhotos:function(params){
               console.log(nativeInfo);
            },
            //视频播放
            playVideo:function(params){
                console.log(nativeInfo);
            },
            //开始录音
            startRecord:function(){
               console.log(nativeInfo);
            },
            //停止录音
            stopRecord:function(){
               console.log(nativeInfo);
            },
            //播放录音
            playAudio:function(){
                console.log(nativeInfo);
            },
            //播放视频
            playVideo:function(){
                console.log(nativeInfo);
            }
        }
        corReady();
    }
}
var corjs = function(){
    this.setLocVal = function(key,val){
        if(window.localStorage){
            return window.localStorage.setItem(key,val);
        }else{
            console.log("浏览器不支持localStorage");
        }
    }
    //本地取值
    this.getLocVal = function(key){
            return window.localStorage.getItem(key);
    }
    //清除本地值
    this.removeLocVal = function(key){
        if(window.localStorage){
            window.localStorage.removeItem(key);
        }else{
            console.log("浏览器不支持localStorage");
        }
    }
    //清除所有存储值
    this.getLocValKey = function(){
        if(window.localStorage){
            var locArry = [];
            console.log(localStorage.length);
            for(var i=0;i<window.localStorage.length;i++){
                locArry.push(window.localStorage.key(i));
            }
            return locArry;
        }else{
            console.log("浏览器不支持localStorage");
        }
    }
    //清除所有存储值
    this.clearLocVal = function(){
        if(window.localStorage){
            window.localStorage.clear();
        }else{
            console.log("浏览器不支持localStorage");
        }
    }


    //js基础能库
    //去掉字符串首尾空格
    this.trim = function(str){
        if(String.prototype.trim){
            return str == null ? "" : String.prototype.trim.call(str);
        }else{
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    //去掉字符串所有空格
    this.trimAll = function(str){
        return str.replace(/\s*/g,'');
    };
    //是否为数组
    this.isArray = function(obj){
        if(Array.isArray){
            return Array.isArray(obj);
        }else{
            return obj instanceof Array;
        }
    };
    //是否为对象{}
    this.isObject = function(obj){
        if(typeof(obj)=="object"&&!Array.isArray(obj)){
            return true
        }else{
            return false
        }
    };
    //获取dom元素
    this.getDom = function(id){
        return document.getElementById(id);
    };
    this.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    //获取dom元素的第一个子元素
    this.first = function(el){
        var el = this.getDom(el);
        if(arguments.length === 1){
            return el.children[0];
        }
    };
    //选择dom元素的最后一个子元素
    this.last = function(el){
        var el = this.getDom(el);
        if(arguments.length === 1){
            var children = el.children;
            return children[children.length - 1];
        }
    };
    //选择第几个子元素
    this.eq = function(el, index){
        var el = this.getDom(el);
        return this.dom(el, ':nth-child('+ index +')');
    };
    //选择相邻的前一个元素
    this.prev = function(el){
        var el = this.getDom(el);
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    //选择相邻的后一个元素
    this.next = function(el){
        var el = this.getDom(el);
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    //移除dom元素
    this.remove = function(el){
        var el = this.getDom(el);
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    //获取或设置DOM元素的属性
    this.attr = function(el, name, value){
        var el = this.getDom(el);
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    //移除dom元素属性
    this.removeAttr = function(el, name){
        var el = this.getDom(el);
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    //DOM元素是否含有某个class
    this.hasCls = function(el, cls){
        var el = this.getDom(el);
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    //DOM元素增加class属性
    this.addCls = function(el, cls){
        var el = this.getDom(el);
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    //DOM元素移除class属性
    this.removeCls = function(el, cls){
        var el = this.getDom(el);
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    //切换指定的className
    this.toggleCls = function(el, cls){
       var el = this.getDom(el);
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(this.hasCls(el, cls)){
                this.removeCls(el, cls);
            }else{
                this.addCls(el, cls);
            }
        }
        return el;
    };
    //获取或设置表单元素的值
    this.val = function(el, val){
        var el = this.getDom(el);
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }
    };
    //在DOM元素内部，首个子元素前插入HTML字符串
    this.prepend = function(el, html){
        var el = this.getDom(el);
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    //在DOM元素内部，最后一个子元素后面插入HTML字符串
    this.append = function(el, html){
        var el = this.getDom(el);
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    //在DOM元素前面插入HTML字符串
    this.before = function(el, html){
        var el = this.getDom(el);
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    //在DOM元素后面插入HTML字符串
    this.after = function(el, html){
        var el = this.getDom(el);
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    //获取或设置DOM元素的innerHTML
    this.html = function(el, html){
        var el = this.getDom(el);
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    //设置或者获取元素的文本内容
    this.text = function(el, txt){
        var el = this.getDom(el);
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    //获取元素在页面中的位置与宽高
    this.offset = function(el){
        var el = this.getDom(el);
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    //获取网页高度
    this.getHeight = function(){
        return document.documentElement.clientHeight;
    };
    //获取网页高度
    this.getWidth = function(){
        return document.body.clientWidth;
    };
    //设置所传入的DOM元素的样式，可传入多条样式
    this.css = function(el, css){
        var el = this.getDom(el);
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    //获取指定DOM元素的指定属性的完整的值，如20px
    this.cssVal = function(el, prop){
        var el = this.getDom(el);
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    //将标准的JSON 对象转换成字符串格式
    this.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }
        return json;
    };
    //将JSON字符串转换成JSON对象
    this.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }
    };
    //获取当前日期时间 0：日期时间  1：日期  2时间
    this.getDate = function(type){
        var time;
        switch(type){
            case 0 : time = this.format('yyyy-MM-dd hh:mm:ss');
            break;
            case 1 : time = this.format('yyyy-MM-dd');
            break;
            case 2 : time = this.format('hh:mm:ss');
            break;
            default:"";
            break
        }
        return time;
    };
    this.format = function(format){
        var o = { 
            "M+" : new Date().getMonth()+1, //month 
            "d+" : new Date().getDate(), //day 
            "h+" : new Date().getHours(), //hour 
            "m+" : new Date().getMinutes(), //minute 
            "s+" : new Date().getSeconds(), //second 
            "q+" : Math.floor((new Date().getMonth()+3)/3), //quarter 
            "S" : new Date().getMilliseconds() //millisecond 
        } 
        if(/(y+)/.test(format)) { 
            format = format.replace(RegExp.$1, (new Date().getFullYear()+"").substr(4 - RegExp.$1.length)); 
        } 
        for(var k in o) { 
            if(new RegExp("("+ k +")").test(format)) { 
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            } 
        }
        return format; 
    }
    //获取两个日期的天数差
    this.getDayNum = function(strDateStart,strDateEnd){
       var strSeparator = "-"; //日期分隔符
       var oDate1;
       var oDate2;
       var iDays;
       oDate1= strDateStart.split(strSeparator);
       oDate2= strDateEnd.split(strSeparator);
       var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
       var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
       iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
       return iDays==0?"1":iDays;
    }
    //是否为手机号码
    this.isTelPhone = function(mobile){
        if((/^1(3|4|5|7|8)\d{9}$/.test(mobile))){ 
            return true; 
        }else{
            return false;
        }
    }
    //是否为固定电话
    this.isTel = function(mobile){
       if(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(mobile)){
            return true;
        }else{
            return false;
        }
    }
    //是否为邮箱
    this.isEmail = function(email){
       var sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/;
       if(sReg.test(email)){
            return true;
        }else{
            return false;
        }
    }
    //获取滚动条滚动距离
    this.getScrollTop = function(){
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    //滚动条回到顶部
    this.goScrollTop = function(){
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn(){
      var oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(oTop > 0){
      scrollBy(0,-20);
      timer = requestAnimationFrame(fn);
      }else{
      cancelAnimationFrame(timer);
      } 
      });
    }
    //android,ios传参数转化
    this.checkParams = function(param){
        if(isAndroid){
            return JSON.stringify(param);
        }
        return param;
    }
    /*转换参数为对象*/
    this.parseParams = function(param){
        if(typeof(param) == "object"){
            return param;
        }else{
            return JSON.parse(param);
        }
    }
    //取文件类型字符串后缀
    this.suffix = function(str){
        var str = str.split(".");
        return str[str.length-1];
    }
    //获取当前文件目录
    this.currentDir = function(){
        return location.pathname.substring(0,location.pathname.lastIndexOf('/'));
    }
    //打开新窗口
    this.openWin = function(name,url,anim){
        if(anim==0){
            var type = "none";
        }else{
            var type = "push";
        }
        var params = {
          url:name+".html",
          animation:{
            type:type,                //动画类型（详见动画类型常量）
            subType:"from_right",       //动画子类型（详见动画子类型常量）
            duration:300
          }
        };
        params = this.checkParams(params);
        corNative.openNewWeb(params);
    }
    //打开浮动窗口
    this.openFrame = function(name,url,x,y,w,h){
      corNative.openPopover(name,url,x,y,w,h);
    }
    //主窗口执行浮动窗口方法
    this.frameScript = function(name,fuc){
        corNative.evaluatePopoverScript(name,fuc)
    }
    //浮动窗口执行主窗口方法
    this.mainScript = function(fuc){
        corNative.evaluateScript(fuc);
    }
    //关闭主窗口
    this.closeWin = function(){
        corNative.prevPage();
    }
    //关闭浮动窗口
    this.closeFrame = function(name){
        corNative.closePopover(name);
    }
    //窗口之间的通讯
    this.addNotice = function(id,fuc){
        corNative.subscribeChannelNotification(id,fuc);
    }
    this.sendNotice = function(id){
        corNative.publishChannelNotification(id);
    }
    // //订阅消息
    // this.addNotice = function(id,_callback){
        // var backMethod = "backMethod_"+new Date().getTime();
        // window[backMethod] = function(result){
            // result = this.parseParams(result);
            // _callback(result.data);
        // }
        // var params = {
            // name:id,
            // __callback:backMethod
        // };
        // params = this.checkParams(params);
        // corNative.addNotification(params);
    // }
    // //发送消息
    // this.sendNotice = function(id,par){
        // var params = {
            // name:id,
            // extras:par||{}
        // };
        // params = corJS.checkParams(params);
        // corNative.sendNotification(params);
    // }
}
var corJS = new corjs();
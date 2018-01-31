;(function (win) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var vMetaEl = doc.querySelector('meta[name="viewport"]');
  var dpr = 0;
  var scale = 0;
		// 函数节流用定时器 id	
	var tid;


	if (!dpr && !scale) {
			// var isIPhone = win.navigator.appVersion.match(/iphone/gi);
			// var isAndroid = win.navigator.appVersion.match(/android/gi);
			var devicePixelRatio = win.devicePixelRatio;

			if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
				dpr = 2;
			}	else {
				dpr = 1;
			}	

			scale = 1 / dpr;		
		}

	docEl.setAttribute('data-dpr', dpr);
	if (!vMetaEl) {
      vMetaEl = doc.createElement('meta');
      vMetaEl.setAttribute('name', 'viewport');
      vMetaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

      docEl.firstElementChild.appendChild(vMetaEl);
        // 用于适配软键盘压缩高度问题    
        var deviceHeight = docEl.clientHeight + "px";
      }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
        // 设备的设备独立像素界限
        if (width / dpr > 768) {
          width = 768 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px'; 

        var body = doc.querySelector('body');
        if(!!body){          
          body.style.height = deviceHeight;  
        }

  }

  win.addEventListener('resize', function() {    
       clearTimeout(tid);
       tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function(e) {    	
       if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
  }, false);

  if (doc.readyState === 'complete') {
       doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }


  refreshRem();

})(window);
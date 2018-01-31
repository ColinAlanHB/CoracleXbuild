var initPage = function(){
   //打开一个浮动窗口
   window.corNative = {}
    corNative.openFloatWindow = function(params){
        corWindow.openPopover(params)
    }
    corNative.openWindowdow
      
  }) = function(params){
        corWindow.open(params)
    }
    //该接口打开一个位于最上层的window
    corNative.openTopWin = function(params){
        corWindow.openPresentWindow(params)
    }
    //关闭当前窗口
    corNative.closeWindow = function(params){
        corWindow.close({
          animID:params.animID||"",
          animDuration:params.animDuration||""
        })
    }
    //移动当前窗口位置
    corNative.moveWindow = function(params){
        corWindow.setWindowFrame(params);
    }
    //移动浮动窗口位置
    corNative.moveFrame = function(params){
      corWindow.beginAnimition();
      corWindow.setAnimitionDuration(params.moveTime||300)
      corWindow.makeTranslation(params.x||0,params.y||0,params.z||0)
      corWindow.commitAnimition();
    }
    //执行主窗口js脚本
    corNative.mainScript = function(params){
        corWindow.evaluateScript(params)
    }
    //执行浮动窗口js脚本
    corNative.frameScript = function(params){
        corWindow.evaluatePopoverScript(params);
    }
    //在多页面浮动窗口中执行js脚本
    corNative.multiFrameScript = function(params){
        corWindow.evaluateMultiPopoverScript(params);
    }
    //设置浮动窗口是否显示
    corNative.setFrameVisibility = function(frameName,visible){
        corWindow.setPopoverVisibility(frameName,visible);
    }
    //关闭浮动窗口
    corNative.closeFrame = function(frameName){
        corWindow.closePopover(frameName)
    }
    //更改浮动窗口的位置和大小
    corNative.setFramePosition = function(params){
        corWindow.setPopoverFrame(params);
    }
    //打开一个多页面浮动窗口
    corNative.openMultiFloatWindow = function(params){
        corWindow.openMultiPopover(params)
    }
    //关闭多页面浮动窗口
    corNative.closeMultiFrame = function(MultiFrameName){
        corWindow.closeMultiPopover(MultiFrameName);
    }
    //设置跳转到多浮动窗口的索引
    corNative.setSelectedInMultiFWindow = function(params){
        corWindow.setSelectedPopOverInMultiWindow({
          name:params.name||"", 
          index:params.index||""
        });
    }
    // 更改多页面浮动窗口的位置和大小
    corNative.setMultiFramePosition = function(params){
        corWindow.setMultiPopoverFrame(params);
    }
    //置顶当前浮动窗口
    corNative.setFrameTop = function(){
        corWindow.bringToFront();
    }
    //置底当前浮动窗口
    corNative.setFrameBottom = function(){
        corWindow.sendToBack()
    }
    //将当前浮动窗口插入到指定浮动窗口之上
    corNative.insertFrameAbove = function(frameName){
        corWindow.insertAbove(frameName)
    }
    //将当前浮动窗口插入到指定浮动窗口之下
    corNative.insertFrameBelow = function(frameName){
        corWindow.insertAbove(frameName)
    }
    //置顶指定浮动窗口
    corNative.setFrameNameTop = function(frameName){
        corWindow.bringPopoverToFront(frameName)
    }
    //置底指定浮动窗口
    corNative.setFrameNameBottom = function(frameName){
        corWindow.sendPopoverToBack(frameName)
    }
    //将一个浮动窗口插入到另一个浮动窗口之上
    corNative.insertFrameAboveFrame = function(frameName1,frameName2){
        corWindow.insertPopoverAbovePopover(frameName1,frameName2);
    }
    //将一个浮动窗口插入到另一个浮动窗口之下
    corNative.insertFrameBelowFrame = function(rameName1,frameName2){
        corWindow.insertPopoverBelowPopover(rameName1,frameName2)
    }
    //将指定窗口插入到另一窗口之上
    corNative.insertWinAboveWin = function(winName1,winName2){
        corWindow.insertWindowAboveWindow(winName1,winName2)
    }
    //将指定窗口插入到另一窗口之下
    corNative.insertWinBelowWin = function(winName1,winName2){
        corWindow.insertWindowBelowWindow(winName1,winName2)
    }
    //设置当前窗口显示和隐藏
    corNative.setWindowVisibility = function(visible){
        corWindow.setWindowHidden(visible);
    }
    //打开侧滑窗口
    corNative.openSlideWin = function(params){
        corWindow.toggleSlidingWindow(params);
    }
    //设置侧滑窗口
    corNative.setSlideWin = function(params){
         corWindow.setSlidingWindow(params);
     }
     //设置侧滑窗口是否可用
     corNative.setSlideWinEnabled = function(enable){
         corWindow.setSlidingWindowEnabled(enable);
     }
     //设置多浮动窗口是否响应滑动事件
     corNative.setMultiFrameSwipe = function(enable){
         corWindow.setMultilPopoverFlippingEnbaled(enable)
     }
     //注册全局消息
     corNative.setGlobalNotice = function(callBack){
          corWindow.onGlobalNotification = function(msg){
              callBack(msg);
          }
     } 
     //发送全局消息
     corNative.sendGlobalNotice = function(msg){
          corWindow.postGlobalNotification(msg);
     }
     //窗口之间的通信 注册一个通信id
     corNative.setWinNotice = function(id,callBack){
          corWindow[id] = function(msg){
              callBack(msg)
          };
          corWindow.subscribeChannelNotification(id,id);
     }
     //窗口之间的通信  调用注册的通信id方法
     corNative.sendWinNotice = function(id,msg){
         corWindow.publishChannelNotification(id,msg);
     }
     //获取当前窗口处于前台还是后台
     corNative.getWinState = function(){
         return corWindow.getState();
     }
     //获取window的宽度
     corNative.getWinWidth = function(){
         return corWindow.getWidth();
     }
     //获取window的高度
     corNative.getWinHeight = function(){
         return corWindow.getHeight();
     }
     //获取侧滑窗口显示情况
     corNative.getSlideWinState = function(){
         return corWindow.getSlidingWindowState();
     }
     //获取界面之间传递的参数
     corNative.getParams = function(){
         return corWindow.getUrlQuery();
     }
     //弹出只有一个确定按钮的对话框
     corNative.alert = function(params){
         corWindow.alert(params);
     }
     //弹出至少包含一个至多包含3个按钮的对话框
     corNative.confirm = function(parmas,callBack){
         corWindow.confirm(parmas,function(index){
             callBack(index);
         });
     }
     //弹出包含两个按钮且带输入框的对话框
     corNative.prompt = function(parmas,callBack){
         corWindow.prompt(parmas,function(index,data){
             callBack(index,data);
         });
     }
     //弹出消息提示框
     corNative.toast = function(parmas){
         corWindow.toast(parmas);
     }
     //关闭消息提示框
     corNative.closeToast = function(){
         corWindow.closeToast()
     }
     //创建一个全局对话框
     corNative.createWinDialog = function(parmas){
         corWindow.createProgressDialog({
          title:parmas.title||"",
          msg:parmas.msg||"",
          canCancel:parmas.canCancel||0
        })
     }
     //销毁全局对话框
     corNative.closeWindowDialog = function(){
         corWindow.destroyProgressDialog()
     },
     //从界面底部弹出按钮列表
     corNative.actionSheet = function(parmas,callBack){
         corWindow.actionSheet(parmas,function(index){
            callBack(index);
        })
     }
     //设置屏幕方向
     corNative.setOrientation = function(orientation){
         corWindow.setOrientation(orientation);
     }
     //设置滚动条的显示和隐藏
     corNative.setWinScrollbar = function(visible){
         corWindow.setWindowScrollbarVisible(visible);
     }
     //设置当前页面是否拦截某个按键
     corNative.setReportKey = function(keyCode,enable){
         corWindow.setReportKey(keyCode,enable);
     }
     //弹出Android设备软键盘
     corNative.showKeyboard = function(){
         corWindow.showSoftKeyboard();
     },
     //关Android设备软键盘
     corNative.hideKeyboard = function(){
         corWindow.hideSoftKeyboard();
     }
     //设置左右手势的灵敏度
     corNative.setSwipeRate  = function(rate){
         corWindow.setSwipeRate(rate)
     }
     //发送消息到状态栏
     corNative.sendStatusBarNotice = function(title,msg){
         corWindow.statusBarNotification(title,msg)
     }
     //设置状态条上字体的颜色
     corNative.setStatusBarTitleColor = function(color){
         corWindow.setStatusBarTitleColor(color);
     }
     //动态加载自定义启动画面
     corNative.setLoadingImage = function(params){
        var paramStr = JSON.stringify(params);
        corWindow.setLoadingImagePath(paramStr);
     }
     //是否跟随设备自动旋转
     corNative.setAutorotateEnable = function(enable){
         corWindow.setAutorotateEnable(enable);
     }
     //开启或关闭当前window的硬件加速
     corNative.setHardwareEnable = function(enable){
         corWindow.setHardwareEnable(enable);
     }
     //开启或关闭当前popover的硬件加速
     corNative.setPopHardwareEnable = function(name,flag){
         corWindow.setPopHardwareEnable(name,flag);
     }
     //获取网页弹动状态
     corNative.getBounce = function(){
         return corWindow.getBounce();
     }
     //设置是否支持网页弹动
     corNative.setBounceEnabled = function(flag){
         corWindow.setBounceEnabled(flag);
     }
     //隐藏弹动效果
     corNative.hiddenBounceView = function(type){
         corWindow.hiddenBounceView(type);
     }
     //显示弹动效果
     corNative.showBounceView = function(params){
         corWindow.showBounceView(params);
     }
     //重载当前页面
     corNative.refresh = function(){
         corWindow.reload();
     }
     //自动下拉刷新效果
     corNative.topBounceRefresh = function(){
         corWindow.topBounceViewRefresh()
     }
     //隐藏状态栏
     corNative.hideStatusBar = function(){
         corWindow.hideStatusBar();
     }
     //显示状态栏
     corNative.showStatusBar = function(){
         corWindow.showStatusBar();
     }
     //设置当前页面是否支持手势侧滑关闭
     corNative.setSwipeWinEnabled = function(type){
         var params  = {
            enable:type,
         }
         var paramStr = JSON.stringify(params);
         corWindow.setSwipeCloseEnable(paramStr);
     }
     //滑到顶部的监听方法，内容超过一屏时有效
     corNative.onScrollTop = function(callBack){
         corWindow.onSlipedUpEdge = function(){
             callBack();
         }
     }
     //滑到底部的监听方法，内容超过一屏时有效
     corNative.onScrollBottom = function(callBack){
         corWindow.onSlipedDownEdge = function(){
             callBack();
         }
     }
     //设置网页是否支持左右滑动的监听方法
     corNative.setOnSwipeEnbaled = function(type){
         var param = {
            isSupport:type
         }
         corWindow.setIsSupportSwipeCallback(param);
     }
      //向右滑动的监听方法
     corNative.onSwipeRight = function(callBack){
         corWindow.onSwipeRight = function(){
           callBack();
        }
     }
     //向左滑动的监听方法
     corNative.onSwipeLeft  = function(callBack){
         corWindow.onSwipeLeft  = function(){
           callBack();
        }
     }
     //按键事件的监听方法
     corNative.onKeyPressed = function(callBack){
         corWindow.onKeyPressed =function(keyCode){
            callBack(keyCode);
        }
     }
}
;
(function (window, undefined) {
  var ContainerVue = Vue.extend({
    methods: {
      goBack:function() {
        corNative.closeWindow({
          animID: -1,
          animDuration: 300
        });
      }
    }
  });

  window.ContainerVue = ContainerVue;
})(window)
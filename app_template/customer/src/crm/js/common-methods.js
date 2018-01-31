vm.location = function (url) {
    if(url == -1){
        history.go(-1);
    }else{
        location.href=url;
    }
}
//给后台发送ajax请求,检测登录状态,如果未登录就拦截到登录页
$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function (info) {
        console.log(info);
        if (info.error===400) {
            location.href = 'login.html';
        }
    }
})
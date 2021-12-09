// 注意：每次调用 $.post() 或 $.get() 或 $.ajax() 的时候会先调用//ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // 在 complete 回调函数中，可以通过 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页
            location.href = '/login.html';
        }
    }

    // 统一为有权限的接口，设置 hearders请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})
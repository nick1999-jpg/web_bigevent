// 注意：每次调用 $.post() 或 $.get() 或 $.ajax() 的时候会先调用//ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})
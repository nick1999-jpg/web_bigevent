$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    initTable();
    initCate();

    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据 
        pagesize: 2, // 每页显示几条数据
        cate_id: '',    // 文章分类的id
        state: ''   // 文章的发布状态
    };

    // 获取文章列表数据的方法
    function initTable(data) {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: data || {
                pagenum: 1,
                pagesize: 2
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取文章列表失败');
                layer.msg('获取文章列表成功');
                // 使用模板引擎渲染用户的数据
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                // 调用渲染分页的方法
                renderPage(res.total);
            }
        })
    };

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dt.getDate();
        d = d < 10 ? '0' + d : d;
        var hh = dt.getHours();
        hh = hh < 10 ? '0' + hh : hh;
        var mm = dt.getMinutes();
        mm = mm < 10 ? '0' + mm : mm;
        var ss = dt.getSeconds();
        ss = ss < 10 ? '0' + ss : ss;

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    };

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取分类数据失败');
                layer.msg('获取分类数据成功');

                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                // 通知 layui 重新渲染 表单区域的UI结构
                form.render();
            }
        })
    };

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable(q);
    });

    // 定义渲染分页的方法
    function renderPage(total) {
        // 渲染分页结构
        laypage.render({
            elem: 'pageBox',    // 分页容器的 Id
            count: total,       // 总数据条数
            limit: q.pagesize,  // 每页显示几条数据
            curr: q.pagenum,     // 默认被选中的页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候触发的回调函数
            // 触发jump回调的两种方式
            // 1.点击页码值时触发, 此时 first 值为 undefined
            // 2.调用了 laypage.render() 方法就会触发, 此时 first 值为 true
            jump: function (obj, first) {
                // obj.curr 拿到当前切换的页码值
                q.pagenum = obj.curr;
                // 将最新的条目数赋值到 q 中
                q.pagesize = obj.limit;
                // 根据最新的 q 重新渲染表格
                if (!first) initTable(q);
            }
        })
    };

    // 通过代理的方式为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除按钮的个数
        var len = $('.btn-delete').length;
        // 获取到文章的Id
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败!');
                    layer.msg('删除成功!');
                    // 判断当前页码值是否存留数据，如果没有，则
                    // 让页码值减一再调用initTable()
                    if (len === 1) {
                        // 当 len的值为1时，删除成功后当前页面上便
                        // 没有数据了
                        // 页码值最小是1
                        q.pagenum = q.pagenum === 1 ? q.pagenum : q.pagenum - 1;
                    }
                    initTable(q);
                }
            })

            layer.close(index);
        });
    })
})
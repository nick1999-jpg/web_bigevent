// 监控区域模块制作
$(function () {
    (function () {
        $('.monitor .content ul').each(function () {
            var rows = $(this).children('li').clone();
            $(this).append(rows);
        })
    })();
    (function () {
        $('.monitor .tab').on('click', 'a', function () {
            $(this).addClass('bg').siblings('a').removeClass('bg');
            var index = $(this).index();
            $('.monitor .content').eq(index).show().siblings('.content').hide();
        })
    })();
    // 点位分布统计模块
    (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector('.pie'));
        // 2. 指定配置项和数据
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // 注意color写的位置
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            series: [
                {
                    name: '点位统计',
                    type: 'pie',
                    // 如果radius是百分比，则必须加引号
                    radius: ['10%', '70%'],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [
                        { value: 20, name: '云南' },
                        { value: 26, name: '北京' },
                        { value: 24, name: '山东' },
                        { value: 25, name: '河北' },
                        { value: 20, name: '江苏' },
                        { value: 25, name: '浙江' },
                        { value: 30, name: '四川' },
                        { value: 42, name: '湖北' }
                    ],
                    // 修饰饼形图文字相关样式,用label对象
                    label: {
                        fontSize: 10,
                    },
                    labelLine: {
                        length: 6,
                        length2: 8
                    }
                }
            ]
        };
        // 3. 配置项和数据给我们的实例化对象
        myChart.setOption(option);

        // 4. 当浏览器缩放的时候，图标也等比例缩放
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();
    // 柱形图模块
    (function () {
        var item = {
            name: '',
            value: 1200,
            // 修改当前柱形的样式
            itemStyle: {
                color: '#254065'
            },
            // 鼠标放到柱子上不想高亮
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 鼠标经过柱子不显示提示框组件
            tooltip: {
                extraCssText: 'opacity: 0'
            }
        };
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector('.bar'));
        // 2. 指定配置和数据
        var option = {
            color: new echarts.graphic.LinearGradient(
                // (x1, y1) 点到点(x2, y2)之间进行渐变
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#00fffb' }, // 0起始颜色
                    { offset: 1, color: '#0061ce' }  // 1 结束颜色
                ]
            ),
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true,
                show: true,
                borderColor: '#005667'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                    axisTick: {
                        alignWithLabel: false,
                        // 隐藏x轴的刻度
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    // x轴这条线的颜色样式
                    axisLine: {
                        lineStyle: {
                            color: '#005667'
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        alignWithLabel: false,
                        // 隐藏y轴的刻度
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    // y轴这条线的颜色样式
                    axisLine: {
                        lineStyle: {
                            color: 'red'
                        }
                    },

                    // y轴分割线的颜色样式
                    splitLine: {
                        lineStyle: {
                            color: '#005667'
                        }
                    }
                }

            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [2100, 1900, 1700, 1560, 1400,
                        item, item, item, 900, 750, 600, 480, 240]
                }
            ],

        };
        // 3. 把配置给实例对象
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();
    // 订单量的tab栏切换
    (function () {
        var count = 0;
        var days = $('.order .day a');
        $('.order a').on('click', function () {
            count = $(this).index();
            $(this).addClass('abg').siblings('a').removeClass('abg');
            var index = $(this).index();
            $('.order .sell').eq(index).show().siblings('.sell').hide();
        });
        var dayAuto = setInterval(function () {
            count++;
            if (count >= days.length) {
                count = 0;
            };
            days.eq(count).click();
        }, 1000);
        $('.order').hover(function () {
            clearInterval(dayAuto);
        }, function () {
            clearInterval(dayAuto);
            dayAuto = setInterval(function () {
                count++;
                if (count >= days.length) {
                    count = 0;
                };
                days.eq(count).click();
            }, 1000)
        })
    })();
    // 销售统计模块
    (function () {
        var myChart = echarts.init(document.querySelector('.line'));
        // (1) 准备数据
        var data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        };
        var option = {
            tooltip: {
                // 通过坐标轴触发
                trigger: 'axis'
            },
            legend: {
                right: '10%',
                // 修饰图例文字的颜色
                textStyle: {
                    color: '#4c9bfd'
                },
                // 如果series设置了name,此时图例组件的data可以省略
                // data: ['预期销售额', '实际销售额']
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true,
                borderColor: '#012f4a',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                // 去除刻度
                axisTick: {
                    show: false
                },
                // 修饰刻度标签的颜色
                axisLabel: {
                    color: '#4c9bfd'
                },
                // 去除x坐标轴颜色
                axisLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
                // 修改y轴分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: '#012f4a'
                    }
                }
            },
            color: ['#00f2f1', '#ed3f35'],
            series: [
                {
                    name: '预期销售额',
                    type: 'line',
                    stack: 'Total',
                    // 是否让线条圆滑显示
                    smooth: true,
                    data: data.year[0]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    stack: 'Total',
                    // 是否让线条圆滑显示
                    smooth: true,
                    data: data.year[1]
                },
            ]
        };

        myChart.setOption(option);

        // (2) 点击切换效果
        $('.sale .tj').on('click', 'a', function () {
            index = $(this).index() - 1;
            $(this).addClass('bgc').siblings('a').removeClass('bgc');
            // 拿到当前a的自定义属性值
            var type = data[this.dataset.type];
            // 根据拿到的值 重新渲染series里面的data值
            option.series[0].data = type[0];
            option.series[1].data = type[1];
            // 重新把配置好的新数据给实例对象
            myChart.setOption(option);
        });
        // tab栏切换效果制作
        // (1)开启定时器每隔3s，自动让a触发点击事件即可
        var as = $('.sale .tj a');
        var index = 0;
        var timer = setInterval(function () {
            index++;
            if (index >= as.length) {
                index = 0;
            };
            as.eq(index).click();
        }, 1000);

        // (2)鼠标经过sales,关闭定时器，离开开启定时器
        $('.sale').hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index >= as.length) {
                    index = 0;
                };
                as.eq(index).click();
            }, 1000);
        });
        // 当浏览器缩放的时候，图标也等比例缩放
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();
    // 销售渠道模块 雷达图
    (function () {
        var myChart = echarts.init(document.querySelector('.channel .inner .chart'));
        const dataBJ = [
            [90, 19, 56, 11, 34, 76],

        ];
        var option = {
            tooltip: {
                show: true,
                // 控制提示框组件的显示位置
                position: ['60%', '10%']
            },
            radar: {
                indicator: [
                    { name: '机场', max: 100, color: '#4c9bfd' },
                    { name: '商场', max: 100, color: '#4c9bfd' },
                    { name: '火车站', max: 100, color: '#4c9bfd' },
                    { name: '汽车站', max: 100, color: '#4c9bfd' },
                    { name: '地铁', max: 100, color: '#4c9bfd' },
                ],
                // 修改雷达图的大小
                radius: '55%',
                shape: 'circle',
                // 分隔的圆圈个数
                splitNumber: 4,
                axisName: {
                    color: 'rgb(238, 197, 102)'
                },
                // 分割圆圈线条的样式
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                },
                splitArea: {
                    show: false
                },
                // 设置坐标轴的线的样式
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: 'Beijing',
                    type: 'radar',
                    // 填充区域内的线条颜色
                    lineStyle: {
                        normal: {
                            color: '#fff',
                            width: 1,
                            opacity: 0.5
                        }
                    },
                    data: dataBJ,
                    // 设置图形标记(拐点)
                    symbol: 'circle',
                    // 圆点(拐点)大小
                    symbolSize: 5,
                    // 圆点(拐点)设置为白色
                    itemStyle: {
                        color: '#fff'
                    },
                    // 让小圆点显示数据
                    label: {
                        show: true,
                        fontSize: 7,
                    },
                    // 修饰我们区域填充的背景颜色
                    areaStyle: {
                        color: 'rgba(238, 197, 102, 0.6)'
                    }
                }
            ]
        };
        // 当浏览器缩放的时候，图标也等比例缩放
        window.addEventListener('resize', function () {
            myChart.resize();
        })
        myChart.setOption(option);
    })();
    // 销售模块 饼形图 半圆形设置方式
    (function () {
        var myChart = echarts.init(document.querySelector('.quarter .inner .chart .line'));
        var option = {
            series: [
                {
                    name: '销售进度',
                    type: 'pie',
                    radius: ['120%', '150%'],
                    center: ['48%', '90%'],
                    labelLine: {
                        show: false
                    },
                    // 鼠标经过不需要放大偏移图形
                    hoverOffset: 0,
                    // 饼形图的起始角度 为 180， 注意不是旋转角度
                    startAngle: 180,
                    data: [
                        {
                            value: 100,
                            itemStyle: {
                                // 颜色渐变 #00c9e0 -> #005fc1
                                color: new echarts.graphic.LinearGradient(

                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#00c9e0' }, //0 起始颜色
                                        { offset: 1, color: '#005fc1' } // 1 结束颜色
                                    ]
                                )
                            }
                        },
                        {
                            value: 100, itemStyle: {
                                color: '#12274d'
                            }
                        },
                        {
                            value: 200, itemStyle: {
                                color: 'transparent'
                            }
                        },

                    ]
                }
            ]
        };
        myChart.setOption(option);
        // 当浏览器缩放的时候，图标也等比例缩放
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();
    // 全国热榜模块
    (function () {
        // 1. 准备相关数据
        var hotData = [
            {
                city: '北京',  // 城市
                sales: '25, 179',  // 销售额
                flag: true, //  上升还是下降
                brands: [   //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ]
            }
        ];
        // 根据数据渲染各省热销内容
        // (1) 遍历hotData 对象
        var hotHTML = '';
        // 声明一个渲染函数
        function render(that) {
            that.addClass('bg').siblings('li').removeClass('bg');
            index = that.index();
            // 拿到当前城市的品牌对象
            // 可以通过hotData[$(this).index()拿到当前的城市
            // hotData[$(this).index()].brands 得到城市对象的品牌种类
            // 开始遍历品牌数组
            var nearHTML = '';
            $.each(hotData[that.index()].brands, function (index, item) {
                nearHTML += `<li><em>${item.name}</em><span>${item.num} <i class=${item.flag ? 'icon-up' : 'icon-down'}></i></span></li>`;
            });
            $('.province .rank .near').html(nearHTML);
        };


        $.each(hotData, function (index, item) {
            // console.log(item);
            hotHTML += `<li><em>${item.city}</em> <span>${item.sales} <i class=${item.flag ? 'icon-up' : 'icon-down'} ></i></span>`;
        });
        $('.hot').html(hotHTML);
        // 鼠标经过 tab 栏的时候
        // (1) 鼠标经过当前li 要高亮显示
        $('.province .hot').on('mouseenter', 'li', function () {
            render($(this));
        });


        // 默认把第一个li处于鼠标经过状态
        var lis = $('.province .hot li');
        lis.eq(0).mouseenter();
        // 开启定时器
        var index = 0;
        var timer = setInterval(function () {
            index++;
            if (index >= lis.length) {
                index = 0
            };
            // lis.eq(index).mouseenter();
            render(lis.eq(index));
        }, 1000);


        $('.province .hot').hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            // timer = setInterval(function () {
            //     index++;
            //     if (index >= lis.length) {
            //         index = 0
            //     };
            //     lis.eq(index).mouseenter();

            // }, 1000);
            timer = setInterval(function () {
                index++;
                if (index >= lis.length) {
                    index = 0
                };
                // lis.eq(index).mouseenter();
                render(lis.eq(index));
            }, 1000);
        })
    })();
})
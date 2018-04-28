var jsonpdata={
    "data1":{
        "name1":[{
            "value":"335",
            "name":"直达",
            "selected":true
        },{
            "value":"335",
            "name":"营销广告"
        },
            {
                "value":"335",
                "name":"搜索引擎"
            }
        ],
        "name2":[{
            "value":"335",
            "name":"邮件营销"
        },{
            "value":"335",
            "name":"联盟广告"
        },
            {
                "value":"335",
                "name":"视频广告"
            },
            {
                "value":"335",
                "name":"百度"
            },{
                "value":"335",
                "name":"谷歌"
            },
            {
                "value":"335",
                "name":"必应"
            },
            {
                "value":"335",
                "name":"其他"
            }
        ]
    },
    "data2":{
        "name1":[{
            "value":"100",
            "name":"直达"

        },{
            "value":"300",
            "name":"营销广告",
            "selected":true
        },
            {
                "value":"160",
                "name":"搜索引擎"
            }
        ],
        "name2":[{
            "value":"260",
            "name":"邮件营销"
        },{
            "value":"335",
            "name":"联盟广告"
        },
            {
                "value":"230",
                "name":"视频广告"
            },
            {
                "value":"335",
                "name":"百度"
            },{
                "value":"150",
                "name":"谷歌"
            },
            {
                "value":"339",
                "name":"必应"
            },
            {
                "value":"210",
                "name":"其他"
            }
        ]
    },
    "data3":{
        "name1":[{
            "value":"196",
            "name":"直达"

        },{
            "value":"280",
            "name":"营销广告"

        },
            {
                "value":"169",
                "name":"搜索引擎",
                "selected":true
            }
        ],
        "name2":[{
            "value":"333",
            "name":"邮件营销"
        },{
            "value":"284",
            "name":"联盟广告"
        },
            {
                "value":"320",
                "name":"视频广告"
            },
            {
                "value":"325",
                "name":"百度"
            },{
                "value":"145",
                "name":"谷歌"
            },
            {
                "value":"605",
                "name":"必应"
            },
            {
                "value":"60",
                "name":"其他"
            }
        ]
    }
}

/*创建自定义组件*/
Vue.component('bar',{
    template:' <header class="header" >\
        <h3 class="title">{{title}}</h3>\
            </header>',
    /*对外公开的属性,父级控件可以指定*/
    props:['title']
})

var interval;
// 这是我们的Model
var exfunction=function (index) {
    pagedata(index);
    console.log(option1.series[0].data)
};
var exfunction2=function () {
    $(".am-selected-list li").unbind("click");
    window.clearTimeout(interval);
    app2.count = 11;
    interval=setInterval(function (){
        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
        var data0 = option2.series[0].data;
        var data1 = option2.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option2.xAxis[0].data.shift();
        option2.xAxis[0].data.push(axisData);
        option2.xAxis[1].data.shift();
        option2.xAxis[1].data.push(app2.count++);

        myChart.setOption(option2);
    }, 2000);
    ;
    if (option2 && typeof option2 === "object") {
        myChart.setOption(option2, true);
    }
    myChart.setOption(option2);
};
var app1 = new Vue({
    el: '#appmain',
    data: function(){
        return{
            message:"暂无搜索数据",
            values:"1",
            value:[
                {val:"1",name:"图表一"},
                {val:"2",name:"图表二"},
                {val:"3",name:"图表三"}
            ]
        }
    },
    methods: {
        changeData: exfunction,
        changeData2: exfunction2
    }
})
$(function(){
    $(".am-selected-list li").on("click",function(){
        pagedata($(this).data("value"));
    })
})

var dom = document.getElementById("main");
var myChart = echarts.init(dom);
var option1;
var datas1=[];
var datas2=[];
option1 = {
    color:['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'],
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:datas1
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    /*   shadowBlur:3,
                     shadowOffsetX: 2,
                     shadowOffsetY: 2,
                     shadowColor: '#999',
                     padding: [0, 7],*/
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:datas2
        }
    ]
};
pagedata(1)
function pagedata(index){
    datas1=[];
    datas2=[];

    var datas="data"+index;
    $.each(jsonpdata,function(i,v){
        if(datas==i){
            datas=v;
        }
    })
    $.each(datas.name1,function(i,v){
        var obj={}
        obj={
            name:v.name,
            value:v.value,
            selected:v.selected
        }
        datas1.push(obj)
    })
    $.each(datas.name2,function(i,v){
        var obj={}
        obj={
            name:v.name,
            value:v.value,
        }
        datas2.push(obj)
    })
    option1.series[0].data=datas1;
    option1.series[1].data=datas2;
    myChart.setOption(option1);
}

var app2 = {};
option2 = null;
option2 = {
    title: {
        text: '动态数据',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['最新成交价', '预购队列']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(len + 1);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '价格',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '预购量',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            color: function(params) {
                var colorList = [
                    '#26C0C0'
                ];
                return colorList[params.dataIndex]
            },
            name:'预购队列',
            type:'bar',
            barMaxWidth: '50',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
        {
            name:'最新成交价',
            type:'line',
            color:"#C23631",
            itemStyle:{
                normal:{
                    lineStyle:{
                        width:1.5,
                        type:'solid'  //'dotted'虚线 'solid'实线
                    }
                }
            },
            data:(function (){
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
    ]
};
/**
 * Created by lenovo on 2018/4/28.
 */

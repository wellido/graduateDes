//主体样式
function mainDiv() {
   //主div
    d3.select('#warpDiv').style({
            'position':'absolute',
            'left':'0px',
            'right':'0px',
            'width': '1440px',
            'height': '960px',
            "background-color":"gray",
            "opacity": 1.0,
            'z-index': '1'
});
    //文本框div
    d3.select("#textBox").style({
    'position':'absolute',
    "left" : "350px",
    "top" : "150px",
    "width" : "500px",
    "height": "400px",
    'border-radius': '5px',
    "background-color":"gray",
    "opacity": 0.0,
    "z-index": "-1"
    })
    //kaldi模式
    d3.select("#kaldiDemo").style({
    'position':'absolute',
    "left" : "1000px",
    "top" : "20px",
    "width" : "100px",
    "height": "50px",
    "border": "solid 1px black",
    "background-color":"#3469a4",
    'border-radius': '4px',
    'cursor': 'pointer'
    }).on("click",function(){
        isKaldi=0;
        d3.select(this).style("background-color","#3469a4");
        d3.select("#apiDeme").style("background-color","");
    }).html("kaldi版").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'line-height': '50px',
     'color':'white',
     'text-align': 'center'
    });
    //api模式
    d3.select("#apiDeme").style({
    'position':'absolute',
    "left" : "1100px",
    "top" : "20px",
    "width" : "100px",
    "height": "50px",
    "border": "solid 1px black",
    'border-radius': '4px',
    'cursor': 'pointer'
    }).on("click",function(){
        isKaldi=1;
        d3.select(this).style("background-color","#3469a4");
        d3.select("#kaldiDemo").style("background-color","");
    }).html("api版").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'line-height': '50px',
     'color':'white',
     'text-align': 'center'
    });
    //选择栏
    d3.select("#selectDiv")
    .style({
    'position':'absolute',
    "left" : "0px",
    "top" : "100px",
    "width" : "400px",
    "height": "600px",
    'border-radius': '5px',
    "border": "solid 1px black"
    });
    //展示栏
    d3.select("#textDiv")
    .style({
    'position':'absolute',
    "left" : "500px",
    "top" : "100px",
    "width" : "800px",
    "height": "700px"
    });
    d3.select("#audioSelect")
    .style({
    'position':'absolute',
    "left" : "50px",
    "top" : "0px",
    "width" : "700px",
    "height": "200px",
    'border-radius': '5px',
    "background-size":"cover",
    "border": "solid 1px black"
    })
    //语音转文字
    d3.select("#funcDiv1")
    .style({
    'position':'absolute',
    "left" : "100px",
    "top" : "50px",
    "width" : "200px",
    "height": "50px",
    "border": "solid 1px black",
    'cursor': 'pointer'
    }).html("语音转文字").style({
     'vertical-align': 'middle',
      'line-height': '50px',
     'font-size': '20px',
     'color': 'black',
     'text-align': 'center'
    });
    //文字查询
    d3.select("#funcDiv2")
    .style({
    'position':'absolute',
    "left" : "100px",
    "top" : "250px",
    "width" : "200px",
    "height": "50px",
    "border": "solid 1px black",
    'cursor': 'pointer'
    }).html("文字定位").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'line-height': '50px',
     'color':'black',
     'text-align': 'center'
    });
    //识别率统计
    d3.select("#funcDiv3")
    .style({
    'position':'absolute',
    "left" : "100px",
    "top" : "150px",
    "width" : "200px",
    "height": "50px",
    "border": "solid 1px black",
    'cursor': 'pointer'
    }).html("识别率统计").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'line-height': '50px',
     'color':'black',
     'text-align': 'center'
    });
    //统计实际文字的div
    d3.select("#realWords").style({
    'position':'absolute',
    "left" : "100px",
    "top" : "480px",
    "width" : "200px",
    "height": "100px",
    'border-radius': '5px',
    "background-size":"cover",
    "border": "solid 1px black",
    "z-index":"-1"
    }).html("为进行识别率统计的输入框");
    d3.select("#realWords").append("textarea")
    .attr("id","textArea2").style({
    "position":"absolute",
    "top":"20px",
    "left":"0px",
    "width":"200px",
    "height":"80px"
    })
    //传文本按钮
    d3.select("#textUpload").style({
    'position':'absolute',
    "top" : "380px",
    "width" : "80px",
    "height": "80px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '80px',
    "background-color":"#3469a4",
    "background-size":"cover",
    "opacity":1,
    'z-index': '-1',
    "left":"160px"
    })

}

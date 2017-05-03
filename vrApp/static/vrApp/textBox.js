//文字定位输入文本框
function textBox(){
    d3.select("#textArea1").style({
    "position":"absolute",
    "top":"0px",
    "left":"0px",
    "width":"500px",
    "height":"300px"
    })
    d3.select("#textButton").style({
    "position":"absolute",
    "top":"325px",
    "left":"220px",
    "width":"60px",
    "height":"50px",
    "border": "solid 1px white",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
    }).on("click",function(){
    d3.select("#textBox").style({
    "z-index":"-1",
    "opacity":0.0
    });
    d3.select("#selectSvg2").style("z-index","-1");
    }).html("确定").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'line-height': '40px',
     'color':'white',
     'text-align': 'center'
      })
}
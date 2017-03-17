function audioRec() {
d3.select("#recordingStatus")
.style({
    "position":"absolute",
    "top":"20px",
    "left":"300px",
    "width":"100px",
    "height":"70px"
});
d3.select("#time")
.style({
    "position":"absolute",
    "top":"20px",
    "left":"30px",
    "font-size":"20px",
    "color":"white"
});
d3.select("#start-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
     "left":"200px"
}).html("开始").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});
d3.select("#stop-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
    "left":"320px"
}).html("停止").style({
    'color': 'white',
    'vertical-align': 'middle',
    'font-size': '20px',
    'text-align': 'center'
});
d3.select("#upload-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
     "left":"440px"
}).html("上传").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});
}
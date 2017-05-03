//文本战士栏样式
function textDisplay() {
d3.select("#textDisplay").style({
    'position':'absolute',
    "left" : "50px",
    "top" : "250px",
    "width" : "700px",
    "height": "350px",
    'color': 'black',
     'font-size': '20px'
    }).attr("readonly","readonly")
}
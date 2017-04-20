function audioRec() {
var n= 0, timer=null;
d3.select("#recordingStatus")
.style({
    "position":"absolute",
    "top":"20px",
    "left":"250px",
    "width":"100px",
    "height":"70px"
}).html("停止").style({
     'vertical-align': 'middle',
     'line-height': '70px',
     'font-size': '20px',
     'text-align': 'center',
     "color":"white"
});
d3.select("#audioSelect").append("input").attr({
    "id":"timeStatus",
    'value':"00:00"
}).style({
    "position":"absolute",
    "top":"20px",
    "left":"350px",
    "width":"100px",
    "height":"70px",
    'background-color': 'transparent',
    'border-left': 'transparent',
    'border-right': 'transparent',
    'border-top': 'transparent',
    "border-bottom": "transparent",
    'font-size': '20px',
    'padding-left': '10px',
    'color': 'white',
})
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
}).on("click",function(){
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    clearInterval(timer);
    d3.select("#timeStatus").attr("value", "00:00");
        timer=setInterval(function () {
            n++;
            var m=parseInt(n/60);
            var s=parseInt(n%60);
            d3.select("#timeStatus").attr("value", toDub(m)+":"+toDub(s));
        },1000/60);
    d3.select("#recordingStatus").html("录音中" );
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
}).on("click",function(){
    mediaRecorder.stop();
    clearInterval(timer);
    n=0;
    d3.select("#recordingStatus").html("停止");
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
}).on("click",function(){
    mediaRecorder.save();
    clearInterval(timer);
    n=0;
    d3.select("#recordingStatus").html("停止");
    d3.select("#timeStatus").attr("value", "00:00");
}).html("保存").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});
}

function toDub(n){
     return n<10?"0"+n:""+n;
}
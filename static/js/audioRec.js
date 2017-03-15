function audioRec() {
d3.select("#audioSelect").append("div").attr("id","recordingStatus");
d3.select("#audioSelect").append("button").attr("id","start-recording");
d3.select("#audioSelect").append("button").attr("id","stop-recording");
d3.select("#audioSelect").append("button").attr("id","pause-recording");
d3.select("#audioSelect").append("button").attr("id","resume-recording");

d3.select("#recordingStatus").style({
    "position":"absolute",
    "top":"20px",
    "left":"300px",
    "width":"100px",
    "height":"70px"
}).html("停止").style({
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
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
     "left":"120px"
}).on("click",function(){
    this.disabled = true;
    record();
    d3.select("#recordingStatus").html("录音中");
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
    "left":"480px"
}).on("click",function(){
    stop();
}).html("上传").style({
    'color': 'white',
    'vertical-align': 'middle',
    'font-size': '20px',
    'text-align': 'center'
});

d3.select("#pause-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
    "left":"240px"
}).on("click",function(){
    this.disabled = true;
    d3.select("#resume-recording").disabled=false;
    d3.select("#recordingStatus").html("暂停");
}).html("暂停").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});


d3.select("#resume-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    'border-radius': '5px',
    "background-color":"#3469a4",
     "left":"360px"
}).on("click",function(){
     this.disabled = true;
     upload();
     d3.select("pause-recording").disabled=false;
     d3.select("#recordingStatus").html("录音中");
}).html("上传").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});
var adressStr="{% static "+ "\"js/recorder.swf\""+" %}"
Recorder.initialize({
   swfSrc: adressStr
  });
function record(){
        Recorder.record({
          start: function(){
            console.log("recording starts now. press stop when youre done. and then play or upload if you want.");
          }
        });
      }

function play(){
        Recorder.stop();
        Recorder.play();
      }
function stop(){
        Recorder.stop();
      }
function upload(){
            Recorder.upload({
              url:        "127.0.0.1:8000/vrData",
              audioParam: "audioFileRes",
              params: {
                "audioFile": new Date().getTime(),
                "textFile": ""
              },
              success: function(responseText){
                var track = $.parseJSON(responseText)
                window.location = track.permalink_url;
              }
            });
      }
}
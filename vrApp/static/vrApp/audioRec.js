function audioRec() {
d3.select("#audioSelect").append("div").attr("id","recordingStatus");
d3.select("#audioSelect").append("button").attr("id","start-recording");
d3.select("#audioSelect").append("button").attr("id","stop-recording");
d3.select("#audioSelect").append("button").attr("id","upload-recording");

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
function record(){
        console.log(Recorder);
        console.log(Recorder._initialized+"111");
        Recorder.record({
          start: function(){
            console.log("33333");
          }
        });
        console.log("222222");
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

d3.select("#start-recording").on("click",function(){
          this.disabled = true;
          record();
          d3.select("#recordingStatus").html("录音中");
});
d3.select("#stop-recording").on("click",function(){
          stop();
          d3.select("#recordingStatus").html("停止");
});
d3.select("#upload-recording").on("click",function(){
          this.disabled = true;
          upload();
});

}
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
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
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
    this.disabled = true;
    mediaRecorder.ondataavailable = function(blob) {
    var realData=new Object();
    realData.audioFile='';
    realData.textFile=blob;
    var postData=new Object();
    postData.data=realData;
    data2=JSON.stringify(postData);
    console.log(data2);
    xhr('http://127.0.0.1:8000/vrDate/', data2, function (fileURL) {
        window.open(fileURL);
    });

    function xhr(url, data, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(location.href + request.responseText);
            }
        };
        request.open('POST', url);
        request.send(data);
    }
};
    mediaRecorder.stop();
    d3.select("#start-recording").disabled=false;
    d3.select("#pause-recording").disabled=true;
    d3.select("#recordingStatus").html("停止");
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
    mediaRecorder.pause();
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
     mediaRecorder.resume();
     d3.select("pause-recording").disabled=false;
     d3.select("#recordingStatus").html("录音中");
}).html("继续").style({
     'color': 'white',
     'vertical-align': 'middle',
     'font-size': '20px',
     'text-align': 'center'
});
audiosContainer=document.getElementById('recordingStatus');
var mediaConstraints = {
                audio: true
            };
var mediaRecorder;
//navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

function onMediaSuccess(stream) {
    var audio = document.createElement('audio');
    audio = mergeProps(audio, {
             controls: true,
             muted: true,
             src: URL.createObjectURL(stream)
         });
    audio.play();
    audiosContainer.appendChild(audio);
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.recorderType = StereoAudioRecorder;
    mediaRecorder.mimeType = 'audio/wav';
    mediaRecorder.start(3000);
}

function onMediaError(e) {
    console.error('media error', e);
}
}
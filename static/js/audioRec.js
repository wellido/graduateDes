function audioRec() {
d3.select("#audioSelect").append("div").attr("id","recordingStatus");
d3.select("#audioSelect").append("button").attr("id","start-recording");
d3.select("#audioSelect").append("button").attr("id","stop-recording");
d3.select("#audioSelect").append("button").attr("id","pause-recording");
d3.select("#audioSelect").append("button").attr("id","resume-recording");
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
     "left":"60px"
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
    "background-color":"#3469a4",
    "left":"180px"
}).on("click",function(){
    this.disabled = true;
    mediaRecorder.stop();
    d3.select("#start-recording").disabled=false;
    d3.select("#pause-recording").disabled=true;
    d3.select("#recordingStatus").html("停止");
}).html("停止").style({
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
    "left":"300px"
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
     "left":"420px"
}).on("click",function(){
     this.disabled = true;
     mediaRecorder.resume();
     d3.selct("pause-recording").disabled=false;
     d3.select("#recordingStatus").html("录音中");
}).html("重录").style({
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
    "left":"540px"
}).on("click",function(){
    var fileType = 'audio';
    var fileName = 'ABCDEF.wav';

    var formData = new FormData();
    formData.append(fileType + '-filename', fileName);
    formData.append(fileType + '-blob', blob);

    xhr('save.php', formData, function (fileURL) {
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
    d3.select("#recordingStatus").html("停止");
}).html("上传").style({
       'color': 'white',
       'vertical-align': 'middle',
       'font-size': '20px',
       'text-align': 'center'
});

var mediaConstraints = {
                audio: true
            };
var mediaRecorder;
//navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    mediaRecorder.ondataavailable = function (blob) {
        // POST/PUT "Blob" using FormData/XHR2
        var blobURL = URL.createObjectURL(blob);
        document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
    };
    mediaRecorder.start(3000);
}

function onMediaError(e) {
    console.error('media error', e);
}
}
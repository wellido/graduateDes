function audioRec() {

d3.select("#audioSelect").append("button").attr("id","start-recording");
d3.select("#audioSelect").append("button").attr("id","stop-recording");
d3.select("#audioSelect").append("button").attr("id","pause-recording");
d3.select("#audioSelect").append("button").attr("id","resume-recording");
d3.select("#audioSelect").append("button").attr("id","upload-recording");

d3.select("#start-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
     "left":"10px"
}).on("click",function(){
    this.disabled = true;
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
})
d3.select("#stop-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    "left":"130px"
}).on("click",function(){

})
d3.select("#pause-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    "left":"250px"
}).on("click",function(){

})
d3.select("#resume-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
     "left":"370px"
}).on("click",function(){

})
d3.select("#upload-recording").style({
    'position':'absolute',
    "top" : "100px",
    "width" : "100px",
    "height": "70px",
    "border": "solid 1px black",
    'cursor': 'pointer',
    "left":"490px"
}).on("click",function(){

})

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
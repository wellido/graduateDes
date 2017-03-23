var mediaConstraints = {
    audio: true
    };
function onMediaSuccess(stream) {
    var reader = new FileReader();
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
       mediaRecorder.ondataavailable = function (blob) {
       var binaryData;
       reader.readAsBinaryString(blob);
       reader.onload = function (e) {
            binaryData=e.target.result;
            var postData=JSON.stringify({
                    'audioFile': Date.parse(new Date()),
                    'textFile': "11",
                    'audioBinary':binaryData
                });
            $.ajax({
                type: 'POST',
                data: postData,
                url: "/vrData/",
                cache : false,
                contentType : false,
                processData : false,
                success: function (data) {
                    console.log(data);
                }
            });
       }

//    var postForm = new FormData();
//    postForm.append("audioFile",Date.parse(new Date()));
//    postForm.append("textFile","11");
//    postForm.append("audioBinary",blob);
//    var oReq = new XMLHttpRequest();
//    oReq.open("POST", "/vrData/");
//    oReq.send(postForm);
    };
    mediaRecorder.start(5000);
}
function onMediaError(e) {
    console.error('media error', e);
}
var mediaRecorder;
window.onload = function() {
    mainDiv()
    audioRec();
    audioToText();
    findText();
}
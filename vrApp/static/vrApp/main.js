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
                    'audioFileRes':binaryData
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
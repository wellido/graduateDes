var mediaConstraints = {
    audio: true
    };
var reader = new FileReader();
function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
       mediaRecorder.ondataavailable = function (blob) {
       var binaryData;
       reader.readAsBinaryString(blob);
       reader.onload = function (e) {
            binaryData=e.target.result;
            $.ajax({
                type: 'POST',
                data: JSON.stringify({
                    'audioFile': Date.parse(new Date()),
                    'textFile': "11",
                    'audioFileRes':binaryData
                }),
                url: "/vrData/",
                cache: false,
                processData: false,
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                    if (data.nodes == null) {
                        alert("error");
                        return;
                    }
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
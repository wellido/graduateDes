var mediaConstraints = {
    audio: true
    };
//var dataArray = new ArrayBuffer();
function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    console.log(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    mediaRecorder.ondataavailable = function (blob) {
//    var reader=new FileReader();
//    reader.readAsArrayBuffer(blob);
//    reader.onloadend = function(e) {
//        console.log(e.target.result);
//    }
            $.ajax({
                type: 'POST',
                data: {
                    'audioFile': Date.parse(new Date()),
                    'textFile': "",
                    'audioFileRes':blob
                },
                url: "/vrData/",
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if (data.nodes == null) {
                        alert("error");
                        return;
                    }
                }
            });
    };
    mediaRecorder.start(10000);
}
function onMediaError(e) {
    console.error('media error', e);
}
var mediaRecorder;
 var blobData = new Blob([],{});
console.log(blobData);
window.onload = function() {
    mainDiv()
    audioRec();
    audioToText();
    findText();
}
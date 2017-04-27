var mediaConstraints = {
    audio: true
    };
var isKaldi=0;
function onMediaSuccess(stream) {
    var reader = new FileReader();
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
       mediaRecorder.ondataavailable = function (blob) {
       var binaryData;
       reader.readAsArrayBuffer(blob);
       reader.onload = function (e) {
            binaryData=e.target.result;
            var chars  = new Uint8Array(binaryData);
            var CHUNK_SIZE = 0x8000;
            var index = 0;
            var length = chars.length;
            var result = '';
            var slice;
            while (index < length) {
              slice = chars.subarray(index, Math.min(index + CHUNK_SIZE, length));
              result += String.fromCharCode.apply(null, slice);
              index += CHUNK_SIZE;
            }
            var postData=JSON.stringify({
                    'isKaldi': isKaldi,
                    'audioFile': Date.parse(new Date()),
                    'textFile': "11",
                    'audioBinary':result
                });
                $.ajax({
                    type: 'POST',
                    data: postData,
                    url: "/vrData/",
                    cache : false,
                    contentType : false,
                    processData : false,
                    success: function (data) {
                        var revData = data;
                        d3.select("#textDisply").html(revData);
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
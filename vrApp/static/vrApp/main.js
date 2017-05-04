var mediaConstraints = {
    audio: true
    };
var isKaldi=0;
var functionNum;
function onMediaSuccess(stream) {
    var reader = new FileReader();
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.audioChannels = 1;
    mediaRecorder.recorderType = StereoAudioRecorder;
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
                var postWav = new FormData();
                postWav.append('wav',blob);
                $.ajax({
                    type: 'POST',
                    data: postWav,
                    url: "/vrWav/",
                    cache : false,
                    contentType : false,
                    processData : false,
                    success: function (data) {
                        console.log(data);
                    }
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
                        dataLength=revData.length;
                        revData=revData.substr(1,dataLength-2);
                        console.log(revData);
                        if(functionNum == 0){
                        if(revData=="") {
                        $("#textDisplay").val("识别失败");
                        } else {
                        $("#textDisplay").val(revData);
                        }
                        } else {
                        var cursorStart=textInfo.indexOf(revData);
                        if(cursorStart>0) {
                        var cursorEnd=revData.length+cursorStart;
                        moveCursor(cursorStart,cursorEnd);
                        }else {
                        alert("没有找到对应文字");
                        }
                        }
                    }
                });
       }
    };
    mediaRecorder.start(30000);
}
function onMediaError(e) {
    console.error('media error', e);
}
var mediaRecorder;

window.onload = function() {
    mainDiv();
    audioRec();
    audioToText();
    findText();
    textDisplay();
    svgDraw();
    svgDraw2();
    svgDraw3();
    textBox();
}
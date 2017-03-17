var mediaConstraints = {
    audio: true
    };
function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    mediaRecorder.start(3000);
}
function onMediaError(e) {
    console.error('media error', e);
}
var mediaRecorder;
window.onload = function () {
    mainDiv()
    audioRec();
    audioToText();
    findText();
}
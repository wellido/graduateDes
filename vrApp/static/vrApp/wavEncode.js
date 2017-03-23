function encodeWAV(samples) {
var buffer = new ArrayBuffer(44 + samples.length * 2);
var view = new DataView(buffer);

writeString(view, 0, 'RIFF');
view.setUint32(4, 32 + samples.length * 2, true);
writeString(view, 8, 'WAVE');
writeString(view, 12, 'fmt ');
view.setUint32(16, 16, true);
view.setUint16(20, 1, true);
view.setUint16(22, 2, true);
view.setUint32(24, sampleRate, true);
view.setUint32(28, sampleRate * 4, true);
view.setUint16(32, 4, true);
view.setUint16(34, 16, true);
writeString(view, 36, 'data');
view.setUint32(40, samples.length * 2, true);

floatTo16BitPCM(view, 44, samples);

return view;
}
function exportWAV(type) {
var bufferL = mergeBuffers(recBuffersL, recLength);
var bufferR = mergeBuffers(recBuffersR, recLength);
var interleaved = interleave(bufferL, bufferR);
var dataview = encodeWAV(interleaved);
var audioBlob = new Blob([dataview], {
    type: type
});

this.postMessage(audioBlob);
}
//语音转文字点击事件
function audioToText() {
    d3.select("#funcDiv1").on("click",function() {
    functionNum = 0;
    console.log(functionNum);
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv2").style("background-color","");
    d3.select("#textUpload").style("z-index","-1");
    d3.select("#selectSvg").style("z-index","-1");
})
}
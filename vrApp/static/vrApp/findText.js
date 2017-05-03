//文字定位模块事件
var textPath;
function findText() {
    d3.select("#funcDiv2").on("click",function() {
    functionNum = 1;
    console.log(functionNum);
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv1").style("background-color","");
    d3.select("#textUpload").style("z-index","1");
    d3.select("#selectSvg").style("z-index","1");
    d3.select("#textUpload").on("click",function() {
    d3.select("#selectSvg2").style("z-index","1");
    d3.select("#textBox").style({
    "z-index":"1",
    "opacity":1.0
    });
})
})
}


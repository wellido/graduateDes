//文字定位模块事件
function findText() {
    d3.select("#funcDiv2").on("click",function() {
    functionNum = 1;
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv1").style("background-color","");
    d3.select("#funcDiv3").style("background-color","");
    d3.select("#textUpload").style("z-index","1");
    d3.select("#selectSvg").style("z-index","1");
    d3.select("#realWords").style("z-index","1");
    d3.select("#hidePath1").style({
    			 "z-index":"-1",
   				 "opacity":0.0
        });
    d3.select("#hidePath2").style({
    			 "z-index":"1",
   				 "opacity":1.0
        });
    d3.select("#textUpload").on("click",function() {
    d3.select("#selectSvg2").style("z-index","1");
    d3.select("#textBox").style({
    "z-index":"1",
    "opacity":1.0
    });
})
})
}


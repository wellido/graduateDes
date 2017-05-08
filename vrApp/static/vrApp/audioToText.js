//语音转文字点击事件
function audioToText() {
    d3.select("#funcDiv1").on("click",function() {
    functionNum = 0;
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv2").style("background-color","");
    d3.select("#funcDiv3").style("background-color","");
    d3.select("#textUpload").style("z-index","-1");
    d3.select("#selectSvg").style("z-index","-1");
    d3.select("#realWords").style("z-index","1");
    d3.select("#hidePath1").style({
    			 "z-index":"1",
   				 "opacity":1.0
        });
    d3.select("#hidePath2").style({
    			 "z-index":"-1",
   				 "opacity":0.0
        });
})
}

//识别率统计
function rateStatistics() {
    d3.select("#funcDiv3").on("click",function() {
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv1").style("background-color","");
    d3.select("#funcDiv2").style("background-color","");
    d3.select("#textUpload").style("z-index","-1");
    d3.select("#selectSvg").style("z-index","-1");
    d3.select("#realWords").style("z-index","-1");
    d3.select("#hidePath1").style({
    			 "z-index":"-1",
   				 "opacity":0.0
        });
    d3.select("#hidePath2").style({
    			 "z-index":"-1",
   				 "opacity":0.0
        });

               $.ajax({
                    type: 'POST',
                    url: "/vrSta/",
                    cache : false,
                    contentType : false,
                    processData : false,
                    success: function (data) {
                        $("#textDisplay").val("目前识别率大致为： " + data);
                    }
                });
})




}
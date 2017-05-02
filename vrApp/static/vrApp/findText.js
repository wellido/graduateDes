function findText() {
    d3.select("#funcDiv2").on("click",function() {
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv1").style("background-color","");
})
}
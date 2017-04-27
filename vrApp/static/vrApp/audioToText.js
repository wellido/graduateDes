function audioToText() {
    d3.select("#funcDiv1").on("click",function() {
    if(d3.select("#sendText"))
    {d3.select("#sendText").remove();}
    d3.select(this).style("background-color","#3469a4");
    d3.select("#funcDiv2").style("background-color","#");
    d3.select("#textDiv").append("div").attr("id","textDisply").style({
    'position':'absolute',
    "left" : "50px",
    "top" : "300px",
    "width" : "700px",
    "height": "350px",
    "border": "solid 1px black"
    }).html("").style({
     'color': 'white',
     'font-size': '20px',
    });
})
}
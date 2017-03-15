function findText() {
d3.select("#funcDiv2").on("click",function() {
    if(d3.select("#textDisply"))
    {d3.select("#textDisply").remove();}
    d3.select("#textDiv").append("div").attr("id","sendText").style({
    'position':'absolute',
    "left" : "50px",
    "top" : "300px",
    "width" : "700px",
    "height": "350px",
    "border": "solid 1px red"
    });
})
}
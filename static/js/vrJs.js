window.onload = function () {
    d3.select('body').style('background-color', 'black');
    d3.select('body').append('div')
        .attr('id', 'warpDiv')
        .style({
            'width': '1440px',
            'height': '960px',
            "opacity": 1.0,
            'z-index': '1'
});
    d3.select("#warpDiv").append("div").attr("id","textDiv")
    .style({
    "left" : "300px",
    "top" : "200px",
    "width" : "200px",
    "height": "400px",
    "background-color": "white"
    })
}

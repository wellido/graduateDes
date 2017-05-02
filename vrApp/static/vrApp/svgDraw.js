function svgDraw() {
var svg = d3.select("#warpDiv").append("svg").attr({
    "width": "150px",
    "height":"600px"
}).style({
    'position':'absolute',
    "left" : "400px",
    "top" : "100px"
})
var defs = svg.append("defs");
var arrowMarker = defs.append("marker")
						.attr("id","arrow")
						.attr("markerUnits","strokeWidth")
					    .attr("markerWidth","5")
                        .attr("markerHeight","5")
                        .attr("viewBox","0 0 12 12")
                        .attr("refX","6")
                        .attr("refY","6")
                        .attr("orient","auto");
var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

arrowMarker.append("path")
			.attr("d",arrow_path)
			.attr("fill","white");
var line = svg.append("line")
			 .attr("x1",10)
			 .attr("y1",100)
			 .attr("x2",130)
			 .attr("y2",100)
			 .attr("stroke","white")
			 .attr("stroke-width",10)
			 .attr("marker-end","url(#arrow)");

var curve_path = "M150,150 T100,300 T130,450";
var curve = svg.append("path")
			 .attr("d",curve_path)
			 .attr("fill","transparent")
			 .attr("stroke","white")
			 .attr("stroke-width",10)
			 .attr("marker-end","url(#arrow)");

}
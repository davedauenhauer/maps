//same as mapStart1 but not using "context"
// works ohio.json from https://github.com/glynnbird/usstatesgeojson

const margin = {top: 10, bottom: 10, left: 10, right:10};
const width = 975 - margin.right - margin.left;
const height = 610 - margin.top - margin.bottom;


let projection = d3.geoMercator();

let geoGenerator = d3.geoPath()
  .projection(projection);

d3.json("./ohio.json")
  .then(function(land) {

    projection.fitExtent([[20, 20], [620, 420]], land);

    // the top level svg translated to top and left margins                
    const svg = d3.select("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 640 440")
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // appending the output of a shape generator as a single path element
    svg.append("path")
        .attr("fill", "lightblue")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", geoGenerator(land));
        //.attr("d", path(topojson.feature(land, land.objects.ohio)));
})
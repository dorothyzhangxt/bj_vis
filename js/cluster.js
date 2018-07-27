function load_cluster_view(data){
  d3.select("#up_part")


  var margin = {top: 0, right: 0, bottom: 0, left: 0 }
  var father_width = document.getElementById("up_part").clientWidth
  var father_height = document.getElementById("up_part").clientHeight

  var height = father_height * 0.4
  var width = height
  var top = 0
  var left = father_width - width

  var this_div = d3.select("#up_part")
      .append("div")
      .attr("id","cluster_order")
      .style("position","absolute")
      .style("width", width + "px")
      .style("height", height + "px")
      .style("left", left + "px")


  var svg = this_div.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("id", "cluster_order_svg")
      .attr("transform", "translate("+ margin.left + ","  + margin.top + ")")
      .attr("w", width)
      .attr("h", height);

  svg.append("rect")
      .attr("width", width )
      .attr("height", height)
      .attr("fill", "black")
      .attr("opacity", 0.3)

  var xscale = d3.scaleLinear().range([0, width])
      .domain([d3.min(data, function(d) { return Number(d["0"]); }), d3.max(data, function(d) { return Number(d["0"]); })]);
  var yscale = d3.scaleLinear().range([0, height])
      .domain([d3.min(data, function(d) { return Number(d["1"]); }), d3.max(data, function(d) { return Number(d["1"]); })])


  svg.append("g")
      .attr("class","point")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "cluster_point")
      .attr("cx", function(d){
        return xscale(Number(d["0"]))
      })
      .attr("cy", function(d){
        return yscale(Number(d["1"]))
      })
      .attr("r", "1px")
      .attr("opacity", 0.5)
      .attr("fill", "rgb(152,140,224)")

  svg.call(d3.brush()
        .extent([[0,0],[width, height]])
        .on("brush", function(d){
          // console.log(d3.event)
          begin_pixel = d3.event.selection[0]
          end_pixel = d3.event.selection[1]
          d3.selectAll(".cluster_point")
            .each(function(d){
              x = parseFloat(d3.select(this).attr("cx"))
              y = parseFloat(d3.select(this).attr("cy"))
              if ( x > begin_pixel[0] && x < end_pixel[0] && y > begin_pixel[1] && y < end_pixel[1])
              {
                global_status[Number(d.id)].cluster = true
              }
              else {
                global_status[Number(d.id)].cluster = false
              }
            })
            update_cluster()
            update_geo()
        }))
        // .on("end",function(d){
        //   console.log(d3.event)
        //   begin_pixel = d3.event.selection[0]
        //   end_pixel = d3.event.selection[1]
        //   if (begin_pixel[0] === end_pixel[0] && begin_pixel[1] === end_pixel[1]){
        //     length = global_status.length
        //     for (var i = 0; i < length; i ++ )
        //     {
        //       global_status[i].cluster = true;
        //     }
        //   }
        //   update_cluster()
        //   update_geo()
        // }))


}
function update_cluster(){
  d3.selectAll(".cluster_point")
    .classed("not_show", function(d){
      this_status = global_status[Number(d.id)]
      if (this_status.geo_start && this_status.geo_end && this_status.time && this_status.cluster)
      {
        return false
      }
      else {
        return true
      }
    })
}

function load_map(){
  var map = new BMap.Map("map");    // 创建Map实例
  _map = map
  var mapStyle={  style : "dark" }
  map.setMapStyle({styleJson: map_style});
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
  // map.addControl(new BMap.NavigationControl());
  map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	// map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  map.addEventListener("click", function(e){
    alert(e.point.lng + ", " + e.point.lat);
  });
}

// function update_map(zoom){
//   _map.centerAndZoom(new BMap.Point(116.404, 39.915), zoom);
// }

function load_map_svg(data){
  var margin = {top: 0, right: 0, bottom: 10, left: 0 }
  var width = document.getElementById("map_svg").clientWidth - margin.left - margin.right
  var height = document.getElementById("map_svg").clientHeight - margin.top - margin.bottom

  var svg = d3.select("#map_svg").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("id", "map_svg_overlap")
      .attr("transform", "translate("+ margin.left + ","  + margin.top + ")")
      .attr("w", width)
      .attr("h", height);


  load_svg_overlay(data)

  svg.call(d3.brush()
        .extent([[0,0],[width, height]])
        .on("brush", brushed)
        .on("end", function(d){
          console.log("end")
        }))
    //
    svg.on("click",function(d){
      console.log("click!!!")
    })


  //
  // svg.append("rect")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("opacity", 0.5);
}
function brushed(d){
  console.log(d3.event)
  //
  begin_pixel = d3.event.selection[0]
  end_pixel = d3.event.selection[1]

  // console.log(begin_point)
  // console.log(end_point)
  d3.selectAll(".point_pair")
    .classed("not_show",function(d){
      x = parseFloat(d3.select(this).select(".dst_point").attr("cx"))
      y = parseFloat(d3.select(this).select(".dst_point").attr("cy"))

      if ( x > begin_pixel[0] && x < end_pixel[0] && y > begin_pixel[1] && y < end_pixel[1])
      {
        return false;
      }
      else {
        return true;
      }
    });

}
// function is_inside_selection(point, begin_point, end_point){
//   lng =
// }

  //
  // svg.on("click", function(){
  //       console.log("click")
  //       // _map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
  //     })
  // zoom = d3.zoom().scaleExtent([-Infinity, Infinity]).on('zoom', function() {
  //   return zoomable_layer.attrs({
  //     transform: d3.event.transform
  // //   });
  // });
  // svg.call(d3.zoom()
  //     .on("zoom", zoomFunction))
// }

function load_svg_overlay(data){
  var svg = d3.select("#map_svg_overlap")
  console.log(svg)
  // var points = new Array()
  // length = data.length
  // for (var i  = 0 ; i < length ; i ++ )
  // {
  //   points[i] = {"lng":parseFloat(data[i].dest_lng),"lat": parseFloat(data[i].dest_lat)}
  //   // points_begin[i] = {"lng": parseFloat(data[i].starting_lng),"lat": parseFloat(data[i].starting_lat), "count":1}
  // }
  // console.log("Shenme",points)
  var point_pair = svg.selectAll(".point_pair")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "point_pair")

  point_pair.append("circle")
  .attr("class","start_point")
  .attr("cx", function(d){
    var pixel = _map.pointToPixel({"lng": parseFloat(d.starting_lng), "lat": parseFloat(d.starting_lat)});
    // console.log(pixel)
    // d.start_x = pixel.x
    // d.start_y = pixel.y

    d3.select(this).attr("cy", pixel.y)
      .attr("pixel", pixel)
    return pixel.x
  })


  point_pair.append("circle")
  .attr("class", "dst_point")
  .attr("cx", function(d){

    var pixel = _map.pointToPixel({"lng": parseFloat(d.dest_lng), "lat": parseFloat(d.dest_lat)});
    // console.log(pixel)
    d3.select(this)
      .attr("cy", pixel.y)
      .attr("pixel", pixel)
    return pixel.x
  })

  var line = d3.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y });

  point_pair.each(function(d){
    var this_one = d3.select(this)
    start_point = this_one.select(".start_point")
    dst_point = this_one.select(".dst_point")
    var data = [{"x": parseFloat(start_point.attr("cx")), "y": parseFloat(start_point.attr("cy"))}, {"x": parseFloat(dst_point.attr("cx")), "y": parseFloat(dst_point.attr("cy"))}]

    this_one.append("path")
      .attr("d",line(data))


  })
  //
  // point_pair.append("path")          // attach a line
  //   .attr("d",function(d){
  //     var this_one = d3.select(this.parentNode)
  //     // console.log(this_one)
  //     start_point = this_one.select(".start_point")
  //     dst_point = this_one.select(".dst_point")
  //
  //     data = [{"x": parseFloat(start_point.attr("cx")), "y": parseFloat(start_point.attr("cy"))}, {"x": parseFloat(dst_point.attr("cx")), "y": parseFloat(dst_point.attr("cy"))}]
  //     console.log(data)
  //     return line(data)
  //   })


}

function zoomFunction(){
  console.log(d3.event.transform.k)
  zoom = d3.event.transform.k * _zoom

  _map.setZoom(zoom, zoom)

}



// function load_home() {
//   document.getElementById("visualization").innerHTML = '<object type="text/html" data="http://vis.pku.edu.cn/~can.liu/drill_analysis/index.html" width="100%" height="100%"></object>';
// }
// load_home()

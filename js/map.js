function load_map(){
  var map = new BMap.Map("map");    // 创建Map实例
  _map = map
  var mapStyle={  style : "dark" }
  map.setMapStyle(mapStyle);
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

// function update_map(zoom){
//   _map.centerAndZoom(new BMap.Point(116.404, 39.915), zoom);
// }

function load_map_svg(){
  var margin = {top: 0, right: 0, bottom: 10, left: 0 }
  var width = document.getElementById("map_svg").clientWidth - margin.left - margin.right
  var height = document.getElementById("map_svg").clientHeight - margin.top - margin.bottom

  var svg = d3.select("#map_svg").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate("+ margin.left + ","  + margin.top + ")")
      .attr("w", width)
      .attr("h", height);


  svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("opacity", 0.5);
}

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
  var svg = d3.select("#map_svg")
  var points = new Array()
  length = data.length
  for (var i  = 0 ; i < length ; i ++ )
  {
    points[i] = {"lng":parseFloat(data[i].dest_lng),"lat": parseFloat(data[i].dest_lat)}
    // points_begin[i] = {"lng": parseFloat(data[i].starting_lng),"lat": parseFloat(data[i].starting_lat), "count":1}
  }
  console.log("Shenme",points)
  svg.select("circle")
  .data(points)
  .enter()
  .append("circle")
  .attr("cx", function(d){
    pixel = _map.pointToPixel(d);
    // console.log(pixel)
    d3.select(this).attr("cy", pixel.y)

    return pixel.x

  })
  .attr("r", "1")
  .attr("fill", "white")

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

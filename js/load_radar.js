function calculate_time(x,y){

  var from_here = new Array()
  var to_here = new Array()

  for (var i = 0 ; i < 24 ; i ++ )
  {
    from_here.push({"axis": i, "value": 0})
    to_here.push({"axis": i, "value": 0})
  }
  console.log(from_here)
  var from  = new Array()
  var to = new Array()

  d3.selectAll(".point_pair")
    .each(function(d){
      hour = get_hour(d.departure_time)
      start_x = d3.select(this).select(".start_point").attr("cx")
      start_y = d3.select(this).select(".start_point").attr("cy")
      end_x = d3.select(this).select(".dst_point").attr("cx")
      end_y = d3.select(this).select(".dst_point").attr("cy")
      if ((start_x - x ) * (start_x - x ) + (start_y - y ) * (start_y - y) < 400 )
      {
        // console.log(from_here[i])
        from_here[hour].value ++;
      }
      if ((end_x - x ) * (end_x - x ) + (end_y - y ) * (end_y - y) < 400 )
      {
        to_here[hour].value ++;
      }
    })
    console.log(from_here)
    console.log(to_here)

    var from  = new Array()
    var to = new Array()
    from.axes = from_here
    from.name = "from"

    to.axes = to_here
    to.name = "to"
    data = [from, to]
    console.log("create:",data)
    return data

}
function get_hour(string){
    var date = new Date()

    ms = Date.parse(string)
    date.setTime(ms)
    return date.getHours()
}
function load_radar(x, y )
{

  data = [1,2,23,12,17,23,8,23,8,16,19,3,12]
  d3.select(".radar").remove()

  var radar_div = d3.select("body").append("div").attr("class", "radar")
            .style("position","absolute")
            .style("left", (x - 50) + "px")
            .style("top", (y - 50) + "px")

  // console.log(radar)

  // svg = radar.append("svg")
  //   .attr("width", 100)
  //   .attr("height", 100)
  var margin = { top: 5, right: 5, bottom: 5, left: 5 };

  var data = [
				{ name: 'Allocated budget',
					axes: [
						{axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20},
            {axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20},
            {axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 23},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20},
            {axis: 'Sales', value: 67},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20}
					]
				},
				{ name: 'Actual Spending',
					axes: [
						{axis: 'Sales', value: 50},
						{axis: 'Marketing', value: 45},
						{axis: 'Development', value: 20},
						{axis: 'Customer Support', value: 20},
						{axis: 'Information Technology', value: 25},
						{axis: 'Administration', value: 23},
            {axis: 'Sales', value: 50},
            {axis: 'Marketing', value: 45},
            {axis: 'Development', value: 20},
            {axis: 'Customer Support', value: 20},
            {axis: 'Information Technology', value: 25},
            {axis: 'Administration', value: 23},
            {axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20},
            {axis: 'Sales', value: 42},
						{axis: 'Marketing', value: 20},
						{axis: 'Development', value: 60},
						{axis: 'Customer Support', value: 26},
						{axis: 'Information Technology', value: 35},
						{axis: 'Administration', value: 20}
					]
				}
			];
    data = calculate_time(x,y)
    var radarChartOptions = {
  			  w: 100,
  			  h: 100,
  			  margin: margin,
  			  levels: 5,
  			  roundStrokes: true,
  				color: d3.scaleOrdinal().range(["#26AF32", "#762712"]),
  				format: '.0f'
  			};
  let svg_radar1 = RadarChart(radar_div, data, radarChartOptions);



}
function get_time(string){
  return Date.parse(string)
}

function load_with_100(){
  load_radar(100,100)
}
function load_radar_chart(){

}

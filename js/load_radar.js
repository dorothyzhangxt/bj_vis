function calculate_svg(x,y){
  d3.selectAll(".point_pair")
    // .

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

var _data
function load_time_line(count_time){
  // var svg = d3.select("#time_line"),
  var margin_total = {top: 0, right: 0, bottom: 0, left: 0 }
  // console.log(document.getElementById("time_line"))
  var width_total = document.getElementById("time_line").clientWidth - margin_total.left - margin_total.right
  var height_total = document.getElementById("time_line").clientHeight - margin_total.top - margin_total.bottom

  var svg = d3.select("#time_line").append("svg")
      .attr("width", width_total + margin_total.left + margin_total.right)
      .attr("height", height_total + margin_total.top + margin_total.bottom)
      .attr("w", width_total)
      .attr("h", height_total)
      .append("g")
      .attr("transform", "translate(" + margin_total.left + "," + margin_total.top + ")");

  svg.append("rect")
      .attr("width", width_total )
      .attr("height", height_total)
      .attr("fill", "black")
      .attr("opacity", 0.5)
  svg.append("rect")
      .attr("width", width_total)
      .attr("height", 0.4 * height_total)
      .attr("y", 0.6 * height_total)
      .attr("fill", "black")
  //
  // svg.append("rect")
  //     .attr("fill", "#021019")
  //     .attr("width", width_total)
  //     .attr("height", height_total* 0.55)
  //     .attr("y", height_total * 0.45)

  var width = width_total
  var height = height_total * 0.65
  var height2 = height_total * 0.2
  var margin = {top: 0, right: 0, bottom: height_total * 0.65, left: 0 }
  var margin2 = {top: height_total * 0.8, right: 0, bottom: height_total * 0.4, left: 0 }


  var parseDate = d3.timeParse("%b %Y");

  var myparseDate = d3.timeParse("%Y-%M-%D %H:%M:%S")//2018-07-16 20:33:57

  var x = d3.scaleTime().range([0, width]),
      x2 = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x),
      xAxis2 = d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

  var brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on("brush end", brushed);

  var zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", zoomed);

  var area = d3.area()
      .curve(d3.curveMonotoneX)
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.count); });

  var area2 = d3.area()
      .curve(d3.curveMonotoneX)
      .x(function(d) { return x2(d.date); })
      .y0(height2)
      .y1(function(d) { return y2(d.count) });

  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  data = count_time
  _data = data

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);


  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  }

  function type(d) {
    d.date = Date.parse(d.arrive_time)
    return d;
  }
}
function read_data(data){
  var count_time = new Array()
  var count_time_array = new Array()
  data.forEach(function(d){
      ms = Date.parse(d.departure_time)
      date = ms - ms % (60 * 60 * 1000)
      if (!count_time.hasOwnProperty(date)){
        count_time[date] = 1 ;
      }
      else{
        count_time[date] = count_time[date] + 1 ;
      }
  })
  for (var time in count_time){
    item = {"date": time, "count":count_time[time]}
    count_time_array.push(item)
  }


  console.log(count_time_array)
  length = count_time_array.length
  for (var i = 0 ; i < length; i ++ )
  {
    for (var j = length -1 ; j > i ; j -- )
    {
      if (count_time_array[i].date > count_time_array[j].date){
        date = count_time_array[i].date
        count = count_time_array[i].count
        count_time_array[i].date = count_time_array[j].date
        count_time_array[i].count = count_time_array[j].count
        count_time_array[j].date = date
        count_time_array[j].count = count
      }
    }
  }
  console.log(count_time_array)
  return count_time_array


}

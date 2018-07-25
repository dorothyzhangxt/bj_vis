

function load_heat_map(data){
    var map = _map       // 创建地图实例
    console.log(data)
    var length = data.length
    var points = new Array()
    var points_begin = new Array()

    for (var i  = 0 ; i < length ; i ++ )
    {
      points[i] = {"lng":parseFloat(data[i].dest_lng),"lat": parseFloat(data[i].dest_lat), "count":1}
      points_begin[i] = {"lng": parseFloat(data[i].starting_lng),"lat": parseFloat(data[i].starting_lat), "count":1}
    }
    console.log(points)

  console.log(points)

	//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
	//参数说明如下:
	/* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
			.2:'rgb(0, 255, 255)',
			.5:'rgb(0, 110, 255)',
			.8:'rgb(100, 0, 255)'
		}
		其中 key 表示插值的位置, 0~1.
		    value 为颜色值.
     */
  var gradient = {
      0:'rgb(0, 50, 0)',
    .5:'rgb(0, 150, 0)',
      1:'rgb(0, 255, 0)'};
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":4,"gradient":gradient});
  var gradient = {
    0: 'rgb(50, 0, 0)',
    0.5: 'rgb(255, 0, 0)',
    1: 'rgb(0, 255, 0)'
  }

  heatmapOverlay2 = new BMapLib.HeatmapOverlay({"radius":4,"gradient":gradient});
  map.addOverlay(heatmapOverlay2);
  heatmapOverlay2.setDataSet({data:points_begin,max:2});
  heatmapOverlay2.show()
  // setGradient()
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({data:points,max:2});
  heatmapOverlay.show()
  openHeatmap()
	//是否显示热力图
    function openHeatmap(){
        heatmapOverlay.show();
    }
	function closeHeatmap(){
        heatmapOverlay.hide();
    }
	// closeHeatmap();
	//判断浏览区是否支持canvas

}

var _map;
var _zoom = 14;
var global_status = new Array();
var current_select = "geo_start"
var _data = new Array();


function init_global_status(data){
  var length = data.length
  for (var i = 0 ; i < length; i ++ )
  {
    global_status.push({"geo_start": true, "geo_end": true, "cluster": true, "time": true})
  }
  console.log("hahah",global_status)
}

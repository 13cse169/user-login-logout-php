/*-------------------------------
depends on global var
-time_stamp
-mvt_dst


MVTimer class

constructor(obj)
obj{
name: name of the timer object(optional, defaults to MVTimer[count])
end_time: time where trigger happens,USE UNIX TIMESTAMP(optional, defaults to 'now')
to_run: obj_to_run
}

obj_to_run{
type: type of to run ["custom"|"default"]
fn: function to run, for custom type, time diff parameter is passed in
clear_fn: clear function, runs everytime, before sett
}

---------------------------------*/

function MVTimer(obj){
	this.id = MVTimer.count;
	this.name = obj.name ? obj.name : "MVTimer "+(MVTimer.count+1);
  this.end_time = null;
  this.countdown_type = obj.countdown_type;

	if(typeof obj.end_time == 'string'){// should only happen when static
	  var query_data = {};

	  var temp_time;
	  var retrive_server_time = true;

	  if(temp_time = obj.end_time.match(/every (.+?) for (.+)/)){
	    query_data['every'] = temp_time[1];
	    query_data['for'] = temp_time[2];
	  }
	  else if(temp_time = obj.end_time.match(/after (.+) cookie (.+)/)){//matching order is required
	    if(getCookie(temp_time[2])){
        this.end_time = new Date(parseInt(getCookie(temp_time[2])*1000));
	      retrive_server_time = false;
	    }
	    else{
	      query_data['cookie_time'] = true;
	      query_data['cookie_time_id'] = temp_time[2];
        query_data['after'] = temp_time[1];
	    }
	  }
	  else if(temp_time = obj.end_time.match(/after (.+)/)){
	    query_data['after'] = temp_time[1];
	  }
	  else if(temp_time = obj.end_time.match(/^ped$/)){
	    if(getURLParameter('ped')){
	      query_data['ped'] = getURLParameter('ped');
  	    query_data['pet'] = getURLParameter('pet');
	    }
	    else{
	      this.end_time = new Date();
	      retrive_server_time = false;
	    }
	  }

	  var that = this;
	  if(retrive_server_time){
	    jQuery.ajax(MVTimer.time_parse_url, {
  	    data : query_data,
  	    success:function(data){
  	      that.end_time = new Date(data.end_time*1000);
  	      if(MVTimer.got_time){
            that.countdown();
            that.timeout();
          }
  	    }
  	  });
	  }
	}else{// No static end_time is integer
	  this.end_time = obj.end_time ? new Date(obj.end_time*1000) : (new Date());
	}
	this.time_left = 0;
	this.to_run = obj.to_run ? obj.to_run : {type:"default",
											fn:(function(){console.log("no function given")}),
											clear_fn:(function(){console.log("no clear function given")})};

  if(MVTimer.got_time && this.end_time != null){
    this.countdown();
    this.timeout();
  }

	MVTimer.list.push(this);
	MVTimer.count += 1;
}

MVTimer.list = new Array();
MVTimer.count = 0;
MVTimer.got_time = false;
MVTimer.interval_holder = 0;
MVTimer.run = function(){
	if(MVTimer.interval_holder==0){
		MVTimer.interval_holder = setInterval(function(){
			MVTimer.cur_time.setTime(MVTimer.cur_time.getTime()+1000);
		},1000);

	}
}
MVTimer.setTime = function(new_time){
	MVTimer.cur_time = new_time;
	for(var i = 0; i<MVTimer.list.length; i++){
		MVTimer.list[i].countdown();
		MVTimer.list[i].timeout();
	}
}
MVTimer.showList = function(){
	var output = "<tr><td>MVT name</td><td>Time left(seconds)</td></tr>";

	for(var i = 0; i<MVTimer.list.length; i++){
		var mvt_name = MVTimer.list[i].name;
		var mvt_time_left = Math.ceil(MVTimer.list[i].time_left);
		output += '<tr class="r'+i%2+'"><td>'+mvt_name+'</td><td>'+mvt_time_left+'</td></tr>';
	}

	$("#mvtimer-list")[0].innerHTML = output;
}

/*returns time zone offset in seconds
offset.hour - the hour offset
offset.secs - offset in seconds
*/
MVTimer.getTimeOffset = function(){
	var tz_obj = $("#mvt_timezone")[0];
	var time_zone = tz_obj.children[tz_obj.selectedIndex].value;
//	var daylight = $("#mvt_daylight")[0].checked;
	var offset = {};
	switch(time_zone){
		case "PST":
			offset.hour = MVTimer.mvt_dst ? -7 : -8;
			offset.secs = (offset.hour*60*60);
			break;
		case "UTC":
			offset.hour = 0;
			offset.secs = 0;
			break;
		default:
			if(time_zone.search("GMT")>=0){
				var gmt_offset = parseInt(time_zone.replace("GMT",""));
				offset.hour = gmt_offset;
				offset.secs = (offset.hour*60*60);
			}
	}
	return offset;
}
MVTimer.showCurrentTime = function(){
	var temp_date = new Date(MVTimer.cur_time);
	temp_date.setTime(temp_date.getTime()+(MVTimer.getTimeOffset().secs*1000));
	var GMT = MVTimer.getTimeOffset().hour >= 0 ? "+"+MVTimer.getTimeOffset().hour : MVTimer.getTimeOffset().hour;
	var temp_hours = temp_date.getUTCHours() == 0 ? '12' : temp_date.getUTCHours();
	temp_hours = temp_hours > 12 ? temp_hours-12 : temp_hours;
	temp_hours = temp_hours < 10 ? '0'+temp_hours : temp_hours;
	var temp_minutes = temp_date.getUTCMinutes() < 10 ? '0'+temp_date.getUTCMinutes() : temp_date.getUTCMinutes();
	var temp_seconds = temp_date.getUTCSeconds() < 10 ? '0'+temp_date.getUTCSeconds() : temp_date.getUTCSeconds();
	var temp_am = temp_date.getUTCHours() >= 12 ? 'PM' : 'AM'
	var temp_date_str = temp_date.getUTCFullYear()+'/'+(temp_date.getUTCMonth()+1)+'/'+temp_date.getUTCDate()+' | '+temp_hours+' : '+temp_minutes+' : '+temp_seconds+temp_am
	var temp_day = temp_date.toUTCString().slice(0,3)
	$('#mvtimer-current-time').text(temp_day+', '+temp_date_str+' GMT'+GMT);
}
MVTimer.debug = function(){

	setInterval(MVTimer.showCurrentTime,1000)
	var temp_date = new Date(MVTimer.cur_time);
	temp_date.setTime(temp_date.getTime()+(MVTimer.getTimeOffset().secs*1000));

	MVTimer.mvt_dst ? $("#mvt_daylight")[0].checked = true : "";
	$("#mvt_date")[0].value = (temp_date.getUTCMonth()+1)+'/'+temp_date.getUTCDate()+'/'+temp_date.getUTCFullYear();
	$("#mvt_date").datepicker('setDate', (temp_date.getUTCMonth()+1)+'/'+temp_date.getUTCDate()+'/'+temp_date.getUTCFullYear());
	var temp_hours = temp_date.getUTCHours() == 0 ? '12' : temp_date.getUTCHours();
	temp_hours > 12 ? amPm('pm') : amPm('am');
	temp_hours = temp_hours > 12 ? temp_hours-12 : temp_hours;
	$("#mvt_hour")[0].value = temp_hours;
	$("#mvt_minute")[0].value = temp_date.getUTCMinutes();
	$("#mvt_second")[0].value = temp_date.getUTCSeconds();

	selectTimezoneAuto();
	setInterval("MVTimer.showList()",1000);
}
//Initial Time Set Here
//MVTimer.cur_time = new Date((time_stamp*1000));

MVTimer.prototype.countdown = function(){
  var that = this;
	if(!this.end_time) return;
	this.interval_holder ? clearInterval(this.interval_holder) : "";
	this.time_left = this.end_time.getTime() - MVTimer.cur_time.getTime();
	this.time_left = this.time_left / 1000;
	this.interval_holder = setInterval(function(){reduce1sec(that)},1000);
}

MVTimer.prototype.timeout = function(){
//get time diff in millisecs
	if(!this.end_time) return;
	this.time_diff = this.end_time.getTime() - MVTimer.cur_time.getTime();
	var that = this;

  try{
    this.to_run.clear_fn();
  }
  catch(e){

  }
//clear and sets timeout
	if(this.to_run.type == "custom"){
		this.to_run.fn(this.time_diff);
	}
	else{
  	// fix Timeout milisecond integer limit
  	if(this.time_diff >= Math.pow(2,31)){
  	  this.time_diff = Math.pow(2,31) - 1;
  	}
		else if(this.time_diff <= -Math.pow(2,31)){
			this.time_diff = -Math.pow(2,31) + 1;
		}
		this.timeout_holder ? clearInterval(this.timeout_holder) : "";

		if(this.countdown_type != 'exact' || this.time_diff > 0){
			this.timeout_holder = setTimeout(that.to_run.fn,this.time_diff);
		}
	}
}

//-----------etc function----------------
function reduce1sec(obj){
	obj.time_left -= 1;
	if(obj.time_left<0){
		clearInterval(obj.interval_holder);
	}
}

function setMvtTime(){
	var temp_mvt_date = $("#mvt_date").datepicker('getDate');
	var mvt_year = temp_mvt_date.getFullYear();
	var mvt_month = temp_mvt_date.getMonth()+1;
	var mvt_day = temp_mvt_date.getDate();
	var mvt_hour = $("#mvt_hour")[0].value;
	var mvt_minute = $("#mvt_minute")[0].value;
	var mvt_second = $("#mvt_second")[0].value;

	if(mvt_year && mvt_month && mvt_day && mvt_hour && mvt_minute && mvt_second){
		if(verifyTime()){
			var temp_date = new Date();
			temp_date.setUTCFullYear(mvt_year);
			temp_date.setUTCMonth(mvt_month-1);
			temp_date.setUTCDate(mvt_day);
//converting 12 hours format back to 24 hours format counting 0-23
			var temp_hours = parseInt(mvt_hour);
			temp_hours = temp_hours + ((temp_hours !=12 && amPm() == 'pm') ? 12 : 0);
			temp_hours = (temp_hours ==12 && amPm() == 'am') ? 0 : temp_hours;
//end convert
			temp_date.setUTCHours(temp_hours);
			temp_date.setUTCMinutes(mvt_minute);
			temp_date.setUTCSeconds(mvt_second);

			temp_date.setTime(temp_date.getTime()-(MVTimer.getTimeOffset().secs*1000));
			MVTimer.setTime(temp_date);

			$('#edit-msg').text("Time Changed.");
		}
		else{
			$('#edit-msg').text("Wrong Time Format.");
		}
	}
	else{
		$('#edit-msg').text("Fill In All.");
	}
}

function mvtToggle(){
	$("#mvtimer-content").toggle();
}

function amPm(val){
	if(val){
		val == 'am' ? $("#mvt_ampm")[0].selectedIndex = 0 : $("#mvt_ampm")[0].selectedIndex = 1;
	}
	else{
		return $("#mvt_ampm")[0].children[$("#mvt_ampm")[0].selectedIndex].value
	}
}

function verifyTime(){
	var mvt_hour = parseInt($("#mvt_hour")[0].value);
	var mvt_minute = parseInt($("#mvt_minute")[0].value);
	var mvt_second = parseInt($("#mvt_second")[0].value);

	return ((mvt_hour<=12 && mvt_hour>=1) && (mvt_minute<=59 && mvt_minute>=0) && (mvt_second<=59 && mvt_second>=0)) ? true : false;
}

function mvtParseTime(time_var){
  if(!time_var.toGMTString){
    return strtotime(time_var, MVTimer.cur_time);
  }
}

function selectTimezoneAuto(){
	var GMT = MVTimer.mvt_server_offset >= 0 ? "+"+MVTimer.mvt_server_offset : MVTimer.mvt_server_offset;
	GMT = 'GMT'+GMT;
	var tz_obj = $("#mvt_timezone")[0];

	for(var i = 0; i<tz_obj.children.length; i++){
		if(tz_obj.children[i].value == GMT){
			tz_obj.selectedIndex = i;
			break;
		}
	}
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
//------------end etc functions----------
MVTimer.run();

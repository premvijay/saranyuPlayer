(function(saranyuPlayer) {

	var utils = saranyuPlayer.utils;	
	var SRC = "http://localhost:8888/saranyuFlashPlayer/saranyuPlayer.swf";
	var WMODE = "window";
	var BGCOLOR = "#000000";
	var embed = saranyuPlayer.embed = function(){};

	function appendAttribute(object, name, value) {
		var param = document.createElement('param');
		param.setAttribute('name', name);
		param.setAttribute('value', value);
		object.appendChild(param);
	};

	embed.embedFlash = function(_container, WIDTH, HEIGHT, PLAYLIST) {
		if (utils.isIE()) {
			alert("IE Browser");
		    var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
		        '" width="'+WIDTH+'" height="'+HEIGHT+'"' +
		        'id="' +
		        _container.id +
		        '" name="' +
		        _container.id +
		        '" tabindex=0"' +
		        '">';
		    html += '<param name="movie" value="' + SRC + '">';
		    html += '<param name="allowfullscreen" value="true">';
		    html += '<param name="allowscriptaccess" value="always">';
		    html += '<param name="seamlesstabbing" value="true">';
		    html += '<param name="wmode" value="' + WMODE + '">';
		    html += '<param name="bgcolor" value="' + BGCOLOR + '">';
		    html += '</object>';

		    _container.outerHTML = html;
		} 
		else {
			alert("Other PC Browser");
		    var obj = document.createElement('object');
		    obj.setAttribute('type', 'application/x-shockwave-flash');
		    obj.setAttribute('data', SRC);
		    obj.setAttribute('width', WIDTH);
		    obj.setAttribute('height', HEIGHT);
		    obj.setAttribute('bgcolor', BGCOLOR);
		    obj.setAttribute('id', _container.id);
		    obj.setAttribute('name', _container.id);
		    obj.setAttribute('tabindex', 0);
		    appendAttribute(obj, 'allowfullscreen', 'true');
		    appendAttribute(obj, 'allowscriptaccess', 'always');
		    appendAttribute(obj, 'seamlesstabbing', 'true');
		    appendAttribute(obj, 'wmode', WMODE);

		    _container.parentNode.replaceChild(obj, _container);
		}
		return container;
	};

	embed.embedHTML5 = function(_container, WIDTH, HEIGHT, PLAYLIST) {
		var len = PLAYLIST["items"].length;
		if(utils.isAndroid()){
			alert("Android");
		}
		else if(utils.isIOS()){
			alert("IOS");
		}
		var html = '<video id="'+_container.id+'" name="'+_container.id+'" width="'+WIDTH+'" height="'+HEIGHT+'" poster="'+PLAYLIST["items"][0]["imageUrl"]+'" style="background-color: black;">';
		html += '<source src="'+PLAYLIST["items"][0]["videoUrl"]+'">';
		html += '</video>';
		_container.outerHTML = html;
		var video = document.getElementById(""+_container.id);
		video.onclick = function(){
			video.play();
		};

		return _container;
	};

	embed.embedControls = function(_container) {
		var video = document.getElementById(""+_container.id);
		var controlBar = document.createElement("div");
		controlBar.id = "controlBar";
		controlBar.name = "controlBar";
		controlBar.style.display = "inline";

														// Adding Progress Bar
		var progress = document.createElement("div");
		progress.id = "progress";
		progress.name = "progress";
		progress.className = "progress progress-striped";
		var progressBar = document.createElement("div");
		progressBar.id = "progressBar";
		progressBar.name = "progressBar";
		progressBar.className = "progress-bar";
		progress.style.width = _container.width;
		progress.style.height = 10;
		progress.appendChild(progressBar);

														// Adding Play Icon		
		var playBtn = document.createElement("button");
		playBtn.id = "playBtn";
		playBtn.name = "playBtn";
		playBtn.className = "btn btn-default btn-lg";
		var span = document.createElement("span");
		span.className = "glyphicon glyphicon-play";
		playBtn.appendChild(span);
		playBtn.onclick = function(){
			if(video.paused){
				video.play();
				span.className = "glyphicon glyphicon-pause";
			}
			else{
				video.pause();
				span.className = "glyphicon glyphicon-play";
			}
		}

		controlBar.appendChild(progress);
		controlBar.appendChild(playBtn);
		return controlBar;
	};

})(window.saranyuPlayer);
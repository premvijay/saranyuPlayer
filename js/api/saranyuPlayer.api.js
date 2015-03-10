
(function(saranyuPlayer, undefined) {

	var utils = saranyuPlayer.utils;
	var WIDTH = 640;
	var HEIGHT = 390;
	var PLAYLIST = {};

	var api = saranyuPlayer.api = function(container){};

	function config(setup){
		WIDTH = setup.width;
		HEIGHT = setup.height;
		PLAYLIST = setup.playlist;
	}

	api.selectPlayer = function(identifier, setup) {
		config(setup);
		var _container;
		var _video_container;
	    if(typeof identifier == 'string'){
		    _container = document.getElementById(identifier);
		    _video_container = document.createElement("div");
		    _video_container.id = "videoPlayer";
		    _video_container.name = "videoPlayer";
		    _video_container.width = WIDTH;
		    _video_container.height = HEIGHT;
		    _container.appendChild(_video_container);
	    }
	    
	    if(_container){
	    	utils.log("The DOM element exists");
	    	if(utils.flashVersion()){
	    		utils.log("Loading Flash Player");
	    		if(saranyuPlayer.embed){
	    			_container.appendChild(saranyuPlayer.embed.embedFlash(_video_container, WIDTH, HEIGHT, PLAYLIST));
	    		}
	    	}
	    	else{	    		
	    		utils.log("Loading HTML5 Player");
				_container.appendChild(saranyuPlayer.embed.embedHTML5(_video_container, WIDTH, HEIGHT, PLAYLIST));
	    	}
	    	_container.appendChild(saranyuPlayer.embed.embedControls(_video_container));
	    }
	    else{
	    	utils.log("The DOM element does not exists");
	    	alert("There is no such DOM element with id as "+identifier);
	    }
	    return null;
	};

})(window.saranyuPlayer);

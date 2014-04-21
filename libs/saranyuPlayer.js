
saranyuPlayer = function(container) {
	if (saranyuPlayer.api) {
		return saranyuPlayer.api.selectPlayer(container);
    }
};

(function(saranyuPlayer) {

	var utils = saranyuPlayer.utils = function(){};
	
	/** Logger * */
	var console = window.console = window.console || {log: function(){}};
	utils.log = function() {
		var args = Array.prototype.slice.call(arguments, 0);
		if (typeof console.log === OBJECT) {
    	    console.log(args);
		} 
		else {
			console.log.apply(console, args);
   		}
	};

})(window.saranyuPlayer);

(function(saranyuPlayer) {

	var utils = saranyuPlayer.utils;
	if(utils){
       	alert("Praise The Lord");
    }

	var api = saranyuPlayer.api = function(container){
		var _this = this;
		_this.container = container;
		return _this;
	};

	api.selectPlayer = function(identifier) {
	    var _container;
	    if(typeof identifier == 'string'){
		    _container = document.getElementById(identifier);
	    }
	    
	    if(_container){
	    	utils.log("The DOM element exists");
	    }
	    else{
	    	utils.log("The DOM element does not exists");
	    }
	    return null;
	};
})(window.saranyuPlayer);
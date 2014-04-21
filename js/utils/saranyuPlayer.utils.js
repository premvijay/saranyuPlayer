
(function(saranyuPlayer) {

	var OBJECT = "object", TRUE = true, UNDEFINED="undefined";

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

	var _userAgentMatch = utils.userAgentMatch = function(regex) {
	    var agent = navigator.userAgent.toLowerCase();
	    return (agent.match(regex) !== null);
	};
	       
	function _browserCheck(regex) {
		return function() {
	    	return _userAgentMatch(regex);
	    };
	}

	utils.isIE = utils.isMSIE = _browserCheck(/msie/i);
	utils.isFF = _browserCheck(/firefox/i);
	utils.isChrome = _browserCheck(/chrome/i);
	utils.isIPod = _browserCheck(/iP(hone|od)/i);
	utils.isIPad = _browserCheck(/iPad/i);
	utils.isSafari602 = _browserCheck(/Macintosh.*Mac OS X 8.*6\.0\.\d* Safari/i);

	/*utils.isIETrident = function (version) {
    	if (version) {
        	version = parseFloat(version).toFixed(
            return _userAgentMatch(new RegExp('msie\\s*' + version + '|trident/.+rv:\\s*' + version, 'i'));
        }
        return _userAgentMatch(/msie|trident/i);
    };*/

    utils.isSafari = function () {
        return (_userAgentMatch(/safari/i) && !_userAgentMatch(/chrome/i) && !_userAgentMatch(/chromium/i) && !_userAgentMatch(/android/i));
    };

    /** Matches iOS devices **/
    utils.isIOS = function (version) {
        if (version) {
            return _userAgentMatch(new RegExp("iP(hone|ad|od).+\\sOS\\s" + version, "i"));
        }
        return _userAgentMatch(/iP(hone|ad|od)/i);
    };

    /** Matches Android devices **/
    utils.isAndroid = function (version, excludeChrome) {
        //Android Browser appears to include a user-agent string for Chrome/
        var androidBrowser = excludeChrome ? !_userAgentMatch(/chrome\/[23456789]/i) : TRUE;
        if (version) {
            return androidBrowser && _userAgentMatch(new RegExp("android.*" + version, "i"));
        }
        return androidBrowser && _userAgentMatch(/android/i);
    };

    /** Matches iOS and Android devices **/
    utils.isMobile = function() {
        return utils.isIOS() || utils.isAndroid();
    };

    /**
     * If the browser has flaspabilities, return the flash version
     */
    utils.flashVersion = function() {
        if (utils.isMobile()) return 0;               
        var plugins = navigator.plugins, flash;
        try {
            if (plugins !== UNDEFINED) {
                    flash = plugins['Shockwave Flash'];
                    if (flash) {
                            return parseInt(flash.description.replace(/\D+(\d+)\..*/, "$1"), 10);
                    }
            }            
        }
        catch(e) {
            // The above evaluation (plugins != undefined) messes up IE7
        }
                
        if (typeof window.ActiveXObject != UNDEFINED) {
            try {
                flash = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (flash) {
                    return parseInt(flash.GetVariable("$version").split(" ")[1].split(",")[0], 10);
                }
            } 
            catch (err) {}
        }
        return 0;
    };


})(window.saranyuPlayer);

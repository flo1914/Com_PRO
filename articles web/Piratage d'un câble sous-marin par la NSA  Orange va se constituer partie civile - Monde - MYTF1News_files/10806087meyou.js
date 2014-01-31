function SocialManager() {
	var self = this;

	/** Options facebook **/
	this.fbCallback = [];
	this.fbInitialized = false;
	this.fbLoaded = false;
	this.fbFinished = false;
	this.fbAppId = 105856129451532;
	this.fbNeeded = false;
	
	/** Options Twitter **/
	this.twCallback = [];
	this.twNeeded = false;
	this.twInitialized = false;
	this.twLoaded = false;
	this.twFinished = false;
	
	/** Option Google +**/
	this.gpCallback = [];
	this.gpNeeded = false;
	this.gpInitialized = false;
	this.gpLoaded = false;
	this.gpFinished = false;
	
	/** Lancement de la lib **/
	this.init = function() {
		if (self.fbNeeded) {
			self.fbInit();
		}
		if (self.twNeeded) {
			self.twInit();
		}
		if (self.gpNeeded) {
			self.gpInit();
		}
	};
	
	this.insertJs = function(url, id, callbackAfterLoaded) {
		if (gId(id)) {return;}
		var callbackAfterLoaded = callbackAfterLoaded || false;
		
		var js = document.createElement('script'); js.id = id; js.async = true;
		js.src = url;
		if (callbackAfterLoaded) {
			js.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					callbackAfterLoaded();
				}
			}
			addEvtListener(js, 'load', callbackAfterLoaded);
		}
		var x = document.getElementsByTagName('script')[0];
		x.parentNode.insertBefore(js, x);

		return js;
	};
	
	/** Facebook **/
	this.fbInit = function() {
		if (self.fbInitialized) {
			return;
		}
		self.fbInitialized = true;

		jQuery('body').prepend('<div id="fb-root"></div>', jQuery('body').firstChild);

		window.fbAsyncInit = function() {
			self.fbLoaded = true;
			FB.init({
				appId      : self.fbAppId,
				status     : true, 
				cookie     : true, 
				xfbml      : true,
				oauth      : true				
			});
			
			for (var i=0; i<self.fbCallback.length; i++) {
				self.fbCallback[i]();
			}
			this.fbFinished = true;
		};
		
		self.insertJs('//connect.facebook.net/fr_FR/all.js', 'facebook-jssdk');
	};
	
	
	this.fbSetAppId = function(appId) {
		self.fbAppId = appId;
	};
	
	this.fbTrackCallback = function() {
		FB.Event.subscribe('edge.create', function(targetUrl) {
			_gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
		});

		FB.Event.subscribe('edge.remove', function(targetUrl) {
			_gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
		});

		FB.Event.subscribe('message.send', function(targetUrl) {
			_gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
		});
	};
	
	this.useFBObject = function(callback) {
		if (self.fbLoaded) {
			callback();
		} else {
			self.fbCallback.push(callback);
		}
	}
	
	/** Twitter **/
	this.twInit = function() {
		if (self.twInitialized) {
			return;
		}
		self.twInitialized = true;
		
		window.twttr = (function () {
			self.insertJs(document.location.protocol+'//platform.twitter.com/widgets.js', 'twitter-wjs');
			return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
		}());
		self.twLoaded = true;
		
		for (var i=0; i<self.twCallback.length; i++) {
			self.twCallback[i]();
		}
		self.twFinished = true;
	};
	
	this.twTrackCallback = function() {
		twttr.ready(function (twttr) {
			twttr.events.bind('tweet', self.twTrack);
		});
	};
	
	this.twTrack = function(intent_event) {
		if (intent_event) {
			var opt_pagePath;
			if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
				opt_target = self.extractParamFromUri(intent_event.target.src, 'url');
			}
			_gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
		}
	};
	
	/** Google + **/
	this.gpInit = function() {
		if (self.gpInitialized) {
			return;
		}
		self.gpInitialized = true;
		window.___gcfg = {lang: 'fr'};
		var js = self.insertJs('https://apis.google.com/js/plusone.js', 'g-plus-js', self.gpExecuteCallback);
	};
	
	this.gpExecuteCallback = function() {
		self.gpLoaded = true;
		for (var i=0; i<self.gpCallback.length; i++) {
			self.gpCallback[i]();
		}
		self.gpFinished = true;
	}
	
	this.useGpObject = function(callback) {
		if (self.gpLoaded) {
			callback();
		} else {
			self.gpCallback.push(callback);
		}
	}
	
	this.extractParamFromUri = function(uri, paramName) {
		if (!uri) { return;	}
		var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
		var params = regex.exec(uri);
		if (params != null) { return unescape(params[1]); }
		return;
	};
};

var socialManager = new SocialManager();
jQuery(document).ready(function() {
	socialManager.init();
});
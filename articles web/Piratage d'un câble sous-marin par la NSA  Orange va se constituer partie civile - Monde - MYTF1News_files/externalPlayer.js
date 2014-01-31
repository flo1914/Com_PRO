/*
* Gestion player
*
*/

// Routage

function WATPlayerInstance_DoFSCommand(command, args) {
	switch(command) {

		case			'debug' :
		return Try.these(

		// If FFox's firebug 2.0
		function() {return console.debug(args);},
		// Autre navigateurs ?
		function() {return xmlNode.textContent;}
		);
		break;
	}
}


handlePlayerResponse = function(e) {
    var action = e.data.split("@@");
    switch (action[0])
    {
        case "CLEARcompanion":
            CLEARcompanion(action[1]);
            break;
        case "WATcompanion":
            WATcompanion(action[1],action[2],action[3]);
            break;
        case "onVideoEnded":
            onVideoEnded();
            break;
    }
}

// we have to listen for "message"
if(typeof window.addEventListener != "undefined") {
      window.addEventListener("message", handlePlayerResponse, false);
 }
 else if(typeof window.attachEvent != "undefined") {
      window.attachEvent("onmessage", handlePlayerResponse);
}

/**
* VBScript pour IE (!)
*/
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('Sub WATPlayerInstance_FSCommand(ByVal command, ByVal args)\n');
	document.write(' call WATPlayerInstance_DoFSCommand(command, args)\n');
	document.write('end sub\n');
	document.write('</script\> \n');
}

var hasFocus = true;
var eltActive = '';
var permalink='';

var WATPlayer =
{



	// Get flash container
	'getFrame' : function() {
                if (document.getElementById('WATPlayerIframe'))
                    return (document.getElementById('WATPlayerIframe'));
                else
                    return (window['WATPlayerIframe']);
		//if (navigator.appName.indexOf("Microsoft") != -1) {
		//	return (window['WATPlayerIframe']);
		//} else {
		//	return (document.getElementById('WATPlayerIframe'));
		//}

	},

	// Get flash container
	'getFlash' : function() {
                return this;
	},

	// Permet de changer le média d'un lecteur de fichier unique
	'swapMedia' :	function(numId) {
               WATPlayer.getFrame().contentWindow.postMessage('swapMedia@@'+numId, 'http://www.wat.tv');                    
	},


	// Changer la requete du player
	'setContiniousPlayMode' :	function(state) {
		WATPlayer.getFrame().setContiniousPlayMode(state);
	},

	'closeMod' :	function() {
		WATPlayer.getFrame().closeMod();
	},


	'setPlay' :	function() {
               WATPlayer.getFrame().contentWindow.postMessage('setPlay', 'http://www.wat.tv');    
	},


	'setPause' :	function() {
               WATPlayer.getFrame().contentWindow.postMessage('setPause', 'http://www.wat.tv');        
	},


	// Check version of flash player
	'isUp2Date' :	function() {
		try {
			var so = swfobject.getFlashPlayerVersion();
			if (so.major > 9 || (so.major == 9 && so.release >= 115)){
				return(true);
			}else return(false);
		} catch(err) {
			return(false);
		}
	},


	'detectbrowser' : function () {

		var userAgent = navigator.userAgent.toLowerCase();
		var browser = {
			safari: /webkit/.test( userAgent ),
			opera: /opera/.test( userAgent ),
			msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
			firefox: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
		};

		if (browser.safari) return 'safari';

		if (browser.opera) return 'opera';

		if (browser.firefox) return 'firefox';

		if (browser.msie) return 'ie';

		return 'other';
	},

	'detectdevice' : function() {
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			 return 'iphone';
		}
		else if ((navigator.userAgent.match(/iPad/i))) {
			return 'ipad';
		}
		else if ((navigator.userAgent.match(/Android/i))) {
			return 'android';
		}
		else if ((navigator.userAgent.match(/Bada/i))) {
			return 'bada';
		}
		return false;
	},

	'pausePlay' : function ()
	{
	   try
	   {
                  WATPlayer.getFrame().contentWindow.postMessage('pausePlay', 'http://www.wat.tv');
	   }
	   catch (err)
	   {}
	},

	'startPlay' : function ()
	{
	   try
	   {
               WATPlayer.getFrame().contentWindow.postMessage('startPlay', 'http://www.wat.tv');
	   }
	   catch (err)
	   {}
	},

	'quitWindow' : function ()
	{
	   if (eltActive != document.activeElement && WATPlayer.detectbrowser() == 'ie')
	   {
		  eltActive = document.activeElement;
	   }
	   else
	   {
		  WATPlayer.pausePlay();
	   }
	},

	// Hack to avoid browser popup
	'openURL' :	function(url, target)
	{
		try
		{
			var popup = window.open( url, target );

			if ( popup == null || typeof(popup)=="undefined" )
			return false;
			if ( window.opera )
			if (!popup.opera)
			return false;
		}
		catch(err)
		{
			return false;
		}
		return true;
	},

	'cleanScreen' : function()
	{
		$$('a.lkCloseSceen').each(function(e){e.onclick()});
	},

	// Who knows
	'lastButNotLeast' : 0
}


if (WATPlayer.detectbrowser() == 'ie')
{
   document.onfocusout = WATPlayer.quitWindow;
   eltActive = document.activeElement;
}
else
{
   window.onblur = WATPlayer.quitWindow;
}

window.onfocus = WATPlayer.startPlay;
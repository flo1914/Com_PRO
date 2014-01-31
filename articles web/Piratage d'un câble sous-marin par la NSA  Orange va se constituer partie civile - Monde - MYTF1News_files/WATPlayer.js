/*
* Gestion player
*
*/

// Routage

var extend = function(obj, extObj) {
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            extend(obj, arguments[a]);
        }
    } else {
        for (var i in extObj) {
            obj[i] = extObj[i];
        }
    }
    return obj;
};

function convertDuration(durationFormated) {
	var remainingDuration = 0;
	 if (durationFormated.indexOf(":") != -1)
	   {
			   var hour = durationFormated.split(":")[0];
			   if (hour.substr(0,1) == "0")
				   hour = hour.substr(1,1);
			   var min  = durationFormated.split(":")[1];
			   if (min.substr(0,1) == "0")
				   min = min.substr(1,1);
				var sec  = durationFormated.split(":")[2];
			   if (sec.substr(0,1) == "0")
				   sec = sec.substr(1,1);
			   remainingDuration += parseInt(hour) * 60 * 60 + parseInt(min) * 60 + parseInt(sec);
	   }
	 return remainingDuration;
}

function WATPlayerInstance_DoFSCommand(command, args) {
	switch(command) {

		case			'debug' :
			return Try.these(

				// If FFox's firebug 2.0
				function() {
					return console.debug(args);
				},
				// Autre navigateurs ?
				function() {
					return xmlNode.textContent;
				}
				);
			break;
	}
}

function StringtoXML(text){
if (window.ActiveXObject){
var doc=new ActiveXObject('Microsoft.XMLDOM');
doc.async='false';
doc.loadXML(text);
} else {
var parser=new DOMParser();
var doc=parser.parseFromString(text,'text/xml');
}
return doc;
}

function computeCombi(arrayIds, idx)
{
	if (arrayIds.length > 0)
		var arrayTmp = arrayIds.join(',') +","+idx;
	else
		var arrayTmp = idx.toString();

	combiArray.push(arrayTmp);

	for (idx; idx < pubsArray.length; idx++)
	{
		if (idx + 1 < pubsArray.length)
			computeCombi(arrayTmp.split(','), idx + 1);
	}
	return -1;
}

function getBestCombi(adList, maxTime)
{
pubsArray = new Array();
// return new Array();
combiArray    = new Array();
selectedArray   = new Array();

arrayIds = new Array();
for (var a = 0; a < adList.length; a++)
{
	pubsArray[a] = adList[a].preroll.duration;
}

for (var a = 0; a < pubsArray.length; a++)
{
	arrayIds = new Array();
	computeCombi(arrayIds, a);
}

for (var i = 0; i < combiArray.length; i++)
{
	var arrayTemp = combiArray[i].split(',');
	var intTmp = 0;
	for (var b = 0; b < arrayTemp.length; b++)
	{
		intTmp += pubsArray[arrayTemp[b]];
	}
	if (maxTime >= intTmp)
		selectedArray[selectedArray.length] = new Array(intTmp, combiArray[i]);
}

var a = 0;
for (var i = 0; i < selectedArray.length; i++)
{
	tmp = selectedArray[i][1];
	tmp = tmp.split(',');

	if (tmp.length > a)
		a = tmp.length;
}

var tmpArray = new Array();
for (var i = 0; i < selectedArray.length; i++)
{
	tmp = selectedArray[i][1];
	tmp = tmp.split(',');
	if (tmp.length == a)
	{
		tmpArray.push(selectedArray[i]);
	}
}

var a = 0;
for (var i = 0; i < tmpArray.length; i++)
{

	if (tmpArray[i][0] > a)
		a = tmpArray[i][0];
}

for (var i = 0; i < tmpArray.length; i++)
{

	if (tmpArray[i][0] == a)
	{
		selectedArray   = new Array();
		tmp = tmpArray[i][1];
		tmp = tmp.split(',');
		for (var i = 0; i < tmp.length; i++)
		{
			selectedArray.push(adList[tmp[i]]);
		}
		return selectedArray;
	}
}
}

// Changes XML to JSON
function vastToJson(xmlString, isTf1, deviceType, shouldAcceptNoMedia) {

	var objReturn = {};

	xml = StringtoXML(xmlString);
	// on récup le VAST
	var vastTag = xml.getElementsByTagName('VAST')[0];
    objReturn.id = vastTag.getAttribute("id");

	var adTag = vastTag.getElementsByTagName('Ad')[0];
    if (!(vastTag.id)) objReturn.id = adTag.getAttribute("id");

	var inlineTag = adTag.getElementsByTagName('InLine')[0];

	var adTitleTag = inlineTag.getElementsByTagName('AdTitle')[0];

	var adDescTag = inlineTag.getElementsByTagName('Description')[0];

	/*var impressionTag = "";
	try
	{
	  if (inlineTag.getElementsByTagName('Impression')[0])
	  {
	     impressionTag = inlineTag.getElementsByTagName('Impression')[0];
	  }
	} catch(e) {}

	var impressionTag2 = "";
	try
	{
	  if (inlineTag.getElementsByTagName('Impression')[1])
	  {
	     impressionTag2 = inlineTag.getElementsByTagName('Impression')[1];
	  }
	} catch(e) {}*/
    var impressionTags = null;
    try {
        if (inlineTag != null) {
            var tags = inlineTag.getElementsByTagName('Impression');
            if (tags != null) {
                var nbTags = tags.length;
                if (nbTags > 0) {
                    impressionTags = [];
		    for(var tagIdx = 0; tagIdx < nbTags; tagIdx++) {
                        impressionTags[tagIdx] = tags[tagIdx].textContent;
                    }
                }
            }
        }
    } catch(e) {}

	var creativesTag = inlineTag.getElementsByTagName('Creatives')[0];

	var creativeTag = creativesTag.getElementsByTagName('Creative');

	// pour chaque creativeTag
	var listMedia = {};
	listMedia.preroll = {};
	for (x in creativeTag) {
		if (typeof(creativeTag[x]) == 'object') {
			var linearTag = creativeTag[x].getElementsByTagName('Linear')[0];

			var durationTag = linearTag.getElementsByTagName('Duration')[0];
			listMedia.preroll.duration = convertDuration(durationTag.textContent);

			var videoClicksTag = linearTag.getElementsByTagName('VideoClicks')[0];

            if (videoClicksTag && videoClicksTag.getElementsByTagName('ClickThrough')) {
			    var clickThroughTag = videoClicksTag.getElementsByTagName('ClickThrough')[0];
			    listMedia.preroll.clickThrough = clickThroughTag.textContent;
            }

			var mediaFilesTag = linearTag.getElementsByTagName('MediaFiles')[0];

			var mediaFileTag = mediaFilesTag.getElementsByTagName('MediaFile')[0];

			if (mediaFileTag.textContent.length < 10)
			{
				if (deviceType == 'android')
				listMedia.preroll.mediaFile = '//www.wat.tv/get/android5/'+mediaFileTag.textContent;
				else
				listMedia.preroll.mediaFile = '//www.wat.tv/get/iphone/'+mediaFileTag.textContent+'.m3u8?bwmin=100000&bwmax=490000&pub=1';
			}
			else
			{
                var contentUrl = mediaFileTag.textContent.replace(/^\s+|\s+$/g, '');
                if (isTf1) {
                    if (shouldAcceptNoMedia && contentUrl.toLowerCase() == "http://no.media") {
                        listMedia.preroll.mediaFile = "http://no.media";
                    } else {
                        return "";
                    }
                }
				else if (contentUrl.substr(0,4) != 'http') {
                    return "";
                } else {
				    listMedia.preroll.mediaFile = contentUrl;
                }
			}
            if (linearTag.getElementsByTagName('TrackingEvents')) {
                var trackingEventsTags = linearTag.getElementsByTagName('TrackingEvents')[0];
                try
                {
                    var trackingTag = trackingEventsTags.getElementsByTagName('Tracking');
                    listMedia.preroll.tracking = {};
                    for (y in trackingTag) {
                        if (typeof(trackingTag[y]) == 'object') {
                            listMedia.preroll.tracking[y] = {};

                            listMedia.preroll.tracking[y].tracker = trackingTag[y].textContent;
                            listMedia.preroll.tracking[y].event = trackingTag[y].attributes[0].textContent;
                        }
                    }
                }	catch(err) {}
            }
		}

	}

	objReturn.adTitle = adTitleTag.textContent;
	objReturn.adDesc = adDescTag.textContent;

	/*if (impressionTag != "")
	{
		objReturn.impression = impressionTag.textContent;
	}
	if (impressionTag2 != "")
	{
		objReturn.impression2 = impressionTag2.textContent;
	}*/
    if (impressionTags != null && impressionTags.length > 0) {
        objReturn.impressions = impressionTags;
    }
	extend(objReturn, listMedia);

	return objReturn;

};

// Changes XML to JSON
function vastToJson2(xmlString, isTf1, deviceType) {

	var objReturn = {};

	xml = StringtoXML(xmlString);
	// on récup le VAST
	var vastTag = xml.getElementsByTagName('VAST')[0];

	var adTag = vastTag.getElementsByTagName('Ad')[0];

	var inlineTag = adTag.getElementsByTagName('InLine')[0];

	var adTitleTag = inlineTag.getElementsByTagName('AdTitle')[0];

	var adDescTag = inlineTag.getElementsByTagName('Description')[0];

	
	/*var impressionTag = "";
	try
	{
	  if (inlineTag.getElementsByTagName('Impression')[0])
	  {
	     impressionTag = inlineTag.getElementsByTagName('Impression')[0];
	  }
	} catch(e) {}

	var impressionTag2 = "";
	try
	{
	  if (inlineTag.getElementsByTagName('Impression')[1])
	  {
	     impressionTag2 = inlineTag.getElementsByTagName('Impression')[1];
	  }
	} catch(e) {}*/
    var impressionTags = null;
    try {
        if (inlineTag != null) {
            var tags = inlineTag.getElementsByTagName('Impression');
            if (tags != null) {
                var nbTags = tags.length;
                if (nbTags > 0) {
		    impressionTags = [];
                    for(var tagIdx = 0; tagIdx < nbTags; tagIdx++) {
                        impressionTags[tagIdx] = tags[tagIdx].textContent;
                    }
                }
            }
        }
    } catch(e) {}

	var creativesTag = inlineTag.getElementsByTagName('Creatives')[0];

	var creativeTag = creativesTag.getElementsByTagName('Creative');

	// pour chaque creativeTag
	var listMedia = {};
	listMedia.preroll = {};
	//for (x in creativeTag) {
	//	if (typeof(creativeTag[x]) == 'object') {
			var linearTag = creativeTag.getElementsByTagName('Linear')[0];

			var durationTag = linearTag.getElementsByTagName('Duration')[0];
			listMedia.preroll.duration = convertDuration(durationTag.textContent);

			var videoClicksTag = linearTag.getElementsByTagName('VideoClicks')[0];

			var clickThroughTag = videoClicksTag.getElementsByTagName('ClickThrough')[0];
			listMedia.preroll.clickThrough = clickThroughTag.textContent;

			var mediaFilesTag = linearTag.getElementsByTagName('MediaFiles')[0];

			var mediaFileTag = mediaFilesTag.getElementsByTagName('MediaFile')[0];

			if (mediaFileTag.textContent.length < 10)
			{
				if (deviceType == 'android')
				listMedia.preroll.mediaFile = '//www.wat.tv/get/android5/'+mediaFileTag.textContent;
				else
				listMedia.preroll.mediaFile = '//www.wat.tv/get/iphone/'+mediaFileTag.textContent+'.m3u8?bwmin=100000&bwmax=490000';
			}
			else
			{
				if (mediaFileTag.textContent.substr(0,4) != 'http' || isTf1) return "";
				listMedia.preroll.mediaFile = mediaFileTag.textContent;
			}
			var trackingEventsTags = linearTag.getElementsByTagName('TrackingEvents')[0];

			try
			{
				var trackingTag = trackingEventsTags.getElementsByTagName('Tracking');
				listMedia.preroll.tracking = {};
				for (y in trackingTag) {
					if (typeof(trackingTag[y]) == 'object') {
						listMedia.preroll.tracking[y] = {};

						listMedia.preroll.tracking[y].tracker = trackingTag[y].textContent;
						listMedia.preroll.tracking[y].event = trackingTag[y].attributes[0].textContent;
					}
				}
			}	catch(err) {}

		//}

	//}

	objReturn.adTitle = adTitleTag.textContent;
	objReturn.adDesc = adDescTag.textContent;
	/*if (impressionTag != "")
	{
		objReturn.impression = impressionTag.textContent;
	}
	if (impressionTag2 != "")
	{
		objReturn.impression2 = impressionTag2.textContent;
	}*/
    if (impressionTags != null && impressionTags.length > 0) {
        objReturn.impressions = impressionTags;
    }
	extend(objReturn, listMedia);

	return objReturn;

};

// Changes XML to JSON
function vastToJsonSofialys(xmlString, deviceType, idMedia) {
	var objReturn = {};

	xml = StringtoXML(xmlString);
	// on récup le VAST
	var vastTag = xml.getElementsByTagName('VAST')[0];

	var adTag = vastTag.getElementsByTagName('Ad')[0];

	var inlineTag = adTag.getElementsByTagName('InLine')[0];

	var adTitleTag = inlineTag.getElementsByTagName('AdTitle')[0];

	var adDescTag = inlineTag.getElementsByTagName('Description')[0];

	var creativesTag = inlineTag.getElementsByTagName('Creatives')[0];

	var creativeTag = creativesTag.getElementsByTagName('Creative');

	if (deviceType == "iphone")
	{
		idMedia = "0";
	}
	else
	{
		idMedia = "1";
	}

	// pour chaque creativeTag
	var listMedia = {};
	listMedia.preroll = {};
	for (x in creativeTag) {
		if (typeof(creativeTag[x]) == 'object') {
			var linearTag = creativeTag[x].getElementsByTagName('Linear')[0];

			var durationTag = linearTag.getElementsByTagName('Duration')[0];
			listMedia.preroll.duration = convertDuration(durationTag.textContent);

			listMedia.preroll.clickThrough = "";

			var mediaFilesTag = linearTag.getElementsByTagName('MediaFiles')[0];

			var mediaFileTag = mediaFilesTag.getElementsByTagName('MediaFile')[idMedia];

			listMedia.preroll.mediaFile = mediaFileTag.textContent;

			var trackingEventsTags = linearTag.getElementsByTagName('TrackingEvents')[0];

			try
			{
				var trackingTag = trackingEventsTags.getElementsByTagName('Tracking');
				listMedia.preroll.tracking = {};
				for (y in trackingTag) {
					if (typeof(trackingTag[y]) == 'object') {
						listMedia.preroll.tracking[y] = {};

						listMedia.preroll.tracking[y].tracker = trackingTag[y].textContent;
						listMedia.preroll.tracking[y].event = trackingTag[y].attributes[0].textContent;
					}
				}
			}	catch(err) {}

		}

	}

	objReturn.adTitle = adTitleTag.textContent;
	objReturn.adDesc = adDescTag.textContent;

	extend(objReturn, listMedia);

	return objReturn;
};

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



var permalink='';

var WATPlayer =
{



	// Get flash container
	/*
	 * @TODO Fix ie9, use document.getElementById
	 */
	'getFlash' : function() {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			return (window['WATPlayerInstance']);
		} else {
			return (document['WATPlayerInstance']);
		}
	},

	// Permet de changer le média d'un lecteur de fichier unique
	'swapMedia' :	function(numId) {
		WATPlayer.getFlash().swapMedia(numId);
	},


	// Permet de changer le média d'un lecteur de fichier unique
	'userAuthorisationGranted' :	function() {
		WATPlayer.getFlash().userAuthorisationGranted();
	},

	// Changer la requete du player
	'setCustomPlaylistId' :	function(request) {
		WATPlayer.getFlash().setCustomPlaylistId(request);
	},


	// Changer la requete du player
	'setContiniousPlayMode' :	function(state) {
		WATPlayer.getFlash().setContiniousPlayMode(state);
	},

	'closeMod' :	function() {
		WATPlayer.getFlash().closeMod();
	},


	'setPlay' :	function() {
		WATPlayer.getFlash().setPlay();
	},

	/*
	 * playLive : specific function for strike project
	 */
	'playLive': function(tcin, tcout) {
		var tcin = tcin || null;
		var tcout = tcout || null;
		if ((null !== tcin) && (null !== tcout)) {
			WATPlayer.getFlash().playLive(tcin, tcout);
		} else {
			WATPlayer.getFlash().playLive();
		}
	},

	'setPause' :	function() {
		WATPlayer.getFlash().setPause();             
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

	'detectapp' : function () {
		// si on n'est pas dans une app on aura "Safari" dans l'user agent
		var userAgent = navigator.userAgent.toLowerCase();

		var browser = {
			web: /safari/.test( userAgent )
		}

		if (browser.web) return 'web';

		return 'appli';
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

	// Mode player unique - permet de passer un referer
	'setPermalink' :	function(value)
	{
		if(WATPlayer.getFlash())
		{
			WATPlayer.getFlash().setPermalink(value);
		}
		else
		{
			permalink = value;
		}

	},


	// Mode player unique - permet de repcupérer la variable permaLink
	'getPermalink' :	function()
	{
		if(permalink != '')
		{
			WATPlayer.getFlash().setPermalink(permalink);
		}
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
		else if ((navigator.userAgent.match(/MSIE 10/i))) {
			return 'w8';
		}
		else if ((navigator.userAgent.match(/MSIE/i))) {
			return 'ie';
		}
		return false;
	},

	'detecttablet' : function() {
		// Sur une tablette android, on trouve Mobile dans l'UA'
		if (!(navigator.userAgent.match(/Mobile/i))) {
			return 'tablet';
		}
		return false;
	},

	'pausePlay' : function ()
	{
	   try
	   {
		  var player = WATPlayer.getFlash();
		  player.setFocusPause();
	   }
	   catch (err)
	   {
		 //WATPlayer.getFlash().setFocusPause();
	   }
	},

	'startPlay' : function ()
	{
	   try
	   {
		  var player = WATPlayer.getFlash();
		  player.setFocusPlay();
	   }
	   catch (err)
	   {
		  //WATPlayer.getFlash().setFocusPlay();
	   }
	},

	'detectOs' : function() {
		var match = navigator.userAgent.match(/Android (\d+)\./i);
		if (match && match[1]) {return match[1];}
	},
	
	'rotatePlayer' : function(width, height, degree, id) {
		var id = id || 'FlashPlayer';
		var degree = degree || '90';
		var width = width || '480';
		var height = height || '270';
		var obj = document.getElementById(id);
		
		obj.style.webkitTransform = "rotate(" + degree + "deg)";
		obj.style.webkitTransformOrigin = "0px 0px";
		obj.style.width = width + 'px';
		obj.style.height = height + 'px';
		obj.style.position = 'relative';
		obj.style.left = height + 'px';
	},

	// Install Wat player
	'showPlayer' :		function(args)
	{
		// -------------------------------
		// Container Flash properties
		// -------------------------------
		var revision = (args.revision) ? args.revision : Math.floor( Math.random() * 10000 );
		var container = (args.container) ? args.container : 'FlashPlayer';
		var updateContainer = (args.updateContainer) ? args.updateContainer : '';
		var width = (args.width) ? args.width : '100%';
		var height = (args.height) ? args.height : '100%';

		// -------------------------------
		// Player variables
		// -------------------------------
		var browser = (args.browser) ? args.browser : WATPlayer.detectbrowser();
		var url = args.url;

		// -------------------------------
		// Incrémente flash variables
		// -------------------------------
		var flashvars = {
			embedMode : 'direct',
			autoStart : 'true'
		};

		for (x in args) {

			switch (x) {
				case 'baseURL':
				case 'revision':
				case 'container':
				case 'updateContainer':
				case 'width':
				case 'height':
				case 'playerType':
				case 'showExplicit':
				case 'browser':
				case 'url':
					break;
				default:
					flashvars[x] = (args[x]); // on escape car swfobject ne le fera pas
					break;
			}

		}

		var liveUrl = (args.urlLive) ? args.urlLive : false;

		if (args.nedstatTag)
			flashvars["playerType"] = "tf1Player";

		// ----------------------------------------
		// Incrémente flash paramètres et attibuts
		// ----------------------------------------

		var params = {
			allowScriptAccess: "always",
			allowFullScreen: "true",
			wmode: "opaque"
		};

		var attributes = {
			id : "WATPlayerInstance",
			name : "WATPlayerInstance"
		};

		var app = WATPlayer.detectapp();

		if (args['type'] == 'html5') {
			if (args['iphoneId'] == 'live') {
				document.getElementById('FlashPlayer2').innerHTML = '<div id="console">OK</div><video controls="true" height="100%" width="100%" loop="false" autoplay="autoplay"><source src="'+liveUrl+'" type="video/mp4" /></video>';
				return;
			}
			else
			{
				if (window.ActiveXObject) {

						var xmlhttp = null;
						var script = document.createElement('script');
						script.type = 'text/javascript';
						try {
							xmlhttp = new XMLHttpRequest();
						} catch(e) {
							try{
								xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
							} catch(e) {
								xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
							}
						}
						xmlhttp.onreadystatechange  = function() {
							try {

								if(this.done !== undefined)
									return;

								if(this.status >= 200 && this.status < 300) {
									this.done = true;
									script.text = this.responseText;
									document.getElementsByTagName('head')[0].appendChild(script);
									new WatVideoJs("FlashPlayer2",
										args['iphoneId'],
										{
											defaultVolume: 0.5,
                                            annonce: (flashvars["annonce"] == 1 ? '1' : '0'),
											autoStart: (flashvars["autoStart"] != 'true' ? false : true),
											IE9button: false,
											// @TODO Check if displaySound must be display or not
											displaySound: false,
											adsList: flashvars["adsList"],
											preview: ""+args['previewMedia']+"",
											urlLive: liveUrl,
											noExport: (flashvars["noExport"] == 1 ? true : false),
											allowFullscreen: (flashvars["noFs"] == 1 ? false : true),
                                            fullscreen: (flashvars["fullscreen"] == 1 ? true : false),
											context: 'web',
											zoneClickIos: true,
											// @TODO Check if we must display this informations, but if not, it can't work...
											videoDuration :(args["videoDuration"] != '' ? args["videoDuration"] : false),
											contentTitle :(args["contentTitle"] != '' ? args["contentTitle"] : false),
											owner :(args["owner"] != '' ? args["owner"] : false)
										}
									);
								}
							} catch(e) { }
						};
						xmlhttp.open('GET', '/js/Engine/v3/Html5.js?'+revision, false);
						xmlhttp.send();
				} else {
					var head= document.getElementsByTagName('head')[0];
					var script= document.createElement('script');
					script.type= 'text/javascript';
					script.onreadystatechange= function () { }
					script.onload= function () {
						new WatVideoJs("FlashPlayer2",
							args['iphoneId'],
							{
								defaultVolume: 0.5,
                                annonce: (flashvars["annonce"] == 1 ? '1' : '0'),
								autoStart: (flashvars["autoStart"] != 'true' ? false : true),
								IE9button: false,
								// @TODO Check if displaySound must be display or not
								displaySound: false,
								adsList: flashvars["adsList"],
								preview: ""+args['previewMedia']+"",
								urlLive: liveUrl,
								noExport: (flashvars["noExport"] == 1 ? true : false),
								allowFullscreen: (flashvars["noFs"] == 1 ? false : true),
                                fullscreen: (flashvars["fullscreen"] == 1 ? true : false),
								context: 'web',
								zoneClickIos: true,
                                                                errormsg: (args["errormsg"] != '' ? args["errormsg"] : false),
								// @TODO Check if we must display this informations, but if not, it can't work...
								videoDuration :(args["videoDuration"] != '' ? args["videoDuration"] : false),
								contentTitle :(args["contentTitle"] != '' ? args["contentTitle"] : false),
								owner :(args["owner"] != '' ? args["owner"] : false)
							}
						);

					}
					// @TODO s
					script.src= '//www.wat.tv/js/Engine/v3/Html5.js?'+revision;
					head.appendChild(script);
				}
				return;
			}
		}
                
		if (flashvars['forceNativeIos'] && (WATPlayer.detectdevice() == 'ipad' || WATPlayer.detectdevice() == 'iphone' || WATPlayer.detectdevice() == 'android')) {
		
                        if (args["rsynd"] == '1') return;
			if (args["errormsg"] && args["errormsg"] != ""  && args["errormsg"] != "undefined") return;
			var genreOs = WATPlayer.detectdevice();
			if (args['iphoneId'] == 'live')
			{
				document.getElementById('FlashPlayer2').innerHTML = '<div id="console">OK</div><video controls="true" height="100%" width="100%" loop="false" id="WATPlayerHTML5"><source src="'+liveUrl+'" type="video/mp4" /></video>';
				eStat_ms.reference(document.getElementById('WATPlayerHTML5')
						, flashvars["appStats"]
						, (flashvars["contentTitle"] ? flashvars["contentTitle"] : "live" )
						, "live"
						, (flashvars["owner"] ? flashvars["owner"] : "live" )
						, 'm.tf1.fr'
						, (flashvars["dateDiffusion"] ? flashvars["dateDiffusion"] : "" )
						, (flashvars["emnumber"] ? flashvars["emnumber"] : "" )
						, genreOs
				);
			}
			else
			{
                                if (WATPlayer.detectdevice() == 'android')
                                    var nativeUrl = '//www.wat.tv/get/android5/'+args['iphoneId']+'.mp4';
                                else
                                    var nativeUrl = '//www.wat.tv/get/'+WATPlayer.detectdevice()+'/'+args['iphoneId']+'.m3u8?bwmin=100000&bwmax=3000000';
				document.getElementById('FlashPlayer2').innerHTML = '<div id="console">OK</div><video poster="'+args['previewMedia']+'" controls="true" height="100%" width="100%" loop="false" id="WATPlayerHTML5"><source src="'+nativeUrl+'" type="video/mp4" /></video>';
				eStat_ms.reference(document.getElementById('WATPlayerHTML5')
					, flashvars["appStats"]
					, flashvars["contentTitle"]
					, flashvars["format"]
					, flashvars["owner"]
					, 'm.tf1.fr'
					, (flashvars["dateDiffusion"] ? flashvars["dateDiffusion"] : 0 )
					, (flashvars["emnumber"] ? flashvars["emnumber"] : "" )
					, genreOs
				);
			}
			return;
		}

		if (WATPlayer.detectdevice() == 'w8') {
			document.getElementById('FlashPlayer2').innerHTML = '<div id="console">OK</div><video controls="true" height="100%" width="100%" loop="false" autoplay="autoplay"><source src="'+args['urlhtml5']+'" type="video/mp4" /></video>';
                        //return; 
		}

		if (WATPlayer.detectdevice() == 'iphone' || WATPlayer.detectdevice() == 'ipad' || args["forcem3u"] == "1") {
			if (!isNaN(args['iphoneId']) || args['iphoneId'] == 'live') {
				var head= document.getElementsByTagName('head')[0];
				var script= document.createElement('script');

				script.type= 'text/javascript';
				script.onreadystatechange= function () { }

				script.onload= function () {
					new WatVideoJs("FlashPlayer2",
						args['iphoneId'],
						{
							defaultVolume: 1,
                            annonce: (flashvars["annonce"] == 1 ? '1' : '0'),
							autoStart: (flashvars["autoStart"] != 'true' ? false : true),
							IE9button: false,
							displaySound: false,
							strike: flashvars["strike"],
							adsList: flashvars["adsList"],
                            noMedias: flashvars["noMedias"],
                            parrainageAd: flashvars["parrainageAd"],
							postList: flashvars["postList"],
                                                        fourG: flashvars["fourG"],
                                                        testDALS: flashvars["testDALS"],
                                                        bytel: flashvars["bytel"],
                                                        token: flashvars["token"],
							showTimeline: flashvars["showTimeline"],
							pubIphone: flashvars["pubIphone"],
                                                        permalink: (args["permalink"] != '' ? decodeURIComponent(args["permalink"]) : false),
							preview: ""+args['previewMedia']+"",
							urlLive: liveUrl,
							zoneClickIos: true,
							noExport: (flashvars["noExport"] == 1 ? true : false),
							allowFullscreen: (flashvars["noFs"] == 1 ? false : true),
                            fullscreen: (flashvars["fullscreen"] == 1 ? true : false),
							closeButton: (flashvars["closeButton"] == 1 ? true : false),
							appStats: (flashvars["appStats"] != '' ? flashvars["appStats"] : false),
							appVersion: (flashvars["appVersion"] != '' ? flashvars["appVersion"] : 1),
							context: app,
							errormsg: (args["errormsg"] != '' ? args["errormsg"] : false),
							appName: (args["appName"] != '' ? args["appName"] : false),
							contentTitle :(args["contentTitle"] != '' ? args["contentTitle"] : false),
							dateDiffusion :(args["dateDiffusion"] != '' ? args["dateDiffusion"] : false),
							playercolor :(args["playercolor"] != '' ? args["playercolor"] : false),
							emnumber :(args["emnumber"] != '' ? args["emnumber"] : false),
							owner :(args["owner"] != '' ? args["owner"] : false),
							mediaurl :(args["mediaurl"] != '' ? args["mediaurl"] : false),
							format :(args["format"] != '' ? args["format"] : false),
							forcem3u :(args["forcem3u"] != '' ? args["forcem3u"] : false),
							videoDuration :(args["videoDuration"] != '' ? args["videoDuration"] : false),
                            dev :(args["dev"] != '' ? args["dev"] : false)
						}
					);
                }

                var host = args["host"] || 'www.wat.tv';

                script.src= '//' + host + '/js/Engine/v3/Html5.js?'+revision;
				head.appendChild(script);
			}
			else {
				$(container).empty();
				new Element('div', {
					html: '<br /><div style="text-align: center;margin-top: 21%;width: 100%; font-family:Arial,Helvetica,sans-serif;font-size:14px; color: white; font-weight: bold;">Ce contenu n\'est pas disponible sur mobile / tablette</div>'
				}).inject($(container), 'bottom');
			}
			return;
		}
		else if (WATPlayer.detectdevice() == 'android') {
			var newflashvars = {
				android: 1,
				v60: 1,
				setVolume: 10
			};

			if (args["playerType"] != "") {
				 flashvars["playerType"] = args["playerType"];
			}
			if (flashvars["noFs"] == 0 && WATPlayer.detecttablet() == 'tablet') {
				flashvars["useFullscreen"] = 1;
			}

		   if (flashvars["noFs"] == 0 && (flashvars["appType"] == 'tab' || flashvars["appType"] == 'sph')) {
			   flashvars["useFullscreen"] = 1;
			   flashvars["playerType"] = 'tf1Player';
		   }
			if (args["versionOS"] >= 14 && WATPlayer.detecttablet() == 'tablet')
			{
				flashvars["useFullscreen"] = 0;
			}
			if (args["appName"] == 'wmmytf1')
			{
				flashvars["useFullscreen"] = 1;
				flashvars["playerLieu"] = 'm.tf1.fr';
			}

			if (args["appName"] == 'andront1')
			{
				flashvars["cobrandingName"] = "nt1";
				flashvars["playerType"] = 'tf1Player';
			}
			if (args["appName"] == 'androtmc')
			{
				flashvars["cobrandingName"] = "tmc";
				flashvars["playerType"] = 'tf1Player';
			}
			if (args["appName"] == 'androhd1')
			{
				flashvars["cobrandingName"] = "hd1";
				flashvars["playerType"] = 'tf1Player';
			}
			extend(flashvars, newflashvars);
			if (args['iphoneId'] == 'live') {
				if (typeof(url)=="undefined" || url.substr(0,23) != '//www.wat.tv/swfconnect')
				{
				if (args["appName"] == 'andront1')
						url = '//www.wat.tv/swfliveandroidnt1';
				else if (args["appName"] == 'androtmc')
						url = '//www.wat.tv/swfliveandroidtmc';
				else if (args["appName"] == 'dals')
						url = '//www.wat.tv/swfliveandroidevent';
				else if (args["appName"] == 'androhd1')
						url = '//www.wat.tv/swfliveandroidhd1';
				else
						url = '//www.wat.tv/swfliveandroid';
				}
				flashvars['urlLive'] = false;
				flashvars['forceTitle'] = 'Live TF1';
				flashvars['forceOwner'] = 'TF1';
				//if (args["errormsg"] && args["errormsg"] != "")
				//	flashvars['error_desc'] = args["errormsg"];
			}
		}

		if (args["errormsg"] && args["errormsg"] != "")
                                        flashvars['error_desc'] = args["errormsg"];

		WATPlayer.flashDesign(url, container, width, height, flashvars, params, attributes);
	},

	'flashDesign' : function(url, container, width, height, flashvars, params, attributes)
	{
		if (WATPlayer.isUp2Date() || WATPlayer.detectdevice() == 'android') {
			if (WATPlayer.detectdevice() == 'android' ) {
				document.getElementById(container).innerHTML = '<div id="upgradeLayout"><h1>Une mise à jour du Player Flash est nécessaire</h1><p id="needDownload">Vous devez télécharger et installer la dernière version d’Adobe Flash Player pour afficher ce contenu</p><div id="flashLoyout"><a href="market://details?id=com.adobe.flashplayer"><img src="//www.wat.tv/images/static/common/ico_flash.jpg" /><span><u>Télécharger Flash Player sur Google Play</u></span></a></div><p id="notCompatible">L\'installation du flash player peut nécessiter de redémarrer votre téléphone pour être bien prise en compte.</p></div>';
			}
                        tmp4 = flashvars['forcedOasTag'];
                        if (flashvars['forceNewPlayer'] && flashvars['forceNewPlayer'] == 1) 
                        {
                            url = flashvars["urlPlayer"];
                            flashvarsTmp = new Array();
                            flashvarsTmp['frameReferer'] = flashvars['frameReferer'];
                            flashvarsTmp['permalink'] = flashvars['permalink'];
                            flashvarsTmp['recoTf1'] = flashvars['recoTf1'];
                            flashvarsTmp['enableCompanion'] = flashvars['enableCompanion'];
                            flashvarsTmp['rsynd'] = flashvars['rsynd'];
                            flashvarsTmp['overlayType'] = flashvars['overlayType'];
                            flashvarsTmp['errormsg'] = flashvars['errormsg'];
                            if (flashvars['noReco'] == "1")
                                flashvarsTmp['noReco'] = flashvars['noReco'];
                            if (flashvars['autoStart'] == "true")
                                flashvarsTmp['autoStart'] = '1';
                            if (flashvars['annonce'] == 1)
                                flashvarsTmp['annonce'] = '1';
                            flashvars = flashvarsTmp;
                        } 
                        if (tmp4 != "")
                        {
                            flashvars['oasTag'] = tmp4;
                        }        
                            swfobject.embedSWF(url, container , width, height, "9.0.115", "//www.wat.tv/images/v30/playerProductInstall.swf", flashvars, params, attributes);
			
		} else {
			if (WATPlayer.detectdevice() == 'android') {
				document.getElementById(container).innerHTML = '<div id="upgradeLayout"><h1>Une mise à jour du Player Flash est nécessaire</h1><p id="needDownload">Vous devez télécharger et installer la dernière version d’Adobe Flash Player pour afficher ce contenu</p><div id="flashLoyout"><a href="market://details?id=com.adobe.flashplayer"><img src="//www.wat.tv/images/static/common/ico_flash.jpg" /><span>Télécharger Flash Player sur Google Play</span></a></div><p id="notCompatible">Si votre téléphone n\'est pas compatible avec la version 11 de Flash Flash Player, <a href="javascript:void(0);" id="nextStep" style="color: red; text-decoration: underline;">cliquez ici.</a></p></div>;'
				document.getElementById('nextStep').addEventListener('click', function() {
					document.getElementById(container).innerHTML = '<div id="upgradeLayout"><h1>Votre téléphone n\’est pas compatible avec la version 11 de Flash Player</h1><p>Pour résoudre le problème, suivez la procédure suivante :</p><ul id="process"><li>1/ Allez dans paramètres et cochez l\'option "Autoriser l\'installation d\'applications non Market" (par défaut, l\'option est décochée)</li><li>2/ <a style="color: red; text-decoration: none;" href="//www.wat.tv/images/android/Adobe_Flash_Player_10.1.apk">Démarrez le téléchargement de Flash Player v10.1</a></li><li>3/ Cliquez dans vos « notifications » pour installer Flash Player v10.1</li><li>4/ Relancez l\'application MYTF1</li></ul></div>';
				}, false);
			} else {
				var urlUpdate = "/images/v40/updatePlayer.swf?version=10.1.0&browser="+browser+"&revision="+revision+"&curLocation="+encodeURIComponent(window.location.href);
				new Swiff(urlUpdate, {
					width: width,
					height: height,
					container: container
				});
			}
		}
    
		return;
	},

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
		$$('a.lkCloseSceen').each(function(e){
			e.onclick()
		});
	},

	'rotatePlayer' : function(width, height, degree, id) {
 		var id = id || 'FlashPlayer';
 		var degree = degree || '90';

		var width = width || '480';
		var height = height || '270';
		var obj = document.getElementById(id);


		obj.style.webkitTransform = "rotate(" + degree + "deg)";
		obj.style.webkitTransformOrigin = "0px 0px";
		obj.style.width = width + 'px';
		obj.style.height = height + 'px';
		obj.style.position = 'relative';
		obj.style.left = height + 'px';
		//WatVideoJs.setRotation(true);
 	},




	'playLive': function(tcin, tcout) {
                               var tcin = tcin || null;
                               var tcout = tcout || null;
                               if ((null !== tcin) && (null !== tcout)) {
                                               WATPlayer.getFlash().playLive(tcin, tcout);
                               } else {
                                               WATPlayer.getFlash().playLive();
                               }
                }
}

CLEARcompanion = function(id) {
    parent.postMessage("CLEARcompanion@@"+id,"*");
}

WATcompanion = function(id, parameters,htmlResource) {
    parent.postMessage("WATcompanion@@"+id+"@@"+parameters+"@@"+htmlResource,"*");
}

onVideoEnded = function() {
    parent.postMessage("onVideoEnded","*");
}

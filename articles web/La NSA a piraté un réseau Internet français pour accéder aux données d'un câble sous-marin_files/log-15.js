(function() {
	var extendedInfos = '';
	if (navigator.plugins && navigator.plugins.length && navigator.plugins.length > 0) {
		for (var i = 0; i < navigator.plugins.length; i++) {
			extendedInfos += navigator.plugins[i].name + '-';
		}
	} else {
		var e = document.createElement('object');
		e.innerHTML = '<object id="dlgHelper" classid="clsid:3050F819-98B5-11CF-BB82-00AA00BDCE0B" width="0px" height="0px"></object>';
		document.body.appendChild(e);
		
		var allFonts = [];
		for (var loop = 1; loop < dlgHelper.fonts.count + 1; loop++) {
			extendedInfos += dlgHelper.fonts(loop) + '-';
		}
	}
		
	// Remove unexisting IDs, to avoid suggesting unexisting links
	if (typeof _vuOptiDisplayer != 'undefined') {
		for (var i = 0; i < _vuOptiDisplayer.length; i++) {
		   if (_vuOptiDisplayer[i][0] == '_links') {
		       var validIds = [_vuOptiDisplayer[i][0]];
		       for (var j = 1; j < _vuOptiDisplayer[i].length; j++) {
		           var id = _vuOptiDisplayer[i][j];
		           if (document.getElementById(id)) {
		               validIds[validIds.length] = id;
		           }
		       }
		       _vuOptiDisplayer[i] = validIds;
		       break;
		   }
		}
	}
	
	// Ensure datas are correctly formatted
	if (typeof _vuOptiContent != 'undefined') {
		for (var i = 0; i < _vuOptiContent.length; i++) {
			var key = _vuOptiContent[i][0].toLowerCase();
			var val = _vuOptiContent[i][1];
			if (key == '_anchor' && val.length > 200) _vuOptiContent[i][1] = val.substr(0, 200);
			else if (key == '_permalink' && val.length > 200) _vuOptiContent[i][1] = val.substr(0, 200);
			else if (key == '_mobilepermalink') _vuOptiContent[i][1] = ''; // Deprecated
			else if (key == '_category' && val.length > 100) _vuOptiContent[i][1] = val.substr(0, 100);
			else if (key == '_thumbnail' && val.length > 200) _vuOptiContent[i][1] = val.substr(0, 200);
			else if (key == '_summary') _vuOptiContent[i][1] = ''; // Deprecated
			else if (key == '_type' && val.length > 10) _vuOptiContent[i][1] = val.substr(0, 10);
		}
	}
	
	var src =  'http://www.botalia.com/post-log-15.js'
			+ '?vuOptiContent='   + ((typeof _vuOptiContent   != 'undefined')
									? encodeURIComponent(JSON.stringify(_vuOptiContent))
									: '')
			+ '&vuOptiDisplayer=' + ((typeof _vuOptiDisplayer != 'undefined')
									? encodeURIComponent(JSON.stringify(_vuOptiDisplayer))
									: '');
	
	src = src + '&fingerprintScreen=' + window.screen.availHeight
							+ '-' + window.screen.availWidth
							+ '-' + window.screen.colorDepth
			+ '&fingerprintTimezone=' + (new Date().getTimezoneOffset())
			+ '&fingerprintExtendedInfos=' + encodeURIComponent(extendedInfos.substr(0, 800));
		
	var uv = document.createElement('script');
	uv.type = 'text/javascript';
	uv.async = true;
	uv.src = src;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(uv, s);
})();

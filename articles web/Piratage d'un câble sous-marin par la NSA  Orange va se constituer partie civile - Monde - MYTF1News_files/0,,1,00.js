/* Freedom Engine prdfriweb008 - Thu 23 Jan 2014 19:23:32 */
var IMG_SERVER='http://s.tf1.fr';var LOGIN_HOSTNAME = 'login.tf1.fr';var unv_id = 1;var ErrorMgr = {browserIsIE : navigator.userAgent.indexOf("MSIE") != -1,
doOnError : function(msg, url, line) {if(!ErrorMgr.browserIsIE) {return false;}
if(ErrorMgr.showErrorsEnabled()) {return false;}
return true;},
doOnClickSwitch : function(evt) {if(!evt) {evt = window.event;}
if(!evt.ctrlKey || !evt.shiftKey) {return;}
var showErrors = this.showErrorsEnabled();showErrors = !showErrors;setCookie('showErrors', showErrors)
var msg = 'Affichage des erreurs ' + (showErrors?'activé':'désactivé');alert(msg);if(evt.preventDefault) {evt.preventDefault();}
evt.returnValue = false;},
showErrorsEnabled : function() {var showErrors = getCookie('showErrors');if(showErrors == 'Undefined' || showErrors == 'false') {return false;}
return true;}}
window.onerror = ErrorMgr.doOnError;function includeJs(url) {var head = document.getElementsByTagName('head')[0];var script = document.createElement('script');script.setAttribute('src', url);script.setAttribute('type', 'text/javascript');head.appendChild(script);}
function includeJsOnce(url, callback, charset) {if(typeof this.includedJsFiles == 'undefined') {this.includedJsFiles = [];}
var l =  this.includedJsFiles;if(url in l) {if(callback) {if(l[url]) {l[url].push(callback);}else{callback();}}
return;}
l[url] = [];if(callback) {l[url].push(callback);}
var script = document.createElement("script");script.setAttribute('type', 'text/javascript');if(charset) {script.setAttribute('charset', charset);}else{script.setAttribute('charset', 'utf-8');}
script.onload = script.onreadystatechange = function() {if(script.readyState && script.readyState != "loaded" && script.readyState != "complete") {return;}
script.onreadystatechange = script.onload = null;while(l[url].length) {l[url].shift()();}
l[url] = null;};script.setAttribute('src', url);document.getElementsByTagName("head")[0].appendChild(script);}
function gId(id){return document.getElementById(id);}
if(typeof($) == 'undefined') {$ = function(id) {return document.getElementById(id);}}
function elementWrite(id,htmlCode){var el=gId(id);if(el!=undefined) {el.innerHTML=htmlCode;}}
function setInnerHTML(divContent, html) {divContent.innerHTML = html;var allElements=divContent.getElementsByTagName("*");for(var i=0; i<allElements.length; i++) {if(allElements[i].getAttribute("id")!=null)
allElements[i].id = allElements[i].getAttribute("id");if(allElements[i].getAttribute("name")!=null)
allElements[i].name = allElements[i].getAttribute("name");if(allElements[i].getAttribute("class")!=null)
allElements[i].className = allElements[i].getAttribute("class");}
var allScripts=divContent.getElementsByTagName("script");if(allScripts.length == 0) {htmlTest = html.replace(/\n/gi,"");var expreg = new RegExp("<scri"+"pt[^>]*>(.*)</scr"+"ipt>","gi");var res = htmlTest.match(expreg);if(res != null) {for(var i =0; i < res.length; i++){var lescript = res[i].replace(/<script[^>]*>/gi,"");lescript = lescript.replace(/<\/script[^>]*>/gi,"");eval(lescript);}}}else{for(var indiceAjax=0; indiceAjax<allScripts.length; indiceAjax++) {var s = allScripts[indiceAjax];if(s.src && s.src!="") {eval(getFileContent(s.src));}else{eval(s.innerHTML);}}}}
function getFileContent(url) {try {var xhr=getXMLHttpRequest();xhr.open("GET",url,false);xhr.send(null);} catch(e) { return ""; }
return xhr.responseText;}
function fillElementWithHttpRequest(url, id) {var conteneur = gId(id);if(conteneur == undefined) {return;}
try {var xmlhttp = getXMLHttpRequest();conteneur.innerHTML = "chargement en cours...";xmlhttp.open("GET", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState==4) {if(xmlhttp.responseText!=null) {var contenu = xmlhttp.responseText;contenu = contenu.replace(/<\/?body[^>]*>/gi,"");contenu = contenu.replace(/<\/?html>/gi,"");contenu = contenu.replace(/\n/gi,"###");contenu = contenu.replace(/<head>.*<.head>/gi,"");contenu = contenu.replace(/###/gi,"\n");setInnerHTML(conteneur,contenu);}}}
xmlhttp.send(null);} catch(e) {conteneur.innerHTML = "un problème est survenu.";}}
function addEvtListener(obj,evtName,f){if(obj.attachEvent){obj.attachEvent('on'+evtName,f);}else{obj.addEventListener(evtName,f,false);}}
function removeEvtListener(obj,evtName,f){if(obj.detachEvent){obj.detachEvent('on'+evtName,f);}else{obj.removeEventListener(evtName,f,false);}}
function trkUrl(link,type,rub,e,u){r='http://tracking.tf1.fr/img/trk.gif?rdm='+Math.round(Math.random()*2147473647);r+='&rub='+rub+'&type=';if(type==1){r+='int';if(typeof(link)=='object'){url=link.href;if(url!='#' && url.charAt(0)!='/' && url.substring(0,4)!='http'){url='/'+url;}}else{url=link;}}else{if(type == 2) {r+='ext';}else{r+='unk';}
if(typeof(link)=='object'){url=link.href;}else{url=link;}}
if(url=='#' || url.indexOf('openad.tf1.fr', 0) != -1) {return;}
if(e){r+='&e='+e;}
if(u){r+='&u='+u;}
r+='&url='+escape(url);img=new Image;img.src=r;return;}
function openPopup(u,sn,iw,ih,il,it,im,i2,ito,ist,ir,ilo){if(typeof(u)=='object'){u=u.getAttribute('href');}
var a1="width="+iw+",height="+ih;a1+=",left="+ il +",top="+ it +",directories=0,hotkeys=1";a1+=",menubar="+im +",scrollbars="+i2+",toolbar="+ito+",status="+ist;a1+=",resizable="+ir+",location="+ilo;window.open(u,sn,a1);}
function getCookieVal(offset){var es=document.cookie.indexOf(";",offset);if(es==-1){es=document.cookie.length;}
return unescape(document.cookie.substring(offset,es));}
function deleteCookie(name){var path = getCookie("path");if(getCookie(name)){document.cookie = name + "=" + ((path) ? "; path=" + path : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";}}
function getCookie(name){switch(name){case '_MSOPSEUDO_':
case '_MSOMAIL_':
case '_MSOTICKET_':
unvIdLogin = getCookie('_MSOUNIVERS_');if(unvIdLogin != "Undefined" && unvIdLogin != 1){return "Undefined";}
break;}
var arg=name+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i < clen){var j=i+alen;if(document.cookie.substring(i, j)==arg){return getCookieVal(j);}
i=document.cookie.indexOf(" ", i)+1;if(i==0){break;}}
return "Undefined";}
function setCookie(name,value,expTs,path){if(typeof path == 'undefined'){path = '/';}
var ck=name+"="+escape(value);ck+="; path="+path;ck+="; domain=." + getMainDocDomain();if(typeof expTs != 'undefined'){var date = new Date();date.setTime(expTs);ck+="; expires="+date.toGMTString();}
document.cookie=ck;}
var base64s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function encode64(str){var bits,dual,i=0,encOut='';while(str.length>=i+3){bits =
(str.charCodeAt(i++) & 0xff) <<16 |
(str.charCodeAt(i++) & 0xff) <<8  |
str.charCodeAt(i++) & 0xff;encOut +=
base64s.charAt((bits & 0x00fc0000) >>18) +
base64s.charAt((bits & 0x0003f000) >>12) +
base64s.charAt((bits & 0x00000fc0) >> 6) +
base64s.charAt((bits & 0x0000003f));}
if(str.length -i>0 && str.length-i<3){dual = Boolean(str.length-i-1);bits =
((str.charCodeAt(i++) & 0xff) <<16) |
(dual ? (str.charCodeAt(i) & 0xff) <<8 : 0);encOut +=
base64s.charAt((bits & 0x00fc0000) >>18) +
base64s.charAt((bits & 0x0003f000) >>12) +
(dual ? base64s.charAt((bits & 0x00000fc0) >>6) : '=') +
'=';}
return encOut
}
function M_getRef(id){return gId(id);}
function M_getOffset(obj, dir){var px = 0;while(obj.tagName!='BODY'){if(dir && dir=='top') px += obj.offsetTop; else px += obj.offsetLeft;obj = obj.offsetParent;}
return px;}
function hm(){for(var i = 1; i<=nbMaxMenu; i++){var oDiv = gId('divSubmenu'+i);if(oDiv) oDiv.style.visibility = 'hidden';var lnk = gId('lnk'+i)
if(lnk){if(puceOff) lnk.style.backgroundImage = 'url('+puceOff+')';if(styleOff) lnk.className = styleOff;}}
var oCont = gId('divConteneur');if(oCont){oCont.style.display = "none";}}
function sm(num, show){var lnk = gId('lnk' + num);if(!lnk) return false;if(puceOn) lnk.style.backgroundImage = 'url('+ puceOn + ')';if(styleOn) lnk.className = styleOn;var objLeft = lnk.parentNode;var objTop = gId('divLevelTop'+iblId);var ssmenu = gId('divSubmenu' + num);if(ssmenu){if(show){var initialTop = objTop.offsetHeight;if(flagTop) initialTop = -ssmenu.offsetHeight;ssmenu.style.left = M_getOffset(objLeft) + 'px';ssmenu.style.top  = (initialTop + M_getOffset(objTop, 'top')) + 'px';}
ssmenu.style.visibility = show ? 'visible':'hidden';var oCont = gId('divConteneur');if(oCont){var decalLeft = 2;oCont.style.left = (parseInt(ssmenu.style.left) + decalLeft) + 'px';var decalTop  = flagTop ? -2:2;oCont.style.top  = (parseInt(ssmenu.style.top) + decalTop) + 'px';oCont.style.height = ssmenu.offsetHeight + 'px';oCont.style.width  = ssmenu.offsetWidth + 'px';oCont.style.display = "block";}}}
function pmeOperation(opeId, dest){document.cookie="_PMEOPE_="+opeId+";path=/;domain=." + getMainDocDomain();if(dest != "") {document.location.href=dest;}}
function createPopup(target, urlImg, params, enabled){var DEFAULT_STYLE_CONTAINER = "margin:0; padding:15px; background-color:#fff; border:1px solid #000;";var DEFAULT_STYLE_FOOTER    = "text-align:left; margin:5px 0 0 0; font:bold 12px arial; color:#000; word-break: normal;";var DEFAULT_STYLE_COPYRIGHT = "font:10px arial; color:#000;";if(typeof enabled == 'undefined'){enabled = true;}
if(!enabled){return false;}
if(typeof params == 'undefined'){params ={};}
target.style.cursor = 'pointer';target.title = 'Cliquez ici pour agrandir cette image';this.styleCopyright	= DEFAULT_STYLE_COPYRIGHT;this.styleFooter	= DEFAULT_STYLE_FOOTER;this.styleBody		= DEFAULT_STYLE_CONTAINER;this.legende		= (params['legende'])?params['legende']:'';this.copyright		= (params['copyright'])?params['copyright']:'';this.couleurBackgroundPopup		= (params['couleurBackgroundPopup'])?params['couleurBackgroundPopup']:'';this.texteFermerPopup		= (params['texteFermerPopup'])?params['texteFermerPopup']:'';if(this.couleurBackgroundPopup != '') this.styleBody = "margin:0; padding:15px; background-color:" + this.couleurBackgroundPopup + "; border:1px solid #000;";var popupId 	=	target.id + "popup";var popupImgId 	= 	target.id + "popupImg";var txtTopId 	= 	target.id + "txtTop";var txtFooterId = 	target.id + "txtFooter";if(gId(popupId)){this.oDivContainer = gId(popupId);this.oDivContainer.style.visibility = "hidden";}else{this.oDivContainer = document.createElement("div");if(this.styleBody != ''){this.oDivContainer.style.cssText = this.styleBody;}
this.oDivContainer.id = popupId;this.oDivContainer.style.zIndex = 1000;this.oDivContainer.style.visibility = "hidden";try{document.body.insertBefore(this.oDivContainer, document.body.firstChild);} catch(e){target.parentNode.insertBefore(this.oDivContainer, target);}}
this.oDiv = document.createElement("div");this.oImg 						= new Image();this.oImg.id					= popupImgId;this.oImg.style.verticalAlign	= "top";listeImagesPopup[popupId] 		= urlImg;var elZoom = document.createElement("div");elZoom.style.textAlign	= "center";elZoom.appendChild(this.oImg);this.oDiv.appendChild(elZoom);elZoom.style.padding = 0;copyrightPopup[popupId] = [];copyrightPopup[popupId]['text'] =this.copyright;copyrightPopup[popupId]['style'] =this.styleCopyright;this.txtFooter 					= document.createElement("div");this.txtFooter.id				= txtFooterId;this.txtFooter.style.oveflow 	= 'hidden';if(this.legende != ""){this.txtFooter.innerHTML = this.legende;if(this.styleFooter != ''){this.txtFooter.style.cssText = this.styleFooter;}}
if(this.texteFermerPopup != ''){this.containerTexteClose = document.createElement("p");this.containerTexteClose.style.cssText = 'display:block; margin:5px 0 0 0; text-align:right;';this.texteClose = document.createElement("a");this.texteClose.id = target.id + "imageClose";this.texte = document.createTextNode(this.texteFermerPopup);texteClose.appendChild(texte);this.texteClose.href	= "javascript:zm_hidePopup('" + popupId + "')";this.texteClose.alt			=  "Fermer cette fenetre...";this.texteClose.style.cssText			=  'color:#FFFFFF; font-weight:bold;';this.containerTexteClose.appendChild(this.texteClose);this.txtFooter.appendChild(this.containerTexteClose);}else{var DEFAULT_BOUTON_FERMER   = "http://s.tf1.fr/mmdia/i/33/0/2156330.gif";this.containerImageClose = document.createElement("p");this.containerImageClose.style.cssText = 'display:block; margin:5px 0 0 0; text-align:right;';this.imageClose = document.createElement("img");this.imageClose.id = target.id + "imageClose";this.imageClose.src = DEFAULT_BOUTON_FERMER;this.imageClose.onclick	= function(){zm_hidePopup(popupId)};this.imageClose.title			=  "Fermer cette fenetre...";this.imageClose.style.cursor = "pointer";this.containerImageClose.appendChild(this.imageClose);this.txtFooter.appendChild(this.containerImageClose);}
this.oDiv.appendChild(this.txtFooter);this.oDivContainer.appendChild(this.oDiv);this.oDivContainer.style.position = "absolute";}
function zm_hidePopup(zoomerId){gId(zoomerId).style.visibility = "hidden";}
function zm_showPopup(zoomerId){gId(zoomerId).style.visibility = "visible";}
function showPopup(e){if(popupIdLastOpen != ''){zm_hidePopup(popupIdLastOpen);}
var target;if(e.target){target = e.target;}else if(e.srcElement){target = e.srcElement;}
var popupId 	= target.id + "popup";var imgId 		= target.id + "popupImg";var txtTopId 	= target.id + "txtTop";var txtFooterId =	target.id + "txtFooter";var popup 	= gId(popupId);var img 	= gId(imgId);var txtTop 	= gId(txtTopId);var txtFooter = gId(txtFooterId);if(listeImagesPopup[popupId] != ""){img.src = listeImagesPopup[popupId];footerContent[popupId] = txtFooter.innerHTML ;txtFooter.innerHTML = "<br />Chargement en cours <br />.";zm_movePopup(popupId);zm_showPopup(popupId);setWidthAndShow(0, target.id);}else{zm_movePopup(popupId);zm_showPopup(popupId);}
popupIdLastOpen = popupId;}
function getXMLHttpRequest(){var XMLHttp = false;try{XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e){try{XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");} catch (E){XMLHttp = false;}}
if(!XMLHttp && typeof XMLHttpRequest!='undefined'){XMLHttp = new XMLHttpRequest();}
return XMLHttp;}
popupIdLastOpen='';var listeImagesPopup=[];var copyrightPopup=[];var footerContent=[];function setWidthAndShow(i,id){var popupId = id + "popup";var img = gId(id + "popupImg");var txtFooter = gId(id + "txtFooter");if(i<80 && !img.complete){if(i%2 == 0){txtFooter.innerHTML +=".";}
setTimeout("setWidthAndShow("+(i++)+", '"+ id +"' );", 100);}else if(img.complete){txtFooter.style.width = img.width + "px";listeImagesPopup[popupId] = "";if(copyrightPopup[popupId]['text'] != ""){ajoutCopyright(img, copyrightPopup[popupId]['text'], '', copyrightPopup[popupId]['style']);}
txtFooter.innerHTML = footerContent[popupId];gId(id + "imageClose").onclick	= function(){zm_hidePopup(popupId)};return true;}else{txtFooter.style.width = "250px";txtFooter.innerHTML = footerContent[popupId];gId(id + "imageClose").onclick	= function(){zm_hidePopup(popupId)};return false;}}
function zm_movePopup(zoomerId){if(document.getElementById){var setX = 120;var setY = 60;var div = gId(zoomerId);var divWidth = div.offsetWidth ? div.offsetWidth : div.style.width ? parseInt( div.style.width ) : 0;var divHeight = div.offsetHeight ? div.offsetHeight :  div.style.height ? parseInt( div.style.height ) : 0;setX = setX + getViewportScrollX();setY = setY + getViewportScrollY();div.style.left = setX + "px";div.style.top = setY + "px";}}
function getViewportWidth(){var width = 0;if( document.documentElement && document.documentElement.clientWidth ){width = document.documentElement.clientWidth;}
else if( document.body && document.body.clientWidth ){width = document.body.clientWidth;}
else if( window.innerWidth ){width = window.innerWidth - 18;}
return width;}
function getViewportHeight(){var height = 0;if( document.documentElement && document.documentElement.clientHeight ){height = document.documentElement.clientHeight;}
else if( document.body && document.body.clientHeight ){height = document.body.clientHeight;}
else if( window.innerHeight ){height = window.innerHeight - 18;}
return height;}
function getViewportScrollX(){var scrollX = 0;if( document.documentElement && document.documentElement.scrollLeft ){scrollX = document.documentElement.scrollLeft;}
else if( document.body && document.body.scrollLeft ){scrollX = document.body.scrollLeft;}
else if( window.pageXOffset ){scrollX = window.pageXOffset;}
else if( window.scrollX ){scrollX = window.scrollX;}
return scrollX;}
function getViewportScrollY(){var scrollY = 0;if(document.documentElement && document.documentElement.scrollTop){scrollY = document.documentElement.scrollTop;}
else if(document.body && document.body.scrollTop){scrollY = document.body.scrollTop;}
else if(window.pageYOffset){scrollY = window.pageYOffset;}
else if(window.scrollY){scrollY = window.scrollY;}
return scrollY;}
function ajoutCopyrightSousImage(img,texte,classe,styles){if(texte == ''){return;}
if(texte.charCodeAt(0) == 169){texte = texte.substr(2);}
texte = texte.replace(/^\s*|\s*$/g, '');if(texte.length > 1){texte = '&copy;&nbsp;' + texte;}else{texte = '&nbsp;';}
var divCopyright = document.createElement('span');divCopyright.innerHTML = texte;divCopyright.className = classe;var ancetre = img.parentNode;var nsb = img.nextSibling;while(ancetre.tagName!='TD' && ancetre.tagName!='SPAN' && ancetre.tagName!='DIV' && ancetre.tagName!='BODY'){nsb = ancetre.nextSibling;ancetre = ancetre.parentNode;}
divCopyright.style.padding = '2px 0';divCopyright.style.margin = '0 0 4px 0';divCopyright.style.display = 'block';divCopyright.style.textAlign = 'center';divCopyright.style.width = '100%';divCopyright.style.textDecoration = 'none';divCopyright.style.cssText = styles;ancetre.insertBefore(divCopyright, nsb);return(divCopyright);}
function ajoutCopyright(img,texte,classe,styles){if(texte == ''){return;}
if(texte.charCodeAt(0) == 169){texte = texte.substr(2);}
texte = texte.replace(/^\s*|\s*$/g, '');if(texte.length > 1){texte = '&copy;&nbsp;' + texte;}else{texte = '&nbsp;';}
var divCopyright = document.createElement('span');divCopyright.innerHTML = texte;divCopyright.className = classe;divCopyright.style.cssText = styles;var ancetre = img.parentNode;var nsb = img.nextSibling;while(ancetre.tagName!='TD' && ancetre.tagName!='SPAN' && ancetre.tagName!='DIV' && ancetre.tagName!='BODY'){nsb = ancetre.nextSibling;ancetre = ancetre.parentNode;}
if(navigator.userAgent.search(/Gecko/i) > -1){divCopyright.style.padding = '2px 0';divCopyright.style.margin  = '0 0 4px 0';divCopyright.style.display = 'block';divCopyright.style.textAlign = 'center';divCopyright.style.width = img.width+'px';ancetre.insertBefore(divCopyright, nsb);}else{divCopyright.style.writingMode = 'tb-rl';divCopyright.style.whiteSpace =  'nowrap';divCopyright.style.textAlign = 'left';divCopyright.style.padding = img.vspace + 'px 0px '+img.vspace+'px 0px';img.valign = 'text-top';img.align = 'left';ancetre.insertBefore(divCopyright, nsb);divCopyright.style.position='absolute';if(divCopyright.offsetWidth > 0){largeur = divCopyright.offsetWidth;}else{largeur = 10;}
divCopyright.style.position='';if(parseInt(ancetre.style.paddingRight)){ancetre.style.paddingRight = (largeur+parseInt(img.parentNode.style.paddingRight))+'px';}else{ancetre.style.paddingRight = largeur+'px';}}
return(divCopyright);}
function genCopyrights(eleme, inner, separator){var elem, innerObj;if(typeof eleme == 'undefined' || !eleme) {elem = document;}else if(typeof(eleme) == 'string') {elem = gId(eleme);if(typeof elem == 'undefined' || !elem) {return;}}else{elem = eleme;}
if(typeof inner == 'undefined' || !inner || inner == '') {inner = 'divAllCopyrights';}
innerObj = gId(inner);if(typeof innerObj == 'undefined' || !innerObj) {return;}
if(typeof separator == 'undefined' || !separator) {separator = ' - ';}
var nodes=elem.getElementsByTagName('img');var tabCopyright=[];var str='';var nbNode=nodes.length;var node=null;var cp='';var nbCopyright=tabCopyright.length;for(var i=0; i<nbNode; i++){node = nodes[i];cp = node.getAttribute('cp');if((cp != null) && (cp != '')){doublon=0;for(var j=0; j<nbCopyright; j++){if(tabCopyright[j]==cp){doublon=1;}}
if(doublon==0){tabCopyright[nbCopyright++]=cp;}}}
str=tabCopyright[0];for(var i=1; i<nbCopyright; i++){str+= separator + tabCopyright[i];}
if(typeof str != 'undefined' && str) {innerObj.innerHTML = str;}}
function isValidEmail(email){reMailForm = new RegExp('^([0-9a-zA-Z]+[-._+&]+)*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$');return reMailForm.test(email);}
function AC_Generateobj(objAttrs, params, embedAttrs, id){var str = '<object ';for(var i in objAttrs)
str += i + '="' + objAttrs[i] + '" ';str += '>';for(var i in params)
str += '<param name="' + i + '" value="' + params[i] + '" /> ';str += '<embed ';for(var i in embedAttrs)
str += i + '="' + embedAttrs[i] + '" ';str += ' ></embed></object>';if(id==""){document.write(str);}else{elementWrite(id,str);}}
function AC_FL_RunContent(){var ret = AC_GetArgs(arguments, '.swf', 'movie', 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000', 'application/x-shockwave-flash');AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs, ret.elementId);}
function AC_SW_RunContent(){var ret = AC_GetArgs(arguments, '.dcr', 'src', 'clsid:166B1BCA-3F9C-11CF-8075-444553540000', null);AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);}
function AC_GetArgs(args, ext, srcParamName, classid, mimeType){var ret = new Object();ret.embedAttrs = new Object();ret.params = new Object();ret.elementId = "";ret.objAttrs = new Object();for(var i=0; i<args.length; i=i+2){var currArg = args[i].toLowerCase();switch (currArg){case 'elementid':
ret.elementId = args[i+1];break;case 'classid':
break;case 'pluginspage':
ret.embedAttrs[args[i]] = args[i+1];break;case 'src':
case 'movie':
ret.embedAttrs['src'] = args[i+1];ret.params[srcParamName] = args[i+1];break;case 'onafterupdate':
case 'onbeforeupdate':
case 'onblur':
case 'oncellchange':
case 'onclick':
case 'ondblClick':
case 'ondrag':
case 'ondragend':
case 'ondragenter':
case 'ondragleave':
case 'ondragover':
case 'ondrop':
case 'onfinish':
case 'onfocus':
case 'onhelp':
case 'onmousedown':
case 'onmouseup':
case 'onmouseover':
case 'onmousemove':
case 'onmouseout':
case 'onkeypress':
case 'onkeydown':
case 'onkeyup':
case 'onload':
case 'onlosecapture':
case 'onpropertychange':
case 'onreadystatechange':
case 'onrowsdelete':
case 'onrowenter':
case 'onrowexit':
case 'onrowsinserted':
case 'onstart':
case 'onscroll':
case 'onbeforeeditfocus':
case 'onactivate':
case 'onbeforedeactivate':
case 'ondeactivate':
case 'type':
case 'codebase':
ret.objAttrs[args[i]] = args[i+1];break;case 'width':
case 'height':
case 'align':
case 'vspace':
case 'hspace':
case 'class':
case 'title':
case 'accesskey':
case 'name':
case 'id':
case 'tabindex':
ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];break;default:
ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];}}
ret.objAttrs['classid'] = classid;if(mimeType) ret.embedAttrs['type'] = mimeType;return ret;}
function AC_AX_RunContent(){var ret = AC_AX_GetArgs(arguments);AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);}
function AC_AX_GetArgs(args){var ret = new Object();ret.embedAttrs = new Object();ret.params = new Object();ret.objAttrs = new Object();for(var i=0; i<args.length; i=i+2){var currArg = args[i].toLowerCase();switch (currArg){case 'pluginspage':
case 'type':
case 'src':
ret.embedAttrs[args[i]] = args[i+1];break;case 'data':
case 'codebase':
case 'classid':
case 'id':
case 'onafterupdate':
case 'onbeforeupdate':
case 'onblur':
case 'oncellchange':
case 'onclick':
case 'ondblClick':
case 'ondrag':
case 'ondragend':
case 'ondragenter':
case 'ondragleave':
case 'ondragover':
case 'ondrop':
case 'onfinish':
case 'onfocus':
case 'onhelp':
case 'onmousedown':
case 'onmouseup':
case 'onmouseover':
case 'onmousemove':
case 'onmouseout':
case 'onkeypress':
case 'onkeydown':
case 'onkeyup':
case 'onload':
case 'onlosecapture':
case 'onpropertychange':
case 'onreadystatechange':
case 'onrowsdelete':
case 'onrowenter':
case 'onrowexit':
case 'onrowsinserted':
case 'onstart':
case 'onscroll':
case 'onbeforeeditfocus':
case 'onactivate':
case 'onbeforedeactivate':
case 'ondeactivate':
ret.objAttrs[args[i]] = args[i+1];break;case 'width':
case 'height':
case 'align':
case 'vspace':
case 'hspace':
case 'class':
case 'title':
case 'accesskey':
case 'name':
case 'tabindex':
ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];break;default:
ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];}}
return ret;}
function Votes(myid) {var id = myid;var conId= null;var self = this;var unvId= 1;var objEval= null;var objEtoiles= null;var objInfos= null;var noteMax= 5;var noteContenu= 5;var prefixeClasse= "";var nbVotes= 0;var msgInitial= "Votez <span class=\"\">[###NB_VOTES###]</span>";var msgVoteOk= "Vote comptabilisé";var msgDejaVote= "Vous avez déjà voté";var msgNbVotes= " ###NB_VOTES### vote###S_VOTES###";var msgVotes= "Votes (###NB_VOTES###)";var msgEval = "###APPRECIATION###";var statut= "toVote";var displayEval = true;var regExp = new RegExp("###NB_VOTES###","gi");var regExpS = new RegExp("###S_VOTES###","gi");var regExpEval = new RegExp("###APPRECIATION###","gi");var tabEval = ["Nul", "Bof", "Moyen", "Bien", "Super", "Génial"];this.init = function(conid,unvid,urlvote,conteneurEval,conteneurEtoiles,nMax,notecontenu,prefixecss,messages,nbvotes,tabappreciations,objinfos,displayeval) {noteMax = nMax;conId = conid;unvId = unvid;urlVote = urlvote;objEtoiles = conteneurEtoiles;objEval = conteneurEval;noteContenu = notecontenu;msgInitial = messages.length?messages[0]:msgInitial;msgVoteOk = (messages.length>1)?messages[1]:msgVoteOk;msgDejaVote = (messages.length>2)?messages[2]:msgDejaVote;msgNbVotes = (messages.length>3)?messages[3]:msgNbVotes;msgVotes = (messages.length>4)?messages[4]:msgVotes;msgEval = (messages.length>5)?messages[5]:msgEval;nbVotes = nbvotes?nbvotes:nbVotes;prefixeClasse = prefixecss;objInfos=(objinfos)?objinfos:null;tabEval=(tabappreciations)?tabappreciations:tabEval;displayEval=(displayeval==null)?displayEval:displayeval;for(var i=0;i<=noteMax*2;i++){var divEtoile = document.createElement("DIV");objEtoiles.appendChild(divEtoile);divEtoile.innerHTML = "&nbsp;";if(i==0) {divEtoile.className = prefixeClasse;}}
this.addEvents();statut = "toVote";this.showStars();};this.addEvents = function(){objEtoiles = gId(objEtoiles.id);for(var i=0;i<=noteMax*2;i++){var divEtoile = objEtoiles.childNodes[i];eval("addEvtListener(divEtoile,'mouseover',function(){"+id+".showVotes("+i+",false);})");eval("addEvtListener(divEtoile,'click',function(){"+id+".doOnClickVotes("+i+");})");}
eval("addEvtListener(objEtoiles,'mouseout',function(){"+id+".showStars();})");}
this.showStars = function(){var ligne = objEtoiles.childNodes;for(var i=1 ; i< ligne.length ; i++){var prefixe = (i <= noteContenu*2)?"P":"V";var suffixe = (i%2)?"G":"D";ligne[i].className = prefixeClasse+prefixe+suffixe;}
if(statut != "toVote") {objEval.innerHTML = msgNbVotes.replace(regExp,nbVotes).replace(regExpS,nbVotes>1?"s":"");}else{objEval.innerHTML = msgInitial.replace(regExp,nbVotes).replace(regExpS,nbVotes>1?"s":"");}};this.showVotes = function(id, init){var note = Math.floor(id/2);objEtoiles = gId(objEtoiles.id);objEval = gId(objEval.id);if(statut == "toVote") {for(var i=1 ; i<1+noteMax*2 ; i++){var prefixe = (i<=id)?"P":"V";var suffixe = (i % 2 == 0) ? "D":"G";var objetoile = objEtoiles.childNodes[i];objetoile.className=prefixeClasse+prefixe+suffixe;}
if(!init && displayEval) {objEval.innerHTML = msgEval.replace(regExpEval,tabEval[note]);}}
if((init) && (statut == "VoteValide")){nbVotes++;}
if(init) {objEval.innerHTML = msgVotes.replace(regExp,nbVotes).replace(regExpS,nbVotes>1?"s":"");}};this.initVotes = function(){self.showVotes(noteContenu,true);};this.doOnClickVotes = function(vote) {if(objInfos != null)objInfos = gId(objInfos.id);objEval = gId(objEval.id);if(statut != "toVote") {statut = "DejaVote";if(objInfos != null)
objInfos.innerHTML = msgDejaVote;else
objEval.innerHTML = msgDejaVote;}else{vote = vote/2;var dummy = new Image();var url = urlVote;var valeurs = new Array(conId,unvId,vote,noteMax);var tags = new Array("CON_ID","UNV_ID","VOTE","NOTE_MAX");for(var i=0;i<valeurs.length;i++) {var regExp = new RegExp("###"+tags[i]+"###","gi");url = url.replace(regExp,valeurs[i]);}
dummy.src = url;statut = "VoteValide";if(objInfos != null)
objInfos.innerHTML = msgVoteOk;else
objEval.innerHTML = msgVoteOk;}
setTimeout(self.initVotes, 2000);};}
function createNode(tagName,attributs) {var noeud = document.createElement(tagName);for(i in attributs){eval("noeud."+i+"=\""+attributs[i]+"\";");}
return noeud;}
function sendAndPrint() {var formName = "";var actionSend = "";var actionPrint = "";var targetName = "";var paramsPopupSend = "750,590,0,0,0,0,0,0,0,0";var paramsPopupPrint = "750,590,0,0,1,1,1,1,1,1";this.init = function(actionSend, actionPrint, targetName, iblId, unvId, chaineId, rubId, ipgId, conId, typeTpl, iblClasse, paramsPopupSend, paramsPopupPrint) {this.formName = "formSendAndPrint"+iblId;this.actionSend = actionSend;this.actionPrint = actionPrint;this.targetName = targetName;if(paramsPopupSend != null)this.paramsPopupSend = paramsPopupSend;if(paramsPopupPrint != null)this.paramsPopupPrint = paramsPopupPrint;var form = createNode("FORM",{method:"post",target:targetName,name:this.formName,id:this.formName,action:""});form.style.display="none";form.appendChild(createNode("INPUT",{type:"text",value:conId,name:"conId"}));form.appendChild(createNode("INPUT",{type:"text",value:unvId,name:"unvId"}));form.appendChild(createNode("INPUT",{type:"text",value:((iblClasse == null)?"":iblClasse),name:"iblClasse"}));form.appendChild(createNode("INPUT",{type:"text",value:chaineId,name:"chaineId"}));form.appendChild(createNode("INPUT",{type:"text",value:rubId,name:"rubId"}));form.appendChild(createNode("INPUT",{type:"text",value:ipgId,name:"ipgId"}));form.appendChild(createNode("INPUT",{type:"text",value:iblId,name:"iblId"}));form.appendChild(createNode("INPUT",{type:"text",value:((typeTpl == null)?typeTpl:""),name:"typeTpl"}));form.appendChild(createNode("INPUT",{type:"text",value:"",name:"w_action"}));form.appendChild(createNode("INPUT",{type:"text",value:document.location.href,name:"w_pagereferer"}));document.body.appendChild(form);}
this.make = function(what) {for(var i=0;i<document.forms[this.formName].elements.length;i++) {if(document.forms[this.formName].elements[i].name == "w_action") {document.forms[this.formName].elements[i].value = what;break;}}
document.forms[this.formName].action = ((what=="print")?this.actionPrint:this.actionSend);var paramsPopup = (what=="print")?this.paramsPopupPrint:this.paramsPopupSend;eval("openPopup('about:blank','"+this.targetName+"',"+paramsPopup+");");setTimeout('document.forms["'+this.formName+'"].submit()',1000);}
this.print = function() {this.make('print');}
this.send = function() {this.make('send');}}
function parseStrDateToDate(date) {if(typeof date == 'undefined' || date == '') {return false;}
var dateTimeSplit = date.split(' ');var dateFullSplit = dateTimeSplit[0].split('/');if(dateTimeSplit[1]) {var timeSplit = dateTimeSplit[1].split(':');return new Date(dateFullSplit[2], dateFullSplit[1] - 1, dateFullSplit[0], timeSplit[0], timeSplit[1], timeSplit[2]);}else{return new Date(dateFullSplit[2], dateFullSplit[1], dateFullSplit[0]);}}
function getNiceDiffDate(date1, date2) {var date1Date, date2Date, diff, floorValue = null;var liste = new Array(5);liste[0] = new Array(3);liste[0][0] = 31536000000;liste[0][1] = 'an';liste[0][2] = 'ans';liste[1] = new Array(3);liste[1][0] = 2592000000;liste[1][1] = 'mois';liste[1][2] = 'mois';liste[2] = new Array(3);liste[2][0] = 86400000;liste[2][1] = 'jour';liste[2][2] = 'jours';liste[3] = new Array(3);liste[3][0] = 3600000;liste[3][1] = 'heure';liste[3][2] = 'heures';liste[4] = new Array(3);liste[4][0] = 60000;liste[4][1] = 'minute';liste[4][2] = 'minutes';if(typeof date1 == 'undefined' || date1 == '') {date1Date = new Date();}else{date1Date = parseStrDateToDate(date1);}
if(date1Date === false) { return; }
if(typeof date2 == 'undefined' || date2 == '') {date2Date = new Date();}else{date2Date = parseStrDateToDate(date2);}
if(date2Date === false) { return; }
diff = date1Date.getTime() - date2Date.getTime();if(diff < 0) {diff = diff * -1;}
for(var i=0; i < liste.length; i++) {floorValue = Math.floor(diff / liste[i][0]);if(floorValue > 0) {return floorValue + ' ' + (floorValue > 1 ? liste[i][2] : liste[i][1]);}}
return 0;}
function sjs(lien,url) {var fake = document.createElement('span');lien.appendChild(fake);lien.href = url.substring(1).replace(/\|/g, "\/").replace(/\@/g, ".");if(lien.href.substr(0, 4) != 'http') {lien.href = 'http://' + window.location.host + lien.href;}
lien.removeChild(fake);}
function doOnPageLoad() {var liens=document.getElementsByTagName("A");for(var i=0;i<liens.length;i++) {var lien = liens[i];var url = lien.href;if(url.charAt(url.length-1) != "#") {continue;}
for(var n=0;n < lien.attributes.length;n++) {if(lien.attributes[n].nodeName!="onmousedown") {continue;}
if(lien.attributes[n].nodeValue != null) {var onmousedownEvent = lien.attributes[n].nodeValue;if(onmousedownEvent.indexOf("sjs") == 0) {if(onmousedownEvent.indexOf(";") != -1) {sjs(lien,onmousedownEvent.substr(10,onmousedownEvent.indexOf(";")-12));lien.attributes[n].nodeValue = lien.attributes[n].nodeValue.substr(onmousedownEvent.indexOf(";")+1);}else{sjs(lien,onmousedownEvent.substr(10,onmousedownEvent.length-12));lien.attributes[n].nodeValue = "";}}}
break;}}}
function getMainDocDomain() {return document.domain.replace(/.*\.([^.]+\.[^.]+)$/, '$1');}
var TF1Date = {months : ['janvier', 'février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
getNiceDate : function(strDate, prepend) {if(null == prepend) {prepend = '';}
var date1Date, date2Date, diff, floorValue = null;var liste = new Array(3);liste[0] = new Array(2);liste[0][0] = 172800000;liste[0][1] = 'date';liste[1] = new Array(2);liste[1][0] = 86400000;liste[1][1] = 'Hier';liste[2] = new Array(2);liste[2][0] = 1;liste[2][1] = 'Aujourd\'hui';if(typeof strDate == 'undefined' || strDate == '') {date1Date = new Date();}else{date1Date = parseStrDateToDate(strDate);}
if(date1Date === false) { return; }
date2Date = new Date();diff = date2Date.getTime() - date1Date.getTime();if(diff < 0) {diff = diff * -1;}
for(var i=0; i < liste.length; i++) {floorValue = Math.floor(diff / liste[i][0]);if(floorValue > 0) {if(liste[i][1] == 'date') {return ''+prepend + date1Date.getDate() +' '+ this.months[date1Date.getMonth()] +' '+ date1Date.getFullYear();}else{return liste[i][1];}}}
return 0;}};function smartTrunc(str, len) {if(str.length <= len) {return str;}
str = str.substring(0, len);str = str.replace(/\w*$/, '...');return str;}
function getIframeDocument(ifra) {var doc = null;try {if(ifra.contentDocument) {doc = ifra.contentDocument;}else if(ifra.contentWindow) {doc = ifra.contentWindow.document;}else if(ifra.document) {doc = ifra.document;}} catch (e) {return null;}
return doc;}
var rollPub = {tabIblIdPos: new Array(),
position: '',
numPos: '',
defaultDimAd: {width: 300,
height: 250
},
init: function(tabIblIdPos) {this.tabIblIdPos = tabIblIdPos;},
roll: function(numPos) {if(!numPos) {numPos = 0;}
if(!this.tabIblIdPos[numPos]) {return;}
var positionPub = this.tabIblIdPos[numPos][0];var iblIdPub = this.tabIblIdPos[numPos][1];var elem = gId('ibl' + iblIdPub);if(elem == undefined) {return;}
this.position = positionPub;this.numPos = numPos;ifra = document.createElement('iframe');ifra.setAttribute('id', 'idiframe' + positionPub);ifra.src = '/static/html/refreshPub.html';ifra.setAttribute('class', 'inv');ifra.setAttribute('className', 'inv');elem.appendChild(ifra);},
rollEnd: function (numPos) {var positionPub = this.tabIblIdPos[numPos][0];var iblIdPub = this.tabIblIdPos[numPos][1];var elem = gId('ibl' + iblIdPub);if(elem == undefined) {return;}
var ifraDoc = getIframeDocument(gId('idiframe' + positionPub));var cont = ifraDoc.getElementById('pubhook').innerHTML;this.roll(numPos + 1);elem.innerHTML = cont;},
process: function(numPos) {if(!numPos) {numPos = 0;}
if(!this.tabIblIdPos[numPos]) {return;}
this.position = this.tabIblIdPos[numPos][0];this.numPos = numPos;var ifraDoc = gId('idiframe' + this.tabIblIdPos[numPos][0]);if(!ifraDoc) {this.injectIframe(numPos);}else{getIframeDocument(ifraDoc).location.reload();}},
injectIframe: function(numPos) {var positionPub = this.tabIblIdPos[numPos][0],
iblIdPub	= this.tabIblIdPos[numPos][1];var elem = gId('ibl' + iblIdPub);var that = this;if(elem == undefined) {return;}
ifraDoc = document.createElement('iframe');ifraDoc.setAttribute('id', 'idiframe' + positionPub);ifraDoc.src = '/static/html/refreshPub.html';ifraDoc.setAttribute('frameborder', '0');ifraDoc.setAttribute('scrolling', 'no');ifraDoc.setAttribute('height', this.defaultDimAd.height);ifraDoc.setAttribute('width', this.defaultDimAd.width);ifraDoc.onload = function () { that.resizeIframe(numPos) };elem.innerHTML = '';elem.appendChild(ifraDoc);},
resizeIframe: function(numPos) {if(!numPos) {numPos = 0;}
if(!this.tabIblIdPos[numPos]) {return;}
try {var ifraDoc = gId('idiframe' + this.tabIblIdPos[numPos][0]),
height  = getIframeDocument(ifraDoc).documentElement.scrollHeight,
width   = getIframeDocument(ifraDoc).documentElement.scrollWidth;} catch (err) {return;}
if(height > this.defaultDimAd.height) {ifraDoc.setAttribute('height', height);}
if(width > this.defaultDimAd.width) {ifraDoc.setAttribute('width', width);}},
destroyIframe: function(numPos) {if(!numPos) {numPos = 0;}
if(!this.tabIblIdPos[numPos]) {return;}
try {var ifraDoc = gId('idiframe' + this.tabIblIdPos[numPos][0]);ifraDoc.parentNode.removeChild(ifraDoc);} catch (err) {}}}
function LinkTracker() {this.tabBlcTkeId = new Array();this.eventRegistered = false;this.rubIdSurcharge = false;var self = this;this.addBlockTke = function(tabTkeId) {this.registerEvent();for(i in tabTkeId) {this.tabBlcTkeId[i] = tabTkeId[i];}}
this.registerEvent = function() {if(!this.eventRegistered) {this.eventRegistered = true;addEvtListener(document, 'mousedown', function(e) {self.doOnClick(e);});}}
this.doOnClick = function(e) {var expreg = new RegExp("^iblbt[0-9]+$");var count = 0;var linkNode;var evtNode = e.target || e.srcElement;while(!evtNode.id.match(expreg) && count < 50 && evtNode.parentNode.id != null) {if(!linkNode && evtNode.tagName == 'A') {linkNode = evtNode;}
evtNode = evtNode.parentNode;count++;}
if(!linkNode) {return;}
if(!evtNode.id.match(expreg)) {return;}
var iblId = evtNode.id.substring(5, evtNode.id.length);if(!iblId) {return;}
var href = linkNode.href
if(href == window.location + '#') {if(linkNode.getAttribute('onclick')) {href = linkNode.getAttribute('onclick');}else{return;}}
var rub_id_trk = rub_id;if(this.rubIdSurcharge) {rub_id_trk = this.rubIdSurcharge;}
trkUrl(linkNode, 3, rub_id_trk, this.getTkeId(iblId), unv_id);}
this.getTkeId = function(iblId) {if(this.tabBlcTkeId[iblId] == null) {return "0";}else{return this.tabBlcTkeId[iblId];}}
this.track = function(iblId, urlDest, linkType) {if(!this.eventRegistered) {return;}
var rub_id_trk = rub_id;if(this.rubIdSurcharge) {rub_id_trk = this.rubIdSurcharge;}
trkUrl(urlDest, linkType, rub_id_trk, this.getTkeId(iblId), unv_id);}}
linkTracker = new LinkTracker();var HABILLAGE_PUB = {};(function() {HABILLAGE_PUB.home = function(options) {this.options = options;this.initialize();};HABILLAGE_PUB.home.prototype = {options: {backgroundUrl: false,
backgroundColor: false,
backgroundHeaderUrl: false,
backgroundZnNav: false,
color1: false,
color2: false,
heightZone: false,
clicZoneCenter: false,
clicZoneLeft: false,
clicZoneRight: false,
flashZone: false,
flashVars: false,
backgroundTopPosition: 0,
trackerUrl: false,
debugMode: false
},
initialize: function() {if(!this.validHome()) return;this.pimpHome();this.setClicZone();},
validHome: function() {if(this.options.backgroundColor && ((this.options.flashZone || this.options.clicZoneCenter) && this.options.heightZone))
return true;if(this.options.debugMode) {this.viewDebug();}
return false;},
viewDebug: function() {try {console.firebug;if(!this.options.backgroundUrl) {console.log("Aucune image de fond spécifiée : backgroundUrl");}
if(!this.options.backgroundColor) {console.log("Aucune couleur de fond spécifiée : backgroundColor");}
if(!this.options.flashZone && !this.options.zoneClicCenter) {console.log("Aucun flash (flashZone) ou aucune zone de clic (zoneClicCenter) spécifié")
}}
catch(e) {}},
pimpHome: function() {var head = document.getElementsByTagName('head')[0], style = document.createElement('style');style.type = 'text/css';var rules = [];if(this.options.backgroundTopPosition > 0) {this.options.backgroundTopPosition += 'px';}
if(this.options.backgroundUrl){rules.push(['#pageMain { background: url('+this.options.backgroundUrl+') no-repeat center ' + this.options.backgroundTopPosition +' }']);rules.push(['#ZoneFond { background: none }']);}
if(this.options.backgroundColor){rules.push(['#pageMain {background-color: '+this.options.backgroundColor+'}']);}
if(this.options.backgroundHeaderUrl){rules.push(['.mzn0 { background: url('+this.options.backgroundHeaderUrl+') repeat-x }']);rules.push(['.bgimgMasthead { background: none }']);}
if(this.options.backgroundZnNav){rules.push(['.mznNav { background: '+this.options.backgroundZnNav+'; width: 100%; }']);}
if(this.options.color1){rules.push(['[id*="iblt"] * {color: '+this.options.color1+'!important }']);rules.push(['#PubFooter { background-color: '+this.options.color1+'!important }']);}
if(this.options.color2){rules.push(['.bgimgFooter { background-color: '+this.options.color2+'!important }']);rules.push(['.cc { color: '+this.options.color2+'!important }']);rules.push(['.bgcc { color: '+this.options.color2+'!important }']);}
if(this.options.heightZone){rules.push(['#ZnPub {height: '+this.options.heightZone+'px;}']);}
if(style.styleSheet) {var textCss = '';$.each(rules, function(i, item) {textCss += item;});style.styleSheet.cssText = textCss;}
else{$.each(rules, function(i, item) {style.appendChild(document.createTextNode(item));});}
head.appendChild(style);},
setClicZone: function() {if(this.options.clicZoneCenter && this.options.heightZone) {var clic1 = $('<a>', {href: this.options.clicZoneCenter,
target: '_blank'
});clic1.css({width: '1000px',
height: this.options.heightZone+'px',
display: 'block',
margin: '0 auto'
});$('#ZnPub').prepend(clic1);}
var larg = this.archLinkWidth();var height = this.documentHeight();if(this.options.clicZoneLeft){var clic2 = $('<a>', {href: this.options.clicZoneLeft,
target: '_blank'
});clic2.css({width: larg+'px',
height: height+'px',
position: 'absolute',
left: 0,
top: 0
});$(document.body).prepend(clic2);}
if(this.options.clicZoneRight){var clic3 = $('<a>', {href: this.options.clicZoneRight,
target: '_blank'
});clic3.css({width: larg+'px',
height: height+'px',
position: 'absolute',
right: 0,
top: 0
});$(document.body).prepend(clic3);}},
archLinkWidth: function() {var largeurPage = 980;if(document.body) {var larg = (document.body.clientWidth);}else{var larg = (window.innerWidth);}
return Math.max(Math.floor((larg-largeurPage)/2), 0);},
documentHeight: function() {if(document.body) {return document.body.clientHeight;}else{return window.innerHeight;}}}})();addEvtListener(window,'load',doOnPageLoad);var TF1Overlay = {box:null,
iframe:null,
node:null,
loadingPanel:null,
browserIsIE : navigator.userAgent.indexOf("MSIE") != -1,
browserIsIE6 : navigator.userAgent.indexOf("MSIE 6.0") != -1,
browserIsIE7 : navigator.userAgent.indexOf("MSIE 7.0") != -1,
browserIsIE8 : navigator.userAgent.indexOf("MSIE 8.0") != -1,
browserIsChrome : navigator.userAgent.indexOf("Chrome") != -1,
browserIsFirefox : navigator.userAgent.indexOf("Firefox") != -1,
width:null,
height:null,
stayInsideOnTerminated:false,
callbackOnTerminated:null,
callbackOnLoad:null,
displayIsAllowed:true,
cancelLoading:false,
savedFlashVisibility:{object:[],embed:[]},
tsLastResize:0,
flashsAreVisible:true,
fallbackTitle:'',
DEFAULT_WIDTH:800,
DEFAULT_HEIGHT:600,
trkType:null,
trkRub:null,
trkE:null,
trkU:null,
close : function(targetUrl) {if(this.loadingPanel == null) {return;}
this.loadingPanel.style.display = 'none';document.body.removeChild(this.node);this.node = null;this.doOnAfterUsed();if(typeof targetUrl == 'undefined' || targetUrl == null || targetUrl.indexOf('emptyUrl') != -1) {if(typeof AccountBloc != 'undefined') {AccountBloc.update();}
TF1Overlay.switchFlashsVisibility(true);return;}
if(targetUrl == '') {window.location.reload();return;}
if(targetUrl.indexOf('/') == 0) {targetUrl = 'http://' + window.location.hostname + targetUrl;}
window.location.href = targetUrl;},
doOnTerminated : function(targetUrl) {this.cancelLoad = true;if(this.callbackOnTerminated != null) {this.callbackOnTerminated(targetUrl);}else{this.close(targetUrl);}},
stayInside : function() {return this.stayInsideOnTerminated;},
trk : function(type,rub,e,u) {this.trkType = type;this.trkRub = rub;this.trkE = e;this.trkU = u;},
open : function(url, width, height, stayInsideOnTerminated, overlayCallbackOnTerminated, overlayCallbackOnLoad) {if(!isNaN(this.trkType)) {trkUrl(url, this.trkType, this.trkRub, this.trkE, this.trkU);}
this.width = !isNaN(width)?width:null;this.height = !isNaN(height)?height:null;if(typeof stayInsideOnTerminated != 'undefined') {this.stayInsideOnTerminated = stayInsideOnTerminated;}
if(typeof overlayCallbackOnTerminated == 'function') {this.callbackOnTerminated = overlayCallbackOnTerminated;}else{this.callbackOnTerminated = null;}
if(typeof overlayCallbackOnLoad == 'function') {this.callbackOnLoad = overlayCallbackOnLoad;}else{this.callbackOnLoad = null;}
this.doOnBeforeUsed();if(this.node == null) {var ifrStr = '<div id="TF1OverlayMask" onclick="TF1Overlay.doOnClickMask(event)"></div><div id="TF1OverlayBox"><div id="TF1OverlayBar"><div id="TF1OverlayTitle"></div><div id="TF1OverlayBoxClose" onclick="TF1Overlay.doOnClickClose()">Fermer</div></div><iframe id="TF1OverlayFrame" frameborder="0" onload="TF1Overlay.doOnLoad()"';ifrStr+= '></iframe></div>';var node = document.createElement('div');node.id = 'TF1Overlay';node.style.display = 'none';node.innerHTML = ifrStr;this.node = node;this.loadingPanel = document.createElement('div');this.loadingPanel.id = 'TF1OverlayLoading';document.body.appendChild(this.loadingPanel);document.body.appendChild(this.node);this.iframe = document.getElementById('TF1OverlayFrame');this.box = document.getElementById('TF1OverlayBox');}else{this.iframe.style.height = '0px';}
var viewboxWidth = this.getViewboxWidth();var viewboxHeight = this.getViewboxHeight();var loadingPanel = this.loadingPanel;loadingPanel.style.display = 'block';loadingPanel.style.left = ((viewboxWidth - this.loadingPanel.offsetWidth) / 2) + 'px';loadingPanel.style.top = document.documentElement.scrollTop + ((viewboxHeight - this.loadingPanel.offsetHeight) / 2) + 'px';this.iframe.src = url;},
switchFlashsVisibility : function(makeVisible) {if(!this.flashsAreVisible && !makeVisible) {return;}
if(this.flashsAreVisible && makeVisible) {return;}
if(!makeVisible) {this.savedFlashVisibility = {object:[],embed:[]};}
var objList = document.getElementsByTagName('object');var e = null;for(var i = 0; i < objList.length; i++) {var e = objList.item(i);if(makeVisible) {e.style.visibility = this.savedFlashVisibility.object[i];}else{this.savedFlashVisibility.object[i] = e.style.visibility;e.style.visibility = 'hidden';}}
var objList = document.getElementsByTagName('embed');for(var i = 0; i < objList.length; i++) {var e = objList.item(i);if(makeVisible) {e.style.visibility = this.savedFlashVisibility.embed[i];}else{this.savedFlashVisibility.embed[i] = e.style.visibility;e.style.visibility = 'hidden';}}
this.flashsAreVisible = makeVisible;},
getViewboxWidth : function() {var viewboxWidth = document.documentElement.clientWidth;if(this.browserIsIE && viewboxWidth == 0) {viewboxWidth = document.documentElement.offsetWidth;}
if(this.browserIsFirefox) {viewboxWidth = Math.min(document.documentElement.clientWidth, document.body.clientWidth);}
return viewboxWidth;},
getViewboxHeight : function() {var viewboxHeight = document.documentElement.clientHeight;if(this.browserIsIE && viewboxHeight == 0) {viewboxHeight = document.documentElement.offsetHeight;}
if(this.browserIsFirefox) {viewboxHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight);}
return viewboxHeight;},
doOnClickMask : function(evt) {if(!evt) {var evt = window.event;}
if(evt.stopPropagation) {evt.stopPropagation();}else{evt.cancelBubble = true;}},
doOnClickClose : function() {this.close(null);},
setFallbackTitle : function(title) {this.fallbackTitle = title;},
doOnLoad : function() {if(this.cancelLoad) {this.cancelLoad = false;return;}
if(this.callbackOnLoad != null) {this.callbackOnLoad();}
var title = '';try {title = this.iframe.contentWindow.Mso.getTitle();} catch(e) {title = this.fallbackTitle;}
document.getElementById('TF1OverlayTitle').innerHTML = title;if(this.displayIsAllowed) {this.show();}},
show : function() {this.loadingPanel.style.display = 'none';TF1Overlay.switchFlashsVisibility(false);this.node.style.display = 'block';this.resize();},
setDisplayIsAllowed : function(allowed) {this.displayIsAllowed = allowed;},
resize : function() {var now = (new Date).getTime();if(this.browserIsIE8 && (now - this.tsLastResize < 250)) {this.tsLastResize = now;return;}
this.tsLastResize = now;var viewboxWidth = this.getViewboxWidth();var viewboxHeight = this.getViewboxHeight();var documentScrollHeight = document.documentElement.scrollHeight;var documentScrollTop = document.documentElement.scrollTop;if(this.browserIsChrome) {documentScrollHeight = Math.max(documentScrollHeight, document.documentElement.clientHeight);documentScrollTop = $("body").scrollTop();}
var iframeDoc = null;try {var iframeDoc = this.iframe.contentWindow.document;} catch (e) {}
var iframeContentHeight = null;var iframeContentWidth = null;if(iframeDoc != null && iframeDoc.body != null) {iframeContentHeight = iframeDoc.body.scrollHeight;iframeContentWidth = iframeDoc.body.scrollWidth;if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){var ffversion=parseFloat(RegExp.$1)
if(ffversion == 3) {iframeContentWidth = Math.max(iframeContentWidth, iframeDoc.documentElement.scrollWidth);}}
if(this.browserIsIE6 || this.browserIsIE7) {iframeContentHeight+= 10;iframeContentWidth+= 10;}}
if(this.height != null) {iframeContentHeight = this.height;}else if(iframeContentHeight == null) {iframeContentHeight = this.DEFAULT_HEIGHT;}
if(this.width != null) {iframeContentWidth = this.width;}else if(iframeContentWidth == null) {iframeContentWidth = this.DEFAULT_WIDTH;}
this.iframe.style.height = iframeContentHeight + 'px';var overlayBar = document.getElementById('TF1OverlayBar');var newBoxHeight = iframeContentHeight + overlayBar.offsetHeight;var newBoxWidth = iframeContentWidth;this.box.style.height = newBoxHeight + 'px';this.box.style.width = newBoxWidth + 'px';this.box.style.left = ((viewboxWidth - newBoxWidth) / 2) + 'px';var spacerHeight = (viewboxHeight - newBoxHeight) / 2;var newOverlayHeight = 0;if(spacerHeight < 0) {spacerHeight = 100;newOverlayHeight = Math.max(newBoxHeight + spacerHeight * 2, documentScrollHeight);}else{newOverlayHeight = documentScrollHeight;}
this.node.style.height = newOverlayHeight + 'px';if(this.browserIsIE6) {document.getElementById('TF1OverlayMask').style.height = newOverlayHeight + 'px';this.node.style.width = document.documentElement.clientWidth;}
this.box.style.top = documentScrollTop + spacerHeight + 'px';},
setSize : function(width, height) {this.height = height;this.width = width;},
doOnWindowResize : function() {TF1Overlay.resize();},
doOnBeforeUsed : function() {if(!/(.xiti.com)|(.atinternet-solutions.com)/.test(document.domain)) {document.domain = getMainDocDomain();}
addEvtListener(window, 'resize', this.doOnWindowResize);},
doOnAfterUsed : function() {removeEvtListener(window, 'resize', this.doOnWindowResize);}}
var MsoFront = {DEFAULT_POPUP_WIDTH : 800,
DEFAULT_POPUP_HEIGHT : 600,
protectedVideoMsg : 'Pour accéder au Live, vous devez avoir un compte TF1.fr<br/><a href="#" onclick="MsoFront.doOnClickWatVideoSubscribe(true);return false;">Identifiez-vous</a> ou <a href="#" onclick="MsoFront.doOnClickWatVideoSubscribe(false);return false;">inscrivez-vous</a> gratuitement.',
serviceAvailable : true,
open : function(pageName, unvId, srvId, targetUrl, useOverlay, overlayCallbackOnTerminated, popupParams, overlayCallbackOnLoad, paramGet) {var url = this.getUrl(pageName, unvId, srvId, targetUrl, paramGet);this.openUrl(url, useOverlay, overlayCallbackOnTerminated, popupParams, overlayCallbackOnLoad);},
openUrl : function(url, useOverlay, overlayCallbackOnTerminated, popupParams, overlayCallbackOnLoad) {if(typeof useOverlay == 'undefined') {useOverlay = true;}
if(!useOverlay) {window.location.href = url;return;}
var width = null;var height = null;if(typeof popupParams == 'undefined') {popupParams = null;}
if(typeof overlayCallbackOnTerminated != 'function' && popupParams != null) {overlayCallbackOnTerminated = function(url) {var width = (typeof popupParams.width != 'undefined')?popupParams.width:MsoFront.DEFAULT_POPUP_WIDTH;var height = (typeof popupParams.height != 'undefined')?popupParams.height:MsoFront.DEFAULT_POPUP_HEIGHT;var windowName = (typeof popupParams.windowName != 'undefined')?popupParams.windowName:'Popup';var features = 'width=' + width + ',height=' + height;window.open(url, windowName, features);TF1Overlay.close();}}
TF1Overlay.open(url, width, height, false, overlayCallbackOnTerminated, overlayCallbackOnLoad);},
getUrl : function(pageName, unvId, srvId, targetUrl, paramGet) {if(typeof targetUrl == 'undefined' || targetUrl == '') {if(pageName == 'deconnexion' && window.location.href.indexOf('/mon-compte/') != -1) {targetUrl = 'http://' + window.location.hostname;}else{targetUrl = escape(window.location.href);}}
if(targetUrl.indexOf('/') == 0) {targetUrl = 'http://' + window.location.hostname + targetUrl;}
if(targetUrl == 'emptyUrl' && TF1Overlay.browserIsIE6) {targetUrl+= '_' + escape(top.location.href);}
if(typeof paramGet == 'undefined' || paramGet == '') {paramGet = '';}else{paramGet += '&'+paramGet;}
var url = 'http://' + LOGIN_HOSTNAME + '/src/' + pageName + '.php?unv_id=' + unvId + '&srv_id=' + srvId + '&referer=' + targetUrl+paramGet;return url;},
doOnLoadProtectedVideo : function() {if(!MsoFront.userIsIdentified()) {MsoFront.showOverlayWatVideo();return;}
MsoFront.checkUserSubscription(MsoFront.SRV_ID_VIDEO);},
getElementPosition : function(theElement) {var posX = 0;var posY = 0;while(theElement != null){posX += theElement.offsetLeft;posY += theElement.offsetTop;theElement = theElement.offsetParent;}
return {x:posX,y: posY};},
setProtectedVideoMsg : function(msg) {this.protectedVideoMsg = msg;},
showOverlayWatVideo : function() {var flashPlayer = gId('FlashPlayer');var playerInstance = gId('WATPlayerInstance');if(flashPlayer == null) {return;}
flashPlayer.style.backgroundColor = '#000000';var frame = document.getElementById('watOverlayFrame');var panel = document.getElementById('watOverlayPanel');if(frame == null) {frame = document.createElement('iframe');frame.id = 'watOverlayFrame';flashPlayer.parentNode.appendChild(frame);panel = document.createElement('div');panel.id = 'watOverlayPanel';panel.innerHTML = '<div id="watOverlaySpacer">&nbsp;</div>' + this.protectedVideoMsg;flashPlayer.parentNode.appendChild(panel);}
this.watDoOnResize();playerInstance.style.visibility = 'hidden';addEvtListener(window, 'resize', MsoFront.watDoOnResize);},
watDoOnResize : function() {var flashPlayer = gId('FlashPlayer');var playerHeight = flashPlayer.style.height;var panel = document.getElementById('watOverlayPanel');var p = MsoFront.getElementPosition(flashPlayer);var frame = gId('watOverlayFrame');frame.style.top = p.y + 'px';frame.style.left = p.x + 'px';frame.style.height = playerHeight;panel.style.top = p.y + 'px';panel.style.left = p.x + 'px';panel.style.height = playerHeight;},
hideOverlayWatVideo : function() {var playerInstance = gId('WATPlayerInstance');var frame = document.getElementById('watOverlayFrame');var panel = document.getElementById('watOverlayPanel');if(playerInstance == null || frame == null || panel == null) {return;}
removeEvtListener(window, 'resize', MsoFront.watDoOnResize);playerInstance.style.visibility = 'visible';var flashPlayer = gId('FlashPlayer');flashPlayer.parentNode.removeChild(frame);flashPlayer.parentNode.removeChild(panel);},
doOnClickWatVideoSubscribe : function(ident) {var pageName = '';if(ident) {pageName = 'identification';}else{pageName = 'inscription';}
this.open(pageName, unv_id, this.SRV_ID_VIDEO, 'emptyUrl', true, this.doOnLoadProtectedVideo);},
userIsIdentified : function() {var ticket = getCookie('_MSOTICKET_');var identified = (ticket != 'Undefined' && ticket.match(/[0-9]{30}/) != null);return identified;},
userIsConfirmed : function() {var usrConfirmed = getCookie('_MSOCONFIRMED_');var confirmed = (usrConfirmed != 'Undefined' && usrConfirmed == '0')? false : true;return confirmed;},
userIsSubscribed : function(srvId) {var msoSrv = getCookie('_MSOSRV_');var srvList = [];if(msoSrv != 'Undefined' && msoSrv.match(/^[0-9;]+/) != null) {srvList = unescape(msoSrv).split(',');}
for(var i = 0, n = srvList.length; i < n; i++) {if(srvList[i] == srvId) {return true;}}
return false;},
userIsAllowedWatVideo : function(srvId) {this.SRV_ID_VIDEO = srvId;if(this.userIsIdentified() && this.userIsSubscribed(srvId)) {return "1";}
return "0";},
checkUserSubscription : function(srvId) {if(MsoFront.userIsSubscribed(srvId)) {MsoFront.doOnUserSubscriptionChecked();return;}
this.open('identification', unv_id, srvId, 'emptyUrl', true, function () {MsoFront.checkUserSubscription(srvId)});},
doOnUserSubscriptionChecked : function() {TF1Overlay.close();MsoFront.hideOverlayWatVideo();if(typeof WATPlayer != 'undefined') {WATPlayer.userAuthorisationGranted();}},
getUserPseudo : function() {var c = getCookie('_MSOPSEUDO_');return (c != 'Undefined')?c:'';},
getUserMail : function() {var c = getCookie('_MSOMAIL_');return (c != 'Undefined')?c:'';},
isServiceAvailable : function() {return this.serviceAvailable;},
setServiceAvailable : function(status) {this.serviceAvailable = status;}}
if(typeof(bsn) == "undefined")
_b = bsn = {};if(typeof(_b.Autosuggest) == "undefined")
_b.Autosuggest = {};_b.AutoSuggest = function (id, param)
{if(!document.getElementById)
return 0;this.fld = _b.DOM.gE(id);if(!this.fld)
return 0;this.sInp 	= "";this.nInpC 	= 0;this.aSug 	= [];this.iHigh 	= 0;this.oP = param ? param : {};var k, def = {minchars:1, meth:"get", varname:"input", className:"autosuggest", timeout:2500, delay:500, offsety:-5, shownoresults: true, noresults: "No results!", maxheight: 250, cache: true, maxentries: 25};for(k in def)
{if(typeof(this.oP[k]) != typeof(def[k]))
this.oP[k] = def[k];}
var p = this;this.fld.onkeypress 	= function(ev){ return p.onKeyPress(ev); };this.fld.onkeyup 		= function(ev){ return p.onKeyUp(ev); };this.fld.setAttribute("autocomplete","off");};_b.AutoSuggest.prototype.onKeyPress = function(ev)
{var key = (window.event) ? window.event.keyCode : ev.keyCode;var RETURN = 13;var TAB = 9;var ESC = 27;var bubble = 1;switch(key)
{case RETURN:
this.setHighlightedValue();bubble = 0;break;case ESC:
this.clearSuggestions();break;}
return bubble;};_b.AutoSuggest.prototype.onKeyUp = function(ev)
{var key = (window.event) ? window.event.keyCode : ev.keyCode;var ARRUP = 38;var ARRDN = 40;var bubble = 1;switch(key)
{case ARRUP:
this.changeHighlight(key);bubble = 0;break;case ARRDN:
this.changeHighlight(key);bubble = 0;break;default:
this.getSuggestions(this.fld.value);}
return bubble;};_b.AutoSuggest.prototype.getSuggestions = function (val)
{if(val == this.sInp)
return 0;_b.DOM.remE(this.idAs);this.sInp = val;if(val.length < this.oP.minchars)
{this.aSug = [];this.nInpC = val.length;return 0;}
var ol = this.nInpC;this.nInpC = val.length ? val.length : 0;var l = this.aSug.length;if(this.nInpC > ol && l && l<this.oP.maxentries && this.oP.cache)
{var arr = [];for(var i=0;i<l;i++)
{if(this.aSug[i].value.substr(0,val.length).toLowerCase() == val.toLowerCase())
arr.push( this.aSug[i] );}
this.aSug = arr;this.createList(this.aSug);return false;}
else
{var pointer = this;var input = this.sInp;clearTimeout(this.ajID);this.ajID = setTimeout( function() { pointer.doAjaxRequest(input) }, this.oP.delay );}
return false;};_b.AutoSuggest.prototype.doAjaxRequest = function (input)
{if(input != this.fld.value)
return false;var pointer = this;if(typeof(this.oP.script) == "function")
var url = this.oP.script(encodeURIComponent(this.sInp));else
var url = this.oP.script+this.oP.varname+"="+encodeURIComponent(this.sInp);if(!url)
return false;var meth = this.oP.meth;var input = this.sInp;var onSuccessFunc = function (req) { pointer.setSuggestions(req, input) };var onErrorFunc = function (status) {};var myAjax = new _b.Ajax();myAjax.makeRequest( url, meth, onSuccessFunc, onErrorFunc );};_b.AutoSuggest.prototype.setSuggestions = function (req, input)
{if(input != this.fld.value)
return false;this.aSug = [];if(this.oP.json)
{var jsondata = eval('(' + req.responseText + ')');if(jsondata[1].length > 0) {for(var i=0; i<jsondata[1].length; i++) {this.aSug.push({'id':i, 'value':jsondata[1][i]});}}}
else
{var xml = req.responseXML;var results = xml.getElementsByTagName('results')[0].childNodes;for(var i=0;i<results.length;i++)
{if(results[i].hasChildNodes())
this.aSug.push(  { 'id':results[i].getAttribute('id'), 'value':results[i].childNodes[0].nodeValue, 'info':results[i].getAttribute('info') }  );}}
this.idAs = "as_"+this.fld.id;this.createList(this.aSug);};_b.AutoSuggest.prototype.createList = function(arr)
{var pointer = this;_b.DOM.remE(this.idAs);this.killTimeout();if(arr.length == 0 && !this.oP.shownoresults)
return false;var div = _b.DOM.cE("div", {id:this.idAs, className:this.oP.className});var hcorner = _b.DOM.cE("div", {className:"as_corner"});var hbar = _b.DOM.cE("div", {className:"as_bar"});var header = _b.DOM.cE("div", {className:"as_header"});header.appendChild(hcorner);header.appendChild(hbar);div.appendChild(header);var ul = _b.DOM.cE("ul", {id:"as_ul"});for(var i=0;i<arr.length;i++)
{var val = arr[i].value;var st = val.toLowerCase().indexOf( this.sInp.toLowerCase() );var output = val.substring(0,st) + "<em>" + val.substring(st, st+this.sInp.length) + "</em>" + val.substring(st+this.sInp.length);var span 		= _b.DOM.cE("span", {}, output, true);if(arr[i].info != "")
{var br			= _b.DOM.cE("br", {});span.appendChild(br);var small		= _b.DOM.cE("small", {}, arr[i].info);span.appendChild(small);}
var a 			= _b.DOM.cE("a", { href:"#" });var tl 		= _b.DOM.cE("span", {className:"tl"}, " ");var tr 		= _b.DOM.cE("span", {className:"tr"}, " ");a.appendChild(tl);a.appendChild(tr);a.appendChild(span);a.name = i+1;a.onclick = function () { pointer.setHighlightedValue(); return false; };a.onmouseover = function () { pointer.setHighlight(this.name); };var li = _b.DOM.cE(  "li", {}, a  );ul.appendChild( li );}
if(arr.length == 0 && this.oP.shownoresults)
{var li = _b.DOM.cE(  "li", {className:"as_warning"}, this.oP.noresults  );ul.appendChild( li );}
div.appendChild( ul );var fcorner = _b.DOM.cE("div", {className:"as_corner"});var fbar = _b.DOM.cE("div", {className:"as_bar"});var footer = _b.DOM.cE("div", {className:"as_footer"});footer.appendChild(fcorner);footer.appendChild(fbar);div.appendChild(footer);var pos = _b.DOM.getPos(this.fld);div.style.left 		= pos.x + "px";div.style.top 		= ( pos.y + this.fld.offsetHeight + this.oP.offsety ) + "px";div.style.width 	= this.fld.offsetWidth + "px";div.onmouseover 	= function(){ pointer.killTimeout() };div.onmouseout 		= function(){ pointer.resetTimeout() };document.getElementsByTagName("body")[0].appendChild(div);this.iHigh = 0;var pointer = this;this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);};_b.AutoSuggest.prototype.changeHighlight = function(key)
{var list = _b.DOM.gE("as_ul");if(!list)
return false;var n;if(key == 40)
n = this.iHigh + 1;else if(key == 38)
n = this.iHigh - 1;if(n > list.childNodes.length)
n = list.childNodes.length;if(n < 1)
n = 1;this.setHighlight(n);};_b.AutoSuggest.prototype.setHighlight = function(n)
{var list = _b.DOM.gE("as_ul");if(!list)
return false;if(this.iHigh > 0)
this.clearHighlight();this.iHigh = Number(n);list.childNodes[this.iHigh-1].className = "as_highlight";this.killTimeout();};_b.AutoSuggest.prototype.clearHighlight = function()
{var list = _b.DOM.gE("as_ul");if(!list)
return false;if(this.iHigh > 0)
{list.childNodes[this.iHigh-1].className = "";this.iHigh = 0;}};_b.AutoSuggest.prototype.setHighlightedValue = function ()
{if(this.iHigh)
{this.sInp = this.fld.value = this.aSug[ this.iHigh-1 ].value;this.fld.focus();if(this.fld.selectionStart)
this.fld.setSelectionRange(this.sInp.length, this.sInp.length);this.clearSuggestions();if(typeof(this.oP.callback) == "function")
this.oP.callback( this.aSug[this.iHigh-1] );}};_b.AutoSuggest.prototype.killTimeout = function()
{clearTimeout(this.toID);};_b.AutoSuggest.prototype.resetTimeout = function()
{clearTimeout(this.toID);var pointer = this;this.toID = setTimeout(function () { pointer.clearSuggestions() }, 1000);};_b.AutoSuggest.prototype.clearSuggestions = function ()
{this.killTimeout();var ele = _b.DOM.gE(this.idAs);var pointer = this;if(ele)
{var fade = new _b.Fader(ele,1,0,250,function () { _b.DOM.remE(pointer.idAs) });}};if(typeof(_b.Ajax) == "undefined")
_b.Ajax = {};_b.Ajax = function ()
{this.req = {};this.isIE = false;};_b.Ajax.prototype.makeRequest = function (url, meth, onComp, onErr)
{if(meth != "POST")
meth = "GET";this.onComplete = onComp;this.onError = onErr;var pointer = this;if(window.XMLHttpRequest)
{this.req = new XMLHttpRequest();this.req.onreadystatechange = function () { pointer.processReqChange() };this.req.open("GET", url, true);this.req.send(null);}
else if(window.ActiveXObject)
{this.req = new ActiveXObject("Microsoft.XMLHTTP");if(this.req)
{this.req.onreadystatechange = function () { pointer.processReqChange() };this.req.open(meth, url, true);this.req.send();}}};_b.Ajax.prototype.processReqChange = function()
{if(this.req.readyState == 4) {if(this.req.status == 200)
{this.onComplete( this.req );}else{this.onError( this.req.status );}}};if(typeof(_b.DOM) == "undefined")
_b.DOM = {};_b.DOM.cE = function ( type, attr, cont, html )
{var ne = document.createElement( type );if(!ne)
return 0;for(var a in attr)
ne[a] = attr[a];var t = typeof(cont);if(t == "string" && !html)
ne.appendChild( document.createTextNode(cont) );else if(t == "string" && html)
ne.innerHTML = cont;else if(t == "object")
ne.appendChild( cont );return ne;};_b.DOM.gE = function ( e )
{var t=typeof(e);if(t == "undefined")
return 0;else if(t == "string")
{var re = document.getElementById( e );if(!re)
return 0;else if(typeof(re.appendChild) != "undefined" )
return re;else
return 0;}
else if(typeof(e.appendChild) != "undefined")
return e;else
return 0;};_b.DOM.remE = function ( ele )
{var e = this.gE(ele);if(!e)
return 0;else if(e.parentNode.removeChild(e))
return true;else
return 0;};_b.DOM.getPos = function ( e )
{var e = this.gE(e);var obj = e;var curleft = 0;if(obj.offsetParent)
{while(obj.offsetParent)
{curleft += obj.offsetLeft;obj = obj.offsetParent;}}
else if(obj.x)
curleft += obj.x;var obj = e;var curtop = 0;if(obj.offsetParent)
{while(obj.offsetParent)
{curtop += obj.offsetTop;obj = obj.offsetParent;}}
else if(obj.y)
curtop += obj.y;return {x:curleft, y:curtop};};if(typeof(_b.Fader) == "undefined")
_b.Fader = {};_b.Fader = function (ele, from, to, fadetime, callback)
{if(!ele)
return 0;this.e = ele;this.from = from;this.to = to;this.cb = callback;this.nDur = fadetime;this.nInt = 50;this.nTime = 0;var p = this;this.nID = setInterval(function() { p._fade() }, this.nInt);};_b.Fader.prototype._fade = function()
{this.nTime += this.nInt;var ieop = Math.round( this._tween(this.nTime, this.from, this.to, this.nDur) * 100 );var op = ieop / 100;if(this.e.filters)
{try
{this.e.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieop;} catch (e) {this.e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';}}
else
{this.e.style.opacity = op;}
if(this.nTime == this.nDur)
{clearInterval( this.nID );if(this.cb != undefined)
this.cb();}};_b.Fader.prototype._tween = function(t,b,c,d)
{return b + ( (c-b) * (t/d) );};
/*<167061>*/var AccountBloc = {SRV_ID : 8323,
generate : function() {if(MsoFront.userIsIdentified()) {s  = '<span class="m-sprite m-compte"></span><a href="#" class="c7 sz11">Mon compte</a></span>';s += '<ul class="level1"><div>';s += '<li>';s += '<a href="http://www.tf1.fr/mon-compte/">Mes infos persos</a></li>';s += '<li>';s += '<a href="http://www.tf1.fr/mon-compte/mes-newsletters/">Mes newsletters</a></li>';s += '<li>';s += '<a href="http://www.tf1.fr/mon-compte/mes-moyens-de-paiement/">Mes moyens de paiement</a></li>';s += '<li class="last">';s += '<a href="' + MsoFront.getUrl('deconnexion', 1, AccountBloc.SRV_ID) + '">Deconnexion</a>';s += '</ul><div>';}else{s = '<span class="m-sprite m-compte"></span><a href="#" class="c7 sz11" onClick="MsoFront.open(\'identification\', 1, AccountBloc.SRV_ID);return false;">Créer un compte</a></span>';}
return s;},
build : function() {var s = this.generate();var cellule = jQuery('<li/>', {id: 'nav-login167061'
}).addClass('d-inline').html(s);jQuery("#nav-right167061").append(cellule);},
update : function() {var s = this.generate();gId('nav-login167061').innerHTML = s;}};if(!/(.xiti.com)|(.atinternet-solutions.com)/.test(document.domain)) {document.domain = getMainDocDomain();}/*</167061>*/
/*<167061>*/var TopMenu = {SRV_ID : 8323,
init: function() {var
l = s = '',
listContainer = jQuery('<div/>', { 'class':'list grid-980' }),
listNav = jQuery('<ul/>'),
rightNav = jQuery('<ul/>', { 'id':'nav-right167061', 'class':'nav-right' });l += '<li class="d-inline">';l += '<a href="http://www.tf1.fr/" class="c5 sz11">MYTF1</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://lci.tf1.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">MYTF1News</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://mytf1vod.tf1.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">MYTF1 VOD</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.tfou.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">TFOU</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.tf1.fr/auto-moto/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">Automoto</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.tf1.fr/telefoot/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">Téléfoot</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.teleshopping.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">Téléshopping</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.plurielles.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">Plurielles</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.wat.tv/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">WAT</a>';l += '</li>';l += '<li class="c5 sz11 d-inline">|</li>';l += '<li class="d-inline">';l += '<a href="http://www.metronews.fr/" class="c5 sz11" onclick="window.open(this.href, \'_blank\');return false">Metronews</a>';l += '</li>';s += '<li class="d-inline">';s += '<span class="m-sprite picto m-service"></span>';s += '<a href="http://www.tf1.fr/services/" class="c7 sz11" >Services</a>';s += '</li>';s += '<li class="d-inline">';s += '<span class="m-sprite picto m-shopping"></span>';s += '<a href="http://www.tf1.fr/shopping/" class="c7 sz11" >Shopping</a>';s += '</li>';jQuery('#bandeau-nav167061').html( listContainer.append( listNav.html(l) , rightNav.html(s) ) );AccountBloc.build();}};/*</167061>*/
function rboSearch167178(frm) {var query   = frm.query.value,
site    = frm.site.value,
url     = frm.action + '?query=' + query  + '&site=' + site  + '&f=INFO&s=date'  ,
input;if(window.location.hostname.indexOf('videos') != -1) {url += '&f=' + 'VIDEOS';input = document.createElement('input');input.setAttribute('type', 'hidden');input.setAttribute('name', 'f');input.setAttribute('value', 'VIDEO');frm.appendChild(input);}
linkTracker.track(167178, url, 1);return true;}
var autosuggestOptions167178 = {nbCharMin               : "2",
baseSearchUrl           : "http://api.tf1.fr/suggest/search/",
domain                  : "TF1 NEWS",
theme                   : '',
theme_exclude           : '',
containerClass          : 'autosuggest167178',
inviteMsg               : '',
maxVisibleResults       : 3,
inactiveHidingDelay     : 4000,
fastHidingDelay         : 1000,
fullSearchMsg           : '<span  class="accrocheR11 t1 bgcc"><span  class="accLeftBgGrisFleche"></span><strong class="accRightBgGris">Tous les  résultats</strong></span>',
withInputValue          : false,
nbCharMaxTitre          : 50,
afficherCatchup         : false,
nbCharMaxCatchupTitre   : 50
};jQuery(document).ready(function() {if(typeof jQuery("#moteur_recherche_site167178").tf1AutoSuggest != 'undefined') {jQuery("#moteur_recherche_site167178").tf1AutoSuggest(autosuggestOptions167178);}
if( !("placeholder" in document.createElement("input")) ) {jQuery("input[placeholder], textarea[placeholder]").each(function() {var val = jQuery(this).attr("placeholder");if( this.value == "" ) {this.value = val;}
jQuery(this).focus(function() {if( this.value == val ) {this.value = "";}}).blur(function() {if( jQuery.trim(this.value) == "" ) {this.value = val;}})
});jQuery('form').submit(function() {jQuery(this).find("input[placeholder], textarea[placeholder]").each(function() {if( this.value == jQuery(this).attr("placeholder") ) {this.value = "";}});});}});/*<171337>*/$(function() {var currentrub_id= '4939960';url="/js/listeAvisInternautes/"+currentrub_id.substr(currentrub_id.length-2,2)+"/"+currentrub_id.substr(currentrub_id.length-1,1)+"/0,,"+currentrub_id+"--1-,00.js",
date = new Date(),
paramDecache = date.getDay().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();var url = url + "?p=" + paramDecache;$.getJSON( url, function(data) {nbComment =  (!data) ? "0" : data.length ;$(".container-nb .nb").text(nbComment);});var $sidebar   = $(".social-grid-content"),
$window    = $(window),
offset     = $sidebar.offset(),
topPadding = 0,
scrollmax = $('#Footer').offset().top - $(".social-grid-content").outerHeight() - 300;$window.scroll(function() {var posshodow = $(".social-grid-content").outerHeight() - 6 ;$(".social-grid-shadow").css("top", posshodow+"px");var position = $(".social-horizontal").offset();var height = $(".social-horizontal").outerHeight();if($window.scrollTop() > (position.top + height) && $window.scrollTop() <  scrollmax) {$(".social-grid").css({"display": "table", "visibility": "visible"});$(".gplus-root").css({"left": "0px"});$('.social-grid').fadeIn();}else{$('.social-grid').fadeOut();}});});/*</171337>*/
/*<168994>*/
var queryInProgress168994 = false;function openEmbeddedPopin(idContents, classContainer) {if($.browser.msie){ $("select").css("visibility","hidden");    }
$("object").css("visibility", "hidden");$("embed").css("visibility", "hidden");$("body").prepend('<div id="masque168994"></div><div id="popinContainer168994" class="' + classContainer + '"><a href="javascript:" id="closeButton168994"><img src="http://s.tf1.fr/mmdia/i/26/0/10695260zfrsy.png" alt="fermer" /></a></div>');var tmp = $('#' + idContents).clone();tmp.attr('id', '#popinContents168994');$('#popinContainer168994').append(tmp);tmp.show();$('#closeButton168994, #masque168994').click(function(){closePopin();});}
function closePopin(){$('#popinContainer168994').remove();$('#masque168994').remove();if($.browser.msie){ $("select").css("visibility","visible"); }
$("object").css("visibility", "visible");$("embed").css("visibility", "visible");return false;}
function sendToFriend() {closePopin();openEmbeddedPopin('popinEnvoiCore168994','popinEnvoiContainer168994');}
function sendSubmit168994() {if(queryInProgress168994) {return;}
var nomExp = gId('champ_nom168994').value;if(!nomExp) {alert('Vous devez indiquer votre nom.')
return false;}
var emailExp = gId('champ_email168994').value;if(!emailExp) {alert('Vous devez indiquer votre email.')
return false;}
var emailDest = gId('champ_email_ami168994').value;if(!emailDest) {alert('Vous devez indiquer l\'email du destinataire.')
return false;}
var message = gId('champ_message168994').value;if(!message) {alert('Vous devez indiquer un message.')
return false;}
queryInProgress168994 = true;var xmlhttp = getXMLHttpRequest();var url = '/src/transactions/envoiMailAmiJson.php';xmlhttp.open("POST", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState != 4) {return;}
var res = eval('(' + xmlhttp.responseText + ')');queryInProgress168994 = false;if(res.errno == 0) {closePopin();}else{alert(res.errmsg);}};xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');xmlhttp.send('unvId=1&chaineId=2716097&rubId=3011040&conId=4939960&nomExp=' + encodeURIComponent(nomExp) + '&emailExp=' + encodeURIComponent(emailExp) + '&emailDest=' + encodeURIComponent(emailDest) + '&message=' + encodeURIComponent(message) + '&typeTpl=tfou');return false;}
/*</168994>*/
/*<167132>*/$(function(){$('#articleContent').parent('section').css('minHeight', ($('#lside').height() + 22) + 'px');});$(document).ready(function ($) {$('#articleContent div, #articleContent p').each(function(){if( ($(this).offset().top + $(this).outerHeight()) > ($('.aside166896 ').offset().top + $('.aside166896 ').outerHeight())){$(this).after('<div class="ebzNative" style=""></div>');return false;}});if(typeof $.fn.customCopy === "function") {$("#article").customCopy({extraContent: '<div style="font-size:12px;font-style:italic;"><br>Source sur TF1 News : <a href="http://lci.tf1.fr/monde/amerique/piratage-d-un-cable-sous-marin-par-la-nsa-orange-va-se-constituer-8339092.html">Piratage d\x27un câble sous\x2dmarin par la NSA\x3a Orange va se constituer partie civile</a></div>'
});}});/*</167132>*/
/*<166897>*/
var queryInProgressSubmit166897 = false;var queryInProgressLoadAvis166897 = false;var queryInProgressIsLoggedIn166897 = false;var tabAvis166897 = new Array();var nbAvisParents166897 = 2;var nbAvis166897 = 0;var checkIsLoggedIn166897 = false;var avisMaxLongueur166897 = 3500;var lastIndexParent = 0;var startAvisDecal = 0;var urlImageMobile166897 = 'http://s.tf1.fr/mmdia/i/37/0/3405370lnmtj.gif?v=1';var nbAvisPage166897 = 5;var lastDeployed166897 = "";var nbReponsesToDisplay166897 = 2;var showAll = false;function submit166897(action, avisId) {if(queryInProgressSubmit166897) {return;}
var ligne = gId('ligne_' + action + '166897');var avis = gId(action + '166897');var feedbackAvis = gId('feedback_' + action + '166897');if(avis.value == '') {ligne.className = 'ligne erreur';feedbackAvis.style.display = 'block';return false;}
ligne.className = 'ligne';feedbackAvis.style.display = 'none';queryInProgressSubmit166897 = true;var statut = gId('statut_' + action + '166897');statut.innerHTML = 'Envoi en cours...';var xmlhttp = getXMLHttpRequest();var url = '/src/transactions/ajoutAvisMsoJson.php';xmlhttp.open("POST", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState != 4) {return;}
var res = eval('(' + xmlhttp.responseText + ')');queryInProgressSubmit166897 = false;if(res.errno == 0) {avis.value = '';if(action == 'message') {statut.innerHTML = '<strong>Merci. Votre commentaire a été envoyé.</strong>';}else{statut.innerHTML = '<strong>Merci. Votre réponse a été envoyée.</strong>';}}else{statut.innerHTML = '<strong>' + res.errmsg + '</strong>';}};xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');if(action == 'message') {xmlhttp.send('srvId=4895&unvId=1&conId=4939960&avis=' + encodeURIComponent(avis.value));}else{xmlhttp.send('srvId=4895&unvId=1&conId=4939960&avis=' + encodeURIComponent(avis.value) + '&avisIdParent=' + avisId);}}
function updateAvisCompteur166897(action) {var longueur, longueurRestante;var avis = gId(action + '166897');longueur = avis.value.length;if(longueur > avisMaxLongueur166897) {avis.value = avis.value.substring(0, avisMaxLongueur166897);longueurRestante = 0;}else{longueurRestante = avisMaxLongueur166897 - longueur;}
var statut = gId('statut_' + action + '166897');statut.innerHTML = 'Nombre de caractères restant : <strong>' + longueurRestante + '</strong>';}
function isLoggedInExpress166897() {if(getCookie('_MSOTICKET_') != 'Undefined' && getCookie('_MSOPSEUDO_') != 'Undefined') {gId('publier_avis166897').style.display = 'inline';return true;}else{return false;}}
function isLoggedIn166897(action) {if(checkIsLoggedIn166897 || queryInProgressIsLoggedIn166897) {return;}
checkIsLoggedIn166897 = true;queryInProgressIsLoggedIn166897 = true;var statut = gId('statut_' + action + '166897');statut.innerHTML = 'Authentification en cours...';var xmlhttp = getXMLHttpRequest();var url = '/src/scripts/getAvisMsoJson.php?conId=4939960&rubId=3011040&srvId=4895&unvId=1';xmlhttp.open("GET", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState != 4) {return;}
var res = eval('(' + xmlhttp.responseText + ')');queryInProgressIsLoggedIn166897 = false;if(res.errno == 4) {statut.innerHTML = '';MsoFront.open('identification', 1, 4895);}else if(res.errno != 0) {statut.innerHTML = res.errmsg;}else{updateAvisCompteur166897(action);}};xmlhttp.send(null);}
function loadAvis166897(url) {if(queryInProgressLoadAvis166897) {return false;}
queryInProgressLoadAvis166897 = true;var statut = gId('statut_liste_avis166897');statut.innerHTML = '<img src="http://s.tf1.fr/mmdia/i/02/7/2784027otrsu.gif?v=1" alt="" />&nbsp;Chargement en cours...';var xmlhttp = getXMLHttpRequest();var date = new Date();var paramDecache = date.getDay().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();var url = url + "?p=" + paramDecache;xmlhttp.open("GET", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState != 4) {return;}
var tabAvis = eval('(' + xmlhttp.responseText + ')');queryInProgressLoadAvis166897 = false;if(tabAvis == null) {statut.innerHTML = 'Erreur survenue lors du chargement des commentaires.';}else{statut.innerHTML = '';tabAvis166897 = tabAvis;nbAvis166897 = tabAvis.length;}
if(nbAvis166897 > 0) {displayAvis166897(0);displayPagination166897(0);displayNbAvis166897();}else{displayNbAvis166897();}};xmlhttp.send(null);}
function displayAvis166897(page) {if(lastDeployed166897 != "") {$("#lastDeployed166897").slideUp("normal");gId(lastDeployed166897).innerHTML = "";lastDeployed166897 = "";}
var startAvis = (page * nbAvisPage166897);var liste_avis = gId('liste_avis166897');liste_avis.innerHTML = '';var i;var endAvis = startAvis + nbAvisPage166897 - 1;if(showAll) {var debut = startAvis;var cptRajout = 0;for(i = 0; i < startAvis; i++) {endAvisTmp = i + nbAvisPage166897;if(endAvisTmp % nbAvisPage166897 == 0) {indice = i - cptRajout + nbAvisPage166897;if(tabAvis166897[indice] != undefined && tabAvis166897[indice]['AVI_ID_PARENT'] != null) {cptRajout++;}}}
startAvis = debut - cptRajout;var endAvis = startAvis + nbAvisPage166897 - 1;if(tabAvis166897[startAvis]['AVI_ID_PARENT'] != null) {endAvis--;}}
if(nbAvis166897 <= endAvis) {endAvis = nbAvis166897 - 1;}
for(i = startAvis; i <= endAvis; i++) {if(tabAvis166897[i]['AVI_ID_PARENT'] == null) {cptFils = 0;if(!showAll) {endAvis += parseInt(tabAvis166897[i]['NB_FILS'], 0);if(nbAvis166897 <= endAvis) {endAvis = nbAvis166897 - 1;}}
var avis = document.createElement('LI');avis.setAttribute("id", "avis_" + tabAvis166897[i]['AVI_ID']);avis.className = 'avis';liste_avis.appendChild(avis);}else{if(i == startAvis) {startAvisDecal++;lastIndexParent = getIndexPere166897(i);var avis = document.createElement('LI');avis.setAttribute("id", "avis_" + tabAvis166897[lastIndexParent]['AVI_ID']);avis.className = 'avis';liste_avis.appendChild(avis);ecritAvis166897(lastIndexParent, avis);}
if((!showAll && cptFils < nbReponsesToDisplay166897) || showAll) {if(tabAvis166897[i-1]['AVI_ID_PARENT'] == null || i == startAvis) {var liste_reponses = document.createElement('UL');liste_reponses.setAttribute("id", "reponses_" + tabAvis166897[i]['AVI_ID_PARENT']);liste_reponses.className = 'liste_reponses';gId('avis_' + tabAvis166897[i]['AVI_ID_PARENT']).insertBefore(liste_reponses, gId('formReponse_' + tabAvis166897[i]['AVI_ID_PARENT']));}
var avis = document.createElement('LI');avis.setAttribute("id", "avis_" + tabAvis166897[i]['AVI_ID']);avis.className = 'reponse';liste_reponses.appendChild(avis);}}
ecritAvis166897(i, avis);}}
function getIndexPere166897(index) {var aviIdPere = tabAvis166897[index]['AVI_ID_PARENT'];for(i = index; i >= 0; i--) {if(tabAvis166897[i]['AVI_ID'] == aviIdPere) {break;}}
return i;}
function ecritAvis166897(i, avis) {if(tabAvis166897[i]['AVI_ID_PARENT'] == null ||
(tabAvis166897[i]['AVI_ID_PARENT'] != null && ((!showAll && cptFils < nbReponsesToDisplay166897) || showAll))) {var blockquote = document.createElement('BLOCKQUOTE');blockquote.className = '';blockquote.innerHTML = '<span class="userName cc d-block">' + tabAvis166897[i]['AVI_NOM']  + ' </span> ' + tabAvis166897[i]['AVI_TEXTE'] ;avis.appendChild(blockquote);var cite = document.createElement('CITE');cite.className = '';var regExp = new RegExp('([0-9]+)/([0-9]+)/([0-9]+) ([0-9]+):([0-9]+):([0-9]+)', 'g');var tabRegs = regExp.exec(tabAvis166897[i]['AVI_DATE_CREATION']);var moisStr = TF1Date.months[ parseInt(tabRegs[2], 10) - 1 ];moisStr = moisStr.charAt(0).toUpperCase() + moisStr.substr(1);var dateStr = tabRegs[1] + ' ' + moisStr + ' ' + tabRegs[3] + ' &agrave; ' + tabRegs[4] + 'h' + tabRegs[5];cite.innerHTML = "";if(tabAvis166897[i]['AVI_MOBILE'] == 1) {cite.innerHTML += '<img src="' + urlImageMobile166897 + '" alt="Message envoyé depuis un mobile" />';}
cite.innerHTML += '<span class="date">Le ' + dateStr + '</span>' ;avis.appendChild(cite);}
if(tabAvis166897[i]['AVI_ID_PARENT'] == null) {var actions = document.createElement('p');actions.className = 'commentsActions166897';avisId = tabAvis166897[i]['AVI_ID'];avisNom = tabAvis166897[i]['AVI_NOM'];if(showAll) {actions.innerHTML = '&nbsp;| <a class="rating" href="" onclick="qualifieAvis166897(' + avisId + '); return false;">J\'aime</a> (<span id="note_'+ avisId +'">' + tabAvis166897[i]['AVI_VOTE_TOTAL'] + '</span>) | <a class="answer" href="" onclick="displayFormReponse(' + avisId + ', \'' + avisNom + '\'); return false;">Répondre&nbsp;(' + tabAvis166897[i]['NB_FILS'] + ')</a> | <a href="#" id="lienAbus' + avisId + '166897" onClick="return signalerAbus166897(' + avisId + ', this.id)">Signaler un abus</a>';}else{actions.innerHTML = '&nbsp;| <a class="rating" href="" onclick="qualifieAvis166897(' + avisId + '); return false;">J\'aime</a> (<span id="note_'+ avisId +'">' + tabAvis166897[i]['AVI_VOTE_TOTAL'] + '</span>) | <a class="answer" href="" onclick="displayFormReponse(' + avisId + ', \'' + avisNom + '\'); return false;">Répondre</a>&nbsp;<a href="#" onclick="tousCommentaires166897(event); return false;">(' + tabAvis166897[i]['NB_FILS'] + ')</a> | <a href="#" id="lienAbus' + avisId + '166897" onClick="return signalerAbus166897(' + avisId + ', this.id)">Signaler un abus</a>';}
$(avis).find('.date').after(actions);var reponse = document.createElement('DIV');reponse.setAttribute("id", "formReponse_" + avisId);reponse.className = 'reponseAvis';avis.appendChild(reponse);}else{if((!showAll && cptFils < nbReponsesToDisplay166897) || showAll) {cptFils++;var actions = document.createElement('P');actions.className = 'commentsActions166897';avisId = tabAvis166897[i]['AVI_ID'];actions.innerHTML = '&nbsp;| <a class="rating" href="" onclick="qualifieAvis166897(' + avisId + '); return false;">J\'aime</a> (<span id="note_'+ avisId +'">' + tabAvis166897[i]['AVI_VOTE_TOTAL'] + '</span>) | <a href="#" id="lienAbus' + avisId + '166897" onClick="return signalerAbus166897(' + avisId + ', this.id)">Signaler un abus</a>';$(avis).find('.date').after(actions);}}}
function displayFormReponse(avisId, avisNom) {var affich = 1;if(lastDeployed166897 != "") {$("#lastDeployed166897").slideUp("normal");gId(lastDeployed166897).innerHTML = "";if(lastDeployed166897 == "formReponse_" + avisId) {affich = 0;lastDeployed166897 = "";gId("formReponse_" + avisId).innerHTML = "";}}
if(gId("formReponse_" + avisId).innerHTML == "" && affich == 1) {formReponseStr = '    <form id="repondre_avis166897" onsubmit="submit166897(\'reponse\', ' + avisId + '); return false;" class="bgc6">';formReponseStr += '<h3 class="t14"><label for="reponse166897">R&eacute;pondre &agrave; ' + avisNom + '</label></h3>';formReponseStr += '<div class="ligne" id="ligne_reponse166897">';formReponseStr += '<div class="champ">';formReponseStr += '<textarea class="t14" id="reponse166897" rows="" cols="" onblur="eventTextArea166897(\'reponse\');myblur166897(this);" onfocus="eventTextArea166897(\'reponse\');myfocus166897(this);" onkeydown="eventTextArea166897(\'reponse\');" onkeyup="eventTextArea166897(\'reponse\');"></textarea>';formReponseStr += '</div>';formReponseStr += '<p class="feedback t14" id="feedback_reponse166897">Vous devez &eacute;crire une réponse</p>';formReponseStr += '</div>';formReponseStr += '<div class="ligne">';formReponseStr += '<p class="c4 t11" id="statut_reponse166897"></p>';formReponseStr += '<div class="poster"><input class="btn bgc5 c2 gradient" type="submit" value="Répondre"></div></div></form>';gId("formReponse_" + avisId).innerHTML = formReponseStr;lastDeployed166897 = "formReponse_" + avisId;$("#repondre_avis166897").slideDown("normal");}
isLoggedIn166897('reponse');}
function decalIndices166897() {var cptRajout = 0;var endAvisTmp, indice;for(var i = 0; i < nbAvis166897; i++) {endAvisTmp = i + nbAvisPage166897;if(endAvisTmp % nbAvisPage166897 == 0) {indice = i - cptRajout + nbAvisPage166897;if(tabAvis166897[indice] != undefined && tabAvis166897[indice]['AVI_ID_PARENT'] != null) {cptRajout++;}}}
return cptRajout;}
function displayPagination166897(page) {var nbPages = Math.ceil((nbAvis166897 + decalIndices166897()) / nbAvisPage166897);page = page + 1;buildDizaineCourante166897(page, nbPages);buildRaccourcis166897(page, nbPages);}
function  buildDizaineCourante166897(page, nbPages) {var centaine = Math.floor(page / 100);var dizaine = Math.floor((page % 100) / 10);var debut = (page < 10) ? 1 : dizaine * 10 + centaine * 100;var fin = nbPages;var dizaineCourante = gId("dizaineCourante166897");dizaineCourante.innerHTML = "";afficheFlechePrecedent166897(dizaineCourante, page);for(var numero = debut; numero <= fin; numero++) {afficheLienNumero166897(dizaineCourante, numero, page, nbPages);}
afficheFlecheSuivant166897(dizaineCourante, page, nbPages);}
function buildRaccourcis166897(page, nbPages) {if(nbPages < 20) {return;}
var tabNumeros = new Array();var centaineCourante = Math.floor(page / 100);var centaineDernier = Math.floor(nbPages / 100);for(var i = 0; i <= centaineDernier; i++) {if(i != centaineCourante) {tabNumeros.push(i * 100);continue;}
if(i > 0) {tabNumeros.push(i * 100);}
var finDizaines = 9;if(i == centaineDernier) {finDizaines = Math.floor((nbPages % 100) / 10);}
for(var j = 1; j <= finDizaines; j++) {tabNumeros.push(i * 100 + j * 10);}}
var raccourcis = gId("raccourcis166897");raccourcis.innerHTML = "";if(page < 100) {afficheNbPages166897(raccourcis, nbPages);}
afficheRaccourciPremierePage166897(raccourcis);for(var i = 0; i< tabNumeros.length; i++) {var numero = tabNumeros[i];afficheLienRaccourcis166897(raccourcis, numero);}
afficheRaccourciDernierePage166897(raccourcis, nbPages);}
function afficheFlechePrecedent166897(ol, page) {var li = document.createElement('LI');li.className = 'precedente c4 t14';if(page > 1) {li.innerHTML = '<a class = "c2" href = "#hautAvis166897" onclick = "goToPage166897(' + (page - 2) + ');" rel="nofollow">'
+ '<img class = "pPrecedentSansCadre" src = "http://s.tf1.fr/img/str/x.gif" alt="" />Précédent'
+ '</a>';}else{li.innerHTML = '<img class = "pPrecedentGris" src = "http://s.tf1.fr/img/str/x.gif" alt="" />Précédent';}
ol.appendChild(li);}
function afficheFlecheSuivant166897(ol, page, nbPages) {var li = document.createElement('LI');li.className = 'suivante c4 t14';if(page < nbPages) {li.innerHTML = '<a class = "c1" href = "#hautAvis166897" onclick = "goToPage166897(' + (page) + ');" rel="nofollow">'
+ 'Suivant<img class = "pSuivantSansCadre" src = "http://s.tf1.fr/img/str/x.gif" alt="" />'
+ '</a>';}else{li.innerHTML += 'Suivant<img class = "pSuivantGris" src = "http://s.tf1.fr/img/str/x.gif" alt="" />';}
ol.appendChild(li);}
function afficheLienNumero166897(ol, numero, page, nbPages) {var li = document.createElement('LI');if(numero == page) {li.innerHTML += '<span>'
+ '<strong class = "c7 bgc1">' + numero + '</strong>'
+ '</span>';}else if(numero > nbPages) {li.innerHTML += '<span>' + numero + '</span>';}else{li.innerHTML += '<a class = "c1 t14" href = "#hautAvis166897" onclick = "goToPage166897(' + (numero - 1) + ');" rel="nofollow">' + numero + '</a>';}
ol.appendChild(li);}
function afficheNbPages166897(ol, nbPages) {var li = document.createElement('LI');li.innerHTML = nbPages + ' pages : ';ol.appendChild(li);}
function afficheRaccourciPremierePage166897(ol) {var li = document.createElement('LI');li.innerHTML = ' ( ';ol.appendChild(li);var li = document.createElement('LI');li.innerHTML += '<a href = "#" onclick = "goToPage166897(0);return false;"> << </a>';ol.appendChild(li);var li = document.createElement('LI');li.innerHTML = ' - ';ol.appendChild(li);}
function afficheLienRaccourcis166897(ol, numero) {var li = document.createElement('LI');li.innerHTML += '<a href = "#" onclick = "goToPage166897(' + (numero - 1) + ');return false;"> ' + numero + ' </a>';ol.appendChild(li);var li = document.createElement('LI');li.innerHTML = ' - ';ol.appendChild(li);}
function afficheRaccourciDernierePage166897(ol, nbPages) {var li = document.createElement('LI');li.innerHTML += '<a href = "#" onclick = "goToPage166897(' + (nbPages - 1) + ');return false;"> >> </a>';ol.appendChild(li);var li = document.createElement('LI');li.innerHTML = ' ) ';ol.appendChild(li);}
function displayNbAvis166897() {var texte = '',
texte2 = '';if(nbAvis166897 == 0) {texte = 'Aucun commentaire';texte2 = 'Ecrire un commentaire';}else if(nbAvis166897 == 1) {texte = texte2 = '1 commentaire';}else if(nbAvis166897 > 1) {texte = texte2 = nbAvis166897 + ' Commentaires';}
var nb_avis = gId('nbAvis166897');if(typeof(nb_avis) != 'undefined' && nb_avis !== null){gId('nbAvis166897').innerHTML = texte;gId('nbAvis166897').style.display = 'block';}
var commentaireAutreBloc = gId('commentaireDynamiqueParAutreBloc');if(typeof(commentaireAutreBloc) != 'undefined' && commentaireAutreBloc !== null) {commentaireAutreBloc.innerHTML = texte2;}}
function goToPage166897(page) {displayAvis166897(page);displayPagination166897(page);}
function init166897() {isLoggedInExpress = isLoggedInExpress166897();loadAvis166897("/js/listeAvisInternautes/96/0/0,,4939960--1-,00.js");if(isLoggedInExpress) {gId('publier_avis166897').style.display = 'inline';updateAvisCompteur166897('message');}}
function eventTextArea166897(action) {isLoggedIn166897(action);updateAvisCompteur166897(action);}
var myplaceHolder = 'Publier un commentaire...';function myblur166897(obj) {if(obj.value === '') {obj.value = myplaceHolder;}}
function myfocus166897(obj) {if(obj.value === myplaceHolder) {obj.value = '';}}
function qualifieAvis166897(aviId, note) {var xmlhttp = getXMLHttpRequest();var url = '/src/transactions/avisQualifie.php';xmlhttp.open("POST", url, true);xmlhttp.onreadystatechange = function() {if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {var res = eval('(' + xmlhttp.responseText + ')');if(res.errno == 0) {var nbVote = document.getElementById('note_' + aviId);var noteActuelle = parseInt(nbVote.innerHTML);nbVote.innerHTML = noteActuelle + 1;}}};xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');xmlhttp.send('unvId=1&conId=4939960&noteAvi=1&aviId=' + encodeURIComponent(aviId));return false;}
function tousCommentaires166897() {showAll = true;gId('tous_avis166897').style.display = 'none';displayAvis166897(0);$('#pagination166897').slideDown('normal');}
function triNotes166897() {loadAvis166897("/js/listeAvisInternautes/96/0/0,,4939960--1-1,00.js");displayAvis166897(0);}
function triRecents166897() {loadAvis166897("/js/listeAvisInternautes/96/0/0,,4939960--1-,00.js");displayAvis166897(0);}
addEvtListener(window, 'load', function() {init166897();$("#tous_avis166897 a").click(function(e) {e.preventDefault();tousCommentaires166897();});});function signalerAbus166897(value, id) {TF1Overlay.open('/signaler-abus/?type=avis&msgId='+value+'&flagId='+id, null, null, true);return false;}
/*</166897>*/
if(typeof DOMParser === 'undefined') {DOMParser = function () {};DOMParser.prototype.parseFromString = function (str, contentType) {var xmldata;if(typeof ActiveXObject !== 'undefined') {xmldata = new ActiveXObject('MSXML.DomDocument');xmldata.async = false;xmldata.loadXML(str);return xmldata;}else if(typeof XMLHttpRequest !== 'undefined') {xmldata = new XMLHttpRequest();if(!contentType) {contentType = 'application/xml';}
xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);if(xmldata.overrideMimeType) {xmldata.overrideMimeType(contentType);}
xmldata.send(null);return xmldata.responseXML;}};}
(function (global, $) {var adParamType = {pave: "1",
flash: "2",
pimp: "3"
},
idPave = 'paveCompanionAd',
idZonePlayer = 'ZonePlayerVideo',
companionCache = {},
parser = typeof DOMParser === "function" ? new DOMParser() : null,
gId = function (id) { return document.getElementById(id); },
log = function (args) {if(window.console) {console.log(args);}},
saveChildren = function (id, target) {var frag = document.createDocumentFragment(),
i = 0,
max = target.childNodes.length;for(; i < max; i += 1) {frag.appendChild(target.childNodes[0]);}
companionCache[id].content.frag = frag;},
restoreChildren = function (id) {companionCache[id].content.target.appendChild(companionCache[id].content.frag);},
addPave = function (id, resource) {var target = gId(idPave);if(target !== null) {companionCache[id].content = {target: target
};saveChildren(id, target);target.innerHTML = resource;}
else{log("can't insert pave, no id '" + idPave + "' in the document");}},
removePave = function (id) {if(typeof companionCache[id] !== "undefined" && typeof companionCache[id].content !== "undefined") {companionCache[id].content.target.innerHTML = '';restoreChildren(id);}},
addFlash = function (id, resource) {var el = document.createElement('div'),
alternativeEl = document.createElement('div'),
elId = "companionEl" + id,
flashId = "companionFlash" + id,
target = gId(idZonePlayer),
hasSwfobject = typeof swfobject === "object",
doc, flashUrl, flashWidth, flashHeight,
flashvars = {},
params = {};if(parser !== null && target !== null && hasSwfobject) {companionCache[id].content = {element: el,
target: target
};alternativeEl.id = flashId;el.id = elId;el.style.position = "absolute";el.style.zIndex = "1";el.style.left = "0";el.style.top = "-14px";el.style.width = "100%";el.style.height = "100%";el.appendChild(alternativeEl);target.appendChild(el);doc = parser.parseFromString(resource, "text/xml");flashUrl = doc.getElementsByTagName('companionUrl')[0].firstChild.nodeValue;flashWidth = doc.getElementsByTagName('width')[0].firstChild.nodeValue;flashHeight = doc.getElementsByTagName('height')[0].firstChild.nodeValue;flashvars.companionId = id;params.allowScriptAccess = "always";swfobject.embedSWF(flashUrl, flashId, flashWidth, flashHeight, "9.0.0", false, flashvars, params);}
else{if(parser === null) {log("no DOMParser in the browser");}
if(!hasSwfobject) {log("no swfobject library");}
if(target === null) {log("can't insert flash, no id '" + idZonePlayer + "' in the document");}}},
removeFlash = function (id) {if(typeof companionCache[id] !== "undefined" && typeof companionCache[id].content !== "undefined") {companionCache[id].content.element.innerHTML = "";companionCache[id].content.target.removeChild(companionCache[id].content.element);}},
addPimp = function (id, resource) {if(typeof $ !== "undefined") {$(document.body).append(resource);}else{if(typeof $ === "undefined") {log("no jQuery library");}}},
removePimp = function (id) {if(typeof $ !== "undefined" && typeof $.fn.unpimpPage !== "undefined") {$.fn.unpimpPage();}else{if(typeof $ === "undefined") {log("no jQuery library");}
if(typeof $.fn.unpimpPage === "undefined") {log("no jQuery unpimpPage plugin - be sure to use the latest version of the plugin");}}};global.WATcompanion = function WATcompanion(id, type, resource) {log("WATcompanion " + id);companionCache[id] = { type: type };switch (type) {case adParamType.pave:
addPave(id, resource);break;case adParamType.flash:
addFlash(id, resource);break;case adParamType.pimp:
addPimp(id, resource);break;default:
log("unknown companionAd type : " + type);}};global.CLEARcompanion = function CLEARcompanion(id) {log("CLEARcompanion " + id);if(typeof companionCache[id] === "undefined") {log("unknown companionAd id : " + id);return false;}
switch (companionCache[id].type) {case adParamType.pave:
removePave(id);break;case adParamType.flash:
removeFlash(id);break;case adParamType.pimp:
removePimp(id);break;default:
log("unknown companionAd type : " + companionCache[id].type);}};}(window, jQuery));function watPermalink () {return document.location.href;}
function DataExchange() {var self = this;this.alreadySentXiti = false;this.alreadySentLogged = false;this.alreadySentUnlogged = false;this.tabXitiAlreadySent = [];this.isLogged = false;this.msoIdMd5 = 'Undefined';this.msoGender = 'Undefined';this.msoZipCode = 'Undefined';this.msoBirthday = 'Undefined';this.init = function() {self.getData();self.exelate();self.datvantage();self.finish();}
this.getData = function() {self.msoIdMd5 = getCookie('_MD5MSO_');if(self.msoIdMd5 != 'Undefined') {self.isLogged = true;}
var cookie = getCookie('dxSent');if(cookie != 'Undefined') {var info = cookie.split('#');var tabXiti = [];if(info[0]) {self.alreadySentUnlogged = true;}
if(info[1]) {self.alreadySentLogged = true;}
tabXiti = info[0];if(self.isLogged) {tabXiti = info[1];}
if(tabXiti) {self.tabXitiAlreadySent = tabXiti.split(',');var l = self.tabXitiAlreadySent.length;for(var i = 0; i<l; i++) {if(self.tabXitiAlreadySent[i] == xtsite || self.tabXitiAlreadySent[i] == xtn2) {self.alreadySentXiti = true;break;}}}}
if(!self.isLogged) {return;}
self.msoGender = getCookie('_MSOSEX_');self.msoZipCode = getCookie('_MSOZIPCODE_');self.msoBirthday = getCookie('_MSOBIRTHDAY_');}
this.finish = function() {var infoXiti = ['',''];var oldCookie = getCookie('dxSent');if(oldCookie != 'Undefined') {infoXiti = oldCookie.split('#');}
var newCookie = '';if(self.isLogged) {newCookie = infoXiti[0] + '#' + self.tabXitiAlreadySent.join(',');}else{newCookie = self.tabXitiAlreadySent.join(',') + '#' + infoXiti[1];}
setCookie('dxSent', newCookie);}
this.exelate = function() {if(self.alreadySentXiti) {return;}
var unvIdExelate = 1;var xitiLevel = '';var subCat = '';if(unvIdExelate == 1) {unvIdExelate = '001';xitiLevel = xtsite;subCat = xtn2;}else{xitiLevel = xtn2;}
var params = '&g=' + unvIdExelate + '&CMS=' + xitiLevel;if(subCat) {params += '&subctg=' + subCat;}
if(self.isLogged) {params += '&puid=' + self.msoIdMd5
if(self.msoGender != 'Undefined') {params += '&gd=' + self.msoGender;}
if(self.msoZipCode != 'Undefined') {params += '&zip=' + self.msoZipCode;}
if(self.msoBirthday != 'Undefined') {var now = new Date();var age = 0;var msoYear = self.msoBirthday.substr(6,4);var nowYear = now.getFullYear();age = nowYear - msoYear;var diffMonth = now.getMonth() - self.msoBirthday.substr(3,2);if(diffMonth < 0) {age = age - 1;}else if(diffMonth == 0 && (now.getDay() - self.msoBirthday.substr(0,2) > 0)) {age = age - 1;}
if(age >= 13 && age < 120) {params += '&ag=' + age;}}}
self.insertJs('http://loadeu.exelator.com/load/?p=268' + params + '&j=d', false);self.tabXitiAlreadySent.push(xitiLevel);}
this.datvantage = function() {if(!self.isLogged || self.alreadySentLogged) {return;}
if(self.msoGender != 'Undefined') {_dv.push(['tf1_gender', self.msoGender]);}
if(self.msoZipCode != 'Undefined') {_dv.push(['tf1_zipcode', self.msoZipCode]);}
if(self.msoBirthday != 'Undefined') {var year = self.msoBirthday.substr(6,4);if(year < 2000 && year > 1900) {_dv.push(['tf1_yob', year]);}}
_dv.push(['bkey', 'TF198']);self.insertJs('http://cdn.datvantage.com/js/d.js', true);}
this.insertJs = function(src, inHead) {dxScript = document.createElement('script');dxScript.type = 'text/javascript';dxScript.async = true;dxScript.src = src;if(inHead) {var scriptInHead = document.getElementsByTagName('script')[0];scriptInHead.parentNode.insertBefore(dxScript, scriptInHead);}else{var pageMain = document.getElementById('pageMain');if(pageMain) {pageMain.appendChild(dxScript);}}}}
var _dv = _dv || [];var dataExchange = new DataExchange();addEvtListener(window, 'load', function() {dataExchange.init();});var xt_adBlock = 1
var _eStat_Whap_loaded=0;var _eStat_Whap_sent=0;function _eStat_Whap_hit() {if(_eStat_Whap_loaded && !_eStat_Whap_sent){eStatWhap.serial("800000206966");eStatWhap.send();}
_eStat_Whap_sent = 1;}
$(document).ready(function() {$('img.lazy').lazyload({ effect : 'show' });});$(document).ready(function() {if($.browser.msie && parseInt($.browser.version) < 9) {$("figure.p-play a, figure.p-play-medium a, figure.p-photo a").prepend('<span></span>');}});
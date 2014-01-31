/**
 * Package www/core
 * lmd/module/acces-non-abonne
 * lmd/core/metrics/xiti
 * lmd/core/auth
 * lmd/core/storage
 * lmd/core/service
 * lmd/core/conf
 * lmd/core/context
 * lmd/core/live
 * lmd/core/social/facebook
 * lmd/core/social/twitter
 * lmd/core/advert/widget-position
 */

/* -- start module lmd/module/acces-non-abonne -- */
define("lmd/module/acces-non-abonne",["lmd/core/auth"],function(Auth){function redirect(url){if(window.location+""!==url)window.location=url}function init(){Auth.loadUser().then(function(){var user=Auth.user;if(lmd.context.application==="abonnes"&&user.type!=="abonne")Auth.logout().then(function(){var root_url=window.location.protocol+"//"+lmd.conf.www.location.hostname;if(window.location.pathname.indexOf("/article/")>1)redirect(root_url+"/teaser/?connexion&url_zop="+encodeURIComponent(root_url));else redirect(root_url+"/teaser/presentation.html#connexion&url_zop="+
encodeURIComponent(root_url))})})}return{init:init}});

/* -- end module lmd/module/acces-non-abonne -- */
/* -- start module lmd/core/metrics/xiti -- */
define("lmd/core/metrics/xiti",["jquery","lmd/core/context","lmd/core/conf","lmd/core/auth"],function($,context,conf,auth){var xiti={_loadDeferred:null,load:function(){if(this._loadDeferred===null){this._loadDeferred=$.Deferred();this._loadDeferred.resolve()}return this._loadDeferred.promise()},xt_med:function(){},xt_click:function(){return true},init:function(){this.load()}};return xiti});

/* -- end module lmd/core/metrics/xiti -- */
/* -- start module lmd/core/auth -- */
define("lmd/core/auth",["jquery","lmd/core/storage","lib/jquery/plugin/jquery.cookie","lmd/core/service"],function($,storage,jqueryCookie,service){var auth={STORAGE_KEY:"user",JOURNALISTES_STORAGE_KEY:"journalistes",COOKIE_USER_ID:"tdb_user_id",COOKIE_ALM:"alm",COOKIE_WORDPRESS:"wordpress_domain",user:null,_loadUserDeferred:null,_loadUserServicesDeferred:null,authenticated:false,checkAuthentication:function(){this.authenticated=$.cookie(this.COOKIE_USER_ID)!==null;if(this.authenticated===false)this.clearCache();
return this.authenticated},refresh:function(){this.loadUser(true)},update:function(){this._putInCache()},login:function(params,jsonp){var settings={timeout:1E4};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/login",1,params,settings)},register:function(params,jsonp){var settings={timeout:1E4};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/register",1,params,settings)},confirm:function(params,jsonp){var settings={timeout:1E4};if(typeof jsonp===
"boolean")settings.dataType="jsonp";return service.get("auth/confirmation",1,params,settings)},resetPassword:function(params,jsonp){var settings={timeout:1E4};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/password/reset",1,params,settings)},changePassword:function(params,jsonp){var settings={timeout:1E4};if(typeof jsonp==="boolean")settings.dataType="jsonp";return service.get("auth/password/change",1,params,settings)},logout:function(){this.clearCache();return service.get("auth/logout",
1,null,{dataType:"jsonp"}).done($.proxy(this.clearCache,this))},loadUser:function(refresh){var firstLoad=false;if(this._loadUserDeferred===null||refresh){this._loadUserDeferred=$.Deferred();firstLoad=true}if(this._loadUserServicesDeferred===null||refresh)this._loadUserServicesDeferred=$.Deferred();this.checkAuthentication();if(this.authenticated&&(firstLoad||refresh)){if(storage.isSupported&&!refresh){var user=storage.get(this.STORAGE_KEY);if(user!==null){var userId=this._getUserIdAlm();if(user.id==
userId||userId===null){this.user=user;this._loadUserDeferred.resolve();if(!$.cookie(this.COOKIE_WORDPRESS)&&auth.user.services.indexOf("blog"))this.majServices(true);else this._loadUserServicesDeferred.resolve();return this._loadUserDeferred.promise()}}}var xhr=service.get("auth/user",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserCallback,this));var xhr=service.get("auth/majServices",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserServicesCallback,this))}if(!this.authenticated){this._loadUserDeferred.resolve();
this._loadUserServicesDeferred.resolve()}return this._loadUserDeferred.promise()},majServices:function(refresh){if(refresh)var xhr=service.get("auth/majServices",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserServicesCallback,this));else{this.loadUser(refresh);return this._loadUserServicesDeferred.promise()}},clearCache:function(){storage.remove(this.STORAGE_KEY);storage.remove(this.JOURNALISTES_STORAGE_KEY)},_getUserIdAlm:function(){var cookieAlm=$.cookie(this.COOKIE_ALM);if(cookieAlm===null)return null;
var tab=cookieAlm.split("-");if(tab.length>2)return parseInt(tab[tab.length-2]);else return null},_loadUserCallback:function(data){if(typeof data==="object"&&typeof data.user==="object"){this.user=data.user;this._putInCache();this._loadUserDeferred.resolve()}else this._loadUserDeferred.reject()},_loadUserServicesCallback:function(data){if(typeof data==="object"&&data.succes)this._loadUserServicesDeferred.resolve();else this._loadUserServicesDeferred.reject()},_putInCache:function(){if(storage.isSupported)storage.set(this.STORAGE_KEY,
this.user,18E5,false)}};auth.authenticated=auth.checkAuthentication();return auth});

/* -- end module lmd/core/auth -- */
/* -- start module lmd/core/storage -- */
define("lmd/core/storage",["jquery","lmd/core/conf","lib/jquery/plugin/jquery.cookie"],function($,conf,jqueryCookie){$.cookie=jqueryCookie;var storage={isSupported:false,get:function(key,session){var stockData,storageValue;if(this.isSupported)try{storageValue=window.localStorage.getItem(key);if(storageValue===null||session===true)storageValue=window.sessionStorage.getItem(key);stockData=JSON.parse(storageValue)}catch(e){return null}else stockData=JSON.parse(this._getNoStorage(key));if(!stockData)return null;if(stockData.timeout!==
undefined){var now=(new Date).getTime(),diff=parseInt(stockData.timeout,10)-now;if(diff<0){this.remove(key);return null}}if(stockData.data===undefined)return null;return stockData.data},set:function(key,data,timeout,session){var stockData={};stockData.data=data;if(typeof timeout!=="undefined"&&$.isNumeric(timeout))stockData.timeout=(new Date).getTime()+timeout;var stockDataJson=JSON.stringify(stockData);if(this.isSupported){try{if(typeof timeout!=="undefined"&&session===true)window.sessionStorage.setItem(key,
stockDataJson);else window.localStorage.setItem(key,stockDataJson)}catch(e){return false}return true}return this._setNoStorage(key,stockDataJson,timeout)},remove:function(key,session){if(this.isSupported){if(session){window.sessionStorage.removeItem(key);return true}window.sessionStorage.removeItem(key);window.localStorage.removeItem(key);return true}return this._removeNoStorage(key)},_setNoStorage:function(key,data,timeout){if($.cookie===undefined)return false;var options={path:"/",domain:"."+conf.current.location.domain};
if(typeof timeout==="number"){var expire=Math.floor(timeout/36E5);if(expire>0)options.expires=Math.floor(timeout/36E5)}$.cookie("storage_"+key,data,options);return true},_getNoStorage:function(key){if(typeof $.cookie==="undefined")return false;return $.cookie("storage_"+key)},_removeNoStorage:function(key){if(typeof $.cookie==="undefined")return false;$.cookie("storage_"+key,null);return true}};storage.isSupported=function(){try{return window.sessionStorage!==null&&window.localStorage!==null}catch(e){return false}}();
return storage});

/* -- end module lmd/core/storage -- */
/* -- start module lmd/core/service -- */
define("lmd/core/service",["jquery","lmd/core/conf"],function($,conf){return{get:function(service,version,data,settings){if(typeof settings==="undefined")settings={};if(typeof settings.timeout==="undefined")settings.timeout=5E3;if(typeof settings.dataType==="undefined")settings.dataType="json";var jsonp=typeof settings.dataType==="string"&&settings.dataType==="jsonp";service.replace(/^\/?(.*)\/?$/,"$1");var url="/ws/"+version+"/"+service+"/";if(jsonp===true)url=window.location.protocol!=="https:"?window.location.protocol+
"//"+conf.www.location.hostname+url:window.location.protocol+"//"+conf.wwws.location.hostname+url;settings.data=data;settings.url=url;if(jsonp===true){var defer=$.Deferred();$.ajax(settings).then(function(data){if(typeof data!=="object"||typeof data.error==="object")defer.reject(data);else defer.resolve(data)},defer.reject);return defer}return $.ajax(settings)}}});

/* -- end module lmd/core/service -- */
/* -- start module lmd/core/conf -- */
define("lmd/core/conf",function(){if(typeof lmd==="undefined"||typeof lmd.conf==="undefined")return null;var matches,f=function(o,p){var i;if(typeof o.hostname!=="undefined"){o.domain=o.hostname.match(/[\-\w]+\.fr$/);o.domain=o.domain?o.domain[0]:"";p.app=o.hostname.match(/([\-\w]+)\.[\-\w]+\.fr$/);p.app=p.app?p.app[1]:""}for(i in o)if(typeof o[i]==="object")f(o[i],o)};f(lmd.conf);matches=window.location.hostname.match(/\.?([\-a-z]+[^\-org])(-org)?\.lemonde[\-a-z]*\.fr$/);lmd.conf.current=lmd.conf.www;if(matches&&
typeof lmd.conf[matches[1]]==="object")lmd.conf.current=lmd.conf[matches[1]];lmd.conf.search_hash="2139JDJ12J3";return lmd.conf});

/* -- end module lmd/core/conf -- */
/* -- start module lmd/core/context -- */
define("lmd/core/context",["lmd/core/conf"],function(conf){var context={PAGE_TYPE_UNE:"Rubrique_Une",PAGE_TYPE_UNE_ABONNES:"Rubrique_Une_Abonnes",PAGE_TYPE_RUBRIQUE:"Rubrique",PAGE_TYPE_RUBRIQUE_TYPEITEM:"Rubrique_TypeItem",PAGE_TYPE_RUBRIQUE_BLOGS:"Rubrique_Blogs",PAGE_TYPE_ELEMENT:"Element",PAGE_TYPE_ANNALES_BAC:"Element",PAGE_TYPE_OTHER:"Autre",pageType:null,rubrique:null,item:null,element:null,page:null,init:function(){if(typeof window.lmd==="undefined"||typeof window.lmd.context==="undefined")return false;var contextData=
window.lmd.context;this.pageType=contextData.pageType;this.rubrique=contextData.rubrique;this.item=contextData.item;this.element=contextData.element;this.page=contextData.page;this._initCurrentPage()},_initCurrentPage:function(){this.page.link=window.location.pathname}};context.init();return context});

/* -- end module lmd/core/context -- */
/* -- start module lmd/core/live -- */
define("lmd/core/live",["jquery","lmd/core/conf"],function($,conf){var intervalId=null,$el=$("<div></div>");var live={status:"stopped",interval:3,stop:function(){this.status="stopped";if(intervalId!==null){window.clearInterval(intervalId);intervalId=null}},start:function(interval){if(this.status==="started"&&(!interval||this.interval===interval))return;if(this.status==="started")this.stop();this.interval=interval||conf.live.interval||this.interval;intervalId=window.setInterval(this.pool,this.interval*1E3);this.status=
"started";this.pool()},pool:function(){return $.ajax({url:"http://"+conf.live.location.hostname+"/mux.json",dataType:"script",cache:true})},success:function(events){this.trigger("success.start");events.forEach(function(event){this.trigger(event.type,event.data)},this);this.trigger("success.end")},on:function(event,callback,context){var f=context?$.proxy(callback,context):callback;$el.on(event,f);return this},trigger:function(event,extraParameters){$el.trigger(event,extraParameters);return this}};
window.live=function(data){live.success(data)};return live});

/* -- end module lmd/core/live -- */
/* -- start module lmd/core/social/facebook -- */
define("lmd/core/social/facebook",["jquery","lmd/core/conf","lmd/core/context"],function($,conf,context){var facebook={_loadDeferred:null,parse:function(options){var iframe_hgt,$fb_likes=$(".article .fb-like");var hostname=conf.www.location.hostname;if(typeof options.use_current_location!=="undefined"&&options.use_current_location===true)hostname=window.location.hostname;$(".fb-like").each(function(){var href=$(this).data("href");if(typeof href==="undefined")$(this).attr("data-href",window.location.protocol+"//"+hostname+window.location.pathname)});
FB.XFBML.parse();FB.Event.subscribe("xfbml.render",function(){window.setTimeout(function(){$fb_likes.first().css("overflow","visible").animate({opacity:"1"},200)},300)});window.setTimeout(function(){iframe_hgt=$fb_likes.first().find("iframe").css("height");$fb_likes.first().animate({"height":iframe_hgt},200);$fb_likes.last().css("height",iframe_hgt)},2E3)},partage:function(selector,options){selector=selector||"";options=$.extend({link:false,redirect_uri:window.location.protocol+"//"+conf.www.location.hostname+
context.page.link,xt:false,use_current_location:false},options);$(selector).click(function(event){var url=options.link;if(url===false){if(typeof $(this).attr("data-href")==="undefined"||$(this).attr("data-href")==="")return;url=$(this).attr("data-href")}var hostname=conf.www.location.hostname;if(options.use_current_location===true)hostname=window.location.hostname;if(!url.match(/^(https?:)?\/\//))url=window.location.protocol+"//"+hostname+url;if(typeof xt_click!=="undefined"&&options.xt!==false)xt_click(event.target,
"C",context.page.xiti.xtn2,options.xt,"A");facebook.load().done(function(){FB.ui({method:"feed",link:url,redirect_uri:options.redirect_uri})})})},load:function(){if(this._loadDeferred===null||typeof window.FB!=="undefined")this._loadDeferred=$.Deferred();if(typeof window.FB!=="undefined")this._loadDeferred.resolve();else{var deffered=this._loadDeferred;window.fbAsyncInit=function(){FB.init({appId:"166878320861",status:true,cookie:true,xfbml:true});deffered.resolve()};$("body").append('<div id="fb-root"></div>');
(function(d){var js,id="facebook-jssdk",ref=d.getElementsByTagName("script")[0];if(d.getElementById(id))return;js=d.createElement("script");js.id=id;js.async=true;js.src="//connect.facebook.net/fr_FR/all.js";ref.parentNode.insertBefore(js,ref)})(document)}return this._loadDeferred.promise()}};return facebook});

/* -- end module lmd/core/social/facebook -- */
/* -- start module lmd/core/social/twitter -- */
define("lmd/core/social/twitter",["jquery","lib/jquery/plugin/jquery.spin","lmd/core/conf","lmd/core/context","lmd/ui/popup"],function($,jquerySpin,conf,context,popup){var twitter={_loadDeferred:null,_loadWidgetsDeferred:null,partage:function(selector,options){selector=selector||"";options=$.extend({link:false,title:false,xt:false,xtor:false,use_popup:true,width:550,height:320,position:"center",use_current_location:false},options);$(selector).click(function(event){var url=options.link,title=options.title,hostname;if(url===
false){if(typeof $(this).attr("data-href")==="undefined"||$(this).attr("data-href")==="")return;url=$(this).attr("data-href")}if(title===false){if(typeof $(this).attr("data-title")==="undefined"||$(this).attr("data-title")==="")return;title=$(this).attr("data-title")}hostname=conf.www.location.hostname;if(options.use_current_location===true)hostname=window.location.hostname;if(!url.match(/^(https?:)?\/\//))url=window.location.protocol+"//"+hostname+url;if(typeof xt_click!=="undefined"&&options.xt!==
false)xt_click(event.target,"C",context.page.xiti.xtn2,options.xt,"A");url+="#xtor=AL-32280258";url="//twitter.com/share?related=lemondefr&via=lemondefr&lang=fr&text="+encodeURI(title)+"&url="+encodeURI(url);if(options.use_popup===true)popup.openPopup({position:options.position,width:options.width,height:options.height,link:url});else window.location.href=url})},liste:function(id,username,liste,options){var node=$("#"+id).get(0);twttr.widgets.load(node)},user:function(id,username,options){this.loadWidgets().done(function(){var node=
$("#"+id).get(0);twttr.widgets.createTimeline("351705104409325570",node,function(el){},{screenName:username,lang:"fr",chrome:"noheader noborders noscrollbar",tweetLimit:4})})},load:function(){if(this._loadDeferred===null||$("body").data("twttr-rendered"))this._loadDeferred=$.Deferred();if($("body").data("twttr-rendered"))this._loadDeferred.resolve();else require(["twitter/widgets"],this._loadDeferred.resolve);return this._loadDeferred.promise()},loadWidgets:function(){if(this._loadWidgetsDeferred===
null)this._loadWidgetsDeferred=$.Deferred();if(typeof twttr==="object"&&twttr.init===true&&typeof twttr.widgets==="object"&&twttr.widgets.loaded===true)this._loadWidgetsDeferred.resolve();else require(["twitter/widgets"],this._loadWidgetsDeferred.resolve);return this._loadWidgetsDeferred.promise()}};return twitter});

/* -- end module lmd/core/social/twitter -- */
/* -- start module lmd/core/advert/widget-position -- */
define("lmd/core/advert/widget-position",["jquery","lmd/core/storage","lmd/core/context"],function($,storage,context){var rubriqueOmbrelleId="";if(typeof context.rubrique!=="undefined"&&context.rubrique&&typeof context.rubrique.rubrique_ombrelle!=="undefined"&&context.rubrique.rubrique_ombrelle&&typeof context.rubrique.rubrique_ombrelle.id!=="undefined"&&context.rubrique.rubrique_ombrelle.id)rubriqueOmbrelleId=context.rubrique.rubrique_ombrelle.id;var widgetContainer=$("#widget_container"),adPosition,widgetEditoDisplayKey="widget-edito-display";
if(lmd.context&&lmd.context.page.advert.adserver==="smartadserver")adPosition=21490;if(rubriqueOmbrelleId!=="")widgetEditoDisplayKey+=":"+rubriqueOmbrelleId;return{init:function(){var closure=this;if(widgetContainer.length!==1)return;if(this.canShowEditoWidget()){this.showWidget();this.increaseEditoWidgetDisplay()}else require(["domReady"],function(domReady){domReady(function(){var position_pub;if(!lmd.advertController||lmd.context.page.advert.adserver!=="smartadserver")return;position_pub=document.createElement("div");
position_pub.className="position_pub";position_pub.setAttribute("data-adformat","oreille_droite");position_pub.setAttribute("data-adformat-id",adPosition);position_pub.setAttribute("data-adsite",lmd.context.page.advert.smart.site);position_pub.setAttribute("data-adpage",lmd.context.page.advert.smart.page);position_pub.setAttribute("data-adquery","");widgetContainer.append(position_pub);lmd.advertController.buildPositionAdvert([lmd.context.page.advert.smart.page,adPosition]);lmd.advertController.refresh("oreille_droite",
lmd.context.page.advert.smart.page)})})},showWidget:function(){require(["jquery","lib/jquery/plugin/jquery.ajah"],function($){widgetContainer.ajah({url:widgetContainer.data("uri")})})},canShowEditoWidget:function(){if(storage.isSupported===false)return true;var display=storage.get(widgetEditoDisplayKey,true);return display===null||parseInt(display,10)===0},increaseEditoWidgetDisplay:function(){if(storage.isSupported===false)return;var display=storage.get(widgetEditoDisplayKey,true);if(display===null)display=
0;storage.set(widgetEditoDisplayKey,display+1,null,true)}}});

/* -- end module lmd/core/advert/widget-position -- */
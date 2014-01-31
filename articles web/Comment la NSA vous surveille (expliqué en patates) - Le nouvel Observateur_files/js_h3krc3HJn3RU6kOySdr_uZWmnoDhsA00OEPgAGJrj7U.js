/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);;
/*
 * jQuery.SerialScroll - Animated scrolling of series
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 06/14/2009
 * @author Ariel Flesler
 * @version 1.2.2
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 */
;(function(a){var b=a.serialScroll=function(c){return a(window).serialScroll(c)};b.defaults={duration:1e3,axis:"x",event:"click",start:0,step:1,lock:!0,cycle:!0,constant:!0};a.fn.serialScroll=function(c){return this.each(function(){var t=a.extend({},b.defaults,c),s=t.event,i=t.step,r=t.lazy,e=t.target?this:document,u=a(t.target||this,e),p=u[0],m=t.items,h=t.start,g=t.interval,k=t.navigation,l;if(!r){m=d()}if(t.force){f({},h)}a(t.prev||[],e).bind(s,-i,q);a(t.next||[],e).bind(s,i,q);if(!p.ssbound){u.bind("prev.serialScroll",-i,q).bind("next.serialScroll",i,q).bind("goto.serialScroll",f)}if(g){u.bind("start.serialScroll",function(v){if(!g){o();g=!0;n()}}).bind("stop.serialScroll",function(){o();g=!1})}u.bind("notify.serialScroll",function(x,w){var v=j(w);if(v>-1){h=v}});p.ssbound=!0;if(t.jump){(r?u:d()).bind(s,function(v){f(v,j(v.target))})}if(k){k=a(k,e).bind(s,function(v){v.data=Math.round(d().length/k.length)*k.index(this);f(v,this)})}function q(v){v.data+=h;f(v,this)}function f(B,z){if(!isNaN(z)){B.data=z;z=p}var C=B.data,v,D=B.type,A=t.exclude?d().slice(0,-t.exclude):d(),y=A.length,w=A[C],x=t.duration;if(D){B.preventDefault()}if(g){o();l=setTimeout(n,t.interval)}if(!w){v=C<0?0:y-1;if(h!=v){C=v}else{if(!t.cycle){return}else{C=y-v-1}}w=A[C]}if(!w||t.lock&&u.is(":animated")||D&&t.onBefore&&t.onBefore(B,w,u,d(),C)===!1){return}if(t.stop){u.queue("fx",[]).stop()}if(t.constant){x=Math.abs(x/i*(h-C))}u.scrollTo(w,x,t).trigger("notify.serialScroll",[C])}function n(){u.trigger("next.serialScroll")}function o(){clearTimeout(l)}function d(){return a(m,p)}function j(w){if(!isNaN(w)){return w}var x=d(),v;while((v=x.index(w))==-1&&w!=p){w=w.parentNode}return v}})}})(jQuery);;
// ColorBox v1.3.17.2 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(a,b,c){function bc(b){if(!U){P=b,_(),y=a(P),Q=0,K.rel!=="nofollow"&&(y=a("."+g).filter(function(){var b=a.data(this,e).rel||this.rel;return b===K.rel}),Q=y.index(P),Q===-1&&(y=y.add(P),Q=y.length-1));if(!S){S=T=!0,r.show();if(K.returnFocus)try{P.blur(),a(P).one(l,function(){try{this.focus()}catch(a){}})}catch(c){}q.css({opacity:+K.opacity,cursor:K.overlayClose?"pointer":"auto"}).show(),K.w=Z(K.initialWidth,"x"),K.h=Z(K.initialHeight,"y"),X.position(),o&&z.bind("resize."+p+" scroll."+p,function(){q.css({width:z.width(),height:z.height(),top:z.scrollTop(),left:z.scrollLeft()})}).trigger("resize."+p),ba(h,K.onOpen),J.add(D).hide(),I.html(K.close).show()}X.load(!0)}}function bb(){var a,b=f+"Slideshow_",c="click."+f,d,e,g;K.slideshow&&y[1]?(d=function(){F.text(K.slideshowStop).unbind(c).bind(j,function(){if(Q<y.length-1||K.loop)a=setTimeout(X.next,K.slideshowSpeed)}).bind(i,function(){clearTimeout(a)}).one(c+" "+k,e),r.removeClass(b+"off").addClass(b+"on"),a=setTimeout(X.next,K.slideshowSpeed)},e=function(){clearTimeout(a),F.text(K.slideshowStart).unbind([j,i,k,c].join(" ")).one(c,d),r.removeClass(b+"on").addClass(b+"off")},K.slideshowAuto?d():e()):r.removeClass(b+"off "+b+"on")}function ba(b,c){c&&c.call(P),a.event.trigger(b)}function _(b){K=a.extend({},a.data(P,e));for(b in K)a.isFunction(K[b])&&b.substring(0,2)!=="on"&&(K[b]=K[b].call(P));K.rel=K.rel||P.rel||"nofollow",K.href=K.href||a(P).attr("href"),K.title=K.title||P.title,typeof K.href=="string"&&(K.href=a.trim(K.href))}function $(a){return K.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(a)}function Z(a,b){return Math.round((/%/.test(a)?(b==="x"?z.width():z.height())/100:1)*parseInt(a,10))}function Y(c,d,e){e=b.createElement("div"),c&&(e.id=f+c),e.style.cssText=d||"";return a(e)}var d={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:!1,returnFocus:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:!1},e="colorbox",f="cbox",g=f+"Element",h=f+"_open",i=f+"_load",j=f+"_complete",k=f+"_cleanup",l=f+"_closed",m=f+"_purge",n=a.browser.msie&&!a.support.opacity,o=n&&a.browser.version<7,p=f+"_IE6",q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X;X=a.fn[e]=a[e]=function(b,c){var f=this;b=b||{};if(!f[0]){if(f.selector)return f;f=a("<a/>"),b.open=!0}c&&(b.onComplete=c),f.each(function(){a.data(this,e,a.extend({},a.data(this,e)||d,b)),a(this).addClass(g)}),(a.isFunction(b.open)&&b.open.call(f)||b.open)&&bc(f[0]);return f},X.init=function(){z=a(c),r=Y().attr({id:e,"class":n?f+(o?"IE6":"IE"):""}),q=Y("Overlay",o?"position:absolute":"").hide(),s=Y("Wrapper"),t=Y("Content").append(A=Y("LoadedContent","width:0; height:0; overflow:hidden"),C=Y("LoadingOverlay").add(Y("LoadingGraphic")),D=Y("Title"),E=Y("Current"),G=Y("Next"),H=Y("Previous"),F=Y("Slideshow").bind(h,bb),I=Y("Close")),s.append(Y().append(Y("TopLeft"),u=Y("TopCenter"),Y("TopRight")),Y(!1,"clear:left").append(v=Y("MiddleLeft"),t,w=Y("MiddleRight")),Y(!1,"clear:left").append(Y("BottomLeft"),x=Y("BottomCenter"),Y("BottomRight"))).children().children().css({"float":"left"}),B=Y(!1,"position:absolute; width:9999px; visibility:hidden; display:none"),a("body").prepend(q,r.append(s,B)),t.children().hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")}).addClass("hover"),L=u.height()+x.height()+t.outerHeight(!0)-t.height(),M=v.width()+w.width()+t.outerWidth(!0)-t.width(),N=A.outerHeight(!0),O=A.outerWidth(!0),r.css({"padding-bottom":L,"padding-right":M}).hide(),G.click(function(){X.next()}),H.click(function(){X.prev()}),I.click(function(){X.close()}),J=G.add(H).add(E).add(F),t.children().removeClass("hover"),q.click(function(){K.overlayClose&&X.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;S&&K.escKey&&b===27&&(a.preventDefault(),X.close()),S&&K.arrowKey&&y[1]&&(b===37?(a.preventDefault(),H.click()):b===39&&(a.preventDefault(),G.click()))})},X.remove=function(){r.add(q).remove(),a("."+g).removeData(e).removeClass(g)},X.position=function(a,c){function g(a){u[0].style.width=x[0].style.width=t[0].style.width=a.style.width,C[0].style.height=C[1].style.height=t[0].style.height=v[0].style.height=w[0].style.height=a.style.height}var d=0,e=0;z.unbind("resize."+f),r.hide(),K.fixed&&!o?r.css({position:"fixed"}):(d=z.scrollTop(),e=z.scrollLeft(),r.css({position:"absolute"})),K.right!==!1?e+=Math.max(z.width()-K.w-O-M-Z(K.right,"x"),0):K.left!==!1?e+=Z(K.left,"x"):e+=Math.round(Math.max(z.width()-K.w-O-M,0)/2),K.bottom!==!1?d+=Math.max(b.documentElement.clientHeight-K.h-N-L-Z(K.bottom,"y"),0):K.top!==!1?d+=Z(K.top,"y"):d+=Math.round(Math.max(b.documentElement.clientHeight-K.h-N-L,0)/2),r.show(),a=r.width()===K.w+O&&r.height()===K.h+N?0:a||0,s[0].style.width=s[0].style.height="9999px",r.dequeue().animate({width:K.w+O,height:K.h+N,top:d,left:e},{duration:a,complete:function(){g(this),T=!1,s[0].style.width=K.w+O+M+"px",s[0].style.height=K.h+N+L+"px",c&&c(),setTimeout(function(){z.bind("resize."+f,X.position)},1)},step:function(){g(this)}})},X.resize=function(a){if(S){a=a||{},a.width&&(K.w=Z(a.width,"x")-O-M),a.innerWidth&&(K.w=Z(a.innerWidth,"x")),A.css({width:K.w}),a.height&&(K.h=Z(a.height,"y")-N-L),a.innerHeight&&(K.h=Z(a.innerHeight,"y"));if(!a.innerHeight&&!a.height){var b=A.wrapInner("<div style='overflow:auto'></div>").children();K.h=b.height(),b.replaceWith(b.children())}A.css({height:K.h}),X.position(K.transition==="none"?0:K.speed)}},X.prep=function(b){function h(){K.h=K.h||A.height(),K.h=K.mh&&K.mh<K.h?K.mh:K.h;return K.h}function g(){K.w=K.w||A.width(),K.w=K.mw&&K.mw<K.w?K.mw:K.w;return K.w}if(!!S){var c,d=K.transition==="none"?0:K.speed;A.remove(),A=Y("LoadedContent").append(b),A.hide().appendTo(B.show()).css({width:g(),overflow:K.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(t),B.hide(),a(R).css({"float":"none"}),o&&a("select").not(r.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(k,function(){this.style.visibility="inherit"}),c=function(){function o(){n&&r[0].style.removeAttribute("filter")}var b,c,g,h,i=y.length,k,l;!S||(l=function(){clearTimeout(W),C.hide(),ba(j,K.onComplete)},n&&R&&A.fadeIn(100),D.html(K.title).add(A).show(),i>1?(typeof K.current=="string"&&E.html(K.current.replace("{current}",Q+1).replace("{total}",i)).show(),G[K.loop||Q<i-1?"show":"hide"]().html(K.next),H[K.loop||Q?"show":"hide"]().html(K.previous),b=Q?y[Q-1]:y[i-1],g=Q<i-1?y[Q+1]:y[0],K.slideshow&&F.show(),K.preloading&&(h=a.data(g,e).href||g.href,c=a.data(b,e).href||b.href,h=a.isFunction(h)?h.call(g):h,c=a.isFunction(c)?c.call(b):c,$(h)&&(a("<img/>")[0].src=h),$(c)&&(a("<img/>")[0].src=c))):J.hide(),K.iframe?(k=a("<iframe/>").addClass(f+"Iframe")[0],K.fastIframe?l():a(k).one("load",l),k.name=f+ +(new Date),k.src=K.href,K.scrolling||(k.scrolling="no"),n&&(k.frameBorder=0,k.allowTransparency="true"),a(k).appendTo(A).one(m,function(){k.src="//about:blank"})):l(),K.transition==="fade"?r.fadeTo(d,1,o):o())},K.transition==="fade"?r.fadeTo(d,0,function(){X.position(0,c)}):X.position(d,c)}},X.load=function(b){var c,d,e=X.prep;T=!0,R=!1,P=y[Q],b||_(),ba(m),ba(i,K.onLoad),K.h=K.height?Z(K.height,"y")-N-L:K.innerHeight&&Z(K.innerHeight,"y"),K.w=K.width?Z(K.width,"x")-O-M:K.innerWidth&&Z(K.innerWidth,"x"),K.mw=K.w,K.mh=K.h,K.maxWidth&&(K.mw=Z(K.maxWidth,"x")-O-M,K.mw=K.w&&K.w<K.mw?K.w:K.mw),K.maxHeight&&(K.mh=Z(K.maxHeight,"y")-N-L,K.mh=K.h&&K.h<K.mh?K.h:K.mh),c=K.href,W=setTimeout(function(){C.show()},100),K.inline?(Y().hide().insertBefore(a(c)[0]).one(m,function(){a(this).replaceWith(A.children())}),e(a(c))):K.iframe?e(" "):K.html?e(K.html):$(c)?(a(R=new Image).addClass(f+"Photo").error(function(){K.title=!1,e(Y("Error").text("This image could not be loaded"))}).load(function(){var a;R.onload=null,K.scalePhotos&&(d=function(){R.height-=R.height*a,R.width-=R.width*a},K.mw&&R.width>K.mw&&(a=(R.width-K.mw)/R.width,d()),K.mh&&R.height>K.mh&&(a=(R.height-K.mh)/R.height,d())),K.h&&(R.style.marginTop=Math.max(K.h-R.height,0)/2+"px"),y[1]&&(Q<y.length-1||K.loop)&&(R.style.cursor="pointer",R.onclick=function(){X.next()}),n&&(R.style.msInterpolationMode="bicubic"),setTimeout(function(){e(R)},1)}),setTimeout(function(){R.src=c},1)):c&&B.load(c,K.data,function(b,c,d){e(c==="error"?Y("Error").text("Request unsuccessful: "+d.statusText):a(this).contents())})},X.next=function(){!T&&y[1]&&(Q<y.length-1||K.loop)&&(Q=Q<y.length-1?Q+1:0,X.load())},X.prev=function(){!T&&y[1]&&(Q||K.loop)&&(Q=Q?Q-1:y.length-1,X.load())},X.close=function(){S&&!U&&(U=!0,S=!1,ba(k,K.onCleanup),z.unbind("."+f+" ."+p),q.fadeTo(200,0),r.stop().fadeTo(300,0,function(){r.add(q).css({opacity:1,cursor:"auto"}).hide(),ba(m),A.remove(),setTimeout(function(){U=!1,ba(l,K.onClosed)},1)}))},X.element=function(){return a(P)},X.settings=d,V=function(a){a.button!==0&&typeof a.button!="undefined"||a.ctrlKey||a.shiftKey||a.altKey||(a.preventDefault(),bc(this))},a.fn.delegate?a(b).delegate("."+g,"click",V):a("."+g).live("click",V),a(X.init)})(jQuery,document,this);;
/*
 * jBrowserBookmark - Browser bookmark plugin for use with jQuery
 *
 * Copyright (c) 2010 Andrew Holgate
 *
 * Requirements: jQuery v1.1.3 and beyond.
 *
 * Project homepage:  http://plugins.jquery.com/project/jBrowserBookmark
 *
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
(function($){$.fn.jBrowserBookmark=function(options,lang){var defaults=$.extend(opts={language:{'':['Press [key] + ',' to bookmark this page.']},defaultLanguage:'',functionButton:['CTRL','CMD']},options);var docUrl=window.location.href;var docTitle=document.title;var browserName;browserName=getBrowser();return this.each(function(){$(this).click(function(e){e.preventDefault();try{switch(browserName){case'konqueror':case'firefox':window.sidebar.addPanel(docTitle,docUrl,'');break;case'msie':window.external.AddFavorite(docUrl,docTitle);break;case'opera':if(versionOpera()<11){$(this).attr('rel','sidebar').attr('title',docTitle).attr('href',docUrl);break;}else{throw error;}default:throw error;}}catch(error){var hotkey=getHotkey(browserName);var alertText=getLanguageText();if(/mac/.test(navigator.platform.toLowerCase()=='mac')){prefix=alertText[0].replace('[key]',opts.functionButton[1]);}else{prefix=alertText[0].replace('[key]',opts.functionButton[0]);}alert(prefix+hotkey+alertText[1]);}});});function getBrowser(){if($.browser.msie){return'msie';}if($.browser.mozilla){return'firefox';}if($.browser.opera){return'opera';}if($.browser.safari&&/chrome/.test(navigator.userAgent.toLowerCase())){return'chrome';}if($.browser.safari){return'safari';}if(/konqueror/.test(navigator.userAgent.toLowerCase())){return'konqueror';}}function getHotkey(browserName){switch(browserName){case'konqueror':return'B';break;case'opera':return(versionOpera()<9)?'T':'D';break;default:return'D';break;}}function getLanguageText(){var languageChosen;if(opts.language[lang]!=undefined){languageChosen=lang;}else{if(opts.language[navigator.language.toLowerCase().substring(0,2)]!=undefined){languageChosen=navigator.language.toLowerCase().substring(0,2);}else{if(opts.language[opts.defaultLanguage]!=undefined)languageChosen=opts.defaultLanguage;else{for(var i in opts.language){languageChosen=i;break;}}}}return opts.language[languageChosen];}function versionOpera(){version=navigator.userAgent.substring(navigator.userAgent.toLowerCase().indexOf('version/')+8);return parseInt(version.substring(0,version.indexOf('.')));}};})(jQuery);;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};;
// JavaScript Document

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

jQuery.fn.outerHTML = function() {
    return $('<div>').append( this.eq(0).clone() ).html();
};

jQuery.fn.toggleText = function(a, b) {
  return this.each(function() {
    jQuery(this).text(jQuery(this).text() == a ? b : a);
  });
};

function popupcentree(page,largeur,hauteur,options) {
  var top=(screen.height-hauteur)/2;
  var left=(screen.width-largeur)/2;
  window.open(page,"","top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
}

$(document).ready(function(){  
  /**
  *
  *  CLEAR INPUT ON FOCUS
  *
  */

  $(".clearfocus").live("focusin focusout", function(event){
    if (event.type == 'focusin') {
      if($(this).val() == this.defaultValue) $(this).val("").toggleClass("default");
    }else{
      if($.trim($(this).val()) == "") $(this).val(this.defaultValue).toggleClass("default");
    }
  });


  /* Bandeau d'alerte dans un article */
  $("#article .message a.title").click(function(){
    $(this).toggleClass("close").next(".content").slideToggle("fast");
    return false;
  });

  /* Show / Hide liste des internautes qui likent */
// This script was moved to separate file to handle ajax requests.
//  $("#main a.like").click(function(){
//    $(this).parent().next("ul.like_liste").slideToggle("fast");
//    return false;
//  });

  /* Vote pour un article, un commentaire ... */
  $("a.vote").click(function(){
    // [DEV] AJAX ici pour enregistrer le vote, mettre à jour la liste et le nombre de votants

    $(this).toggleClass("done");
    return false;
  });


  /* Nav de sidebar */
  $(".sidebar .block .nav a, #footer .nav a, .tpl_contacts #main .nav a").click(function(){
    var section = $(this).attr("rel");
    $(this).addClass("actif").parent().siblings().children().removeClass("actif");
    $(this).parent().parent().siblings(".section").show().not("." + section).hide();
    return false;
  });
  /* Functionality for switching back to first tab on the contact forms page. */
  $('.tpl_contacts #main .section a.color89').click(function(){
    $('.tpl_contacts #main .nav a').removeClass('actif');
    var $first_tab_link = $('.tpl_contacts #main .nav a:first');
    $first_tab_link.addClass('actif').parent().parent().siblings(".section").show().not("." + $first_tab_link.attr('rel')).hide();
    return false;
  });

  /* Toggle des blocs de sidebar */
  $(".sidebar div.block:not(#top89, #auteur) .toggle:not(.next + .toggle)").click(function(){
    $(this).toggleClass("up").toggleClass("down");
    $(this).parents("div.block").find(".content").slideToggle();
    return false;
  });

  /* Toggle des blocs auteur */
  $("#auteur .author > .toggle").click(function(){
    $(this).toggleClass("up").toggleClass("down").parent().next(".content").slideToggle().siblings(".content:visible").slideToggle();
    return false;
  });

  /* Toggle du top89 */
  $("#top89 .toggle").click(function(){
    $(this).toggleClass("up").toggleClass("down").nextAll(".content").slideToggle();
    $(this).parents("div.part").siblings().find(".content:visible").slideToggle().prevAll("a.toggle").toggleClass("up").toggleClass("down");
    return false;
  });

  /* Toggle bio auteur */
  $("#auteur .bio .toggle, #qui_suisje .bio .toggle").click(function(){
    $(this).toggleClass("up").toggleClass("down").prev(".next").slideToggle();
    return false;
  });


//  /* Ajouter à mes voisins */
//  $("#profil_top .avatar a").click(function(){
//    $(this).parent().toggleClass("add").toggleClass("remove");
//    var content = $(this).html();
//    if(content.indexOf("Ajouter") >= 0) $(this).html(content.replace("Ajouter à","Retirer de"));
//    else $(this).html(content.replace("Retirer de", "Ajouter à"));
//    return false;
//  });


  /* Fermeture des popovers */
  $("#modal_content a.close").live("click",function(){
    if (typeof disconnectedColorbox !== "undefined") {
      disconnectedColorbox.colorbox.close();
    }
    else {
      $.colorbox.close();
    }
    return false;
  });

  /* Pagination des blocs de sidebar */
  $(".block .section:has(.pagination), .block:has(.pagination):not(:has(.section), #rotative)").serialScroll({
    target:'div.wrap_elements',
    items:'ul:eq(0) > li',
    lock:false,
    constant:false,
    duration:300,
    force:true,
    start:0,
    prev:'ul.pagination a.prev',
    next:'ul.pagination a.next',
    navigation:'ul.pagination li:not(:has(a.prev, a.next)) a',
    onBefore:function( e, elem, $pane, $items, pos ){
      //console.log(pos);
      $pane.parents(".block:not(:has(.section)), .section").find("ul.pagination li:eq(" + (pos + 1) + ")").children().addClass("actif").parent().siblings().children(".actif").removeClass("actif");
    }
  });


  /* Animation de la rotative */
  $("#rotative").serialScroll({
    target:'div.wrap_elements',
    items:'ul:eq(0) > li',
    lock:false,
    constant:false,
    duration:400,
    interval:6000,
    force:true,
    start:0,
    prev:'ul.pagination.bottom a.prev',
    next:'ul.pagination.bottom a.next',
    navigation:'ul.pagination.bottom li:not(:has(a.prev, a.next)) a',
    onBefore:function( e, elem, $pane, $items, pos ){
      $pane.parents("#rotative").find("ul.pagination.bottom li:eq(" + (pos + 2) + ")").children().addClass("actif").parent().siblings().children(".actif").removeClass("actif");
      $pane.parents("#rotative").find("ul.pagination.top li:eq(" + (pos) + ")").children().addClass("actif").parent().siblings().children(".actif").removeClass("actif");
      if(e.type == "click") $("#rotative div.wrap_elements").trigger( 'stop' );
    }
  });
  $("#rotative ul.pagination.top a").click(function(){
    var eq = $("#rotative ul.pagination.top a").index($(this));
    $("#rotative ul.pagination.bottom a:eq(" + (eq + 1) + ")").trigger("click");
    return false;
  });

  /* Nice title */
  $("#commentaires .head > div").hoverIntent({
    over: function(){
      $(this).children(".nicetitle").show().animate({
        opacity: 1,
        top: '-=15'
      }, 300
      );
      //$(this).children(".nicetitle").show();
    },
    timeout: 200,
    out: function(){
      $(this).children(".nicetitle").animate({
        opacity: 0,
        top: '+=15'
      }, 300, function(){$(this).hide()});
      //$(this).children(".nicetitle").hide();
    }
  });

  /* Toggle share commentaires */
// This functionality was moved to another file.
//  $("#commentaires ul.links a.share").click(function(){
//    $(this).prev("ul").animate({width:"toggle"}, 100);
//    return false;
//  });

  /* Formulaire de réponses à un commentaire */
  $("#commentaires ul.links a.reply").click(function(){

    var $form = $(this).parents(".foot").children("form");
    // Si le formulaire n'existe pas, on le créé
    if(!$form.is("form")){
      var form = $("#commentaires > form").outerHTML();
      $form = $(this).parents(".foot").append(form).children("form");
      $form.hide();
      $form.children(".user").remove();
      $form.children("a:first-child").remove();
      $form.find(".add a").each(function(){
        var label = $(this).text().replace("Ajouter une", "").replace("Ajouter un", "");
        $(this).text(label);
      });
    }
    $form.slideToggle();
    return false;
  });

  /* Toggle discussion */
  $("#commentaires .liste_commentaires a.toggle").live("click", function(){
    var length = $(this).next("ul").children("li").length;
    var html  = '<a href="#" class="toggle txt"><span>' + length + ' autres commentaires</span></a>';

    $(this).parent().children(".toggle.button").toggleClass("show").siblings("ul").slideToggle();

    if($(this).parent().children(".toggle.txt").is("a")){
      $(this).parent().children(".toggle.txt").slideToggle();
    }else{
      $(this).siblings("ul").after(html);
    }

    return false;
  });

  /* Toggle toutes les conversations */
  $("#commentaires form.filtres #cb_deplier").change(function(){
    if($(this).is(":checked")) $("#commentaires .liste_commentaires a.toggle.show").trigger("click");
    else $("#commentaires .liste_commentaires a.toggle.button:not(.show)").trigger("click");
  });


  /* Ouverture de la popover d'enregistrement */
  innerModalLinks = function(){
    $("#modal_content a:not(.close, .login .services a)").colorbox({
      transition: "none",
      href: function(){
        return $(this).attr('href') + " div#modal_content";
      },
      onComplete: innerModalLinks,
      scrolling: false
    });
  }

	disconnectedColorbox = $("#header .disconnected a:not(.register-mode, .login), body.tpl_blog #header a.cboxElement:not(.register-mode, .login), #commentaires .disconnected a:not(.register-mode, .login), .tpl_qr_list a.colorbox-link").colorbox({
    transition: "none",
    href: function(){
      return $(this).attr('href')/* + " div#modal_content"*/;
    },
    //onComplete: innerModalLinks,
    scrolling: false
  });

  /*disconnectedColorbox = $("#header .disconnected a.register-mode, body.tpl_blog #header a.cboxElement.register-mode, #commentaires .disconnected a.register-mode").colorbox({
    transition: "none",
    href: function(){
      return $(this).attr('href') + " div#modal_content";
    },
    //onComplete: innerModalLinks,
    scrolling: false
  });*/

  $("#modal_content.step1.others input").live("change", function(){
    $("#rue89-common-register-type-form label").removeClass("actif");
    if($(this).is(":checked")) $(this).prev("label").addClass("actif");
    //if($(this).is(":checked")) $(this).prev("label").addClass("actif").parent(".choice").siblings(".choice").find("label").removeClass("actif");
    //if($(this).next().is("input")) $(this).next("input").show();
    //else $(this).parent(".choice").siblings().find("input[type=text]").hide();

    //$.colorbox.resize();
  });


  /* Boussole */
  $("#boussole_expand a").click(function(){

    if ($("#boussole").length == 0) {
      $("#boussole_expand").addClass('throbbing');
      $.ajax({
        url: '/rue89-platforms/boussole',
        dataType: 'html',
        cache: false,    
        success: function(data) {
          $("#header").append(data);
          Drupal.attachBehaviors("#header");
          $.getScript('/sites/news/modules/custom/rue89_site/autocompleteRue89.js');          
          $(this).toggleClass("close");
          $("#boussole").find(".content").slideToggle();
          $("#boussole_expand").removeClass('throbbing');
        }
      });

    } else {    
      $(this).toggleClass("close");
      $("#boussole").find(".content").slideToggle();
    }

    // Close user nav if it is open
    if ($("#user_nav").find(".nav").is(":visible")) {
      $("#user_nav").find(".nav").hide();
    }

    return false;
  });

  // Fermeture de la boussole avec la touche Esc
  $(document).bind('keypress', function(event){
    if (((event.which && event.which == 27) || (event.keyCode && event.keyCode == 27)) && $("#boussole_overlay").is(":visible")) { // ESC
    $("#boussole_expand a").trigger("click", [true]);
    }
  });

  $("#boussole .nav a").live("click", function(){      
    $(this).parent().addClass("actif").siblings().removeClass("actif");
    $("#boussole .section").hide();
    $("#boussole .section." + $(this).attr("rel")).show();
  });

  /* User nav */
  $("#header #user_nav .expand a").click(function(){
    $(this).parents("#user_nav").find(".nav").toggle();
    
    // Close boussole if it is open
    if ($("#boussole .content").is(":visible")) {
      $("#boussole_expand a").toggleClass("close");
      $("#boussole").find(".content").slideToggle();
    }
    return false;
  });


  /* Toggle annexes lists */
  $(".annexes_lists .toggle").click(function(){
    $(this).toggleClass("up").toggleClass("down");
    $(this).parent().next(".content").slideToggle();
    return false;
  });


  /* Liens ajout de commentaires */
  $("#commentaires .add a").colorbox({
    transition: "none",
    href: function(){
      return $(this).attr('href') + " div#modal_content";
    }
  });


  /* Augmentation / Diminution de la typo */
  $("#article .typo_moins, #article .typo_plus").live("click",function(){
    if($(this).is(".typo_moins")) $step = -1;
    else $step = 1;

    $("#article .content *").each(function(){
      $size = $(this).css("font-size");
      $lineHeight = $(this).css("line-height");
      $newSize = parseInt($size.substring(0,($size.length - 2)), 10) + $step;
      $newLineHeight = parseInt($lineHeight.substring(0,($lineHeight.length - 2)), 10) + $step;
      $(this).css({"font-size":$newSize + "px", "line-height": + $newLineHeight + "px"});
    });

    return false;
  });


  /* FB / Twitter */
  $(".tools .facebook a, .tools .twitter a").click(function(){
    popupcentree($(this).attr("href"), 900, 500);
    return false;
  });

  /* Envoi à un ami / cotacter un riverain */
        $(".tools .email a.hidden").colorbox({
    transition: "none",
    href: function(){
      return $(this).attr('href') /*+ " div#modal_content"*/;
    },
    scrolling:false
  });

  /* Envoi à un ami / cotacter un riverain */
  $("#auteur a.contact, #qui_suisje.public a.more, #profil_top a.popup-link").colorbox({
    transition: "none",
    href: function(){
      if ($(this).attr('rel') != '') {
        return '/system/ajax/rue89/user/' + $(this).attr('rel') + '/contact';
      }
      else {
        return $(this).attr('href');
      }
    },
    scrolling:false
  });


  /* Preview des commentaires */
  /*$("form.add_comment input.preview").live("click", function(){
    $form = $(this).parents("form");
    $form.find(".add").toggleClass("loading");

    $.get('parts/comment-preview.inc.php', function(data) {
       $form.before(data);
       $form.slideToggle().prev().hide().slideToggle(function(){
        $(this).find(".preview").addClass("loaded");
        $form.find(".add").toggleClass("loading");
      });
    });
    return false;
  });*/

  /* Preview des commentaires */
  $(".commentaire .preview .cancel").live("click", function(){
    $(this).parents(".commentaire").find("div.preview").removeClass("loaded").parent().slideToggle(function(){$(this).remove();}).next().slideToggle();
    return false;
  });

  /* Lightbox à l'intérieur des articles */
    /* Liens ajout de commentaires */
  $("#article .content a.colorbox").colorbox({
    maxWidth: "90%",
    maxHeight: "90%",
    transition: "none",
    onComplete: function(){
      $('#colorbox').addClass('lightbox');
    },
    onClosed: function(){
      $('#colorbox').removeClass('lightbox');
    }
  });


  /* Articles avec chapitres */
  $("#article .chapitres a, #article .next_chapter a").live("click", function(event){
    event.preventDefault();
    var pathname = this.pathname;
    if (pathname.indexOf('/') !== 0) {
      pathname = '/' + pathname;
    }
    var url = pathname + '/chapter' + this.search;
    var that = this;
    setTimeout(function () {
      $('html,body').stop(true).animate({scrollTop: $(that).parents("#article .content").offset().top - 15}, 500);
      $(that).parents("#article .content").css("visibility","hidden").before('<div class="loading_content"><img src="/sites/all/themes/rue89base/css/img/ajax-loader.gif" alt="chargement"></div>').load(url, function(){
        $("#article .content").css("visibility","visible").prev(".loading_content").remove();
      });
    }, 0);
    return false;
  });

  /* hide Infos à 3 Voix if tall ad block */
  //if ($('#sidebar_right .pave_haut').height() > 35) $('#sidebar_right .pave_haut').after($('#info_3voix'));

});


/* newsletter */
function isEmail(emailAddress){
  emailAddressValue=emailAddress.value.toLowerCase();
  var countryTLDs=/^(ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cat|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$/;
  var gTLDs=/^(aero|asia|biz|cat|com|coop|edu|geo|gov|info|int|jobs|mil|mobi|museum|name|net|org|post|pro|tel|travel)$/;
  var basicAddress=/^(.+)@(.+)$/;
  var specialChars='\\(\\)><@,;:\\\\\\\"\\.\\[\\]';
  var validChars='\[^\\s'+specialChars+'\]';
  var validCharset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzöå0123456789\'-_.+';
  var quotedUser='(\"[^\"]*\")';
  var atom=validChars+'+';
  var word='('+atom+'|'+quotedUser+')';
  var validUser=new RegExp('^'+word+'(\.'+word+')*$');
  var symDomain=new RegExp('^'+atom+'(\.'+atom+')*$');
  var matchArray=emailAddressValue.match(basicAddress);
  if(emailAddress.value==''||emailAddress==null){
    return true;
  }
  if(matchArray==null){
    alert('L\'adresse Email semble incorrecte,\nveuillez vérifier la syntaxe.');
    emailAddress.focus();
    return false;
  }else{
    var user=matchArray[1];
    var domain=matchArray[2];
    for(i=0;i<user.length;i++){
      if(validCharset.indexOf(user.charAt(i))==-1){
        alert('L\'adresse Email contient des caractères invalides,\nveuillez vérifier la partie avant l\'arobase.');
        emailAddress.focus();
        return false;
      }
    }
    for(i=0;i<domain.length;i++){
      if(validCharset.indexOf(domain.charAt(i))==-1){
        alert('L\'adresse Email contient des caractères invalides,\nveuillez vérifier la partie après l\'arobase.');
        emailAddress.focus();
        return false;
      }
    }
    if(user.match(validUser)==null){
      alert('L\'adresse Email semble incorrecte,\nveuillez vérifier la partie avant l\'arobase.');
      emailAddress.focus();
      return false;
    }
    var atomPat=new RegExp('^'+atom+'$');
    var domArr=domain.split('.');
    var len=domArr.length;
    for(i=0;i<len;i++){
      if(domArr[i].search(atomPat)==-1){
        alert('L\'adresse Email semble incorrecte,\nveuillez vérifier la partie après l\'arobase.');
        emailAddress.focus();
        return false;
      }
    }
    if((domArr[domArr.length-1].length==2)&&(domArr[domArr.length-1].search(countryTLDs)==-1)){
      alert('L\'adresse Email semble incorrecte,\nveuillez vérifier le suffixe du domaine.');
      emailAddress.focus();
      return false;
    }
    if((domArr[domArr.length-1].length>2)&&(domArr[domArr.length-1].search(gTLDs)==-1)){
      alert('L\'adresse Email semble incorrecte,\nveuillez vérifier le suffixe du domaine.');
      emailAddress.focus();
      return false;
    }
    if((domArr[domArr.length-1].length<2)||(domArr[domArr.length-1].length>6)){
      alert('L\'adresse Email semble incorrecte,\nveuillez vérifier le suffixe du domaine.');
      emailAddress.focus();
      return false;
    }
    if(len<2){
      alert('L\'adresse Email semble incorrecte.');
      emailAddress.focus();
      return false;
    }
  }
  return true;
}
String.prototype.trim = function() { return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");	}
function mandatoryText(input,fieldName){
  if(input.value.trim()==''||input==null){
    alert('Veuillez saisir '+fieldName+'.');
    input.focus();
    return false;
  } else {
    return true;
  }
}
function validForm(which){
  if (!which) {
    which = '';
  } else {
    which = which + '_';
  }
  if(!mandatoryText(document.getElementById(which + 'EMAIL_FIELD'), 'Email')) return false;
  if(!isEmail(document.getElementById(which + 'EMAIL_FIELD'))) return false;
  document.getElementById(which + 'emvForm').submit();
}

;
function print_popup(url, title)
{
 params  = 'width='+screen.width;
 params += ', height='+screen.height;
 params += ', top=0, left=0'
 params += ', fullscreen=yes, resizable=1, scrollbars=1';
 newwin = window.open(url, "print_window", params);
 if (window.focus) {newwin.focus();}
 newwin.onload = function() {
   newwin.print();
 };
 return false;
};
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var audioplayer_swfobject=function(){var d="undefined",R="object",s="Shockwave Flash",w="ShockwaveFlash.ShockwaveFlash",Q="application/x-shockwave-flash",r="SWFObjectExprInst",X="onreadystatechange",o=window,J=document,T=navigator,t=false,u=[H],O=[],n=[],i=[],L,q,e,b,j=false,A=false,N,g,M=true,m=function(){var AA=typeof J.getElementById!=d&&typeof J.getElementsByTagName!=d&&typeof J.createElement!=d,AH=T.userAgent.toLowerCase(),y=T.platform.toLowerCase(),AE=y?/win/.test(y):/win/.test(AH),AC=y?/mac/.test(y):/mac/.test(AH),AF=/webkit/.test(AH)?parseFloat(AH.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,x=!+"\v1",AG=[0,0,0],AB=null;if(typeof T.plugins!=d&&typeof T.plugins[s]==R){AB=T.plugins[s].description;if(AB&&!(typeof T.mimeTypes!=d&&T.mimeTypes[Q]&&!T.mimeTypes[Q].enabledPlugin)){t=true;x=false;AB=AB.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AG[0]=parseInt(AB.replace(/^(.*)\..*$/,"$1"),10);AG[1]=parseInt(AB.replace(/^.*\.(.*)\s.*$/,"$1"),10);AG[2]=/[a-zA-Z]/.test(AB)?parseInt(AB.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof o.ActiveXObject!=d){try{var AD=new ActiveXObject(w);if(AD){AB=AD.GetVariable("$version");if(AB){x=true;AB=AB.split(" ")[1].split(",");AG=[parseInt(AB[0],10),parseInt(AB[1],10),parseInt(AB[2],10)]}}}catch(z){}}}return{w3:AA,pv:AG,wk:AF,ie:x,win:AE,mac:AC}}(),K=function(){if(!m.w3){return }if((typeof J.readyState!=d&&J.readyState=="complete")||(typeof J.readyState==d&&(J.getElementsByTagName("body")[0]||J.body))){F()}if(!j){if(typeof J.addEventListener!=d){J.addEventListener("DOMContentLoaded",F,false)}if(m.ie&&m.win){J.attachEvent(X,function(){if(J.readyState=="complete"){J.detachEvent(X,arguments.callee);F()}});if(o==top){(function(){if(j){return }try{J.documentElement.doScroll("left")}catch(x){setTimeout(arguments.callee,0);return }F()})()}}if(m.wk){(function(){if(j){return }if(!/loaded|complete/.test(J.readyState)){setTimeout(arguments.callee,0);return }F()})()}S(F)}}();function F(){if(j){return }try{var z=J.getElementsByTagName("body")[0].appendChild(c("span"));z.parentNode.removeChild(z)}catch(AA){return }j=true;var x=u.length;for(var y=0;y<x;y++){u[y]()}}function k(x){if(j){x()}else{u[u.length]=x}}function S(y){if(typeof o.addEventListener!=d){o.addEventListener("load",y,false)}else{if(typeof J.addEventListener!=d){J.addEventListener("load",y,false)}else{if(typeof o.attachEvent!=d){I(o,"onload",y)}else{if(typeof o.onload=="function"){var x=o.onload;o.onload=function(){x();y()}}else{o.onload=y}}}}}function H(){if(t){v()}else{h()}}function v(){var x=J.getElementsByTagName("body")[0];var AA=c(R);AA.setAttribute("type",Q);var z=x.appendChild(AA);if(z){var y=0;(function(){if(typeof z.GetVariable!=d){var AB=z.GetVariable("$version");if(AB){AB=AB.split(" ")[1].split(",");m.pv=[parseInt(AB[0],10),parseInt(AB[1],10),parseInt(AB[2],10)]}}else{if(y<10){y++;setTimeout(arguments.callee,10);return }}x.removeChild(AA);z=null;h()})()}else{h()}}function h(){var AG=O.length;if(AG>0){for(var AF=0;AF<AG;AF++){var y=O[AF].id;var AB=O[AF].callbackFn;var AA={success:false,id:y};if(m.pv[0]>0){var AE=C(y);if(AE){if(f(O[AF].swfVersion)&&!(m.wk&&m.wk<312)){W(y,true);if(AB){AA.success=true;AA.ref=Z(y);AB(AA)}}else{if(O[AF].expressInstall&&a()){var AI={};AI.data=O[AF].expressInstall;AI.width=AE.getAttribute("width")||"0";AI.height=AE.getAttribute("height")||"0";if(AE.getAttribute("class")){AI.styleclass=AE.getAttribute("class")}if(AE.getAttribute("align")){AI.align=AE.getAttribute("align")}var AH={};var x=AE.getElementsByTagName("param");var AC=x.length;for(var AD=0;AD<AC;AD++){if(x[AD].getAttribute("name").toLowerCase()!="movie"){AH[x[AD].getAttribute("name")]=x[AD].getAttribute("value")}}p(AI,AH,y,AB)}else{P(AE);if(AB){AB(AA)}}}}}else{W(y,true);if(AB){var z=Z(y);if(z&&typeof z.SetVariable!=d){AA.success=true;AA.ref=z}AB(AA)}}}}}function Z(AA){var x=null;var y=C(AA);if(y&&y.nodeName=="OBJECT"){if(typeof y.SetVariable!=d){x=y}else{var z=y.getElementsByTagName(R)[0];if(z){x=z}}}return x}function a(){return !A&&f("6.0.65")&&(m.win||m.mac)&&!(m.wk&&m.wk<312)}function p(AA,AB,x,z){A=true;e=z||null;b={success:false,id:x};var AE=C(x);if(AE){if(AE.nodeName=="OBJECT"){L=G(AE);q=null}else{L=AE;q=x}AA.id=r;if(typeof AA.width==d||(!/%$/.test(AA.width)&&parseInt(AA.width,10)<310)){AA.width="310"}if(typeof AA.height==d||(!/%$/.test(AA.height)&&parseInt(AA.height,10)<137)){AA.height="137"}J.title=J.title.slice(0,47)+" - Flash Player Installation";var AD=m.ie&&m.win?"ActiveX":"PlugIn",AC="MMredirectURL="+o.location.toString().replace(/&/g,"%26")+"&MMplayerType="+AD+"&MMdoctitle="+J.title;if(typeof AB.flashvars!=d){AB.flashvars+="&"+AC}else{AB.flashvars=AC}if(m.ie&&m.win&&AE.readyState!=4){var y=c("div");x+="SWFObjectNew";y.setAttribute("id",x);AE.parentNode.insertBefore(y,AE);AE.style.display="none";(function(){if(AE.readyState==4){AE.parentNode.removeChild(AE)}else{setTimeout(arguments.callee,10)}})()}U(AA,AB,x)}}function P(y){if(m.ie&&m.win&&y.readyState!=4){var x=c("div");y.parentNode.insertBefore(x,y);x.parentNode.replaceChild(G(y),x);y.style.display="none";(function(){if(y.readyState==4){y.parentNode.removeChild(y)}else{setTimeout(arguments.callee,10)}})()}else{y.parentNode.replaceChild(G(y),y)}}function G(AB){var AA=c("div");if(m.win&&m.ie){AA.innerHTML=AB.innerHTML}else{var y=AB.getElementsByTagName(R)[0];if(y){var AC=y.childNodes;if(AC){var x=AC.length;for(var z=0;z<x;z++){if(!(AC[z].nodeType==1&&AC[z].nodeName=="PARAM")&&!(AC[z].nodeType==8)){AA.appendChild(AC[z].cloneNode(true))}}}}}return AA}function U(AI,AG,y){var x,AA=C(y);if(m.wk&&m.wk<312){return x}if(AA){if(typeof AI.id==d){AI.id=y}if(m.ie&&m.win){var AH="";for(var AE in AI){if(AI[AE]!=Object.prototype[AE]){if(AE.toLowerCase()=="data"){AG.movie=AI[AE]}else{if(AE.toLowerCase()=="styleclass"){AH+=' class="'+AI[AE]+'"'}else{if(AE.toLowerCase()!="classid"){AH+=" "+AE+'="'+AI[AE]+'"'}}}}}var AF="";for(var AD in AG){if(AG[AD]!=Object.prototype[AD]){AF+='<param name="'+AD+'" value="'+AG[AD]+'" />'}}AA.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AH+">"+AF+"</object>";n[n.length]=AI.id;x=C(AI.id)}else{var z=c(R);z.setAttribute("type",Q);for(var AC in AI){if(AI[AC]!=Object.prototype[AC]){if(AC.toLowerCase()=="styleclass"){z.setAttribute("class",AI[AC])}else{if(AC.toLowerCase()!="classid"){z.setAttribute(AC,AI[AC])}}}}for(var AB in AG){if(AG[AB]!=Object.prototype[AB]&&AB.toLowerCase()!="movie"){E(z,AB,AG[AB])}}AA.parentNode.replaceChild(z,AA);x=z}}return x}function E(z,x,y){var AA=c("param");AA.setAttribute("name",x);AA.setAttribute("value",y);z.appendChild(AA)}function Y(y){var x=C(y);if(x&&x.nodeName=="OBJECT"){if(m.ie&&m.win){x.style.display="none";(function(){if(x.readyState==4){B(y)}else{setTimeout(arguments.callee,10)}})()}else{x.parentNode.removeChild(x)}}}function B(z){var y=C(z);if(y){for(var x in y){if(typeof y[x]=="function"){y[x]=null}}y.parentNode.removeChild(y)}}function C(z){var x=null;try{x=J.getElementById(z)}catch(y){}return x}function c(x){return J.createElement(x)}function I(z,x,y){z.attachEvent(x,y);i[i.length]=[z,x,y]}function f(z){var y=m.pv,x=z.split(".");x[0]=parseInt(x[0],10);x[1]=parseInt(x[1],10)||0;x[2]=parseInt(x[2],10)||0;return(y[0]>x[0]||(y[0]==x[0]&&y[1]>x[1])||(y[0]==x[0]&&y[1]==x[1]&&y[2]>=x[2]))?true:false}function V(AC,y,AD,AB){if(m.ie&&m.mac){return }var AA=J.getElementsByTagName("head")[0];if(!AA){return }var x=(AD&&typeof AD=="string")?AD:"screen";if(AB){N=null;g=null}if(!N||g!=x){var z=c("style");z.setAttribute("type","text/css");z.setAttribute("media",x);N=AA.appendChild(z);if(m.ie&&m.win&&typeof J.styleSheets!=d&&J.styleSheets.length>0){N=J.styleSheets[J.styleSheets.length-1]}g=x}if(m.ie&&m.win){if(N&&typeof N.addRule==R){N.addRule(AC,y)}}else{if(N&&typeof J.createTextNode!=d){N.appendChild(J.createTextNode(AC+" {"+y+"}"))}}}function W(z,x){if(!M){return }var y=x?"visible":"hidden";if(j&&C(z)){C(z).style.visibility=y}else{V("#"+z,"visibility:"+y)}}function l(y){var z=/[\\\"<>\.;]/;var x=z.exec(y)!=null;return x&&typeof encodeURIComponent!=d?encodeURIComponent(y):y}var D=function(){if(m.ie&&m.win){window.attachEvent("onunload",function(){var AC=i.length;for(var AB=0;AB<AC;AB++){i[AB][0].detachEvent(i[AB][1],i[AB][2])}var z=n.length;for(var AA=0;AA<z;AA++){Y(n[AA])}for(var y in m){m[y]=null}m=null;for(var x in audioplayer_swfobject){audioplayer_swfobject[x]=null}audioplayer_swfobject=null})}}();return{registerObject:function(AB,x,AA,z){if(m.w3&&AB&&x){var y={};y.id=AB;y.swfVersion=x;y.expressInstall=AA;y.callbackFn=z;O[O.length]=y;W(AB,false)}else{if(z){z({success:false,id:AB})}}},getObjectById:function(x){if(m.w3){return Z(x)}},embedSWF:function(AB,AH,AE,AG,y,AA,z,AD,AF,AC){var x={success:false,id:AH};if(m.w3&&!(m.wk&&m.wk<312)&&AB&&AH&&AE&&AG&&y){W(AH,false);k(function(){AE+="";AG+="";var AJ={};if(AF&&typeof AF===R){for(var AL in AF){AJ[AL]=AF[AL]}}AJ.data=AB;AJ.width=AE;AJ.height=AG;var AM={};if(AD&&typeof AD===R){for(var AK in AD){AM[AK]=AD[AK]}}if(z&&typeof z===R){for(var AI in z){if(typeof AM.flashvars!=d){AM.flashvars+="&"+AI+"="+z[AI]}else{AM.flashvars=AI+"="+z[AI]}}}if(f(y)){var AN=U(AJ,AM,AH);if(AJ.id==AH){W(AH,true)}x.success=true;x.ref=AN}else{if(AA&&a()){AJ.data=AA;p(AJ,AM,AH,AC);return }else{W(AH,true)}}if(AC){AC(x)}})}else{if(AC){AC(x)}}},switchOffAutoHideShow:function(){M=false},ua:m,getFlashPlayerVersion:function(){return{major:m.pv[0],minor:m.pv[1],release:m.pv[2]}},hasFlashPlayerVersion:f,createSWF:function(z,y,x){if(m.w3){return U(z,y,x)}else{return undefined}},showExpressInstall:function(z,AA,x,y){if(m.w3&&a()){p(z,AA,x,y)}},removeSWF:function(x){if(m.w3){Y(x)}},createCSS:function(AA,z,y,x){if(m.w3){V(AA,z,y,x)}},addDomLoadEvent:k,addLoadEvent:S,getQueryParamValue:function(AA){var z=J.location.search||J.location.hash;if(z){if(/\?/.test(z)){z=z.split("?")[1]}if(AA==null){return l(z)}var y=z.split("&");for(var x=0;x<y.length;x++){if(y[x].substring(0,y[x].indexOf("="))==AA){return l(y[x].substring((y[x].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A){var x=C(r);if(x&&L){x.parentNode.replaceChild(L,x);if(q){W(q,true);if(m.ie&&m.win){L.style.display="block"}}if(e){e(b)}}A=false}}}}();var AudioPlayer=function(){var H=[];var D;var F="";var A={};var E=-1;var G="9";function B(I){if(document.all&&!window[I]){for(var J=0;J<document.forms.length;J++){if(document.forms[J][I]){return document.forms[J][I];break}}}return document.all?window[I]:document[I]}function C(I,J,K){B(I).addListener(J,K)}return{setup:function(J,I){F=J;A=I;if(audioplayer_swfobject.hasFlashPlayerVersion(G)){audioplayer_swfobject.switchOffAutoHideShow();audioplayer_swfobject.createCSS("p.audioplayer_container span","visibility:hidden;height:24px;overflow:hidden;padding:0;border:none;")}},getPlayer:function(I){return B(I)},addListener:function(I,J,K){C(I,J,K)},embed:function(I,K){var N={};var L;var J={};var O={};var M={};for(L in A){N[L]=A[L]}for(L in K){N[L]=K[L]}if(N.transparentpagebg=="yes"){J.bgcolor="#FFFFFF";J.wmode="transparent"}else{if(N.pagebg){J.bgcolor="#"+N.pagebg}J.wmode="opaque"}J.menu="false";for(L in N){if(L=="pagebg"||L=="width"||L=="transparentpagebg"){continue}O[L]=N[L]}M.name=I;M.style="outline: none";O.playerID=I;audioplayer_swfobject.embedSWF(F,I,N.width.toString(),"24",G,false,O,J,M);H.push(I)},syncVolumes:function(I,K){E=K;for(var J=0;J<H.length;J++){if(H[J]!=I){B(H[J]).setVolume(E)}}},activate:function(I,J){if(D&&D!=I){B(D).close()}D=I},load:function(K,I,L,J){B(K).load(I,L,J)},close:function(I){B(I).close();if(I==D){D=null}},open:function(I,J){if(J==undefined){J=1}B(I).open(J==undefined?0:J-1)},getVolume:function(I){return E}}}();;
$(document).ready(function(){
  /* How To */
  var viewed = $.cookie("hasViewed");
  var opened = $.cookie("howtoOpened");

	if (opened == 1 || viewed == null) {
    $("#head_section .right a").hide();
    $("#qr_howto").show();
    $.cookie("hasViewed", 1, { expires: 23});
	}
	else {
	  $.cookie("howtoOpened", 0);
    $("#head_section .right a").show();
    $("#qr_howto").hide();
	}
  // Hide the howto in the following visit 
  if (viewed == 1){
    $.cookie("howtoOpened", 0);
    $("#head_section .right a").show();
    $("#qr_howto").hide();
  }  
	$("#head_section .right a").click(function(){
		$("#qr_howto").slideToggle();
		$.cookie("howtoOpened", 1);
		$(this).hide();
		return false;
	});
	$("#qr_howto a.close").click(function(){
		$(this).parent().slideUp();
		$.cookie("howtoOpened", 0);
		$("#head_section .right a").show();
		return false;
	});

	// Paginatnion coup d'oeil
	$("#qr_rue89:not(.list)").serialScroll({
		target:'div.wrap_elements',
		items:'li:has(.authors)',
		lock:false,
		constant:false,
		duration:300,
		force:true,
		start:0,
		navigation:'.pagination.top a',
		onBefore:function( e, elem, $pane, $items, pos ){
			$pane.parents("#qr_rue89").find(".pagination").find("li:eq(" + pos + ")").children().addClass("actif").parent().siblings().children(".actif").removeClass("actif");
		}
	});

});
;

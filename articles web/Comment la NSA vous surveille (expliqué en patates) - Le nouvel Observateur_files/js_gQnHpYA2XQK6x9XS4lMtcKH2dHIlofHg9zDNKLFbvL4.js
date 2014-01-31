/* $Id: admin_devel.js,v 1.2 2010/03/12 22:54:41 sun Exp $ */
(function($) {

/**
 * jQuery debugging helper.
 *
 * Invented for Dreditor.
 *
 * @usage
 *   $.debug(var [, name]);
 *   $variable.debug( [name] );
 */
jQuery.extend({
  debug: function () {
    // Setup debug storage in global window. We want to look into it.
    window.debug = window.debug || [];

    args = jQuery.makeArray(arguments);
    // Determine data source; this is an object for $variable.debug().
    // Also determine the identifier to store data with.
    if (typeof this == 'object') {
      var name = (args.length ? args[0] : window.debug.length);
      var data = this;
    }
    else {
      var name = (args.length > 1 ? args.pop() : window.debug.length);
      var data = args[0];
    }
    // Store data.
    window.debug[name] = data;
    // Dump data into Firebug console.
    if (typeof console != 'undefined') {
      console.log(name, data);
    }
    return this;
  }
});
// @todo Is this the right way?
jQuery.fn.debug = jQuery.debug;

})(jQuery);
;
/*! lazyload v0.8.5 fasterize.com | github.com/fasterize/lazyload#licence */
window.lzld||function(e,d){function n(){o=!0;h();setTimeout(h,25)}function p(a,b){var c=0;return function(){var d=+new Date;d-c<b||(c=d,a.apply(this,arguments))}}function g(a,b,c){a.attachEvent?a.attachEvent&&a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function j(a,b,c){a.detachEvent?a.detachEvent&&a.detachEvent("on"+b,c):a.removeEventListener(b,c,!1)}function q(a,b){return A(d.documentElement,a)&&a.getBoundingClientRect().top<B+C?(a.onload=null,a.removeAttribute("onload"),a.onerror=null,a.removeAttribute("onerror"),
a.src=a.getAttribute(k),a.removeAttribute(k),f[b]=null,!0):!1}function r(){return 0<=d.documentElement.clientHeight?d.documentElement.clientHeight:d.body&&0<=d.body.clientHeight?d.body.clientHeight:0<=e.innerHeight?e.innerHeight:0}function s(){var a=f.length,b,c=!0;for(b=0;b<a;b++){var d=f[b];null!==d&&!q(d,b)&&(c=!1)}c&&o&&(l=!0,j(e,"resize",t),j(e,"scroll",h),j(e,"load",n))}function u(){l=!1;g(e,"resize",t);g(e,"scroll",h)}function v(a,b,c){var d;if(b){if(Array.prototype.indexOf)return Array.prototype.indexOf.call(b,
a,c);d=b.length;for(c=c?0>c?Math.max(0,d+c):c:0;c<d;c++)if(c in b&&b[c]===a)return c}return-1}var C=200,k="data-src",B=r(),f=[],o=!1,l=!1,t=p(r,20),h=p(s,20);if(e.HTMLImageElement){var m=HTMLImageElement.prototype.getAttribute;HTMLImageElement.prototype.getAttribute=function(a){return"src"===a?m.call(this,k)||m.call(this,a):m.call(this,a)}}e.lzld=function(a){-1===v(a,f)&&(l&&u(),q(a,f.push(a)-1))};var w=function(){for(var a=d.getElementsByTagName("img"),b,c=0,e=a.length;c<e;c+=1)b=a[c],b.getAttribute(k)&&
-1===v(b,f)&&f.push(b);s();setTimeout(h,25)},i=function(a){"readystatechange"===a.type&&"complete"!==d.readyState||(j("load"===a.type?e:d,a.type,i),x||(x=!0,w()))},y=function(){try{d.documentElement.doScroll("left")}catch(a){setTimeout(y,50);return}i("poll")},x=!1,z=!0;if("complete"===d.readyState)w();else{if(d.createEventObject&&d.documentElement.doScroll){try{z=!e.frameElement}catch(D){}z&&y()}g(d,"DOMContentLoaded",i);g(d,"readystatechange",i);g(e,"load",i)}g(e,"load",n);u();var A=d.documentElement.compareDocumentPosition?
function(a,b){return!!(a.compareDocumentPosition(b)&16)}:d.documentElement.contains?function(a,b){return a!==b&&(a.contains?a.contains(b):!1)}:function(a,b){for(;b=b.parentNode;)if(b===a)return!0;return!1}}(this,document);
;

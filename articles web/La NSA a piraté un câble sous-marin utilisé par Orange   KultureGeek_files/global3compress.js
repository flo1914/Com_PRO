jQuery(document).ready(function(){function f(){a.val()!=""&&a.val()!="Recherche instantan\u00e9e"?(jQuery.browser.msie?a.css({"background-image":"url("+g+")","background-position":"right center"}):a.css({"background-image":"url("+g+")","background-position":"175px center"}),h.fadeOut().html(""),jQuery.getJSON(i,{name:a.val(),type_search:j.val()},function(c){d.html(" ");c.error||(jQuery.each(c.items,function(c,a){d.append('<li><a href="'+a.link+'" target="_blank"><img src="'+a.picture+'" alt="" height="40" width="40"/><span class="appstore-name">'+ a.name+'</span><span class="appstore-price">'+a.price+"</span></a></li>")}),c.items.length==0&&a.val()!=""&&h.html("Aucun r\u00e9sultat").fadeIn());a.css("background-image","none")})):d.html(" ")}function e(c){jQuery('input[name="appstore-typestore-search"]').val(c)}function b(c,a,b){jQuery.browser.msie?b==0?c.hide():c.show():c.stop(!0,!0).fadeTo(a,b)}var i="http://kulturegeek.fr/wp-content/themes/KultureGeek/instant/request3.php",g="http://kulturegeek.fr/wp-content/themes/KultureGeek/instant/gfx/loader.gif", k=jQuery("#appstore-fields form"),a=jQuery("#appstore-field-search"),j=jQuery('input[name="appstore-typestore-search"]'),h=jQuery("#appstore-alert"),d=jQuery("#appstore-list");jQuery('input[name="appstore-typestore-search"]').keypress(function(){return!1});jQuery("#appsearch_iphone, #appsearch_ipad, #appsearch_mac").mouseover(function(){jQuery(this).children(":eq(2)").hasClass("applesearch_label_selected")||b(jQuery("#"+jQuery(this).attr("id")+"_label_hover"),"fast",1)});jQuery("#appsearch_iphone, #appsearch_ipad, #appsearch_mac").mouseout(function(){jQuery(this).children(":eq(2)").hasClass("applesearch_label_selected")|| b(jQuery("#"+jQuery(this).attr("id")+"_label_hover"),"fast",0)});jQuery("#appsearch_iphone, #appsearch_ipad, #appsearch_mac").click(function(){if(!jQuery(this).children(":eq(2)").hasClass("applesearch_label_selected")){var a=jQuery(".applesearch_label_selected").parent().attr("id");typeof a!="undefined"&&(b(jQuery(".applesearch_label_selected"),"fast",0),b(jQuery(".applesearch_label_selected").parent().children(":first"),"fast",1),jQuery(".applesearch_label_selected").removeClass("applesearch_label_selected"), b(jQuery("#"+a+"_bg_blue"),"fast",0),b(jQuery("#"+a+"_bg_norm"),"fast",1));a=jQuery(this).attr("id");jQuery(this).children(":eq(2)").addClass("applesearch_label_selected");b(jQuery(this).children().not(":eq(2)"),"fast",0);b(jQuery(this).children(":eq(2)"),"fast",1);b(jQuery("#"+a+"_bg_norm"),"fast",0);b(jQuery("#"+a+"_bg_blue"),"fast",1);switch(a){case "appsearch_iphone":e("software");break;case "appsearch_ipad":e("iPadSoftware");break;case "appsearch_mac":e("macSoftware")}}});jQuery.browser.msie? jQuery("#appsearch_iphone_bg_blue,#appsearch_ipad_bg_blue,#appsearch_mac_bg_blue,#appsearch_iphone_label_hover,#appsearch_ipad_label_hover,#appsearch_mac_label_hover,#appsearch_iphone_label_selected,#appsearch_ipad_label_selected,#appsearch_mac_label_selected").hide():jQuery("#appsearch_iphone_bg_blue,#appsearch_ipad_bg_blue,#appsearch_mac_bg_blue,#appsearch_iphone_label_hover,#appsearch_ipad_label_hover,#appsearch_mac_label_hover,#appsearch_iphone_label_selected,#appsearch_ipad_label_selected,#appsearch_mac_label_selected").addClass("appsearch_opacitydown"); jQuery(a).focus(function(){jQuery(this).val()=="Recherche instantan\u00e9e"&&jQuery(this).val("").removeClass("appsearch_defaultTxtField")});jQuery(a).blur(function(){jQuery(this).val()==""&&jQuery(this).addClass("appsearch_defaultTxtField").val("Recherche instantan\u00e9e")});jQuery(a).addClass("appsearch_defaultTxtField").val("Recherche instantan\u00e9e");switch(1){case 1:jQuery("#appsearch_iphone").click();break;case 2:jQuery("#appsearch_ipad").click();break;case 3:jQuery("#appsearch_mac").click(); break;default:jQuery("#appsearch_iphone").click()}jQuery(a).bind("keyup",f);jQuery("#appsearch_iphone, #appsearch_ipad, #appsearch_mac").bind("click",f);jQuery(k).submit(function(){return!1})});
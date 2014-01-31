$(document).ready(function(){
/* Pagination carroussel */
  $(".carrousel").serialScroll({
    target: '.wrap_items', 
    items:'li',                                                                                                                                                            
    lock:false,
    duration:400,
    interval:6000,
    force:true,
    start:2,
    prev:'a.prev',
    next:'a.next',
    step: 1,
    navigation:'a.navigation',
    onBefore:function( e, elem, $pane, $items, pos ){
      $pane.parents(".carrousel").find("ul.pager li:eq(" + (pos + 1) + ")").children().addClass("actif").parent().siblings().children(".actif").removeClass("actif");
    }                                                                                                                                                                                 
    }); 
}); 
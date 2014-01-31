$(document).ready(function(){

	/* Diaporama navigable */	
	$("#zapnet_plus").serialScroll({
		exclude:2,
		target:'div.wrapper',
		items:'li',
		lock:false,
		prev:'a.prev',
		next:'a.next',
		constant:false,
		duration:300,
		force:true,
		start:0,
		step:3
	});

});;

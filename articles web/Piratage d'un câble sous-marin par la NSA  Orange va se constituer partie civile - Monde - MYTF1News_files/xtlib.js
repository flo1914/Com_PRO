/* Supression des tags HTML*/
function xt_strip_tags(text){
	return unescape(text).replace(/<\/?[^>]+>/gi, '');
}

/* Répétion du MSO */
function xt_get_at_mso() {
	var currentMd5Mso = getCookie('_MD5MSO_');
	var md5mso = '';
	if (currentMd5Mso != 'Undefined') {
		md5mso = currentMd5Mso;
	}
	return md5mso;
}

/* Renvoi du xtpage selon contexte audience ou sales tracker*/
function xt_get_xtpage(xtPage) {
	if (typeof(xt_sales_tracker) == 'undefined' || xt_sales_tracker == 0) {
		return xtPage;
	} else {
		return 'confirmation-commande';
	}
}

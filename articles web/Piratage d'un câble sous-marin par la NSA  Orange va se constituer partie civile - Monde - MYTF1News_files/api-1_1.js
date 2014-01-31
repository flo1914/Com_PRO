(function ($) {
	$.fn.tf1AutoSuggest = function (options) {
		// build main options before element iteration
		var opts = $.extend({}, $.fn.tf1AutoSuggest.defaults, options);

		// iterate and reformat each matched element
		return this.each(function () {
			/*** variables locales ***/
			var $this = $(this),
				// build element specific options
				o = $.meta ? $.extend({}, opts, $this.data()) : opts,
				inputValue = '',
				resLength = 0,
				isHoverList = false,
				timeout,
				$autoSuggestContainer,
				$fullSearchBtn,
				plugin = $.fn.tf1AutoSuggest;
			
			/*** fonctions locales ***/
			// gestion de l'affichage/masquage
			function showAutoSuggest() {
				$autoSuggestContainer.show();
			}
			function hideAutoSuggest(forced) {
				if (forced) {
					isHoverList = false;
				}
				if (!isHoverList) {
					clearTimeout(timeout);
					$autoSuggestContainer.hide();
					$autoSuggestContainer.find(".resHover").removeClass("resHover");
				}
			}
			function hideWithTempo(duration) {
				clearTimeout(timeout);
				timeout = setTimeout(function () { hideAutoSuggest(false); }, duration);
			}
			function getNextHoverElement() { // retourne le prochain élément (navigation clavier)
				var $hoverableElts = $autoSuggestContainer.find(".resItem, .catchupItem").add($fullSearchBtn),
					hoverElt = $autoSuggestContainer.find(".resHover").get(0),
					hoverIndex = $hoverableElts.index(hoverElt);
				
				if (typeof hoverElt === "undefined") {
					return $hoverableElts.get(0);
				}
				if (hoverIndex === $hoverableElts.length - 1) {
					return null;
				}
				return $hoverableElts.get(hoverIndex + 1);
			}
			function getPreviousHoverElement() { // retourne le précédent élément (navigation clavier)
				var $hoverableElts = $autoSuggestContainer.find(".resItem, .catchupItem").add($fullSearchBtn),
					hoverElt = $autoSuggestContainer.find(".resHover").get(0),
					hoverIndex = $hoverableElts.index(hoverElt);
				
				if ((hoverIndex < 1) || (typeof hoverElt === "undefined")) {
					return null;
				}
				return $hoverableElts.get(hoverIndex - 1);
			}
			
			/*** initialisation ***/
			//creation du conteneur des suggestions
			$autoSuggestContainer = $(plugin.createContainer(o));
			$autoSuggestContainer.insertAfter(this);
			$fullSearchBtn = $autoSuggestContainer.find(".fullSearchBtn");
			
			//gestion des survols (conteneur et éléments de liste de résultats)
			$autoSuggestContainer.mouseleave(function () {
				isHoverList = false;
				hideWithTempo(o.fastHidingDelay);
			}).mouseenter(function () {
				isHoverList = true;
				clearTimeout(timeout);
			});
			
			$autoSuggestContainer.find(".resultList").delegate("a", "mouseenter", function () {
				$autoSuggestContainer.find(".resHover").removeClass("resHover");
				$(this).parent().addClass("resHover");
			}).delegate("a", "mouseleave", function () {
				$(this).parent().removeClass("resHover");
			});
			
			$fullSearchBtn.mouseenter(function () {
				$autoSuggestContainer.find(".resHover").removeClass("resHover");
				$(this).addClass("resHover");
			}).mouseleave(function () {
				$(this).removeClass("resHover");
			});

			//gestion de la touche entrée (=>submit du formulaire)
			$this.parents("form:first").submit(function (event) {
				var hoverResElt = $autoSuggestContainer.find(".resultList .resHover");
				if (hoverResElt.length) {	//si un élément dans la liste est en survol on suit son lien
					event.stopPropagation();
					event.preventDefault();
					document.location.href = hoverResElt.find("> a").eq(0).attr('href');
				}
			});

			//gestion des touches
			$this.keyup(function (event) {
				//on réinitialise la tempo d'inactivité
				hideWithTempo(o.inactiveHidingDelay);

				if (event.keyCode == plugin.utils.keyCodes.ESCAPE) {
					hideAutoSuggest(true);
				}
				else if (event.keyCode == plugin.utils.keyCodes.UP) {
					var prev = getPreviousHoverElement();
					if (prev !== null) {
						$autoSuggestContainer.find(".resHover").removeClass("resHover");
						$(prev).addClass("resHover");
					}
				}
				else if (event.keyCode == plugin.utils.keyCodes.DOWN) {
					var next = getNextHoverElement();
					if (next !== null) {
						$autoSuggestContainer.find(".resHover").removeClass("resHover");
						$(next).addClass("resHover");
						isHoverList = true;
					}
				}
				else { //pas une touche spéciale
					var oldValue = inputValue;
					inputValue = $(this).val();
					if (oldValue !== inputValue) {
						if (inputValue.length < o.nbCharMin) {
							hideAutoSuggest(true);
						} else {
							var urlAjax = plugin.constructUrl(o, inputValue);
							$.ajax({
								url: urlAjax,
								dataType: 'jsonp',
								jsonpCallback: 'searchResultsCbk',
								cache: true,
								success: function (json) {
									if (json.results.length > 0) {
										resLength = (json.results.length <= o.maxVisibleResults) ?  json.results.length : o.maxVisibleResults;
										plugin.fill(o, $autoSuggestContainer, inputValue, json.results);
										showAutoSuggest();
									}
									else {
										resLength = 0;
										hideAutoSuggest(true);
									}
								}
							});
						}
					}
				}
			});
		});
	};

	$.fn.tf1AutoSuggest.defaults = {
		nbCharMin: 3, //nb caractères minimum pour lancer une requête
		baseSearchUrl: 'http://api.tf1.fr/suggest/search/',
		domain: 'TF1',
		theme: '', //permet de filtrer sur un theme
		theme_exclude: [], //exclut un ou plusieurs themes (peut être un tableau ou une chaine de caractère)
		containerClass: 'autosuggest', //classe associée au conteneur global
		inviteMsg: 'Accès direct vers', //message d'introduction des résultats
		maxVisibleResults: 3,
		inactiveHidingDelay: 3000, //délai avant disparition de l'autosuggestion en cas d'inactivité
		fastHidingDelay: 1000, //délai de disparition lorsque la souris quitte l'autosuggestion
		fullSearchMsg: 'Tous les résultats pour ', //message du bouton qui lance une recherche par défaut (submit du formulaire)
		withInputValue: true, //ajoute la valeur du champ de recherche à la fin du fullSearchBtn (après fullSearchMsg)
		nbCharMaxTitre: -1,
		afficherCatchup: false,
		nbCharMaxCatchupTitre: -1
	};
	
	$.fn.tf1AutoSuggest.utils = {
		keyCodes: {
			UP: 38,
			DOWN: 40,
			ESCAPE: 27
		},
		getTruncText: function (text, nbCharMax) {
			if (nbCharMax !== -1 && text.length > nbCharMax) {
				return text.substr(0, text.lastIndexOf(" ", nbCharMax - 3)) + "...";
			} else {
				return text;
			}
		}
	};

	$.fn.tf1AutoSuggest.createContainer = function (options) {
		var mainDiv = document.createElement('div');
		mainDiv.className = options.containerClass;
		mainDiv.style.display = "none";

		if (options.inviteMsg !== '') {
			var inviteElt = document.createElement('p');
			inviteElt.className = 'invite';
			inviteElt.innerHTML = options.inviteMsg;
			mainDiv.appendChild(inviteElt);
		}

		var resultList = document.createElement('ul');
		resultList.className = 'resultList';
		mainDiv.appendChild(resultList);

		var fullSearchButton = document.createElement('div');
		fullSearchButton.className = 'fullSearchBtn';
		$(fullSearchButton).click(function () {
			$(this).parents("form:first").submit();
		});
		mainDiv.appendChild(fullSearchButton);

		return mainDiv;
	};

	$.fn.tf1AutoSuggest.constructUrl = function (options, inputValue) {
		var furl = options.baseSearchUrl + options.domain + '/limit/' + options.maxVisibleResults;
		if (options.theme) {
			furl += '/theme/'+options.theme;
		}
		if ((typeof options.theme_exclude === "string") || (options.theme_exclude.length > 0)) {
			if (typeof options.theme_exclude === "string") {
				furl += '/theme_exclude/' + options.theme_exclude;
			} else {
				furl += '/theme_exclude/' + options.theme_exclude.join(',');
			}
		}
		if (options.afficherCatchup) {
			furl += '/catchup/1';
		}
		furl += '/?q=' + encodeURIComponent(inputValue);
		return furl;
	};

	$.fn.tf1AutoSuggest.fill = function (options, $autoSuggestContainer, inputValue, results) {
		var $resList = $(".resultList", $autoSuggestContainer),
			frag = document.createDocumentFragment(),
			getTruncText = $.fn.tf1AutoSuggest.utils.getTruncText;
		
		$resList.empty();
		
		//génération de la liste de résultats
		$.each(results, function (index, value) {
			if (index >= options.maxVisibleResults) {
				return false;	//sort de l'itération
			}

			var res = document.createElement('li');
			res.className = "resItem";
			if (index === 0) {
				res.className += " first";
			}
			else if ((index === options.maxVisibleResults - 1) || (index === results.length - 1)) {
				res.className += " last";
			}

			var resA = document.createElement('a');
			resA.className = "resLink";
			resA.href = value.url;

			if (value.thumb !== "" && value.thumb !== undefined) {
				var img = document.createElement('img');
				img.src = value.thumb;
				img.alt = "";
				resA.appendChild(img);
			}

			var title = document.createElement('span');
			var safeInputValue = inputValue.replace(/(\\|\.|\$|\[|\]|\(|\)|\{|\}|\^|\?|\*|\+|\-)/g, "\$"+"1"), //echappe les caractères spéciaux d'exp reg
				reg = new RegExp("(" + safeInputValue + ")", "gi");
			title.innerHTML = getTruncText(value.title, options.nbCharMaxTitre).replace(reg, "<strong>$"+"1</strong>"); //feinte pour éviter que page.class ne fasse sauter le $1
			resA.appendChild(title);

			res.appendChild(resA);
			
			if (typeof value.catchup !== "undefined" && value.catchup.length > 0) {
				var	catchups = value.catchup,
					catchupDiv = document.createElement('div'),
					catchupList = document.createElement('ul'),
					catchupItem,
					catchupLink,
					i;
				
				catchupDiv.className = "catchups";
				catchupList.className = "catchupList";
				
				for (i = 0, max = catchups.length; i < max; i++) {
					catchupItem = document.createElement('li');
					catchupItem.className = "catchupItem";
					
					catchupLink = document.createElement('a');
					catchupLink.href = catchups[i].url;
					catchupLink.innerHTML = getTruncText(catchups[i].shortTitle, options.nbCharMaxCatchupTitre);
					
					catchupItem.appendChild(catchupLink);
					catchupList.appendChild(catchupItem);
				}
				catchupDiv.appendChild(catchupList);
				res.appendChild(catchupDiv);
			}
			
			frag.appendChild(res);
		});
		
		$resList.get(0).appendChild(frag);
		
		var fullSearchText = options.fullSearchMsg;
		if (options.withInputValue) {
			fullSearchText += '&laquo; ' + inputValue + ' &raquo;';
		}
		$(".fullSearchBtn", $autoSuggestContainer).get(0).innerHTML = fullSearchText;
	};

})(jQuery);
/*
 * Custom Copy jQuery plugin
 * https://github.com/frequin/jQuery-custom-copy
 * use example:
 * $('#article').customCopy({
 *   extraContent: '<br>from <a href="http://www.mywebsite.com">my web site</a><br>'
 * });
 */
(function ($, win) {
	var customCopy = function (options) {
		var doc = document,
			body = doc.body,
			opts = $.extend({}, customCopy.options, options),
			container = $('<div>').css({
				position: "absolute",
				top: "-99999px"
			}).css(opts.css),
			// helpers functions
			addExtraContent = function (element) {
				var extraContent = typeof opts.extraContent === "function" ? opts.extraContent.call(element) : opts.extraContent;
				if (opts.position === 'before') {
					container.prepend(extraContent);
				} else {
					container.append(extraContent);
				}
				return extraContent;
			},
			getScroll = function () {
				return {
					left: doc.documentElement.scrollLeft || body.scrollLeft,
					top: doc.documentElement.scrollTop || body.scrollTop
				};
			},
			scrollTo = function (scroll) {
				doc.documentElement.scrollLeft = scroll.left;
				doc.documentElement.scrollTop = scroll.top;
				body.scrollLeft = scroll.left;
				body.scrollTop = scroll.top;
			};
		return this.bind("copy", function () {
			var sel, range, tempRange, scroll;
			if (window.getSelection) {
				sel = window.getSelection();
				range = sel.getRangeAt(0);
				// fill the container
				container.append(range.cloneContents());
				addExtraContent(this);
				container.prependTo(body);
				// select the new enhanced content
				sel.selectAllChildren(container.get(0));
				// back to the original selection
				window.setTimeout(function () {
					container.remove().empty();
					sel.removeAllRanges();
					sel.addRange(range);
				}, 0);
			} else if (doc.selection && doc.selection.createRange) { // IE < 9
				scroll = getScroll(); // remember scroll position
				range = doc.selection.createRange();
				// fill the container
				container.append(range.htmlText);
				addExtraContent(this);
				container.prependTo(body);
				// create a new range targeting the new enhanced content
				tempRange = body.createTextRange();
				tempRange.moveToElementText(container.get(0));
				// select the new range
				tempRange.select();
				scrollTo(scroll); // select causes a scroll
				// back to the original selection
				window.setTimeout(function () {
					if (range.text !== "") {
						range.select();
						scrollTo(scroll);
					}
					container.remove().empty();
				}, 0);
			}
		});
	};

	customCopy.options = {
		extraContent: '', // html string, node, jQuery object or a function returning one of those
		position: 'after', // add custom content 'after' or 'before' the copied selection
		css: { // styles applied to the custom content container
			background: "#fff"
		}
	};

	$.fn.customCopy = $.fn.customCopy || customCopy;
}(jQuery, window));
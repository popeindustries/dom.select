// TODO: add support for live lists?
// TODO: add support for multiple selectors?

var id = require('util.identify')
	, win = window
	, doc = win.document;

/**
 * getElementsByClassName() polyfill
 * @param {String} clas
 * @param {String} tag
 * @returns {Array}
 */
if (!doc.getElementsByClassName) {
	doc.getElementsByClassName = function(clas, tag) {
		var elements = doc.getElementsByTagName(tag || '*')
			, re = new RegExp("(?:^|\\s)" + clas + "(?:\\s|$)")
			, results = []
			, element;

		// Abort if no matches
		if (!elements.length) { return false; }
		for (var i = 0, n = elements.length; i < n; i++) {
			element = elements[i];
			if (element.className.match(re)) {
				results.push(element);
			}
		}
		return results;
	}
}

/**
 * Retrieve all elements matching 'selector'
 * @params {String} selector
 * @params {Element} context
 * @params {String} tag
 * @returns {Array}
 */
module.exports = function(selector, context, tag) {
	var elements, item, sel;
	if (!id.isElement(context)) {
		// Retrieve domElement if passed Element instance, otherwise document
		context = (context != null ? context.domElement : null) || doc;
	}

	if (context.querySelectorAll != null) {
		elements = context.querySelectorAll(selector);
	} else {
		switch (selector.charAt(0)) {
			// ID
			case '#':
				elements = doc.getElementById(selector.slice(1));
				break;
			// Class
			case '.':
				elements = doc.getElementsByClassName(selector.slice(1), tag);
				break;
			default:
				// Tag with class (eg. dev.foo)
				if (selector.indexOf('.') !== -1) {
					sel = selector.split('.');
					elements = doc.getElementsByClassName(sel[1], sel[0]);
				// Tag
				} else {
					elements = context.getElementsByTagName(selector);
				}
		}
	}

	if (elements.length) {
		var results = [];
		// Convert NodeList to Array
		for (var i = 0, n = elements.length; i < n; i++) {
			results.push(elements[i]);
		}
		return results;
	} else {
		return null;
	}
};

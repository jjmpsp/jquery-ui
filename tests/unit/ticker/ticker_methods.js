/*
 * ticker_methods.js
 */
(function($) {

module("ticker: methods");

test("init", function() {
	$("<ul></ul>").appendTo('body').ticker().remove();
	ok(true, '.ticker() called on element');

	$([]).ticker().remove();
	ok(true, '.ticker() called on empty collection');

	$('<ul></ul>').ticker().remove();
	ok(true, '.ticker() called on disconnected DOMElement - never connected');

	$('<ul></ul>').appendTo('body').remove().ticker().remove();
	ok(true, '.ticker() called on disconnected DOMElement - removed');

	var el = $('<ul></ul>').ticker();
	var foo = el.ticker("option", "foo");
	el.remove();
	ok(true, 'arbitrary option getter after init');

	$('<ul></ul>').ticker().ticker("option", "foo", "bar").remove();
	ok(true, 'arbitrary option setter after init');
});

test("destroy", function() {
	var beforeHtml = $("#ticker").find("div").css("font-style", "normal").end().parent().html();
	var afterHtml = $("#ticker").ticker().ticker("destroy").parent().html();
	equal( afterHtml, beforeHtml );
});

})(jQuery);

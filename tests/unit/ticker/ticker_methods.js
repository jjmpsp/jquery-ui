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

test("initial stop", function() {
	expect(0);
	stop();

	$("#ticker").ticker({
		initialTimeout: 100,
		next: function(lastItem) {
			ok(false, "ticker should not scroll after it was stopped");
			return lastItem;
		}
	});	
	$("#ticker").ticker("stop");
	
	setTimeout(function() { start(); }, 200);
});

test("stop after scroll", function() {
	expect(1);
	stop();
	
	var counter = 0;
	
	$("#ticker").ticker({
		initialTimeout: 0,
		mouseOnTimeout: 100,
		mouseOffTimeout: 100,
		slidingTime: 0,
		fadeInTime: 0,
		next: function(lastItem) {
			if (counter == 0) {
				ok(true, "ticker scrolled one time");
				$("#ticker").ticker("stop");
				counter++;
				return lastItem;
			}
			else {
				ok(false, "ticker should not scroll after it was stopped");
				return lastItem;
			}
		}
	});
	
	setTimeout(function() { start(); }, 300);
});

test("start", function() {
	expect(1);
	stop();
	
	var started = false;
	
	$("#ticker").ticker({
		initialTimeout: 100,
		mouseOnTimeout: 100,
		mouseOffTimeout: 100,
		slidingTime: 0,
		fadeInTime: 0,
		next: function(lastItem) {
			if (started) {
				ok(true, "ticker scrolled after it was started");
				$("#ticker").ticker("stop");
			}
		}
	});
	$("#ticker").ticker("stop");
	window.setTimeout(function() { started = true; $("#ticker").ticker("start"); }, 200);
	window.setTimeout(function() { start(); }, 300);
});

})(jQuery);

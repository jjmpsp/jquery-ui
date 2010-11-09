/*
 * ticker_core.js
 */

var el;

(function($) {

module("ticker: core");

test("nextItem returns null", function() {
	expect(2);
	stop();

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		nextItem: function(lastItem) {
			ok(true, "nextItem is called")
			return null;
		}
	});

	window.setTimeout(function() {
		equals($("#ticker li:first").text(), "Item1", "ticker has not scrolled");
		start();
	}, 100);
});

test("last item clone retains data and bindings", function() {
	expect(3);
	stop();

	$("#ticker li:last")
		.data("test", "123")
		.bind("click", function() {});

	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		nextItem: function(lastItem) {
			ok(true, "nextItem is called");
			equals(lastItem.data("test"), "123", "last item clone retains data");
			ok(lastItem.data("events") != null, "last item clone retains events");
			return null;
		}
	});

	window.setTimeout(function() { start(); }, 200);
});

})(jQuery);

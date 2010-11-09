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

})(jQuery);

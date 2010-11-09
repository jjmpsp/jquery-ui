/*
 * ticker_options.js
 */
(function($) {

module("ticker: options");

test("{initalTimout: 200}", function() {
	expect(1);
	stop();
	var nextCalled = false;
	$("#ticker").ticker({
		initialTimeout: 200,
		nextItem: function(lastItem) {
			nextCalled = true;
			return lastItem;
		}
	});
	
	window.setTimeout(function() { 
		if (nextCalled) {
			ok(false, "next called in initial timeout");
		}
	}, 100);
	
	window.setTimeout(function() { 
		if (nextCalled) {
			ok(true, "next called after timeout");
		}
		start();
	}, 200);
});

test("{initialTimeout: 200} after calling start method", function() {
	expect(1);
	stop();
	var nextCalled = false;
	$("#ticker").ticker({
		initialTimeout: 200,
		nextItem: function(lastItem) {
			nextCalled = true;
			return lastItem;
		}
	});
	
	$("#ticker").ticker("stop");
	$("#ticker").ticker("start");
	
	window.setTimeout(function() { 
		if (nextCalled) {
			ok(false, "next called in initial timeout");
		}
	}, 100);
	
	window.setTimeout(function() { 
		if (nextCalled) {
			ok(true, "next called after timeout");
		}
		start();
	}, 200);
});

test("{mouseOffTimeout: 100}", function() {
	expect(2);
	stop();
	
	var counter = 0;
	
	var nextCalled = false;
	$("#ticker").ticker({
		initialTimeout: 0,
		mouseOnTimeout: 10000,
		mouseOffTimeout: 100,
		nextItem: function(lastItem) {
			ok(true, "Next called (one time after init and one time afterwards");
			if (counter == 1) {
				$("#ticker").ticker("stop");
			}
			counter++;
			return lastItem;
		}
	});
	
	window.setTimeout(function() { start(); }, 400 );
});

test("{mouseOnTimeout: 100}", function() {
	expect(2);
	stop();
	
	var counter = 0;
	
	var nextCalled = false;
	
	$("#ticker").ticker({
		initialTimeout: 0,
		mouseOnTimeout: 100,
		mouseOffTimeout: 10000,
		nextItem: function(lastItem) {
			ok(true, "Next called (one time after init and one time afterwards");
			if (counter == 1) {
				$("#ticker").ticker("stop");
			}
			counter++;
			return lastItem;
		}
	});
	
	$("#ticker").simulate("mouseover");
	window.setTimeout(function() { start(); }, 400 );
});

test('{nextItem: function() {return $("TestItem")}}', function() {
	expect(2);
	stop();
	
	var nextCalled = false;
	
	$("#ticker").ticker({
		initialTimeout: 0,
		scrollTime: 0,
		fadeTime: 0,
		mouseOffTimeout: 10000,
		nextItem: function(lastItem) {
			return $("<li>TestItem</li>");
		}
	});
	
	window.setTimeout(function() { 
		equals($("#ticker li:first").html(), "TestItem", "new item was added");
		equals($("#ticker li:last").html(), "Item5", "last item was removed");
		start(); 
	}, 100 );
});

})(jQuery);

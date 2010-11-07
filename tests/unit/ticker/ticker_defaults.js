/*
 * ticker_defaults.js
 */

var ticker_defaults = {
	disabled: false,
	active: true,
	initialTimeout: 4000,
	mouseOnTimeout: 8000,
	mouseOffTimeout: 4000,
	slidingTime: 800,
	fadeInTime: 1000,
	next: null
};

commonWidgetTests('ticker', { defaults: ticker_defaults });

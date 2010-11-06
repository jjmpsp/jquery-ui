/*
 * jQuery UI Ticker @VERSION
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Ticker
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.ticker", {
	options: {
		initialTimeout: 4000,
		mouseOnTimeout: 8000,
		mouseOffTimeout: 4000,
		slidingTime: 800,
		fadeInTime: 1000,
		next: null
	},
	
	_create: function() {
		var self = this,
			options = self.options;
			
		self.speed = options.mouseOffTimeout;
		
		self.element
			.addClass( "ui-ticker ui-widget ui-corner-all" )
			.bind( "mouseenter.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				self.speed = options.mouseOnTimeout;
				if (self.timeoutId !== undefined) {
					window.clearTimeout(timeoutId);
					self.timeoutId = window.setTimeout(function() { self.rotate(); }, self.speed);
				}
			})
			.bind( "mouseleave.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				self.speed = options.mouseOffTimeout;
				if (self.timeoutId !== undefined) {
					window.clearTimeout(timeoutId);
					self.timeoutId = window.setTimeout(function() { self.rotate(); }, self.speed);
				}
			});
			
		self._addItemClasses(self.element.children( "li" ));
		self._addItemBindings(self.element.children( "li" ));
	},
	
	_init: function() {
		var self = this,
			options = self.options;
			
		window.setTimeout(function() { self.rotate() }, options.initialTimeout);
	},

	destroy: function() {
		this.element.unbind(".ticker");
		this.element.children( "li" ).unbind(".ticker");
		this.element.removeClass( "ui-ticker ui-widget ui-corner-all" );
		this._removeItemClasses(this.element.children( "li" ));

		return $.Widget.prototype.destroy.call( this );
	},
	
	_addItemClasses: function(item) {
		item.addClass( "ui-ticker-content ui-widget-content ui-helper-reset ui-state-default ui-corner-all" )
	},
	
	_removeItemClasses: function(item) {
		item.removeClass( "ui-ticker-content ui-widget-content ui-helper-reset ui-state-default ui-state-hover ui-state-focus ui-corner-all" )
	},
	
	_addItemBindings: function(item) {
		var options = this.options;
		
		item
			.bind( "mouseenter.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-hover" );
			})
			.bind( "mouseleave.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-hover" );
			})
			.bind( "focus.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-focus" );
			})
			.bind( "blur.ticker", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-focus" );
			});
	},
	
	rotate: function() {
		var self = this,
			options = self.options,
			newItem,
			lastItem;
			
		lastItem = lastItem = self.element.children().last().clone();
		self._removeItemClasses(lastItem);
			
		newItem = $( self.options.next(lastItem.get()) );
		
		if (newItem !== null) {
			self._addItemClasses(newItem);
			self._addItemBindings(newItem);
			newItem
				.hide()
				.prependTo(self.element)
				.css('visibility', 'hidden')
				.slideDown(options.slidingTime, function() {
					$( this ).fadeTo(0, 0).css('visibility', 'visible').fadeTo(options.fadeInTime, 1);
				});

			self.element.children().last().slideUp(options.slidingTime, function() {
				$( this ).remove();
			});
		}
		
		self.timeoutId = window.setTimeout(function() { self.rotate(); }, self.speed);
	}
});

$.extend( $.ui.ticker, {
	version: "@VERSION"
});

})( jQuery );

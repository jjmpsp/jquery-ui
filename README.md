[jQuery UI](http://jqueryui.com/) - Interactions and Widgets for the web
================================

This fork of jQuery UI includes our brand new Ticker. We also have a [live demo](http://medihack.github.com/tickerdemo/) with some customized style sheets (for having a similar look like Twitter).

The Ticker in its raw form is fully compatible with the jQuery UI Theming framework. It is also quite flexible and well tested.

There are several options to easily customize the visualization:

    $("#ticker").ticker({  // #ticker is the id of an <ul> element that contains the <li> ticker elements
      initialTimeout: 2000,  // the initial timeout to start the ticker after the site was loaded (in ms)
      mouseOnTimeout: 6000,  // the timeout before the next item shows up when the mouse pointer is over the ticker
      mouseOffTimeout: 4000, // the timeout before the next item shows up when the mouse pointer is somewhere else
      scrollTime: 1200,  // the times it takes to scroll down the item list
      fadeTime: 1000, // the time it takes to fade in the next item at the top of the item list
      nextItem: function(lastItem) {  // this function provides a clone of the last item on the list that will be removed next
        return $(lastItem); // the item that should be added next to the ticker (should be a jQuery <li> item)
      }  // in this case the last item is directly added again to the top of the ticker
    });

There are also several events fired:
beforeScroll // directly before the ticker scrolls
afterScroll // directly after the ticker scrolled
afterFade // directly after the new item was faded in

To bind to an event (the common jQuery UI way):

    $("#ticker").ticker({
      nextItem: function(lastItem) { return $('<li>TestItem</li>'); },
      beforeScroll: function(event, ui) { // just do what you like to do }
    });

We also provide some methods:
stop // stop the ticker immediately (respectively after a current on going scrolling/fading was finished)
start // start the ticker again

To call those methods (the common jQuery UI way):

    $("#ticker").ticker("stop");
/*
 * metismenu - v2.0.0
 * Easy menu jQuery plugin
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */
(function($) {
  'use strict';

  function transitionEnd() {
    var el = document.createElement('mm');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }
    return false;
  }

  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one('mmTransitionEnd', function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  var $transition = transitionEnd();
  if (!!$transition) {
    $.event.special.mmTransitionEnd = {
      bindType: $transition.end,
      delegateType: $transition.end,
      handle: function(e) {
        if ($(e.target).is(this)) {
          return e.handleObj.handler.apply(this, arguments);
        }
      }
    };
  }

  var MetisMenu = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, MetisMenu.DEFAULTS, options);
    this.transitioning = null;

    if (this.options.toggle) {}
    //this.show();
    this.init();
  };

  MetisMenu.TRANSITION_DURATION = 350;

  MetisMenu.DEFAULTS = {
    toggle: true
  };

  MetisMenu.prototype.init = function() {
    var $this = this;

    this.$element.find('li.active').has('ul').children('ul').addClass('collapse in');
    this.$element.find('li').not('.active').has('ul').children('ul').addClass('collapse');


    this.$element.find('li').has('ul').children('a').on('click.metisMenu', function(e) {
      var self = $(this);
      var $parent = self.parent('li');
      var $list = $parent.children('ul');
      e.preventDefault();

      if ($parent.hasClass('active')) {
        $this.hide($list);
      } else {
        $this.show($list);
      }
    });
  };

  MetisMenu.prototype.toggle = function(el) {
    this[$(el).hasClass('in') ? 'hide' : 'show'](el);
  };


  MetisMenu.prototype.show = function(el) {
    var $this = $(el);
    var $parent = $this.parent('li');
    if (this.transitioning || $this.hasClass('in')) {
      return;
    }



    $parent.addClass('active');

    if (this.options.toggle) {
      this.hide($parent.siblings().children('ul.in'));
    }

    $this
      .removeClass('collapse')
      .addClass('collapsing')
      .height(0);

    this.transitioning = 1;
    var complete = function() {
      $this
        .removeClass('collapsing')
        .addClass('collapse in')
        .height('');
      this.transitioning = 0;
    };
    if (!$transition) {
      return complete.call(this);
    }
    $this
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION)
      .height($this[0].scrollHeight);
  };

  MetisMenu.prototype.hide = function(el) {
    var $this = $(el);

    if (this.transitioning || !$this.hasClass('in')) {
      return;
    }


    $this.parent('li').removeClass('active');
    $this.height($this.height())[0].offsetHeight;

    $this
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in');

    this.transitioning = 1;

    var complete = function() {
      this.transitioning = 0;
      $this
        .removeClass('collapsing')
        .addClass('collapse');
    };

    if (!$transition) {
      return complete.call(this);
    }
    $this
      .height(0)
      .one('mmTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(MetisMenu.TRANSITION_DURATION);
  };



  function Plugin(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('mm');
      var options = $.extend({}, MetisMenu.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('mm', (data = new MetisMenu(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  var old = $.fn.metisMenu;

  $.fn.metisMenu = Plugin;
  $.fn.metisMenu.Constructor = MetisMenu;

  $.fn.metisMenu.noConflict = function() {
    $.fn.metisMenu = old;
    return this;
  };


})(jQuery);

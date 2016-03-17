const MetisMenu = (($) => {

  const NAME = 'metisMenu';
  const DATA_KEY = 'metisMenu';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 350;

  const Default = {
    toggle: true,
    doubleTapToGo: false,
    preventDefault: true,
    activeClass: 'active',
    collapseClass: 'collapse',
    collapseInClass: 'in',
    collapsingClass: 'collapsing',
    onTransitionStart: false,
    onTransitionEnd: false
  }

  const Event = {
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  }

  class MetisMenu {
    constructor(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._transitioning = null;

      this.init();
    }
    init() {
      let self = this;
      $(this._element)
        .find('li.' + this._config.activeClass)
        .has('ul')
        .children('ul')
        .attr('aria-expanded', true)
        .addClass(this._config.collapseClass + ' ' + this._config.collapseInClass);

      $(this._element)
        .find('li')
        .not('.' + this._config.activeClass)
        .has('ul')
        .children('ul')
        .attr('aria-expanded', false)
        .addClass(this._config.collapseClass);

      //add the 'doubleTapToGo' class to active items if needed
      if (this._config.doubleTapToGo) {
        $(this._element)
          .find('li.' + this._config.activeClass)
          .has('ul')
          .children('a')
          .addClass('doubleTapToGo');
      }
      $(this._element)
        .find('li')
        .has('ul')
        .children('a')
        .on('click.metisMenu', function(e) {
          var _this = $(this);
          var _parent = _this.parent('li');
          var _list = _parent.children('ul');
          if (self._config.preventDefault) {
            e.preventDefault();
          }
          if (_this.attr('aria-disabled') === 'true') {
            return;
          }
          if (_parent.hasClass(self._config.activeClass) && !self._config.doubleTapToGo) {
            _this.attr('aria-expanded', false);
            self._hide(_list);

          } else {
            self._show(_list);
            _this.attr('aria-expanded', true);
          }

          if (self._config.onTransitionStart) {
            self._config.onTransitionStart(e);
          }

          //Do we need to enable the double tap
          if (self._config.doubleTapToGo) {
            //if we hit a second time on the link and the href is valid, navigate to that url
            if (self._doubleTapToGo(_this) && _this.attr('href') !== '#' && _this.attr('href') !== '') {
              e.stopPropagation();
              document.location = _this.attr('href');
              return;
            }
          }
        });

    }

    _show(element) {
      let _this = $(element);
      if (this._transitioning || $(element).hasClass(this._config.collapsingClass)) {
        return;
      }

      $(element)
        .parent('li')
        .addClass(this._config.activeClass);


      if (this._config.toggle) {
        this.
        _hide($(element)
          .parent('li')
          .siblings()
          .children('ul.' + this._config.collapseInClass).attr('aria-expanded', false));
      }

      $(element)
        .removeClass(this._config.collapseClass)
        .addClass(this._config.collapsingClass)
        .height(0);

      this._transitioning = 1;

      let complete = function() {
        if (this._transitioning && this._config.onTransitionEnd) {
          this._config.onTransitionEnd();
        }
        _this
          .removeClass(this._config.collapsingClass)
          .addClass(this._config.collapseClass + ' ' + this._config.collapseInClass)
          .height('')
          .attr('aria-expanded', true);

        this._transitioning = 0;
      };
      if (!$transition) {
        return complete.call(this);
      }
      _this
      .height(_this[0].scrollHeight)
        .one('mmTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(TRANSITION_DURATION);

    }

    _hide(element) {

      if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
        return;
      }

      let _this = $(element);
      $(element).parent('li').removeClass(this._config.activeClass);
      _this.height(_this.height())[0].offsetHeight;

      $(element)
        .addClass(this._config.collapsingClass)
        .removeClass(this._config.collapseClass)
        .removeClass(this._config.collapseInClass);

      this._transitioning = 1;

      let complete = function() {
        if (this._transitioning && this._config.onTransitionEnd) {
          this._config.onTransitionEnd();
        }

        this._transitioning = 0;
        _this
          .removeClass(this._config.collapsingClass)
          .addClass(this._config.collapseClass)
          .attr('aria-expanded', false);

      };

      if (!$transition) {
        return complete.call(this);
      }

      $(element)
        .height(0)
        .one('mmTransitionEnd', $.proxy(complete, this))
        .emulateTransitionEnd(TRANSITION_DURATION);
    }

    _doubleTapToGo(element) {
      if (element.hasClass('doubleTapToGo')) {
        element.removeClass('doubleTapToGo');
        return true;
      }
      if (element.parent().children('ul').length) {
        $(this._element)
          .find('.doubleTapToGo')
          .removeClass('doubleTapToGo');

        element.addClass('doubleTapToGo');
        return false;
      }
    }

    _getConfig(config) {
      config = $.extend({}, Default, config);
      return config
    }

    static _jQueryInterface(config) {
      return this.each(function() {
        let $this = $(this)
        let data = $this.data(DATA_KEY)
        let _config = $.extend({},
          Default,
          $this.data(),
          typeof config === 'object' && config
        )


        if (!data) {
          data = new MetisMenu(this, _config)
          $this.data(DATA_KEY, data)
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`)
          }
          data[config]()
        }
      })
    }
  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

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
          return e.
          handleObj.
          handler.
          apply(this, arguments);
        }
      }
    };
  }

  $.fn[NAME] = MetisMenu._jQueryInterface;
  $.fn[NAME].Constructor = MetisMenu;
  $.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return MetisMenu._jQueryInterface;
  }
  return MetisMenu;

})(jQuery);

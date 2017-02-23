import $ from 'jquery';

const Util = (($) => {
  let transition = false;

  const TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle(event) {
        if ($(event.target).is(this)) {
          return event.
            handleObj.
            handler.
            apply(this, arguments);
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    const el = document.createElement('mm');

    for (const name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $(this).one(Util.TRANSITION_END, () => {
      called = true;
    });

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();
    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  const Util = {
    TRANSITION_END: 'mmTransitionEnd',

    triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd() {
      return Boolean(transition);
    }
  };

  setTransitionEndSupport();

  return Util;

})(jQuery);

const MetisMenu = (($) => {

  const NAME = 'metisMenu';
  const DATA_KEY = 'metisMenu';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 350;

  const Default = {
    toggle: true,
    preventDefault: true,
    activeClass: 'active',
    collapseClass: 'collapse',
    collapseInClass: 'in',
    collapsingClass: 'collapsing'
  };

  const Event = {
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  };

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

      $(this._element)
        .find('li')
        .has('ul')
        .children('a')
        .on(Event.CLICK_DATA_API, function (e) {
          var _this = $(this);
          var _parent = _this.parent('li');
          var _siblings = _parent.siblings('li').children('a');
          var _list = _parent.children('ul');
          if (self._config.preventDefault) {
            e.preventDefault();
          }
          if (_this.attr('aria-disabled') === 'true') {
            return;
          }
          if (_parent.hasClass(self._config.activeClass)) {
            _this.attr('aria-expanded', false);
            self._hide(_list);

          } else {
            self._show(_list);
            _this.attr('aria-expanded', true);
            if (self._config.toggle) {
              _siblings.attr('aria-expanded', false);
            }
          }

          if (self._config.onTransitionStart) {
            self._config.onTransitionStart(e);
          }
        });

    }

    _show(element) {
      if (this._transitioning ||
        $(element).hasClass(this._config.collapsingClass)) {
        return;
      }
      let _this = this;
      let _el = $(element);

      let startEvent = $.Event(Event.SHOW);
      _el.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      _el
        .parent('li')
        .addClass(this._config.activeClass);


      if (this._config.toggle) {
        this.
          _hide(_el
            .parent('li')
            .siblings()
            .children('ul.' + this._config.collapseInClass).attr('aria-expanded', false));
      }

      _el
        .removeClass(this._config.collapseClass)
        .addClass(this._config.collapsingClass)
        .height(0);

      this.setTransitioning(true);

      let complete = function () {

        _el
          .removeClass(_this._config.collapsingClass)
          .addClass(_this._config.collapseClass + ' ' + _this._config.collapseInClass)
          .height('')
          .attr('aria-expanded', true);

        _this.setTransitioning(false);

        _el.trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      _el
        .height(_el[0].scrollHeight)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(TRANSITION_DURATION);

    }

    _hide(element) {

      if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
        return;
      }
      let _this = this;
      let _el = $(element);

      let startEvent = $.Event(Event.HIDE);
      _el.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      _el.parent('li').removeClass(this._config.activeClass);
      _el.height(_el.height())[0].offsetHeight;

      _el
        .addClass(this._config.collapsingClass)
        .removeClass(this._config.collapseClass)
        .removeClass(this._config.collapseInClass);

      this.setTransitioning(true);

      let complete = function () {
        if (_this._transitioning && _this._config.onTransitionEnd) {
          _this._config.onTransitionEnd();
        }

        _this.setTransitioning(false);
        _el.trigger(Event.HIDDEN);

        _el
          .removeClass(_this._config.collapsingClass)
          .addClass(_this._config.collapseClass)
          .attr('aria-expanded', false);

      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      (_el.height() == 0 || _el.css('display') == 'none') ? complete() : _el
        .height(0)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(TRANSITION_DURATION);
    }

    setTransitioning(isTransitioning) {
      this._transitioning = isTransitioning;
    }

    dispose() {
      $.removeData(this._element, DATA_KEY);

      $(this._element)
        .find('li')
        .has('ul')
        .children('a')
        .off('click');

      this._transitioning = null;
      this._config = null;
      this._element = null;
    }

    _getConfig(config) {
      config = $.extend({}, Default, config);
      return config;
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        let $this = $(this);
        let data = $this.data(DATA_KEY);
        let _config = $.extend({},
          Default,
          $this.data(),
          typeof config === 'object' && config
        );

        if (!data && /dispose/.test(config)) {
          this.dispose();
        }

        if (!data) {
          data = new MetisMenu(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = MetisMenu._jQueryInterface;
  $.fn[NAME].Constructor = MetisMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return MetisMenu._jQueryInterface;
  };
  return MetisMenu;

})(jQuery);

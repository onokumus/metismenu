import $ from 'jquery';
import Util from './util';

const MetisMenu = (($) => { // eslint-disable-line no-shadow
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
    collapsingClass: 'collapsing',
    triggerElement: 'a',
    parentTrigger: 'li',
    subMenu: 'ul',
  };

  const Event = {
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
  };

  class MetisMenu { // eslint-disable-line no-shadow
    constructor(element, config) {
      this.element = element;
      this.config = { ...Default, ...config };
      this.transitioning = null;

      this.init();
    }
    init() {
      const self = this;
      const conf = this.config;
      $(this.element)
        .find(`${conf.parentTrigger}.${conf.activeClass}`)
        .has(conf.subMenu)
        .children(conf.subMenu)
        .addClass(`${conf.collapseClass} ${conf.collapseInClass}`);

      $(this.element)
        .find(conf.parentTrigger)
        .not(`.${conf.activeClass}`)
        .has(conf.subMenu)
        .children(conf.subMenu)
        .addClass(conf.collapseClass);

      $(this.element)
        .find(conf.parentTrigger)
        .has(conf.subMenu)
        .children(conf.triggerElement)
        .on(Event.CLICK_DATA_API, function (e) { // eslint-disable-line func-names
          const eTar = $(this);
          const paRent = eTar.parent(conf.parentTrigger);
          const sibLings = paRent
            .siblings(conf.parentTrigger)
            .children(conf.triggerElement);
          const List = paRent.children(conf.subMenu);
          if (conf.preventDefault) {
            e.preventDefault();
          }
          if (eTar.attr('aria-disabled') === 'true') {
            return;
          }
          if (paRent.hasClass(conf.activeClass)) {
            eTar.attr('aria-expanded', false);
            self.hide(List);
          } else {
            self.show(List);
            eTar.attr('aria-expanded', true);
            if (conf.toggle) {
              sibLings.attr('aria-expanded', false);
            }
          }

          if (conf.onTransitionStart) {
            conf.onTransitionStart(e);
          }
        });
    }

    show(element) {
      if (this.transitioning ||
        $(element).hasClass(this.config.collapsingClass)) {
        return;
      }
      const elem = $(element);

      const startEvent = $.Event(Event.SHOW);
      elem.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      elem
        .parent(this.config.parentTrigger)
        .addClass(this.config.activeClass);


      if (this.config.toggle) {
        this
          .hide(elem
            .parent(this.config.parentTrigger)
            .siblings()
            .children(`${this.config.subMenu}.${this.config.collapseInClass}`));
      }

      elem
        .removeClass(this.config.collapseClass)
        .addClass(this.config.collapsingClass)
        .height(0);

      this.setTransitioning(true);

      const complete = () => {
        // check if disposed
        if (!this.config || !this.element) {
          return;
        }
        elem
          .removeClass(this.config.collapsingClass)
          .addClass(`${this.config.collapseClass} ${this.config.collapseInClass}`)
          .height('');

        this.setTransitioning(false);

        elem.trigger(Event.SHOWN);
      };

      elem
        .height(element[0].scrollHeight)
        .one(Util.TRANSITION_END, complete)
        .mmEmulateTransitionEnd(TRANSITION_DURATION);
    }

    hide(element) {
      if (this.transitioning || !$(element).hasClass(this.config.collapseInClass)) {
        return;
      }

      const elem = $(element);

      const startEvent = $.Event(Event.HIDE);
      elem.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      elem.parent(this.config.parentTrigger).removeClass(this.config.activeClass);
      // eslint-disable-next-line no-unused-expressions
      elem.height(elem.height())[0].offsetHeight;

      elem
        .addClass(this.config.collapsingClass)
        .removeClass(this.config.collapseClass)
        .removeClass(this.config.collapseInClass);

      this.setTransitioning(true);

      const complete = () => {
        // check if disposed
        if (!this.config || !this.element) {
          return;
        }
        if (this.transitioning && this.config.onTransitionEnd) {
          this.config.onTransitionEnd();
        }

        this.setTransitioning(false);
        elem.trigger(Event.HIDDEN);

        elem
          .removeClass(this.config.collapsingClass)
          .addClass(this.config.collapseClass);
      };

      if (elem.height() === 0 || elem.css('display') === 'none') {
        complete();
      } else {
        elem
          .height(0)
          .one(Util.TRANSITION_END, complete)
          .mmEmulateTransitionEnd(TRANSITION_DURATION);
      }
    }

    setTransitioning(isTransitioning) {
      this.transitioning = isTransitioning;
    }

    dispose() {
      $.removeData(this.element, DATA_KEY);

      $(this.element)
        .find(this.config.parentTrigger)
        .has(this.config.subMenu)
        .children(this.config.triggerElement)
        .off('click');

      this.transitioning = null;
      this.config = null;
      this.element = null;
    }


    static jQueryInterface(config) {
      // eslint-disable-next-line func-names
      return this.each(function () {
        const $this = $(this);
        let data = $this.data(DATA_KEY);
        const conf = {
          ...Default,
          ...$this.data(),
          ...typeof config === 'object' && config ? config : {},
        };

        if (!data && /dispose/.test(config)) {
          this.dispose();
        }

        if (!data) {
          data = new MetisMenu(this, conf);
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

  $.fn[NAME] = MetisMenu.jQueryInterface; // eslint-disable-line no-param-reassign
  $.fn[NAME].Constructor = MetisMenu; // eslint-disable-line no-param-reassign
  $.fn[NAME].noConflict = () => { // eslint-disable-line no-param-reassign
    $.fn[NAME] = JQUERY_NO_CONFLICT; // eslint-disable-line no-param-reassign
    return MetisMenu.jQueryInterface;
  };
  return MetisMenu;
})($);

export default MetisMenu;

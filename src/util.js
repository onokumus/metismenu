import $ from 'jquery';

const Util = (($) => { // eslint-disable-line no-shadow
  const TRANSITION_END = 'transitionend';

  const Util = { // eslint-disable-line no-shadow
    TRANSITION_END: 'mmTransitionEnd',

    triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },

    supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
  };

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle(event) {
        if ($(event.target).is(this)) {
          return event
            .handleObj
            .handler
            .apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      },
    };
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
    $.fn.mmEmulateTransitionEnd = transitionEndEmulator; // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }

  setTransitionEndSupport();

  return Util;
})($);

export default Util;

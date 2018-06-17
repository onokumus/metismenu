/*!
* metismenu - v3.0.0-alpha.0
* A menu plugin
* https://github.com/onokumus/metismenu#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
'use strict';

var events = require('events');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var Default = {
  activeClass: "active",
  collapseClass: "collapse",
  collapseInClass: "in",
  collapsingClass: "collapsing",
  parentTrigger: "li",
  preventDefault: true,
  subMenu: "ul",
  toggle: true,
  triggerElement: "a"
};

var MetisMenu =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(MetisMenu, _EventEmitter);

  function MetisMenu(element, options) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.element = typeof element === "string" ? document.querySelector(element) : element;
    _this.cacheEl = _this.element;
    _this.config = _objectSpread({}, Default, options);
    _this.cacheConfig = _this.config;
    _this.disposed = false;
    _this.ulArr = [];
    _this.liArr = [];
    _this.aArr = [];
    _this.listenerOb = [];

    _this.init();

    return _this;
  }

  var _proto = MetisMenu.prototype;

  _proto.update = function update() {
    this.disposed = false;
    this.element = this.cacheEl;
    this.config = this.cacheConfig;
    this.init();
  };

  _proto.dispose = function dispose() {
    for (var _iterator = this.listenerOb, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var lo = _ref;

      for (var key in lo) {
        if (lo.hasOwnProperty(key)) {
          var el = lo[key];
          el[1].removeEventListener(el[0], el[2]);
        }
      }
    }

    this.ulArr = [];
    this.liArr = [];
    this.aArr = [];
    this.listenerOb = [];
    this.config = null;
    this.element = null;
    this.disposed = true;
  };

  _proto.init = function init() {
    this.ulArr = [].slice.call(this.element.querySelectorAll(this.config.subMenu));

    for (var _iterator2 = this.ulArr.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var _ref3 = _ref2,
          index = _ref3[0],
          ul = _ref3[1];
      var li = ul.parentNode;
      this.liArr.push(li);

      if (li.getAttribute("id") === null) {
        li.setAttribute("id", "mm-item-" + index);
        ul.setAttribute("aria-labelledby", "mm-item-" + index);
      } else {
        ul.setAttribute("aria-labelledby", li.getAttribute("id"));
      }

      var ulId = ul.getAttribute("id") !== null ? ul.getAttribute("id") : "mm-item-ul-" + index;

      if (ul.getAttribute("id") === null) {
        ul.setAttribute("id", ulId);
      }

      ul.classList.add(this.config.collapseClass);

      if (li.classList.contains(this.config.activeClass)) {
        this.show(ul);
      } else {
        this.hide(ul);
      }

      var a = li.querySelector(this.config.triggerElement);
      a.setAttribute("aria-controls", ulId);
      a.setAttribute("aria-expanded", "false");
      var listenerOb = {
        aClick: ["click", a, this.clickEvent.bind(this)]
      };

      for (var key in listenerOb) {
        if (listenerOb.hasOwnProperty(key)) {
          var listener = listenerOb[key];
          listener[1].addEventListener(listener[0], listener[2]);
        }
      }

      this.listenerOb.push(listenerOb);
    }
  };

  _proto.clickEvent = function clickEvent(ev) {
    if (!this.disposed) {
      if (ev.currentTarget.tagName === "A") {
        ev.preventDefault();
      }

      var li = ev.target.parentNode;
      var ul = li.querySelector(this.config.subMenu);
      this.toggle(ul);
    }
  };

  _proto.toggle = function toggle(ul) {
    if (ul.parentNode.classList.contains(this.config.activeClass)) {
      this.hide(ul);
    } else {
      this.show(ul);
    }
  };

  _proto.show = function show(ul) {
    var _this2 = this;

    if (this.isTransitioning || ul.classList.contains(this.config.collapseInClass)) {
      return;
    }

    var li = ul.parentNode;
    this.emit("show.metisMenu", li);

    var complete = function complete() {
      ul.classList.remove(_this2.config.collapsingClass);
      ul.style.height = "";
      ul.removeEventListener("transitionend", complete);

      _this2.setTransitioning(false);
    };

    li.classList.add(this.config.activeClass);
    var a = li.querySelector(this.config.triggerElement);
    a.setAttribute("aria-expanded", "true");
    ul.style.height = "0px";
    ul.classList.remove(this.config.collapseClass);
    ul.classList.remove(this.config.collapseInClass);
    ul.classList.add(this.config.collapsingClass);
    var eleParentSiblins = [].slice.call(li.parentNode.children).filter(function (c) {
      return c !== li;
    });

    if (this.config.toggle && eleParentSiblins.length > 0) {
      for (var _iterator3 = eleParentSiblins, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        var sibli = _ref4;
        var sibUl = sibli.querySelector(this.config.subMenu);

        if (sibUl !== null) {
          this.hide(sibUl);
        }
      }
    }

    this.setTransitioning(true);
    ul.classList.add(this.config.collapseClass);
    ul.classList.add(this.config.collapseInClass);
    ul.style.height = ul.scrollHeight + "px";
    ul.addEventListener("transitionend", complete);
    this.emit("shown.metisMenu", ul);
  };

  _proto.hide = function hide(ul) {
    var _this3 = this;

    if (this.isTransitioning || !ul.classList.contains(this.config.collapseInClass)) {
      return;
    }

    var li = ul.parentNode;
    this.emit("hide.metisMenu", li);
    li.classList.remove(this.config.activeClass);

    var comp = function comp() {
      ul.classList.remove(_this3.config.collapsingClass);
      ul.classList.add(_this3.config.collapseClass);
      ul.removeEventListener("transitionend", comp);

      _this3.setTransitioning(false);
    };

    ul.style.height = ul.getBoundingClientRect().height + "px";
    ul.style.height = ul.offsetHeight + "px";
    ul.classList.add(this.config.collapsingClass);
    ul.classList.remove(this.config.collapseClass);
    ul.classList.remove(this.config.collapseInClass);
    this.setTransitioning(true);
    ul.addEventListener("transitionend", comp);
    ul.style.height = "0px";
    var a = li.querySelector(this.config.triggerElement);
    a.setAttribute("aria-expanded", "false");
    this.emit("hidden.metisMenu", li);
  };

  _proto.setTransitioning = function setTransitioning(isTransitioning) {
    this.isTransitioning = isTransitioning;
  };

  return MetisMenu;
}(events.EventEmitter);

module.exports = MetisMenu;

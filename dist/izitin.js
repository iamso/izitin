/*!
 * izitin - version 0.4.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Izitin = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Izitin = function () {
    function Izitin() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$fraction = _ref.fraction;
      var fraction = _ref$fraction === undefined ? 0 : _ref$fraction;
      var _ref$fn = _ref.fn;
      var fn = _ref$fn === undefined ? null : _ref$fn;
      var _ref$container = _ref.container;
      var container = _ref$container === undefined ? document : _ref$container;
      var _ref$items = _ref.items;
      var items = _ref$items === undefined ? '.izitin' : _ref$items;
      var _ref$stagger = _ref.stagger;
      var stagger = _ref$stagger === undefined ? 100 : _ref$stagger;
      var _ref$css = _ref.css;
      var css = _ref$css === undefined ? true : _ref$css;
      var _ref$remove = _ref.remove;
      var remove = _ref$remove === undefined ? false : _ref$remove;
      var _ref$throttle = _ref.throttle;
      var throttle = _ref$throttle === undefined ? 0 : _ref$throttle;

      _classCallCheck(this, Izitin);

      this.fraction = Math.max(Math.min(+fraction, 1), 0);
      this.fn = fn;
      this.container = container instanceof Node ? container : document.querySelector(container);
      this.items = items;
      this.stagger = +stagger;
      this.css = !!css;
      this.remove = !!remove;
      this.throttle = +throttle;
      this.init();
    }

    _createClass(Izitin, [{
      key: 'init',
      value: function init() {
        this.lastPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.check();
        if (!this.isInitialized) {
          if (this.throttle) {
            this.handler = this.throttling(this.check.bind(this), this.throttle).bind(this);
          } else {
            this.handler = this.check.bind(this);
          }
          window.addEventListener('scroll', this.handler);
          window.addEventListener('load', this.handler);
          window.addEventListener('resize', this.handler);
          this.isInitialized = true;
        }
      }
    }, {
      key: 'check',
      value: function check(e) {
        var _this = this;

        var curPosition = window.pageYOffset || document.documentElement.scrollTop;
        var up = this.lastPosition > curPosition;
        var count = 0;
        var items = [].slice.call(this.container.querySelectorAll(this.items), 0);
        if (up) {
          items = items.reverse();
        }
        items.forEach(function (item, i) {
          var rect = void 0;
          var wWidth = void 0;
          var wHeight = void 0;
          var position = void 0;
          var itizin = void 0;

          try {
            rect = item.getBoundingClientRect();
            wWidth = window.innerWidth;
            wHeight = window.innerHeight;
            position = {
              above: rect.top < 0 && rect.bottom <= 0,
              left: rect.left < 0 && rect.right <= 0,
              right: rect.left >= wWidth && rect.right > wWidth,
              below: rect.top >= wHeight && rect.bottom > wHeight
            };

            if (_this.fraction) {
              var heightFraction = Math.min(rect.height, wHeight) * _this.fraction;
              var widthFraction = Math.min(rect.width, wWidth) * _this.fraction;
              itizin = (rect.top <= wHeight - heightFraction && rect.bottom > 0 || rect.top < wHeight && rect.bottom >= heightFraction && rect.bottom <= wHeight) && (rect.left <= wWidth - widthFraction && rect.right > 0 || rect.left < wWidth && rect.right >= widthFraction && rect.right <= wWidth);
            } else {
              itizin = rect.top < wHeight && rect.bottom > 0 && rect.left < wWidth && rect.right > 0;
            }

            if (itizin) {
              if (_this.stagger && !item.classList.contains('itizin')) {
                if (_this.css) {
                  item.style.transitionDelay = _this.stagger * count + 'ms';
                  item.classList.add('itizin');
                } else {
                  setTimeout(function () {
                    item.classList.add('itizin');
                  }, _this.stagger * count);
                }
                count++;
              } else {
                item.classList.add('itizin');
              }
            } else if (_this.remove) {
              item.style.transitionDelay = '';
              item.classList.remove('itizin');
            } else {
              item.style.transitionDelay = '';
            }

            if (position.above) {
              item.classList.add('izitin-above');
            } else {
              item.classList.remove('izitin-above');
            }

            if (position.below) {
              item.classList.add('izitin-below');
            } else {
              item.classList.remove('izitin-below');
            }

            if (position.left) {
              item.classList.add('izitin-left');
            } else {
              item.classList.remove('izitin-left');
            }

            if (position.right) {
              item.classList.add('izitin-right');
            } else {
              item.classList.remove('izitin-right');
            }
          } catch (e) {}
          var data = {
            index: i,
            direction: up ? 'up' : 'down',
            target: item,
            izitin: itizin,
            position: position,
            rect: rect
          };
          _this.fn && _this.fn.apply(item, [data]);
        });
      }
    }, {
      key: 'throttling',
      value: function throttling(fn) {
        var _this2 = this;

        var threshhold = arguments.length <= 1 || arguments[1] === undefined ? 50 : arguments[1];

        var last = void 0;
        var deferTimer = void 0;
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var now = Date.now();
          if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
              last = now;
              fn.apply(this, args);
            }, threshhold);
          } else {
            last = now;
            fn.apply(_this2, args);
          }
        };
      }
    }, {
      key: 'reset',
      value: function reset() {
        [].slice.call(this.container.querySelectorAll(this.items)).forEach(function (item) {
          item.classList.remove('itizin');
          item.classList.remove('izitin-above');
          item.classList.remove('izitin-below');
          item.classList.remove('izitin-left');
          item.classList.remove('izitin-right');
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.reset();
        window.removeEventListener('scroll', this.handler);
        window.removeEventListener('load', this.handler);
        window.removeEventListener('resize', this.handler);
        this.isInitialized = false;
      }
    }]);

    return Izitin;
  }();

  exports.default = Izitin;
  module.exports = exports['default'];
});
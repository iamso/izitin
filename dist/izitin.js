/*!
 * izitin - version 0.1.0
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
      var _ref$remove = _ref.remove;
      var remove = _ref$remove === undefined ? false : _ref$remove;

      _classCallCheck(this, Izitin);

      this.fraction = Math.max(Math.min(+fraction, 1), 0);
      this.fn = fn;
      this.container = container instanceof Node ? container : document.querySelector(container);
      this.items = items;
      this.stagger = +stagger;
      this.remove = !!remove;
      this.init();
    }

    _createClass(Izitin, [{
      key: 'init',
      value: function init() {
        this.lastPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.handler();
        if (!this.isInitialized) {
          this._handler = this.handler.bind(this);
          window.addEventListener('scroll', this._handler);
          window.addEventListener('load', this._handler);
          window.addEventListener('resize', this._handler);
          this.isInitialized = true;
        }
      }
    }, {
      key: 'handler',
      value: function handler(e) {
        var _this = this;

        var curPosition = window.pageYOffset || document.documentElement.scrollTop;
        var count = 0;
        var items = this.container.querySelectorAll(this.items);
        if (this.lastPosition > curPosition) {
          items = [].slice.call(items, 0).reverse();
        }
        items.forEach(function (item) {
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
                setTimeout(function () {
                  item.classList.add('itizin');
                }, _this.stagger * count);
                count++;
              } else {
                item.classList.add('itizin');
              }
            } else if (_this.remove) {
              item.classList.remove('itizin');
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
            target: item,
            izitin: itizin,
            position: position,
            rect: rect
          };
          _this.fn && _this.fn.apply(item, [data]);
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.container.querySelectorAll(this.items).forEach(function (item) {
          item.classList.remove('itizin');
          item.classList.remove('izitin-above');
          item.classList.remove('izitin-below');
          item.classList.remove('izitin-left');
          item.classList.remove('izitin-right');
        });
        window.removeEventListener('scroll', this._handler);
        window.removeEventListener('load', this._handler);
        window.removeEventListener('resize', this._handler);
        this.isInitialized = false;
      }
    }]);

    return Izitin;
  }();

  exports.default = Izitin;
  module.exports = exports['default'];
});
'use strict';

export default class Izitin {
  constructor({
    fraction = 0,
    fn = null,
    container = document,
    items = '.izitin',
    stagger = 100,
    css = true,
    remove = false,
  } = {}) {
    this.fraction = Math.max(Math.min(+fraction, 1), 0);
    this.fn = fn;
    this.container = container instanceof Node ? container : document.querySelector(container);
    this.items = items;
    this.stagger = +stagger;
    this.css = !!css;
    this.remove = !!remove;
    this.init();
  }
  init() {
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
  handler(e) {
    const curPosition = window.pageYOffset || document.documentElement.scrollTop;
    let count = 0;
    let items = this.container.querySelectorAll(this.items);
    if (this.lastPosition > curPosition) {
      items = [].slice.call(items, 0).reverse();
    }
    items.forEach(item => {
      let rect;
      let wWidth;
      let wHeight;
      let position;
      let itizin;

      try {
        rect = item.getBoundingClientRect();
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;
        position = {
          above: rect.top < 0 && rect.bottom <= 0,
          left: rect.left < 0 && rect.right <= 0,
          right: rect.left >= wWidth && rect.right > wWidth,
          below: rect.top >= wHeight && rect.bottom > wHeight,
        };

        if (this.fraction) {
          const heightFraction = Math.min(rect.height, wHeight) * this.fraction;
          const widthFraction = Math.min(rect.width, wWidth) * this.fraction;
          itizin =  (
                      (rect.top <= wHeight - heightFraction && rect.bottom > 0) ||
                      (rect.top < wHeight && rect.bottom >= heightFraction && rect.bottom <= wHeight)
                    ) &&
                    (
                      (rect.left <= wWidth - widthFraction && rect.right > 0) ||
                      (rect.left < wWidth && rect.right >= widthFraction && rect.right <= wWidth)
                    );
        }
        else {
          itizin =  rect.top < wHeight &&
                    rect.bottom > 0 &&
                    rect.left < wWidth &&
                    rect.right > 0;
        }

        if (itizin) {
          if (this.stagger && !item.classList.contains('itizin')) {
            if (this.css) {
              item.style.transitionDelay = `${this.stagger * count}ms`;
              item.classList.add('itizin');
            }
            else {
              setTimeout(() => {
                item.classList.add('itizin');
              }, this.stagger * count);
            }
            count++;
          }
          else {
            item.classList.add('itizin');
          }
        }
        else if (this.remove) {
          item.style.transitionDelay = '';
          item.classList.remove('itizin');
        }
        else {
          item.style.transitionDelay = '';
        }


        if (position.above) {
          item.classList.add('izitin-above');
        }
        else {
          item.classList.remove('izitin-above');
        }

        if (position.below) {
          item.classList.add('izitin-below');
        }
        else {
          item.classList.remove('izitin-below');
        }

        if (position.left) {
          item.classList.add('izitin-left');
        }
        else {
          item.classList.remove('izitin-left');
        }

        if (position.right) {
          item.classList.add('izitin-right');
        }
        else {
          item.classList.remove('izitin-right');
        }
      }
      catch(e) {}
      const data = {
        target: item,
        izitin: itizin,
        position: position,
        rect: rect,
      };
      this.fn && this.fn.apply(item, [data]);
    });
  }
  destroy() {
    this.container.querySelectorAll(this.items).forEach(item => {
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
}

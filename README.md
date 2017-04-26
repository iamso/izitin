izitin
======
check if elements are in viewport

Install
-------

### With Bower

```bash
bower install izitin
```

### With NPM

```bash
npm install izitin
```

Example Setup
-------------

### Javascript
```javascript
import Izitin from 'izitin';

// create an instance with default options
const izitin = new Izitin({
  fraction: 0, // fraction of the item that must be in viewport (0 - 1)
  fn: e => {}, // callback function for each individual item
  container: document, // the selector or dom element for the container
  items: '.izitin', // the selector for the items
  stagger: 100, // duration for stagger (in ms)
  remove: false // remove class when out of viewport
});

```

The callback function `fn` receives an object with the following content:
```javascript
{
  target: // the DOM element
  izitin: // boolean, true if in viewport
  position: // where in relation to the viewport is the element
  rect: // the bounding client rect of the DOM element
}
```

### CSS

The plugin adds the following classes to items:
```css
.itizin {} /* the item is in the viewport */
.izitin-above {} /* the item is above the viewport */
.izitin-below {} /* the item is below the viewport */
.izitin-left {} /* the item is left of the viewport */
.izitin-right {} /* the item is right of the viewport */
```

License
-------

[MIT License](LICENSE)

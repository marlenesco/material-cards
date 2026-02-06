# Material Cards

Simple user card component inspired by the Google Material color palette, built with jQuery + SCSS.

[Working demo on CodePen](https://codepen.io/marlenesco/full/NqOozj)

[![See full preview](https://material-cards.s3.eu-west-1.amazonaws.com/preview.jpg)](http://codepen.io/marlenesco/full/NqOozj/)

## Project structure

- `js/jquery.material-cards.js`: jQuery plugin source
- `js/jquery.material-cards.min.js`: minified plugin (legacy artifact)
- `scss/material-cards.scss`: main SCSS entrypoint
- `scss/material-cards-auto-height.scss`: variant for dynamic heights (Masonry demo)
- `dist/material-cards.css`: compiled CSS
- `dist/material-cards-auto-height.css`: compiled CSS (auto-height variant)
- `demo/`: static demos

## Installation

### Modern workflow (recommended)

```bash
npm install
```

Build CSS and minified JS:

```bash
npm run build
```

During development:

```bash
npm run build:css
npm run build:js
```

## Usage

```javascript
$('.material-card').materialCard(options);
```

### Options

```javascript
const options = {
  icon_close: 'fa-arrow-left',
  icon_open: 'fa-bars',
  icon_spin: 'fa-spin-fast',
  card_activator: 'click' // 'click' or 'hover'
};
```

### Methods

```javascript
$('.material-card').materialCard('toggle');
$('.material-card').materialCard('open');
$('.material-card').materialCard('close');

const isOpen = $('.material-card:eq(0)').materialCard('isOpen');
```

### Events

- `show.material-card`
- `shown.material-card`
- `hide.material-card`
- `hidden.material-card`

```javascript
$('.material-card').on(
  'show.material-card shown.material-card hide.material-card hidden.material-card',
  function (event) {
    console.log(event.type, $(this));
  }
);
```

## Notes

- Demo pages use HTTPS CDN links and work with modern jQuery.
- Source of truth for styles is `scss/`; run `npm run build:css` to refresh the CSS build.
- Source of truth for script is `js/jquery.material-cards.js`; run `npm run build:js` to refresh the minified file.

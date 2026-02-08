# Material Cards

Material card component inspired by the Google Material color palette, built with vanilla JavaScript + SCSS.

[Working demo on CodePen](https://codepen.io/marlenesco/full/NqOozj)

[![See full preview](https://material-cards.s3.eu-west-1.amazonaws.com/preview.jpg)](http://codepen.io/marlenesco/full/NqOozj/)

## Installation

```bash
npm install material-cards
```

## Quick start

```html
<link rel="stylesheet" href="material-cards/css">

<article class="material-card Red">
  <h2>
    <span>Christopher Walken</span>
    <strong>
      <svg class="mc-icon" aria-hidden="true">
        <use href="material-cards/icons#mc-icon-star"></use>
      </svg>
      The Deer Hunter
    </strong>
  </h2>

  <div class="mc-content">
    <div class="img-container"></div>
    <div class="mc-description">...</div>
  </div>

  <a class="mc-btn-action" role="button" aria-label="Toggle details"></a>

  <div class="mc-footer">
    <h4>Social</h4>
    <a href="#" aria-label="Facebook">
      <svg class="mc-icon" aria-hidden="true">
        <use href="material-cards/icons#mc-icon-facebook"></use>
      </svg>
    </a>
  </div>
</article>

<script src="material-cards"></script>
<script>
  window.MaterialCards.initMaterialCards('.material-card');
</script>
```

## API

### `initMaterialCards(target?, options?)`

- `target`: selector, single element, NodeList, or array of elements
- `options`:
  - `cardActivator` (`click` or `hover`, default: `click`)
  - `buttonSelector` (default: `.mc-btn-action`)

`mc-btn-action` uses a built-in morph animation (hamburger -> `X` -> hamburger).

```js
const cards = window.MaterialCards.initMaterialCards('.material-card', {
  cardActivator: 'click'
});

cards[0].open();
cards[0].close();
cards[0].toggle();
const isOpen = cards[0].isOpen();
```

Use `mc-img-responsive` for card images:

```html
<img class="mc-img-responsive" src="..." alt="">
```

### Events

Each card dispatches:

- `show.material-card`
- `shown.material-card`
- `hide.material-card`
- `hidden.material-card`

```js
document.querySelector('.material-card').addEventListener('shown.material-card', (event) => {
  console.log(event.type, event.currentTarget);
});
```

## Package exports

- `material-cards` -> JS API (`js/material-cards.js`)
- `material-cards/css` -> main CSS (`dist/material-cards.css`)
- `material-cards/css/auto-height` -> auto-height CSS (`dist/material-cards-auto-height.css`)
- `material-cards/icons` -> SVG sprite (`assets/icons.svg`)

## Development

```bash
npm install
npm run build
```

## Experimental multi-framework packages (vNext)

The repository now includes a vNext scaffold with shared TypeScript models and framework adapters:

- `packages/core` -> shared types and open-state contract
- `packages/react` -> `MaterialCard` React component
- `packages/vue` -> `MaterialCard` Vue 3 component
- `packages/svelte` -> `MaterialCard` Svelte component

Core API (aligned across frameworks):

- `card`: title, subtitle, description, image, links, actions
- `color`: palette token (`blue`, `teal`, etc.) or `custom`
- `colorHex`: explicit color override
- `isOpen` + `defaultOpen` + `onOpenChange`

Icon strategy:

- pass framework-native icon components (`Icon`/`icon`) for external libraries
- or fallback to `iconName` for mapped/custom rendering

Styling strategy:

- CSS is component-local (`.module.css`, Vue scoped style, Svelte style block)
- consumers only load style for imported card component

Build and typecheck (vNext packages):

```bash
npm run build:vnext
npm run typecheck:vnext
npm run test:vnext
npm run smoke:vnext
```

Release/versioning (vNext packages):

```bash
npm run changeset
npm run version:vnext
npm run release:vnext
```

Build targets:

- `dist/material-cards.css`
- `dist/material-cards-auto-height.css`
- `js/material-cards.min.js`

## Local demos

- `demo/material-cards_simple.html`
- `demo/material-cards_api.html`
- `demo/material-cards_masonry.html`

## Migration notes

If you are upgrading from the old jQuery plugin, see `MIGRATION.md`.

## Release

Follow `RELEASE_CHECKLIST.md` before publishing.

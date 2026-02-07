# Migration Guide: v1 (jQuery) -> v2 (Vanilla JS)

## Breaking changes

1. jQuery plugin API removed.
2. Font Awesome dependency removed.
3. `js/jquery.material-cards.js` replaced by `js/material-cards.js`.
4. Option names changed to camelCase.

## API mapping

Old:

```js
$('.material-card').materialCard({
  icon_close: 'fa-arrow-left',
  icon_open: 'fa-bars',
  icon_spin: 'fa-spin-fast',
  card_activator: 'click'
});
```

New:

```js
window.MaterialCards.initMaterialCards('.material-card', {
  cardActivator: 'click'
});
```

## Method mapping

- `$('.material-card').materialCard('open')` -> `cards[0].open()`
- `$('.material-card').materialCard('close')` -> `cards[0].close()`
- `$('.material-card').materialCard('toggle')` -> `cards[0].toggle()`
- `$('.material-card').materialCard('isOpen')` -> `cards[0].isOpen()`

## Markup changes

Replace Font Awesome icons with local SVG sprite references:

```html
<svg class="mc-icon" aria-hidden="true">
  <use href="material-cards/icons#mc-icon-star"></use>
</svg>
```

Button markup:

```html
<a class="mc-btn-action" role="button" aria-label="Toggle details"></a>
```

The script injects the action icon automatically.

Replace Bootstrap's `img-responsive` class with `mc-img-responsive`.

## Action icon behavior

`mc-btn-action` now uses a built-in morph animation from hamburger to `X`.
The old icon options are no longer needed.

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
    return;
  }

  root.MaterialCards = factory();
})(typeof globalThis !== 'undefined' ? globalThis : window, function () {
  'use strict';

  var instances = new WeakMap();

  var ICON_PATHS = {
    menu: 'M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z',
    'arrow-left': 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    'chevron-left': 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z',
    'thumbs-up': 'M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10c0 1.1.9 2 2 2h9c.82 0 1.54-.5 1.84-1.22L22 12.34V10z',
    star: 'm12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    facebook: 'M13 22v-8h3l1-4h-4V8c0-1.14.32-1.92 1.96-1.92H17V2.5C16.66 2.45 15.57 2.35 14.29 2.35 11.62 2.35 9.79 3.98 9.79 6.97V10H7v4h2.79v8H13z',
    twitter: 'M22 5.92c-.74.33-1.53.56-2.37.66a4.12 4.12 0 0 0 1.81-2.27 8.2 8.2 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.39 4.8a4.1 4.1 0 0 0 1.27 5.48 4.06 4.06 0 0 1-1.86-.52v.05c0 1.98 1.4 3.63 3.26 4a4.09 4.09 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.84A8.24 8.24 0 0 1 2 18.41a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67l-.01-.53c.8-.57 1.5-1.28 2.04-2.13z',
    linkedin: 'M6.94 8.5A2.44 2.44 0 1 1 6.95 3.6a2.44 2.44 0 0 1-.01 4.89zM4.76 20.4h4.38V9.76H4.76V20.4zm7.07 0h4.38v-5.94c0-1.57.3-3.1 2.24-3.1 1.92 0 1.95 1.8 1.95 3.2v5.84h4.38v-6.7c0-3.29-.71-5.82-4.55-5.82-1.84 0-3.08 1.01-3.58 1.97h-.05V9.76h-4.2V20.4z',
    instagram: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.55 1.5a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    github: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.01 1.52 1.01.88 1.5 2.31 1.07 2.87.82.09-.64.35-1.07.64-1.31-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.41.11 2.66.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.59 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
    youtube: 'M23 12s0-3.16-.4-4.68a2.96 2.96 0 0 0-2.08-2.09C18.99 4.83 12 4.83 12 4.83s-6.99 0-8.52.4A2.96 2.96 0 0 0 1.4 7.32C1 8.84 1 12 1 12s0 3.16.4 4.68a2.96 2.96 0 0 0 2.08 2.09c1.53.4 8.52.4 8.52.4s6.99 0 8.52-.4a2.96 2.96 0 0 0 2.08-2.09C23 15.16 23 12 23 12zM9.75 15.5v-7L16 12l-6.25 3.5z',
    tiktok: 'M14 3c.46 2.02 1.66 3.13 3.66 3.4v2.43a6.84 6.84 0 0 1-3.66-1.15v5.5a5.18 5.18 0 1 1-4.49-5.13v2.51a2.68 2.68 0 1 0 1.99 2.58V3H14z',
    discord: 'M20.32 4.37A19.8 19.8 0 0 0 15.4 3l-.24.49a18.6 18.6 0 0 1 4.44 1.32c-1.87-.86-4.12-1.46-7.6-1.46s-5.73.6-7.6 1.46a18.6 18.6 0 0 1 4.44-1.32L8.6 3a19.8 19.8 0 0 0-4.92 1.37C1.6 7.43 1.05 10.4 1.23 13.33A19.9 19.9 0 0 0 7 16.22l1.23-1.67c-.67-.24-1.3-.54-1.88-.9.16.11.32.22.49.32 2.02 1.2 4.36 1.48 5.16 1.48s3.14-.28 5.16-1.48c.17-.1.33-.21.49-.32-.58.36-1.21.66-1.88.9L17 16.22a19.9 19.9 0 0 0 5.77-2.89c.21-3.39-.36-6.35-2.45-8.96zM9.56 12.7a1.82 1.82 0 1 1 0-3.64 1.82 1.82 0 0 1 0 3.64zm4.88 0a1.82 1.82 0 1 1 0-3.64 1.82 1.82 0 0 1 0 3.64z',
    threads: 'M13.56 10.33a3.9 3.9 0 0 0-1.58-.31c-1.27 0-2.09.61-2.09 1.54 0 .86.66 1.4 1.73 1.4.7 0 1.31-.22 1.83-.66.11-.09.22-.2.32-.31-.08-.53-.2-1.07-.21-1.66zm6.08 3.27c0 3.76-2.77 6.4-6.9 6.4-4.1 0-7.02-2.86-7.02-7.17 0-4.3 2.86-7.18 6.97-7.18 3.3 0 5.7 1.81 6.28 4.74h-2.55c-.45-1.5-1.78-2.36-3.73-2.36-2.55 0-4.3 1.87-4.3 4.8 0 2.98 1.8 4.9 4.53 4.9 2.34 0 3.9-1.25 4.07-3.18-.57.34-1.2.57-1.91.57-2.26 0-3.92-1.4-3.92-3.38 0-2.08 1.72-3.5 4.2-3.5 2.61 0 4.39 1.61 4.39 4.09 0 .42-.04.81-.11 1.27z'
  };

  function mergeOptions(base, extra) {
    var merged = {};
    var key;

    for (key in base) {
      if (Object.prototype.hasOwnProperty.call(base, key)) {
        merged[key] = base[key];
      }
    }

    if (!extra || typeof extra !== 'object') {
      return merged;
    }

    for (key in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, key)) {
        merged[key] = extra[key];
      }
    }

    return merged;
  }

  function parseTransitionTime(value) {
    if (!value || typeof value !== 'string') {
      return 0;
    }

    var maxTime = 0;
    value.split(',').forEach(function (raw) {
      var part = raw.trim();
      var match = part.match(/^([\d.]+)(ms|s)$/);

      if (!match) {
        return;
      }

      var amount = Number.parseFloat(match[1]);
      if (Number.isNaN(amount)) {
        return;
      }

      var current = match[2] === 's' ? amount * 1000 : amount;
      if (current > maxTime) {
        maxTime = current;
      }
    });

    return maxTime;
  }

  function createSvgIcon(name, className) {
    var path = ICON_PATHS[name] || ICON_PATHS.menu;
    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');

    if (className) {
      icon.setAttribute('class', className);
    }

    var iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', path);
    icon.appendChild(iconPath);

    return icon;
  }

  function MaterialCard(element, options) {
    this.options = mergeOptions(MaterialCard.defaults, options);
    this.card = element;
    this.button = this.card.querySelector(this.options.buttonSelector);
    this.cardActivator = this.options.cardActivator;
    this.timing = this.getTransitionTiming();
    this._timeout = null;

    if (this.button) {
      if (this.button.tagName === 'BUTTON') {
        this.button.setAttribute('type', this.button.getAttribute('type') || 'button');
      }

      this.button.setAttribute('aria-expanded', String(this.isOpen()));
      this.ensureToggleIcon();
      this.setToggleState(this.isOpen());

      if (this.cardActivator === 'click') {
        this._onClick = this.toggle.bind(this);
        this.button.addEventListener('click', this._onClick);
      } else {
        this.button.style.display = 'none';
      }
    }

    if (this.cardActivator === 'hover') {
      this._onMouseEnter = this.open.bind(this);
      this._onMouseLeave = this.close.bind(this);
      this.card.addEventListener('mouseenter', this._onMouseEnter);
      this.card.addEventListener('mouseleave', this._onMouseLeave);
    }
  }

  MaterialCard.defaults = {
    cardActivator: 'click',
    buttonSelector: '.mc-btn-action'
  };

  MaterialCard.prototype.ensureToggleIcon = function () {
    if (!this.button) {
      return;
    }

    if (this.button.querySelector('.mc-toggle-icon')) {
      return;
    }

    var icon = document.createElement('span');
    icon.setAttribute('class', 'mc-toggle-icon');
    icon.setAttribute('aria-hidden', 'true');

    var topLine = document.createElement('span');
    topLine.setAttribute('class', 'mc-toggle-icon__line mc-toggle-icon__line--top');
    var middleLine = document.createElement('span');
    middleLine.setAttribute('class', 'mc-toggle-icon__line mc-toggle-icon__line--middle');
    var bottomLine = document.createElement('span');
    bottomLine.setAttribute('class', 'mc-toggle-icon__line mc-toggle-icon__line--bottom');

    icon.appendChild(topLine);
    icon.appendChild(middleLine);
    icon.appendChild(bottomLine);

    this.button.replaceChildren(icon);
  };

  MaterialCard.prototype.setToggleState = function (isOpen) {
    if (!this.button) {
      return;
    }

    this.button.classList.toggle('mc-btn-action-open', Boolean(isOpen));
  };

  MaterialCard.prototype.dispatchCardEvent = function (eventName) {
    this.card.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
  };

  MaterialCard.prototype.toggle = function () {
    if (!this.button) {
      return;
    }

    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open();
  };

  MaterialCard.prototype.getTransitionTiming = function () {
    var duration = 0;
    var nodes = this.card.querySelectorAll('*');

    nodes.forEach(function (node) {
      var styles = window.getComputedStyle(node);
      var total = parseTransitionTime(styles.transitionDuration) + parseTransitionTime(styles.transitionDelay);
      if (total > duration) {
        duration = total;
      }
    });

    return duration;
  };

  MaterialCard.prototype.close = function () {
    var self = this;

    this.dispatchCardEvent('hide.material-card');
    this.card.classList.remove('mc-active');
    this.setToggleState(false);
    if (this.button) {
      this.button.setAttribute('aria-expanded', 'false');
    }

    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }

    this._timeout = window.setTimeout(function () {
      self.dispatchCardEvent('hidden.material-card');
      self._timeout = null;
    }, this.timing);
  };

  MaterialCard.prototype.open = function () {
    var self = this;

    this.dispatchCardEvent('show.material-card');
    this.card.classList.add('mc-active');
    this.setToggleState(true);
    if (this.button) {
      this.button.setAttribute('aria-expanded', 'true');
    }

    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }

    this._timeout = window.setTimeout(function () {
      self.dispatchCardEvent('shown.material-card');
      self._timeout = null;
    }, this.timing);
  };

  MaterialCard.prototype.isOpen = function () {
    return this.card.classList.contains('mc-active');
  };

  MaterialCard.prototype.destroy = function () {
    if (this._onClick && this.button) {
      this.button.removeEventListener('click', this._onClick);
    }

    if (this._onMouseEnter) {
      this.card.removeEventListener('mouseenter', this._onMouseEnter);
    }

    if (this._onMouseLeave) {
      this.card.removeEventListener('mouseleave', this._onMouseLeave);
    }

    if (this._timeout) {
      window.clearTimeout(this._timeout);
      this._timeout = null;
    }

    instances.delete(this.card);
  };

  function resolveElements(target) {
    if (!target) {
      return [];
    }

    if (typeof target === 'string') {
      return Array.prototype.slice.call(document.querySelectorAll(target));
    }

    if (target instanceof Element) {
      return [target];
    }

    if (target instanceof NodeList || Array.isArray(target)) {
      return Array.prototype.slice.call(target).filter(function (item) {
        return item instanceof Element;
      });
    }

    return [];
  }

  function getMaterialCardInstance(element) {
    return instances.get(element) || null;
  }

  function initMaterialCards(target, options) {
    var elements = resolveElements(target || '.material-card');

    if (typeof options === 'string') {
      if (options === 'isOpen') {
        if (!elements.length) {
          return false;
        }

        var instance = getMaterialCardInstance(elements[0]);
        return instance ? instance.isOpen() : false;
      }

      elements.forEach(function (element) {
        var instance = getMaterialCardInstance(element);
        if (instance && typeof instance[options] === 'function') {
          instance[options]();
        }
      });

      return elements.map(function (element) {
        return getMaterialCardInstance(element);
      }).filter(Boolean);
    }

    return elements.map(function (element) {
      var instance = getMaterialCardInstance(element);
      if (!instance) {
        instance = new MaterialCard(element, options);
        instances.set(element, instance);
      }
      return instance;
    });
  }

  return {
    MaterialCard: MaterialCard,
    createSvgIcon: createSvgIcon,
    getMaterialCardInstance: getMaterialCardInstance,
    icons: Object.keys(ICON_PATHS),
    initMaterialCards: initMaterialCards
  };
});

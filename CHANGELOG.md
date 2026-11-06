# Changelog

## 2.0.6 - 2026-11-06

- Updated vulnerable development dependencies, including Vitest, Vite, Svelte, and tsup.
- Applied targeted dependency overrides for patched glob, minimatch, and Next.js PostCSS versions.
- Updated and locked the framework demo dependencies and migrated the SvelteKit demo to its patched major version.
- Preserved the Vue CSS export path and corrected the Svelte package entry for named imports.
- Documented the officially rejected deepmerge CVE that npm still reports.
- Published JavaScript, CSS, and the vanilla public API are unchanged.

## 2.0.5 - 2026-11-06

- Moved all demo images from S3 into the repository and updated the local demo paths.
- Updated the README preview to use a commit-pinned GitHub CDN URL.
- Documented CodePen image URLs and kept demo photos out of the npm package.
- JavaScript, CSS, and the public API are unchanged.

## 2.0.4 - 2026-10-07

- Corrected the SCSS mixin name from `mc-transtition` to `mc-transition` and updated all internal usages.
- Kept `mc-transtition` as a deprecated alias for backward compatibility.
- Compiled CSS output is unchanged.

## 2.0.0 - 2026-02-06

- Replaced jQuery plugin with vanilla JavaScript API.
- Removed Font Awesome dependency.
- Added local SVG sprite at `assets/icons.svg`.
- Added npm package exports for JS, CSS variants, and icons.
- Updated demo pages to vanilla JavaScript.
- Added TypeScript declaration file (`js/material-cards.d.ts`).
- Updated README and added migration guide.

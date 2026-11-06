# Demo images

The 19 card portraits and the README preview are stored in `assets/images`.
The original JPEG files and filenames are preserved, including `thumb-rugter-hauer.jpg`.
Local demos load the portraits through `../assets/images/`.
The README uses an absolute GitHub CDN URL so its preview also works on npm.
Demo images stay in the repository and are excluded from the npm package.

To preview a demo, serve the repository root with a static HTTP server, then open
`/demo/material-cards_simple.html`, `/demo/material-cards_api.html`, or
`/demo/material-cards_masonry.html`.

## CodePen

The [existing CodePen demo](https://codepen.io/marlenesco/pen/NqOozj) needs absolute
HTTPS image URLs. jsDelivr can serve files directly from this public GitHub
repository; see its [GitHub URL documentation](https://github.com/jsdelivr/jsdelivr#github).

After committing and pushing `images-path-fix`, replace every occurrence of this
prefix in the Pen's HTML panel:

```text
https://material-cards.s3-eu-west-1.amazonaws.com/
```

with:

```text
https://cdn.jsdelivr.net/gh/marlenesco/material-cards@images-path-fix/assets/images/
```

For example:

```html
<img class="img-responsive" src="https://cdn.jsdelivr.net/gh/marlenesco/material-cards@images-path-fix/assets/images/thumb-christopher-walken.jpg" alt="Christopher Walken">
```

Keep the Pen's existing CSS and JavaScript. Relative paths such as
`../assets/images/` resolve against CodePen and cannot load these repository files.

For a permanent URL, replace `images-path-fix` with the full commit SHA containing
the images. Alternatively, after merging, use `@main` to follow the default branch.
The selected branch or commit must exist on GitHub before its image URLs can work.
Open the Pen preview and check all 19 portraits before saving the change.

## Completing the S3 migration

Before removing the bucket:

1. Publish the images on GitHub and merge the local demo and README path changes.
2. Update and save the live Pen with the public image URLs above.
3. Verify all 19 portraits in the live Pen and the README preview load from their
   new URLs, with no requests to the original bucket.
4. Publish a new patch version of `material-cards` to update the README on npm.
   npm only updates the package page's README when a new version is published; see the
   [npm README documentation](https://docs.npmjs.com/about-package-readme-files/#updating-an-existing-package-readmemd-file).

CodePen image hosting through GitHub does not require an npm release. The patch
release updates the npm package page; the library's JavaScript and CSS are unchanged.

The live Pen still depends on S3 until its HTML is updated. Copying the images
into the repository does not change the Pen or delete the original S3 objects.

# Release Checklist

## 1) Pre-release

1. Verify Node and npm versions used by CI and local release machine.
2. Ensure working tree is clean except intended changes.
3. Confirm package metadata:
   - root: `package.json` (`material-cards`)
   - vNext: `packages/*/package.json` (`@material-cards/*`)
4. Update docs if needed:
   - `README.md`
   - `CHANGELOG.md`
   - `MIGRATION.md` (if relevant)

## 2) Validation

1. Install dependencies:

```bash
npm install
```

2. Validate legacy package:

```bash
npm run build
node -e "const mc=require('./js/material-cards.js'); console.log(Object.keys(mc));"
```

3. Validate vNext packages:

```bash
npm run build:vnext
npm run typecheck:vnext
npm run test:vnext
```

4. Optional but recommended (requires network):

```bash
npm run smoke:vnext
```

5. Inspect publish payloads:

```bash
npm pack --dry-run
npm --workspace @material-cards/core pack --dry-run
npm --workspace @material-cards/react pack --dry-run
npm --workspace @material-cards/vue pack --dry-run
npm --workspace @material-cards/svelte pack --dry-run
```

## 3) Versioning

1. Root package (`material-cards`) version policy:
   - `patch` for fixes/internal updates
   - `minor` for backward-compatible feature additions
   - `major` for breaking changes
2. vNext packages are versioned independently via Changesets.
3. Create changeset for modified vNext packages:

```bash
npm run changeset
```

4. Apply version bumps:

```bash
npm run version:vnext
```

## 4) Publish

1. Publish root package (when needed):

```bash
npm publish
```

2. Publish vNext packages:

```bash
npm run release:vnext
```

## 5) Post-publish

1. Validate installation in a clean sample project.
2. Verify npm pages show expected versions and files.
3. Create GitHub release notes and tag(s).
4. Communicate breaking changes clearly when applicable.

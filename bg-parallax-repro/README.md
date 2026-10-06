# BgParallax through `generate()`: repro

`index.html` shows the same `@wix/interact@2.5.16` page twice: `before.js` bundles the released
`@wix/motion-presets@1.0.7`, `after.js` bundles the presets from branch
`fix/bg-scroll-css-custom-properties` of this fork. The source of both bundles is `demo.ts`:

```sh
esbuild demo.ts --bundle --format=esm --minify --outfile=before.js
esbuild demo.ts --bundle --format=esm --minify --outfile=after.js --alias:@wix/motion-presets=<fork>/packages/motion-presets
```

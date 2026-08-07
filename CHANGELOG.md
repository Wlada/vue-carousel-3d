# Changelog

All notable changes to this project are documented here. The project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Native Vue 3 beta (`2.0.0-beta.1`) with `vue@^3.5.0` as a peer dependency.
- Interactive playground and a versioned Vue 2 demo in the documentation.

### Changed

- Extracted the carousel core as preparation for the Vue 3 migration.

## [1.1.0] - 2026-08-06

### Added

- ESM, CommonJS and UMD package exports with TypeScript declarations.
- GitHub Actions CI across Node 20.19 and Node 22.
- Unit coverage for empty state, keyboard navigation and autoplay lifecycle.
- A Node SSR render test and real-browser validation workflow.
- Accessible carousel region semantics, slide metadata and native button controls.
- VitePress documentation with a self-contained live Vue 2 demo and GitHub Pages deployment.

### Changed

- Replaced the Vue CLI 4, Jest, Cypress and Travis toolchain with Vite 7, Vitest 4, ESLint 10 and pnpm.
- Reduced the npm package to the distributable library, declarations, readme, changelog and license.
- Updated Vue 2 compatibility to `^2.6.14 || ^2.7.0` while keeping Vue external as a peer dependency.
- Replaced the retired `placehold.it` images with a local SVG asset.
- Improved responsive sizing, pointer/touch handling and mutation observation.

### Fixed

- Autoplay now starts when hover pause is disabled and no longer stacks intervals.
- All interaction listeners, intervals and navigation timers are cleaned up on destroy.
- Empty carousels keep index `0` and safely ignore navigation.
- Hybrid input devices no longer select touch coordinates based only on browser capability detection.
- Resizing now refreshes the viewport before calculating slide dimensions.
- Demo imports and Sass preprocessing now work with the modern development server.

## [1.0.1] - 2020-01-31

- Previous published Vue 2 release.

[Unreleased]: https://github.com/wlada/vue-carousel-3d/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/wlada/vue-carousel-3d/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/wlada/vue-carousel-3d/releases/tag/v1.0.1

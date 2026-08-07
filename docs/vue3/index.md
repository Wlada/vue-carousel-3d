# Vue 3 migration guide

The Vue 3 implementation lives on its own branch and is first published through the `next` tag.

## Contract

- Native Vue 3 components and plugin registration.
- Vue `^3.5.0` peer dependency.
- Equivalent core props, events and visual behavior where practical.
- A migration table for every renamed or removed API.
- Dedicated unit, SSR and real-browser coverage.

The current `1.x` package remains the Vue 2 track. The public component names, props, events, slots and navigation methods are retained in `2.x`, but users should validate the beta in their application before moving from `@1` to `@next`.

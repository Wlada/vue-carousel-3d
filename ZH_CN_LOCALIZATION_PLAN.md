# Simplified Chinese Documentation Implementation Plan

Status: implemented

Target locale: Simplified Chinese (`zh-CN`)

Canonical content: existing English documentation
Implementation target: DeepSeek Flash, working phase by phase

## 1. Objective

Add a complete Simplified Chinese documentation experience without changing the
runtime library or its public API. English remains the source of truth and keeps
its existing URLs. The Chinese documentation is published under `/zh-CN/`.

The completed work includes:

- a localized VitePress navigation and documentation tree;
- all current Vue 3 documentation;
- the complete Vue 2 archive documentation;
- a Chinese README;
- localized user-facing demo and playground text;
- localized accessibility strings and metadata;
- verification of builds, routes, links, examples, and language switching.

## 2. Non-goals and constraints

- Do not change carousel runtime behavior or the public API.
- Do not translate identifiers, imports, component names, prop names, event
  names, slot names, method names, commands, or package names.
- Do not translate `CHANGELOG.md` in full. Link to the canonical English file.
- Do not add a large i18n runtime dependency for the standalone demos.
- Do not manually edit `dist/`, `docs/.vitepress/dist/`, `node_modules/`, or
  other generated output.
- Do not modify the Vue 2 implementation maintained on the
  `maintenance/vue2` branch. This plan only localizes the `/v1/` archive that is
  already part of the documentation site.
- Do not commit, push, or open a pull request unless separately requested.
- Preserve unrelated user changes in the worktree.

## 3. Target URL and file structure

English keeps its current root routes. Chinese mirrors those routes below
`/zh-CN/`.

```text
docs/
|-- index.md
|-- guide/
|-- api/
|-- examples/
|-- playground/
|-- vue3/
|-- v1/
`-- zh-CN/
    |-- index.md
    |-- guide/
    |   |-- index.md
    |   `-- versioning.md
    |-- api/
    |   `-- index.md
    |-- examples/
    |   `-- index.md
    |-- playground/
    |   `-- index.md
    |-- vue3/
    |   `-- index.md
    `-- v1/
        |-- index.md
        |-- guide/
        |   |-- index.md
        |   `-- versioning.md
        |-- api/
        |   `-- index.md
        `-- examples/
            `-- index.md
```

The README pair is:

```text
README.md
README.zh-CN.md
```

## 4. Translation rules

### 4.1 Canonical source

The English page is canonical. Every Chinese page must preserve its technical
meaning, section coverage, API coverage, examples, warnings, and version labels.
Do not invent features or silently correct API behavior during translation.

### 4.2 Content that remains unchanged

Keep these in their original form:

- `Vue Carousel 3D`, `vue-carousel-3d`, `Carousel3d`, and `Slide`;
- all JavaScript, Vue, HTML, CSS, npm, pnpm, and shell identifiers;
- prop names such as `controlsVisible`, `beforeSlideChange`, and `lazy`;
- event names such as `before-slide-change` and `after-slide-change`;
- slot names such as `prev` and `next`;
- method names such as `goNext()`, `goPrev()`, and `goSlide(index)`;
- package versions, route fragments, command names, and import paths.

Code blocks must remain executable. Comments and human-facing example strings
may be translated when that improves the Chinese example, but program semantics
must not change.

### 4.3 Initial terminology glossary

| English | Simplified Chinese |
| --- | --- |
| carousel | 轮播组件 |
| slide | 幻灯片 |
| navigation dots | 导航指示点 |
| navigation controls | 导航控件 |
| autoplay | 自动播放 |
| pause on hover | 悬停时暂停 |
| perspective | 透视 |
| spacing | 间距 |
| inverse scaling | 反向缩放 |
| current track | 当前版本线 |
| archived track | 归档版本线 |
| maintenance track | 维护版本线 |
| slide-change guard | 幻灯片切换守卫 |
| lazy slide content | 幻灯片内容懒加载 |
| playground | 交互式演练场 |
| API reference | API 参考 |
| compatibility policy | 兼容性策略 |
| global registration | 全局注册 |
| local registration | 局部注册 |
| scoped slot | 作用域插槽 |
| accessibility | 无障碍访问 |

The glossary is validated in Phase 0. Prefer terminology used by the official
Simplified Chinese Vue documentation when there is a conflict.

## 5. Implementation phases

Each phase is an independent quality gate. In autonomous execution mode, the
implementer records a concise checkpoint, runs the required checks, inspects
`git diff`, and continues immediately when the gate passes. It stops only for a
genuine blocker that cannot be resolved safely within the approved scope.

### Phase 0 - Read-only audit and glossary

Goal: establish exact scope before modifying files.

Tasks:

1. Read repository instructions, `package.json`, the VitePress configuration,
   all source Markdown pages, and all standalone docs application sources.
2. Confirm the complete English-to-Chinese file map.
3. Inventory user-facing strings in:
   - `docs/demo/`;
   - `docs/playground/`;
   - `docs/v1-demo/`.
4. Inventory internal links, iframe URLs, titles, metadata, and accessibility
   strings that need localized equivalents.
5. Validate and finalize the terminology glossary.
6. Determine which generated documentation assets are tracked and how existing
   scripts regenerate them.
7. Record the starting `git status` so unrelated work is preserved.

Deliverable: audit report only. No file changes.

Gate: the audit confirms the map, glossary, and implementation scope. In
autonomous mode this is recorded as a checkpoint and implementation continues.

### Phase 1 - VitePress locale infrastructure

Goal: introduce working `en-US` and `zh-CN` documentation tracks.

Tasks:

1. Configure locales using the API supported by the installed VitePress 1.6.4.
2. Keep current English URLs unchanged.
3. Add the `/zh-CN/` route tree.
4. Add localized Chinese navigation, sidebars, footer, edit-link text, search
   UI strings, titles, descriptions, and relevant metadata.
5. Add a language switcher for English and `简体中文`.
6. Prefer switching to the equivalent page in the other language. If native
   VitePress switching cannot preserve the current page, implement the smallest
   maintainable mapping without adding a client-side routing dependency.
7. Add minimal temporary Chinese pages required to validate the route tree.
8. Confirm that links in the Chinese navigation stay under `/zh-CN/`.

Required check:

```sh
pnpm docs:build
```

Acceptance criteria:

- existing English routes still build;
- `/zh-CN/` and every planned Chinese route build;
- both locales expose the correct navigation and document language;
- no runtime-library files are changed.

### Phase 2 - Current Vue 3 documentation

Goal: translate the complete current documentation track.

Source-to-target map:

| English source | Chinese target |
| --- | --- |
| `docs/index.md` | `docs/zh-CN/index.md` |
| `docs/guide/index.md` | `docs/zh-CN/guide/index.md` |
| `docs/guide/versioning.md` | `docs/zh-CN/guide/versioning.md` |
| `docs/api/index.md` | `docs/zh-CN/api/index.md` |
| `docs/examples/index.md` | `docs/zh-CN/examples/index.md` |
| `docs/playground/index.md` | `docs/zh-CN/playground/index.md` |
| `docs/vue3/index.md` | `docs/zh-CN/vue3/index.md` |

Tasks:

1. Translate all prose, headings, tables, callouts, captions, and page metadata.
2. Preserve API names, examples, version numbers, and behavior descriptions.
3. Point internal documentation links to the Chinese equivalents.
4. Keep external links unchanged unless an official Chinese source is clearly
   more appropriate.
5. Verify that the API table has the same rows and defaults as the English page.

Required check:

```sh
pnpm docs:build
```

Acceptance criteria:

- all seven Vue 3 Chinese pages are complete;
- no placeholder text remains;
- code examples remain valid;
- the Vue 3/package v2 status is unambiguous;
- Chinese navigation does not accidentally return to English pages.

### Phase 3 - Vue 2 documentation archive

Goal: translate the complete `/v1/` documentation archive without touching the
Vue 2 implementation branch.

Source-to-target map:

| English source | Chinese target |
| --- | --- |
| `docs/v1/index.md` | `docs/zh-CN/v1/index.md` |
| `docs/v1/guide/index.md` | `docs/zh-CN/v1/guide/index.md` |
| `docs/v1/guide/versioning.md` | `docs/zh-CN/v1/guide/versioning.md` |
| `docs/v1/api/index.md` | `docs/zh-CN/v1/api/index.md` |
| `docs/v1/examples/index.md` | `docs/zh-CN/v1/examples/index.md` |

Tasks:

1. Translate the archive pages while retaining Vue 2 syntax.
2. Label the track clearly as Vue 2/package v1 and archived/maintained.
3. Keep all archive navigation within `/zh-CN/v1/`.
4. Verify that migration and version links distinguish Vue 2 from Vue 3.

Required check:

```sh
pnpm docs:build
```

Acceptance criteria:

- all five archive pages are complete;
- Vue 2 examples have not been converted to Vue 3 syntax;
- users cannot mistake package v1 installation instructions for package v2;
- all archive routes and links build successfully.

### Phase 4 - Chinese README

Goal: provide an npm/GitHub-friendly Chinese introduction.

Tasks:

1. Create `README.zh-CN.md` as a complete Chinese counterpart to `README.md`.
2. Add an `English | 简体中文` selector near the top of both README files.
3. Include features, installation, quick start, registration patterns, common
   patterns, API overview, compatibility, browser support, development commands,
   license, and links to Chinese docs/API/playground.
4. Keep the English changelog canonical rather than creating a translated copy.
5. Ensure README links work when rendered on GitHub and npm.

Required check:

```sh
pnpm pack:check
```

Acceptance criteria:

- both README files link to each other;
- the Chinese README covers every substantive section of the English README;
- its examples remain executable;
- package links use published URLs rather than VitePress-only relative paths.

### Phase 5 - Demo and playground localization

Goal: make embedded interactive content match the selected documentation locale.

Tasks:

1. Localize visible strings and accessibility text in the Vue 3 demo, Vue 3
   playground, and Vue 2 archive demo.
2. Prefer a small English/Chinese string map and locale selection through a
   query parameter such as `?lang=zh-CN`.
3. Keep English as the default when no locale parameter is present.
4. Make Chinese documentation iframe URLs request the Chinese locale.
5. Localize document titles, headings, labels, buttons, slide captions,
   instructions, `aria-label` values, and iframe `title` values.
6. Share logic where it is already practical, but do not introduce a risky
   cross-application refactor merely to share a small string object.
7. Do not duplicate carousel behavior or CSS and do not add a large i18n package.

Required checks:

```sh
pnpm lint
pnpm test
pnpm docs:build
```

Acceptance criteria:

- existing English embeds remain English;
- Chinese embeds show Chinese UI and accessibility text;
- carousel functionality is identical in both languages;
- both desktop and mobile layouts remain usable;
- no source-library behavior changes are present.

### Phase 6 - Final quality assurance

Goal: prove that the localized experience is complete and does not regress the
package or English documentation.

Required checks:

```sh
pnpm lint
pnpm test
pnpm build
pnpm docs:build
pnpm pack:check
pnpm smoke:exports
```

Manual route and behavior checks:

- `/` and `/zh-CN/`;
- English and Chinese guide, API, examples, playground, and migration pages;
- `/v1/` and `/zh-CN/v1/`, including their nested pages;
- language switching in both directions from representative nested pages;
- local search behavior for both locales;
- internal links, iframe URLs, document titles, and metadata;
- English and Chinese demo/playground UI;
- keyboard navigation and translated accessibility names;
- desktop and narrow mobile viewport layouts.

Final diff checks:

- no translated API identifiers;
- no missing Chinese counterpart pages;
- no placeholders;
- no unrelated worktree changes;
- no manual edits to generated or dependency directories;
- no runtime source or public declaration changes.

Final deliverable:

1. implementation summary;
2. complete changed-file list;
3. command results;
4. manually verified route list;
5. known limitations;
6. maintenance recommendation for keeping EN and ZH pages synchronized.

## 6. Maintenance policy after launch

Every future documentation change should update the matching English and Chinese
pages in the same pull request when practical. At minimum, review should compare:

- heading structure;
- API table rows and defaults;
- code examples;
- internal links;
- version and compatibility statements;
- demo/playground strings.

Changes to `types/index.d.ts` or the public runtime API require review of both
`docs/api/index.md` and `docs/zh-CN/api/index.md`.

## 7. Copy-ready DeepSeek Flash prompt

```text
You are implementing Simplified Chinese documentation in the Vue Carousel 3D
repository. The approved implementation plan is:

docs/ZH_CN_LOCALIZATION_PLAN.md

Read that plan completely before taking action. Also read `AGENTS.md`, check
`git status`, and inspect `package.json` and `docs/.vitepress/config.mjs`.

Execute every phase in the plan autonomously in this run, beginning with Phase 0
and continuing through Phase 6. Do not wait for approval between phases. Keep
the phases separate and complete each phase's quality gate before continuing.

At the end of every phase, record an internal checkpoint and continue:

1. summarize what you found or changed;
2. list every changed file;
3. run the checks required by that phase;
4. inspect `git diff` and confirm no unrelated user changes were modified;
5. fix failures that are safely resolvable within this plan and rerun checks;
6. continue immediately to the next phase once the gate passes.

Do not stop merely to ask for confirmation or present intermediate results. Stop
early only if you encounter a genuine blocker that cannot be resolved safely
without user input, credentials, destructive actions, or expanding the approved
scope. If a non-critical optional improvement is uncertain, skip it, record it
in the final report, and continue with the required work.

Core rules:

- English remains canonical and keeps its current URLs.
- Chinese uses Simplified Chinese (`zh-CN`) under `/zh-CN/`.
- Preserve all component, prop, event, slot, method, import, package, command,
  and code identifiers exactly.
- Preserve executable behavior and technical meaning of every example.
- Do not invent features or change documentation claims.
- Do not change runtime library behavior or `types/index.d.ts`.
- Do not modify the Vue 2 maintenance implementation branch.
- Do not manually edit generated output, `dist`, `.vitepress/dist`, or
  `node_modules`.
- Do not add a large i18n dependency.
- Preserve all pre-existing and unrelated worktree changes.
- Do not commit, push, or open a pull request unless I explicitly request it.
- If a test or build fails, diagnose and report it. Never remove or weaken tests
  merely to obtain a passing result.

Start now and complete Phases 0 through 6 autonomously. Phase 0 itself remains
read-only: produce the content inventory, EN-to-ZH file map, demo string
inventory, link/iframe inventory, finalized terminology glossary,
generated-file assessment, and starting worktree status. Then continue directly
to Phase 1 and implement the rest of the plan.

After Phase 6, provide one final report containing:

1. a phase-by-phase summary;
2. every changed and created file;
3. the result of every verification command;
4. manually verified routes and behaviors;
5. unresolved limitations or follow-up recommendations;
6. confirmation that no commit, push, or pull request was created.
```

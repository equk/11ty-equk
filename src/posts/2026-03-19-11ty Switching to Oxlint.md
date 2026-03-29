---
title: "11ty Switching to Oxlint"
date: 2026-03-19T18:54:37.460Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Migrating linter from ESLint to Oxlint"
---

<p class="text-center"><img src="/media/images/2026/oxc.svg" alt="oxc logo" width="400px" class="inline"></p>
<br/>

> Oxc is part of VoidZero's vision for a unified, high-performance toolchain for JavaScript.
>
> Oxlint is the fastest linter for JavaScript and TypeScript. It targets compatibility with the ESLint ecosystem.
>
> Our benchmarks show Oxlint is 50 to 100 times faster than ESLint.

[Oxlint - The JavaScript Oxidation Compiler](https://oxc.rs/docs/guide/usage/linter.html)

## Migrating from ESLint

Migrating was easy as Oxlint has a migration tool `@oxlint/migrate`.

There were a few unsupported rules.

```
11ty-equk (dev)$ npx @oxlint/migrate eslint.config.js --with-nursery

✨ .oxlintrc.json created with 62 rules.

   Skipped 17 rules:
     -  15 Not Implemented (Not yet in oxlint: no-useless-assignment, n/no-deprecated-api, n/no-extraneous-import, and more)
     -   2 Unsupported     (Won't be implemented: no-dupe-args, no-octal)

     Tip: Use --details to see the full list.

🚀 Next:
     npx oxlint .
```

The migration tool picked up `ignorePatterns`, `rules` & `jsPlugins` automatically.

```json
"ignorePatterns": [
  "_site/**/*",
  "dist/**/*",
  "public/**/*",
  "src/_assets/**/*"
],
```

## Keeping Prettier

My ESLint setup used the prettier plugin (`eslint-plugin-prettier`) to apply styles on lint.<br/>
This ensures everything is formatted automatically.

It is possible to keep this plugin with Oxlint.

```json
"jsPlugins": ["eslint-plugin-prettier"],
```

In the future it should be possible to move from prettier to oxfmt.

## Pull Request

The pull request for these changes is available on github.

<i class="fa-solid fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/26" target="_blank" rel="noopener noreferrer">Change linter to Oxlint pull request on github</a>

### Changes

- [x] add new devDependency oxlint
- [x] migrate eslintrc config to oxlintrc using oxlint/migrate
- [x] replace lint scripts in package.json to use oxlint
- [x] remove eslint packages as now using oxlint (with prettier) for linting


---
title: "11ty ECMAScript Modules Support"
date: 2023-12-29T12:30:17.695Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
excerpt: "Switching to 11ty canary v3 for ECMAScript support"
---

![11ty logo](../_media/images/11ty-200.png)

Eleventy v3.0 has a lot of changes including ESM support.<br/>
This is a feature many have been looking forward to.

<i class="fa fa-link"></i> <a href="https://www.11ty.dev/blog/canary-eleventy-v3/" target="_blank" rel="noopener noreferrer">Calling all courageous canary testers for Eleventy v3.0</a>

They already converted the main 11ty site to v3.0 & report there were no problems.

## Conversion

The main changes required:

- change `require` to `import` in javascript files
- change `module.exports` to `export`

There are a few other changes required but that's the two main changes.

### Main Changes

- [x] update eleventy to 3.0.0
- [x] set type module in package.json
- [x] update all JS to ESM format
- [x] set eslint to use CJS
- [x] set prettier to use CJS
- [x] update tailwind config to ESM
- [x] update postcss config to ESM
- [x] update dependencies which were on hold due to ESM requirement
- [x] set netlify to build using latest Node LTS
- [x] add redirect for mastodon account

More information on the changes made to the site can be found on Github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/6" target="_blank" rel="noopener noreferrer">Eleventy v3 with ECMAScript Modules pull request on github</a>

### Using Commonjs

It's possible to still use commonjs with the `cjs` file extension.

::: important
ESLint does not support ESM at the moment & requires commonjs
:::

::: note
use `.eslintrc.cjs` when running ESLint in JavaScript packages that specify `"type":"module"` in their `package.json`
:::

<i class="fa fa-link"></i> <a href="https://eslint.org/docs/latest/use/configure/configuration-files" target="_blank" rel="noopener noreferrer">Configuration Files - ESLint</a>

## Example Diff

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/commit/30784c1b5731833812b45f0221b38218d7f7c142" target="_blank" rel="noopener noreferrer">commit 30784c1 - eleventy.config.js</a>

```diff
-const esbuild = require('esbuild')
-const fs = require('fs')
-
-const markdownItAnchor = require('markdown-it-anchor')
-const markdownItTaskLists = require('markdown-it-task-lists')
-
-const pluginRss = require('@11ty/eleventy-plugin-rss')
-const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
-const pluginBundle = require('@11ty/eleventy-plugin-bundle')
-const pluginNavigation = require('@11ty/eleventy-navigation')
-const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
-const pluginSEO = require('eleventy-plugin-seo')
-
-const postcss = require('postcss')
-const tailwindcss = require('tailwindcss')
-const autoprefixer = require('autoprefixer')
-const postcssimport = require('postcss-import')
-const cssnano = require('cssnano')
-
-const sharp = require('sharp')
-
-const sanitizeHTML = require('sanitize-html')
-
-const pluginDrafts = require('./eleventy.config.drafts.js')
-const pluginImages = require('./eleventy.config.images.js')
-const containerPlugin = require('./eleventy.config.markdown.js')
-
-const metadata = require('./src/_data/metadata.js')
-
-module.exports = function (eleventyConfig) {
+import esbuild from 'esbuild'
+import fs from 'fs'
+import markdownItAnchor from 'markdown-it-anchor'
+import markdownItTaskLists from 'markdown-it-task-lists'
+import pluginRss from '@11ty/eleventy-plugin-rss'
+import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
+import pluginBundle from '@11ty/eleventy-plugin-bundle'
+import pluginNavigation from '@11ty/eleventy-navigation'
+import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
+import pluginSEO from 'eleventy-plugin-seo'
+import postcss from 'postcss'
+import tailwindcss from 'tailwindcss'
+import autoprefixer from 'autoprefixer'
+import postcssimport from 'postcss-import'
+import cssnano from 'cssnano'
+import sharp from 'sharp'
+import sanitizeHTML from 'sanitize-html'
+import pluginDrafts from './eleventy.config.drafts.js'
+import pluginImages from './eleventy.config.images.js'
+import containerPlugin from './eleventy.config.markdown.js'
+import metadata from './src/_data/metadata.js'
+
+export default function (eleventyConfig) {
```

## References

<i class="fa fa-link"></i> <a href="https://www.zachleat.com/web/eleventy-v3-alpha/" target="_blank" rel="noopener noreferrer">Eleventy v3 with ESM support now on the canary channel</a><br/>
<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/11ty/eleventy/pull/3074" target="_blank" rel="noopener noreferrer">Big v3.0.0 Project Slipstream Changes</a>

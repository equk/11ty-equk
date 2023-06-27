---
title: "Integrating Tailwindcss With Eleventy"
date: 2023-06-24T12:41:18.950Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
templateEngineOverride: md
---

![11ty logo](../_media/images/11ty-200.png)

At first I was using `npm-run-all` with scripts to run tailwindcss & 11ty as that seemed to be the standard for most eleventy sites using tailwindcss.

## Integrating Tailwindcss & Postcss

I found it is possible to integrate postcss with eleventy using a filter with nunjucks.

This fixes a lot of issues & means scripts in `package.json` are cleaner.

<i class="fa fa-link"></i> <a href="https://tnobody-github-io.vercel.app/blog/postcss-with-11ty/" target="_blank" rel="noopener noreferrer">Using PostCss and Tailwindcss in 11ty</a>

Slight modification of above & you can have `postcss` & `tailwindcss` integrated with eleventy.

### Eleventy Config

```js
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcssimport = require('postcss-import')
```

```js
  // PostCSS filter for tailwindcss
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss([tailwindcss(), autoprefixer(), postcssimport()])
      .process(cssCode, { from: undefined })
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      )
  })
```

```js
  // Watch for css changes.
  eleventyConfig.addWatchTarget('src/_styles/*.css')
```

### Referencing CSS

In head of `base.njk`

```liquid
{# Use PostCSS filter to provide inlined css #}
{% set css %}
{% include "src/_styles/_global.css" %}
{% endset %}
<style>{{css | postcss | safe}}</style>
```

## Old Way (No Integration)

```json
  "scripts": {
    "build": "npm-run-all -s build:*",
    "build:css": "tailwindcss -i src/_styles/_global.css -o dist/css/styles.css --minify --postcss",
    "build:html": "npx @11ty/eleventy",
    "dev": "npm-run-all -p dev:* -r",
    "dev:css": "tailwindcss -i src/_styles/_global.css -o dist/css/styles.css --watch",
    "dev:html": "npx @11ty/eleventy --serve --quiet",
  },
```

This caused some issues in dev mode as I was using a inline css bundle which referenced the output of tailwindcss.

It also seemed a lot slower.
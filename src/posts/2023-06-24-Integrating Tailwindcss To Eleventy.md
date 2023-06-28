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

At first I was using `npm-run-all` with scripts to run tailwindcss & 11ty as that seemed to be the standard for most eleventy sites using tailwindcss.<br/>
This caused some issues in dev mode as I was using a inline css bundle which referenced the output of tailwindcss.

## Integrating Tailwindcss & Postcss

I found it is possible to integrate postcss with eleventy using a filter with nunjucks.

This fixes a lot of issues & means scripts in `package.json` are cleaner.

<i class="fa fa-link"></i> <a href="https://zenzes.me/eleventy-postcss-und-tailwind-css-integrieren/" target="_blank" rel="noopener noreferrer">Eleventy: PostCSS und Tailwind CSS integrieren</a>

Slight modification of above & you can have `postcss` & `tailwindcss` integrated with eleventy.

### Eleventy Config

```js
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
```

```js
  // PostCSS filter for tailwindcss
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss([tailwindcss(), autoprefixer()])
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

### Adding Plugins

It's possible to extend this with more postcss plugins.

I added cssnano with the default preset but this seems to slow things down a lot so I removed it.

#### build without cssnano

```
[11ty] Benchmark    858ms  35%    22× (Configuration) "postcss" Nunjucks Async Filter
[11ty] Copied 13 files / Wrote 25 files in 2.19 seconds (87.6ms each, v2.0.1)
```

#### build with cssnano

```
[11ty] Benchmark   1231ms  17%    22× (Configuration) "postcss" Nunjucks Async Filter
[11ty] Copied 13 files / Wrote 25 files in 6.75 seconds (270.0ms each, v2.0.1)
```
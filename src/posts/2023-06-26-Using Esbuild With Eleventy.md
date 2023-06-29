---
title: "Using Esbuild With Eleventy"
date: 2023-06-26T12:00:44.195Z
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

Esbuild only needs to run once on each build as it's just bundling our page javascript.<br/>
(at time of writing this is just a `darkmode` theme switcher).

## Why Use esbuild

<blockquote><p>Our current build tools for the web are 10-100x slower than they could be.<br/>The main goal of the esbuild bundler project is to bring about a new era of build tool performance, and create an easy-to-use modern bundler along the way.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild - An extremely fast bundler for the web</a></cite></blockquote>

## Run esbuild Before Build

Run esbuild before eleventy by using `eleventy.before`.

```js
  // Run esbuild before anything else (using bundle for js)
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: ['src/_scripts/darkmode.js'],
      outdir: 'src/_assets/js',
      minify: true,
      sourcemap: false,
    })
  })
```

<i class="fa fa-link"></i> <a href="https://www.11ty.dev/docs/events/#eleventy.before" target="_blank" rel="noopener noreferrer">Eleventy Documentation - Configuration - Events - eleventy.before</a>

## Reference Javascript

I am using a `eleventy-plugin-bundle` for inline script tags but there are lots of other options.

```njk
{% js %}{% include "src/_assets/js/darkmode.js" %}{% endjs %}
<script type="module">{% getBundle "js" %}</script>
```

If you are not using `eleventy-plugin-bundle` you could use.

```njk
{% set js %}
{% include "src/_assets/js/darkmode.js" %}
{% endset %}
<script type="module">{{ js | safe }}</script>
```

## Ignore Output

Eslint will complain about minified js so we will need to add the output to `ignorePatterns` in `.eslintrc.js`.

```js
  ignorePatterns: [
    ...
    'src/_assets/**/*',
  ],

```

We also don't want to upload the output to github so we need to add the path to `.gitignore`.

```sh
# esbuild output
src/_assets/js/
```
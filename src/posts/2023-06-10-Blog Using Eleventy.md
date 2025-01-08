---
title: "Blog Using Eleventy"
date: 2023-06-10T10:11:23.214Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "110708471291394897"
excerpt: "Building a blog using eleventy with esbuild, tailwindcss, postcss, eslint"
templateEngineOverride: md
---

![11ty logo](../_media/images/11ty-200.png)

Eleventy seems really popular among web technology blogs so I wanted to give it a proper chance by attempting to move my blog to it.

I have been thinking of redesigning my blog for a while & maybe even moving away from Gatsby.

## Using Recommended Starter

I wanted to use a good starting point for the blog so am using the official starter `eleventy-base-blog`.<br/>
This starter has a lot of features but also will hopefully allow me to learn & extend 11ty.

<p><i class="fa fa-link"></i> <a href="https://github.com/11ty/eleventy-base-blog" target="_blank" rel="noopener noreferrer">11ty/eleventy-base-blog on github</a></p>

### First Steps

I did a few things to setup the initial workflow.

- [x] Setup eslint with prettier
  - [x] eslint
  - [x] eslint-config-prettier
  - [x] eslint-config-standard
  - [x] eslint-plugin-prettier
  - [x] use spaces instead of tabs (even on md,njk)

#### Prettier Options

```js
  arrowParens: 'always',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: false,
  trailingComma: 'es5',
  tabWidth: 2,
  bracketSpacing: true,
  endOfLine: 'lf',
```

<p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/blob/1727be315274790934d197d520f8f67fc1bf2869/.prettierrc.js" target="_blank" rel="noopener noreferrer">11ty-equk/.prettierrc.js on github (Jun 10, 2023)</a></p>

### First Problem

The first problem I came across related to using `pnpm`.<br />
`eleventy-base-blog` references `css` from a path in `node_modules`.

```njk
{%- css %}{% include "node_modules/prismjs/themes/prism-okaidia.css" %}{% endcss %}
```

This was easily fixed by copying the css to the project & fixing the references to it.

## Modifying Slug

Before adding any css styles or messing with the templates or layout etc I thought I'd try generating post slugs using `date` & `title` from frontmatter in posts.

This was a lot easier than I thought it would be.

📝[Generating Slug Using Date & Title In 11ty](/2023/06/20/generating-slug-using-date-and-title-in-11ty/)

## Restructuring Folders

I decided to structure the project a bit different to the default setup.<br/>
Having a `src` folder makes things a lot easier to work with.

```
└── public
└── src
    ├── _assets
    ├── atom
    ├── _data
    ├── _includes
    ├── _media
    ├── pages
    ├── posts
    ├── _scripts
    ├── sitemap
    └── _styles
```

Some added features also meant adding folders.<br/>
`src/_media/images` is used for image storage for image optimization.<br/>
`src/_assets/js` is `esbuild` optimized javascript output.<br/>
`src/_assets/css` is `postcss` optimized css output.

## Adding Tailwindcss

Most references suggest using `npm-run-all` to run `11ty` & `tailwindcss`.<br/>
This comes with a few problems, especially if you are using inlined css.

Building is ok as you can run it sequentially but in dev mode things really don't work well as 11ty is trying to reference generated css at the same time as tailwind generating it.

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> There is also another problem where livereload doesn't do a full page reload on css changes<br/>
    <i class="fa fa-link"></i> <a href="/2023/06/21/11ty-fixing-livereload-client-for-inline-styles/">11ty Fixing Livereload Client For Inline Styles</a>
  </div>
</article>

```json
    "build": "npm-run-all -s build:*",
    "build:css": "tailwindcss -i src/_styles/_global.css -o dist/css/styles.css --minify --postcss",
    "build:html": "npx @11ty/eleventy",
    "dev": "npm-run-all -p dev:* -r",
    "dev:css": "tailwindcss -i src/_styles/_global.css -o dist/css/styles.css --watch",
    "dev:html": "npx @11ty/eleventy --serve --quiet",
```

<p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/blob/f76d4e404fcc9ff0a08773bc93f4e06fda4fe7b3/package.json" target="_blank" rel="noopener noreferrer">11ty-equk/package.json on github (Jun 21, 2023)</a></p>

Integrating `postcss` & `tailwindcss` on this project has gone over a few iterations but I finally got it working quickly with livereload & everything working.

📝[Integrating Tailwindcss With Eleventy](/2023/06/24/integrating-tailwindcss-with-eleventy/)<br/>
📝[Postcss 11ty Integration Update](/2023/06/29/postcss-11ty-integration-update/)

### Optimized Postcss Integration

📝[11ty Postcss Integration Optimized](/2023/06/29/11ty-postcss-integration-optimized/)

This is the final iteration I made which is more than 3x faster with only a few posts.

```log
[11ty] Copied 11 files / Wrote 27 files in 0.79 seconds (29.3ms each, v2.0.1)
```

```log
[11ty] Benchmark    896ms  33%    25× (Configuration) "postcss-trans" Transform
[11ty] Copied 11 files / Wrote 25 files in 2.39 seconds (95.6ms each, v2.0.1)
```

```log
[11ty] Benchmark    977ms  34%    23× (Configuration) "postcss" Nunjucks Async Filter
[11ty] Copied 11 files / Wrote 26 files in 2.61 seconds (100.4ms each, v2.0.1)
```

## Image Optimization

### Image Shortcode

`eleventy-base-blog` comes with image optimization through use of `image` shortcode.

```njk
{ % image "cat.jpg", "photo of my tabby cat" %}
```

📝<a href="/2023/06/23/image-optimization-in-eleventy/">Image Optimization In Eleventy</a>

### Markdown Image Optimization

I wanted automatic markdown optimization to make things easier when writing blog posts & also to make it easier to transfer existing content over with minimal changes.

To do this I needed to change the configuration of `markdown-it`. (`markdown.renderer.rules.image`)

I used `eleventyConfig.amendLibrary` (example of this was already in `eleventy.config.js`).<br/>
I based the variables & code on the shortcode implementation already in `eleventy.config.images.js`.

📝<a href="/2023/06/24/markdown-image-optimization-in-eleventy/">Markdown Image Optimization In Eleventy</a>

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> Consider where images are stored & generated when using automatic optimization<br/>
  </div>
</article>

## Adding esbuild

Esbuild only needs to run once on each build as it's just bundling our page javascript.

Run esbuild before eleventy by using `eleventy.before`.

Javascript input `src/_scripts/js` output `src/_addets/js`.

📝<a href="/2023/06/26/using-esbuild-with-eleventy/">Using Esbuild With Eleventy</a>

## Clientside Javascript Elements

Trying to keep clientside javascript to a minimum.

### Darkmode

- [x] Supports `prefers-color-scheme`
- [x] Uses `localStorage`
- [x] Adds class `dark` for darkmode
- [x] Tailwindcss `darkMode` set to `class`

### Mobile Navigation

- [x] Toggle using `hidden` class
- [x] Button displayed on low resolution

## Adding Pagination

<p><i class="fa fa-link"></i> <a href="https://www.11ty.dev/docs/pagination/" target="_blank" rel="noopener noreferrer">Pagination - Eleventy Docs</a></p>

## Syndication Feed Generation

I setup my syndication feed to display an excerpt for each post as most tech blogs I subscribe to do this.

With `eleventy-base-blog` atom feed generation is done using a njk template with permalink set to `feed.xml` so I decided to create an excerpt njk `filter`.

📝<a href="/2023/06/26/generating-summary-for-atom-feed-in-11ty/">Generating Summary For Atom Feed In 11ty</a>

## Newpost Creation

I moved my newpost script from Gatsby as an easy way to create posts.

📝[Gatsby New Post CLI Script - Jul 6, 2019](/2019/07/06/gatsby-new-post-cli-script/)

The script uses `readline` and `fs` which are both core nodejs functions.

```js
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
```

## Clean Builds

Ensuring clean builds seemed quite important so I ended up creating a prebuild script to remove output dir before running 11ty build.

The script checks if the output directory exists before cleaning & returns a message if it does not exist.

```js
async function preEleventy() {
  // Start time for cli stats
  const start = +new Date()
  console.log('[pre-11ty] Starting Clean Build')
  // Clean output if exists
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
    console.log(`[pre-11ty] Cleaning Old Build From ${outputDir}`)
    const end = +new Date()
    console.log(
      `[pre-11ty] Build Output: '${outputDir}' Removed (+${end - start}ms)`
    )
  } else {
    console.log(`[pre-11ty] Build Output: '${outputDir}' is clean`)
  }
  console.log('\n')
}
```

```
[pre-11ty] Starting Clean Build
[pre-11ty] Cleaning Old Build From dist
[pre-11ty] Build Output: 'dist' Removed (+10ms)
```

---

## Related Posts

### 11ty Postcss Integration

📝<a href="/2023/06/29/11ty-postcss-integration-optimized/">11ty Postcss Integration Optimized</a><br/>
📝<a href="/2023/06/29/postcss-11ty-integration-update/">Postcss 11ty Integration Update</a><br/>
📝<a href="/2023/06/24/integrating-tailwindcss-with-eleventy/">Integrating Tailwindcss With Eleventy</a><br/>

### 11ty Image Optimization

📝<a href="/2023/06/24/markdown-image-optimization-in-eleventy/">Markdown Image Optimization In Eleventy</a><br/>
📝<a href="/2023/06/23/image-optimization-in-eleventy/">Image Optimization In Eleventy</a><br/>

### 11ty Misc Tweaks

📝<a href="/2023/06/26/removing-luxon-from-eleventy/">Removing Luxon From Eleventy</a><br/>
📝<a href="/2023/06/26/generating-summary-for-atom-feed-in-11ty/">Generating Summary For Atom Feed In 11ty</a><br/>
📝<a href="/2023/06/26/using-esbuild-with-eleventy/">Using Esbuild With Eleventy</a><br/>
📝<a href="/2023/06/21/11ty-fixing-livereload-client-for-inline-styles/">11ty Fixing Livereload Client For Inline Styles</a><br/>
📝<a href="/2023/06/20/generating-slug-using-date-and-title-in-11ty/">Generating Slug Using Date &amp; Title In 11ty</a><br/>

### 11ty Additional Features

📝<a href="/2023/07/14/favicon-generation-in-eleventy/">Favicon Generation In Eleventy</a><br/>
📝<a href="/2023/07/18/adding-webmentions-in-eleventy/">Adding Webmentions in Eleventy</a><br/>


## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

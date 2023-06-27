---
title: "Markdown Image Optimization In Eleventy"
date: 2023-06-24T11:00:09.080Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image: ../_media/images/hero/nasa-space-sil.jpg
imgAuthor: "NASA"
imgAuthorURL: "https://unsplash.com/@nasa"
---

Automatic image optimization in markdown using `@11ty/eleventy-img`

This article continues on from previous post: Image Optimization In Eleventy

## Adding Markdown Support

I initially used `eleventy-base-blog` for this site so image optimization was already implemented.<br/>
I used the existing code as a base to adding markdown support.

Everything can be seen in `eleventy.config.images.js`.

The main difference is using `amendLibrary` to change the `markdown-it` configuration & override `markdown.renderer.rules.image`.

```js
  eleventyConfig.amendLibrary('md', (markdown) => {
    markdown.renderer.rules.image = function (tokens, idx) {
      const token = tokens[idx]
      const src = relativeToInputPath(postsPath, token.attrGet('src'))
      const alt = token.content
      const formats = ['webp', 'auto']
      const metadata = eleventyImage.statsSync(src, {
        widths: [400, 800, 1200],
        formats,
        outputDir: path.join(eleventyConfig.dir.output, 'img'),
      })
      return eleventyImage.generateHTML(metadata, {
        alt,
        loading: 'lazy',
        decoding: 'async',
        sizes: '(max-width: 1200px) 100vw, 1200px',
      })
    }
  })
```

One useful function already in `eleventy-base-blog` is `relativeToInputPath`.

## Example Image

Here is an example image using standard markdown (no shortcode).

![nasa space](../_media/images/hero/nasa-space-sil.jpg)

## Folder Naming

Storing images is down to personal preference.

I decided to keep the images in `src/` instead of `public/` so only optimized images get uploaded on build.

```toml
images in: src/_media/images
images out: eleventyConfig.dir.output/img
```
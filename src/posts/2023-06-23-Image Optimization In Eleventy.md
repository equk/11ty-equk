---
title: "Image Optimization In Eleventy"
date: 2023-06-23T10:45:58.133Z
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

Image optimization using `@11ty/eleventy-img`

<blockquote><p>Low level utility to perform build-time image transformations for both vector and raster images.<br/>
Output multiple sizes, save multiple formats, cache remote images locally. Uses the sharp image processor.</p>
<br/>
<cite><i class="fa-solid fa-link"></i> <a href="https://www.11ty.dev/docs/plugins/image/" target="_blank" rel="noopener noreferrer">Image - Eleventy Documentation</a></cite></blockquote>

## Features

- [x] Resize images
- [x] Output optimized formats
- [x] Responsive image sizes
- [x] Browser based lazy loading

## Using Shortcode

The easiest way to use eleventy-img is to create a shortcode to use within content.

I used the `image` shortcode to implement the banner image below the blog article `title`.

### Shortcode Example

`eleventy.config.js`

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600],
      formats: ["avif", "jpeg"]
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });
};
```

```njk
    { % image "cat.jpg", "photo of my tabby cat" %}
```

## Browser Based Lazy Loading

The generated `picture` element contains `loading="lazy" decoding="async"` to `img` utilizing browser based lazy loading.

<blockquote><p>The <code>loading</code> attribute on an <code>img</code> element (or the loading attribute on an <code>iframe</code>) can be used to instruct the browser to defer loading of images/iframes that are off-screen until the user scrolls near them.</p>
<br/>
<cite><i class="fa-solid fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#images_and_iframes" target="_blank" rel="noopener noreferrer">Lazy loading - Web performance | MDN</a></cite></blockquote>


## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> 11ty-equk</a>

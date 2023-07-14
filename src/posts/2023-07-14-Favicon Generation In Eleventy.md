---
title: "Favicon Generation In Eleventy"
date: 2023-07-14T17:56:16.586Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
---

![11ty logo](../_media/images/11ty-200.png)

I have added favicon generation to the site using `svg` as input.

This is implemented using `sharp` to generate `96x96` png favicon when running eleventy.

```js
  // Generate favicon from svg input
  eleventyConfig.on('eleventy.before', async () => {
    await sharp('src/_media/favicon.svg')
      .png()
      .resize(96, 96)
      .toFile('public/img/icon-96x96.png')
      .catch(function (err) {
        console.log('[11ty] ERROR Generating favicon')
        console.log(err)
      })
  })
  eleventyConfig.watchIgnores.add('public/img/icon-96x96.png')
```

Reference in head of `base.njk`.

```html
<link rel="icon" type="image/png" sizes="96x96" href="/img/icon-96x96.png">
```

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

---
title: "Image Optimization In Astro"
date: 2023-03-04T12:11:06.910Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - astro
  - github
image: ../../public/media/images/hero/nasa-space-sil.jpg
---

Adding image optimization to Astro using `@astrojs/image`

It seems that Astro doesn't support image optimization (output formats, resizing etc) in markdown content.<br />
It does however support using image components within pages & mdx content.

<blockquote>
<strong><em>Why <code>@astrojs/image</code>?</em></strong><br />
<p>Images play a big role in overall site performance and usability. Serving properly sized images makes all the difference but is often tricky to automate.</p>
<p>This integration provides <code>&lt;Image /&gt;</code> and <code>&lt;Picture&gt;</code> components as well as a basic image transformer, with full support for static sites and server-side rendering. The built-in image transformer is also replaceable, opening the door for future integrations that work with your favorite hosted image service.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://docs.astro.build/en/guides/integrations-guide/image/" target="_blank" rel="noopener noreferrer">@astrojs/image 🚀 Astro Documentation</a></cite>
</blockquote>

## Features

- [x] Resize images
- [x] Set aspect ratio
- [x] Support for cropping images
- [x] Output optimized formats
- [x] Responsive image sizes
- [x] Browser based lazy loading

## Installing astrojs/image

Looking at the documentation it's recommended you use `sharp` with `@astrojs/image`.

```
pnpm add -D @astrojs/image sharp
```

Add the plugin to `astro.config.mjs` with options to use `sharp`

```ts
import image from '@astrojs/image'
```

```ts
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
```

## Optimizing Hero Images

The main image in blog posts on this site is the hero image.

The `heroImage` component can be found in each layout (posts & pages).

```ts
        {
          heroImage && (
            <div class="hero-image">
              <img src={heroImage} alt="" />
            </div>
          )
        }
```

I decided to use the `<Picture />` component from `@astrojs/image` as this allows an array of sizes to use for responsive images.

```ts
import { Picture } from '@astrojs/image/components'
```

```ts
        {
          heroImage && (
            <div class="hero-image">
              <Picture
                src={heroImage}
                widths={[400, 800, 1200]}
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt=""
                aspectRatio={1200 / 500}
              />
            </div>
          )
        }
```

This configuration creates 3 image sizes (`400px`, `800px`, `1200px`) with 2 formats (`avif`, `webp`).<br/>
It also has aspect ratio set so images are resized & cropped.

## Browser Based Lazy Loading

The component also adds `loading="lazy" decoding="async"` to `img` utilizing browser based lazy loading.

<blockquote><p>The <code>loading</code> attribute on an <code><</code><code>img</code><code>></code> element (or the loading attribute on an <code><</code><code>iframe</code><code>></code>) can be used to instruct the browser to defer loading of images/iframes that are off-screen until the user scrolls near them.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#images_and_iframes" target="_blank" rel="noopener noreferrer">Lazy loading - Web performance | MDN</a></cite></blockquote>

## Source

The source for this site is available on github.

<a class="github" href="https://github.com/equk/blog-astro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> blog-astro</a>
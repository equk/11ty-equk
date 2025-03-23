---
title: "11ty Font Awesome SVG Plugin"
date: 2025-03-23T19:23:24.901Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "114213530741737509"
blueskyPostId: "3ll2zty2suc2m"
excerpt: "Using 11ty plugin for font awesome svg icons with no clientside javascript"
---

<p class="text-center">
<img src="/media/images/11ty-200.png" alt="11ty logo" loading="lazy" decoding="async" width="200" height="200" class="inline"> <svg class="feed-ico inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="200" height="200" style="background-color:rgb(83, 141, 215) !important; border-radius: 0 !important; margin-left: 5px;"><path fill="currentColor" d="M91.7 96C106.3 86.8 116 70.5 116 52C116 23.3 92.7 0 64 0S12 23.3 12 52c0 16.7 7.8 31.5 20 41l0 3 0 352 0 64 64 0 0-64 373.6 0c14.6 0 26.4-11.8 26.4-26.4c0-3.7-.8-7.3-2.3-10.7L432 272l61.7-138.9c1.5-3.4 2.3-7 2.3-10.7c0-14.6-11.8-26.4-26.4-26.4L91.7 96z"/></svg>
</p>

I have been looking at changing font icons on the site to svg & it seems most implementations use clientside javascript so I just kept the old font based setup.

Then I watched a talk a few days ago at <a href="https://11tymeetup.dev" target="_blank" rel="noopener noreferrer">11ty Meetup</a> relating to moving the font awesome blog from wordpress to eleventy which included information about a plugin by Zach Leatherman which removes the need for clientside javascript as it does everything in eleventy.

[11ty Meetup: Blog Awesome from WordPress to Eleventy](https://www.zachleat.com/web/blog-awesome/)

## Installing eleventy-plugin-font-awesome

[Github.com - eleventy-plugin-font-awesome](https://github.com/11ty/eleventy-plugin-font-awesome)<br/>
[Font Awesome](https://fontawesome.com/)

> Optimized per-page tree-shaken SVG spritesheets for Eleventy with Font Awesome icons.

The plugin requires @11ty/eleventy `>=3.0.1-alpha.4`

- [x] switch @11ty/eleventy to canary branch
- [x] add new dependency for eleventy font awesome plugin @11ty/font-awesome
- [x] add eleventy font awesome plugin to main config
- [x] add font awesome bundle to layout

## Removing old fa fonts & css

- [x] remove css import of fa styles
- [x] remove `fa.woff2` reference in css

## Issues

The first thing I had a problem with was nothing seemed to show up.<br/>
There didn't seem to be any errors so I enabled `failOnError`.<br/>
This gave some feedback about not being able to find the icon class.

### Fixing fa- class

> [!Note]
> This may not apply to everyone as many will have a newer version of font-awesome

I had a old version of `fa` styles which didn't have anything seperated into icon sets.

```html
<i class="fa fa-github"></i>
<i class="fa fa-code"></i>
```

This had to be changed to reference `fa-solid` or `fa-brands` depending on the icon.

```diff
-<i class="fa fa-github"></i>
-<i class="fa fa-code"></i>
+<i class="fa-brands fa-github"></i>
+<i class="fa-solid fa-code"></i>
```

There were around a hundred posts with references to `fa` icons so I ended up using `sed` to do a find and replace on all `.md` files.

### Adding styles

At this point the svg icons were appearing with no styles & were also massive.

I looked into the options on `/eleventy-plugin-font-awesome/` & found there was a way to set attributes on the svg items (`defaultAttributes`).

I added class `icon-svg` which allowed me to add styles in my `css`.

```css
.icon-svg {
  display: inline;
  vertical-align: middle;
  height: 1em;
  width: 1em;
}
```

## Final Config

This is the final config.

```js
import pluginFontAwesome from '@11ty/font-awesome'
...

  // FontAwesome plugin
  eleventyConfig.addPlugin(pluginFontAwesome, {
    transform: 'i[class]',
    shortcode: false,
    failOnError: true,
    defaultAttributes: {
      class: 'icon-svg',
    },
  })
```

## Pull Request

There is a pull request on github showing all the code changes.

[Add Font Awesome SVG Using 11ty Plugin](https://github.com/equk/11ty-equk/pull/21)

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> 11ty-equk</a>

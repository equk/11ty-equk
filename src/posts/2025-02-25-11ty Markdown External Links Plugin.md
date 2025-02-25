---
title: "11ty Markdown External Links Plugin"
date: 2025-02-25T15:29:31.940Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - obsidian
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Setting target _blank and rel noopener noreferrer to external links using markdown-it + 11ty"
---

![11ty logo](../_media/images/11ty-200.png)

This plugin does a few things with exernal markdown links using `markdown-it`

- [x] iterate over all links in markdown
- [x] find all external links
- [x] add rel `noreferrer` `noopener` to external links
- [x] add `target` `_blank` to external links
- [x] add `class` to external links
- [x] css to add visual link to left of external links

## eleventy.config.extlinks.js

- [x] Find all external links

```js
import metadata from './src/_data/metadata.js'

...

    if (
      t &&
      href &&
      !href.includes(metadata.domain) &&
      !href.startsWith('/') &&
      !href.startsWith('#')
    ) {
```

- [x] Add `target`, `rel` & `class` to external links

```js
      tokens[idx].attrPush(['target', '_blank'])
      tokens[idx].attrPush(['rel', 'noopener noreferrer'])
      tokens[idx].attrPush(['class', 'ext-link'])
```

## CSS Styles

Add visual link before external links using class `ext-link`.

```css
/* External Links */

a.ext-link:before {
  display: inline-flex;
  content: '🔗';
  height: fit-content;
  width: fit-content;
  margin-right: 0.3em;
  font-size: 16px;
}
```

## Example External Link

[Github - eleventy.config.extlinks.js - equk/11ty-equk](https://github.com/equk/11ty-equk/blob/main/eleventy.config.extlinks.js)

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

---
title: "11ty Fix Inline Styles Livereload"
date: 2024-12-06T18:38:48.329Z
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

While working on the site recently I noticed livereload seemed to be quirky on changes.

::: note
I wrote a blogpost regarding a similar issue with livereload & 11ty v2.x

<p><i class="fa fa-link"></i> <a href="/2023/06/21/11ty-fixing-livereload-client-for-inline-styles/" target="_blank" rel="noopener noreferrer">11ty Fixing Livereload Client For Inline Styles</a></p>
:::

## Problem

When changing anything on the site livereload reloads the page & completely removes inline css styles.<br/>
This happens with changes to njk templates, css changes, pretty much anything.

The problem seems to be server related.

## Fixing The Problem

To fix the problem I had to create a workaround.

The basic idea is to have css referenced as a link in development mode while also keeping inline css styles on production builds.

### Copy ESBuild Output

My site uses ESBuild to output minified css to `src/_assets/styles.css` so I had to add that to `addPassthroughCopy` in the main config but only when not in production.

```js
  if (process.env.NODE_ENV !== 'production') {
    eleventyConfig.addPassthroughCopy({
      './src/_assets/css/styles.css': '/css/styles.css',
    })
  }
```

### Reference Output CSS

Now `/css/styles.css` is accessible I added a reference using some if statements to check if the server is running in devmode.

Create a variable named `isdev` in `src/_data` to check if eleventy is running in dev mode.

```js
module.exports = function () {
  return /serve|watch/.test(process.argv.join())
}
```

```njk
    {# Reference css as link in devmode to fix livereload #}
    {% if isdev %}
    <link rel="stylesheet" href="/css/styles.css">
    {% else %}
    ...
```

## Notes

This issue seems to be known in eleventy.<br/>
I found a few issues posted on the eleventy project github referencing the same problem so I am guessing they already know it exists.

You can find the full pull request for these changes on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/14" target="_blank" rel="noopener noreferrer">Eleventy CSS Livereload Workaround pull request on github</a>
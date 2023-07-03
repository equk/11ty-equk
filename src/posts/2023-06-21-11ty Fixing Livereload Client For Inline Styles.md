---
title: "11ty Fixing Livereload Client For Inline Styles"
date: 2023-06-21T09:43:40.571Z
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

While working on the site I noticed livereload seemed to be quirky on css changes.

When changing CSS the page would not reload despite the client working.

## Problem

When looking in the console output I found livereload was doing a partial reload on CSS modifications.

```
[11ty][09:48:44.049 UTC] Connected
[11ty][09:48:44.049 UTC] CSS updated without page reload.
```

On looking into the code I found the CSS updated without page reload message referenced `link rel=stylesheet` which would work if that was what was being used for CSS.

```js
  async onreload({ subtype, files, build }) {
    if (subtype === "css") {
      for (let link of document.querySelectorAll(`link[rel="stylesheet"]`)) {
        let url = new URL(link.href);
        url.searchParams.set("_11ty", Date.now());
        link.href = url.toString();
      }
      Util.log(`CSS updated without page reload.`);
    }
```

As I am using inline `style` this does nothing with regard to page reload.

## Fixing The Problem

A simple fix is to remove this code.

```diff
176,184c176,177
<   async onreload({ subtype, files, build }) {
<     if (subtype === "css") {
<       for (let link of document.querySelectorAll(`link[rel="stylesheet"]`)) {
<         let url = new URL(link.href);
<         url.searchParams.set("_11ty", Date.now());
<         link.href = url.toString();
<       }
<       Util.log(`CSS updated without page reload.`);
<     } else {
---
>   async onreload({ files, build }) {
>
241d233
<       }
```

### Using Patched reload-client

To use this I saved the patched `reload-client.js` to `public/` & disabled `liveReload` in `serverOptions`.

```js
  // Disable livereload injection (use patched instead)
  // This fixes inlined CSS (default changes style link elements)
  eleventyConfig.setServerOptions({
    liveReload: false,
  })
```

I then added reload-client to the footer of the page to test that it worked.<br />
It now did a full page reload on css changes.

### Using reload-client On Dev Mode

I only wanted to reference reload-client on development mode so ended up creating a variable in `src/_data` named `isdev` to check if eleventy is running in dev mode.

```js
module.exports = function () {
  return /serve|watch/.test(process.argv.join())
}
```

It should now be possible to access this using nunjucks.

```njk
{% if isdev %}
<script type="module" src="/reload-client.js"></script>
{% endif %}
```

Now the script is only inserted on `dev` mode & not on `build` mode.

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

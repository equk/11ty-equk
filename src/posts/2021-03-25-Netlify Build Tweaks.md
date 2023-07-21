---
slug:
title: "Netlify Build Tweaks"
date: 2021-03-25T10:10:30.545Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - netlify
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="145px" class="inline"> <img src="/media/logos/netlify.svg" alt="netlify cms logo" width="150px" class="inline"></p>


After upgrading to Gatsby v3 I noticed builds on netlify seemed to be taking a long time.

The main component taking time on builds seemed to be netlify cms.

## NetlifyCMS React Component

- [x] disabled plugin gatsby-plugin-netlify-cms to speed up build times
- [x] removed netlify-cms-app
- [x] removed gatsby-plugin-netlify
- [x] removed gatsby-plugin-netlify-cms
- [x] added admin/index.html to use pre-built netlify-cms from web
- [x] removed postb script from build in package.json

Changed netlify-cms to use external pre-built js to speed up build times.

The main difference between using the netlify cms react component & using pre-built js from netlify is the post preview when editing in netlify cms.

It is possible to set custom css styles for the preview pane on pre-built netlify-cms using `CMS.registerPreviewStyle`.

## Cleanup Dependencies

Removed some dependencies which are no longer required for the blog.

- [x] disabled postcss plugin lostgrid
- [x] disabled plugin gatsby-remark-copy-linked-files
- [x] disabled plugin gatsby-remark-smartypants
- [x] removed gatsby-remark-smartypants
- [x] removed gatsby-remark-copy-linked-files
- [x] removed lost

## Deploy Times

#### Before

```log
4:44:35 PM: success Building production JavaScript and CSS bundles - 144.258s
...
4:44:52 PM: info Done building in 187.134201731 sec
4:44:52 PM: Done in 188.06s.
...
4:44:59 PM: Site is live ✨
4:47:01 PM: Finished processing build request in 10m9.217468818s
```

#### After

```log
7:26:46 PM: success Building production JavaScript and CSS bundles - 60.790s
...
7:26:59 PM: info Done building in 92.066096274 sec
7:26:59 PM: Done in 92.34s.
...
7:27:26 PM: Site is live ✨
7:28:40 PM: Finished processing build request in 3m57.922657014s
```

## netlify.toml Tweaks

As I had [disabled gatsby-plugin-netlify](/2021/03/05/updated-to-gatsby-v-3#gatsby-plugin-netlify) due to a problem with webpack on upgrading gatsby I added some default header rules with basic security headers.

### Default Header Rules

```ini
X-Frame-Options = "DENY"
X-XSS-Protection = "1; mode=block"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "same-origin"
```

### Redirects

A cool feature with netlify is the ability to set redirects allowing me to redirect common RSS uri's (`/feed`, `/rss`) to `rss.xml`

* [x] RSS Feed
* [x] Github Profile
* [x] Twitter Profile

Redirects can also forward to external websites.<br />
I added redirects to my github & twitter profiles. (`/gh`, `/github`, `/twitter`)

```ini
[[redirects]]
  from = "/github"
  to = "https://github.com/equk"
  status = 301
  force = true
```

<br />

**Pull Requests**

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/4" target="_blank" rel="noopener noreferrer">Dependency Cleanup & Quicker Build Tweaks</a><br />
<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/3" target="_blank" rel="noopener noreferrer">Netlify Tweaks (Header Rules & Redirects)</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
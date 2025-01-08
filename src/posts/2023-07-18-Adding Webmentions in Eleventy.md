---
title: "Adding Webmentions in Eleventy"
date: 2023-07-18T19:20:48.823Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
  - indieweb
  - mastodon
image:
imgAuthor:
imgAuthorURL:
templateEngineOverride: md
mastodonPostId: "110736573586565935"
excerpt: "Adding webmentions support to 11ty using netlify hooks"
---

![11ty logo](../_media/images/11ty-200.png)

I decided webmentions would be much better for comments as it works across sites.<br />
It also allows people to comment using Mastodon & Activitypub.

<p class="text-center">
<img class="inline" src="/media/logos/netlify.svg" alt="netlify-logo" width="96px"> <img class="inline dark-logo" src="/media/logos/github.svg" alt="github-logo" width="96px"> <img class="inline" src="/media/logos/mastodon-purple.svg" alt="mastodon-logo" width="90px"> <img class="inline dark-logo" src="/media/logos/webmention.svg" alt="webmention-logo" width="96px">
</p>

> Webmention is an open web standard (W3C Recommendation) for conversations and interactions across the web, a powerful building block used for a growing distributed network of peer-to-peer comments, likes, reposts, and other responses across the web.

## Implementing Webmentions

There are a few options on implementing webmentions, some have opted to use clientside requests using javascript with webmention.io json api.

After reading a few articles I opted to have eleventy fetch the webmentions on build.

<i class="fa fa-link"></i> <a href="https://mxb.dev/blog/using-webmentions-on-static-sites/" target="_blank" rel="noopener noreferrer">Using Webmentions in Eleventy - Max Böck</a><br/>
<i class="fa fa-link"></i> <a href="https://rknight.me/adding-webmentions-to-your-site/" target="_blank" rel="noopener noreferrer">Adding Webmentions to Your Site - Robb Knight</a>

In order to implement this <a href="https://webmention.io/" target="_blank" rel="noopener noreferrer">webmention.io</a> & <a href="https://brid.gy/" target="_blank" rel="noopener noreferrer">brid.gy</a> need to be setup.

In addition I am also using <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">Github Actions</a> with <a href="https://docs.netlify.com/configure-builds/build-hooks/" target="_blank" rel="noopener noreferrer">Netlify Build Hooks</a> to update webmentions every 12 hours.

### Webmention.io

Webmention.io is a service which collects webmentions for your site & provides a json api.

> Webmention.io is a hosted service created to easily receive webmentions on any web page.

Setting up webmention.io requires indielogin.

Instructions to add `webmention` & `pingback` urls are provided once logged in.

```html
<link rel="webmention" href="https://webmention.io/blog.equk.co.uk/webmention" />
<link rel="pingback" href="https://webmention.io/blog.equk.co.uk/xmlrpc" />
```

#### IndieLogin

Webmention.io uses indielogin to authenticate.

For github you need a link to your github profile with `rel=me`.

```html
<a href="https://github.com/equk" rel="me">github.com/equk</a>
```

### Brid.gy

Bridgy connects with social media in order to get webmentions & send them over to webmention.io.

> Bridgy connects your web site to social media. Likes, reposts, mentions, cross-posting, and more...

I am using bridgy to connect with Mastodon.

## Implementation

Once brid.gy & webmention.io are setup it's time to implement some code.

Basic idea:

- [x] Fetch webmentions using webmention.io json api
- [x] Cache webmentions
- [x] Reference webmentions filtering by post url
- [x] Display Likes, Boosts & Comments in posts
- [x] Use netlify plugin to cache on build
- [x] Use Github actions to trigger build every 12 hours

### Fetch Webmentions

Make a request to webmention.io using the api token.

```js
require('dotenv').config()

const API = 'https://webmention.io/api/'

module.exports = async function() {
    const domain = 'blog.equk.co.uk'
    const token = process.env.WEBMENTION_IO_TOKEN
    const url = `${API}mentions.jf2?domain=${domain}&token=${token}`

    try {
        const response = await fetch(url)
        if (response.ok) {
            const feed = await response.json()
            return feed
        }
    } catch (err) {
        console.error(err)
        return null
    }
}
```

This is a global data file function in `src/_data/webmentions.js` which provides `{{ webmentions }}` to templates.

### Filtering Webmentions

A filter is required in order to display webmentions for the current post `url`.

```js
eleventyConfig.addFilter('webmentionsByUrl', function (webmentions, url) {
```

```js
.filter(entry => entry['wm-target'] === url)
```

## Final Implementation

The final fetch implementation involves saving all webmentions to `_cache` & then only requests new mentions since the last fetch to merge with the existing cache.

The final filter implementation filters by `url` & uses `sanitize-html` on the content of comments, only allowing a few specific html tags (no iframes etc).

<i class="fa fa-link"></i> <a href="https://mxb.dev/blog/using-webmentions-on-static-sites/" target="_blank" rel="noopener noreferrer">Using Webmentions in Eleventy - Max Böck</a><br/>

## Design

The most used design seems to have originated from Robb Knight & was inspired by Zach Leatherman.

<i class="fa fa-link"></i> <a href="https://rknight.me/adding-webmentions-to-your-site/" target="_blank" rel="noopener noreferrer">Adding Webmentions to Your Site - Robb Knight</a>

I tweaked the styles slightly but the core design comes directly from that article.<br/>
Grouping of different mentions (likes, boosts, comments) was also taken from the article.

## Netlify Caching

There is a simple caching plugin used for restoring & saving `_cache` folder on builds.<br/>
This is based on <a href="https://www.npmjs.com/package/@netlify/cache-utils" target="_blank" rel="noopener noreferrer">@netlify/cache-utils</a>.

```js
// netlify/cache-plugin/index.js
module.exports = {
  async onPreBuild({ utils }) {
    console.log('Restoring ./_cache/ folder')
    await utils.cache.restore('./_cache')
  },
  async onPostBuild({ utils }) {
    console.log('Saving ./_cache/ folder for future builds')
    await utils.cache.save('./_cache')
  },
}
```

```yaml
# netlify/cache-plugin/manifest.yml
name: cache-plugin
```

```toml
[[plugins]]
  package = "./netlify/cache-plugin"
```

## Scheduled Builds

This can be done using a combination of Github Actions & Netlify Build Hooks.

- [x] Setup a build hook for the site in Netlify
- [x] Add hook token to Github repo secrets
- [x] Create Github Action that uses cron

### Netlify Build Hook

> Build hooks are URLs you can use to trigger new builds and deploys

Build hooks can be found under `Build & Deploy` section.<br/>
Name this something memorable as the name will show in your deploys for the site.

### Github Actions

#### Hook Token

Add token in Github repo (`/settings/secrets/actions`).<br/>
I named it `NETLIFY_BUILD_TOKEN`.

#### Github Actions

Create a Github Action using cron for schedule.

`.github/workflows/build-sched.yml`

```yml
name: Scheduled build
on:
  schedule:
  - cron: '30 2/12 * * *'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Trigger Build on Netlify
      run: curl -s -X POST "https://api.netlify.com/build_hooks/${TOKEN}"
      env:
        TOKEN: ${{ secrets.NETLIFY_BUILD_TOKEN }}
```

You should now see `scheduled build` in Actions for the repo.<br/>
The example above triggers builds at `02:30` & `14:30` every day.

Deploys in netlify should show `Deploy triggered by hook:`

```log
Production main@HEAD
Deploy triggered by hook: Github Actions
Deployed in 19s
```

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

---
title: "11ty OpenGraph & SEO"
date: 2025-10-25T12:42:27.163Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "re implementing opengraph and meta tags in 11ty using javascript and nunjucks"
templateEngineOverride: md
---

<p class="text-center">
<img src="/media/images/11ty-200.png" alt="11ty logo" loading="lazy" decoding="async" width="200" height="200" class="inline">
</p>

<br/>

I wanted to reimplement seo features on the site for a few reasons.<br/>
There were some bugs with the plugin I was using & I also wanted to remove unused tags for social media as opengraph seems to be the standard.

Everything is implemented using nunjucks templates & `metadata.js` instead of using a plugin.

## SEO Features

Core tags take data set in `src/_data/metadata.js`

- [x] page number in title on pagination
- [x] use `excerpt` from post for `description` if exists
- [x] set `og:type` to website/article depending on page
- [x] use canonical link for `og:url`

## Pull Request

You can find the full pull request for these changes on github.

<i class="fa-solid fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/24" target="_blank" rel="noopener noreferrer">fix opengraph & meta tags pull request on github</a>

### Changes

- [x] remove plugin
- [x] add opengraph tags
- [x] add meta tags
- [x] add dynamic title for pages
- [x] add feature for setting ogtype
- [x] add current page using pagination in nunjucks
- [x] add dynamic description tags for blog posts
- [x] add canonical url
- [x] fix opengraph image
- [x] update README with new info

## Notes

> [!note]
> _One thing I don't understand is people generating `og:image` for each post._<br/>
> _Often duplicating the same data included in opengraph._<br/>
> _This seems a waste of resource for a simple blog site._
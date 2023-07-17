---
title: "11ty Site Now Live"
date: 2023-07-13T17:58:06.952Z
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

I finally got around to deploying this site on netlify.

I'm hoping to move everything over in the future and use this site as my main blogging site.

## Features

I used `eleventy-base-blog` as a start which has a large number of features already.

<i class="fa fa-link"></i> <a href="https://github.com/11ty/eleventy-base-blog/" target="_blank" rel="noopener noreferrer">11ty/eleventy-base-blog - Github</a>

I have added:

- [x] postcss integration
- [x] esbuild integration
- [x] automatic markdown image optimization
- [x] post feature image
- [x] image attribution link
- [x] post list pagination
- [x] darkmode support (`localStorage` & `prefers-color-scheme`)
- [x] opengraph meta tags
- [x] social media meta tags
- [x] markdown checklists
- [x] eslint with prettier
- [x] favicon generation

Info on how development has gone so far can be seen in blog post

📝<a href="/2023/06/10/blog-using-eleventy/">Blog Using Eleventy (June 10, 2023)</a><br/>

I still have a todo list of new features I am looking to add.

## Deploy Speed

Deploys of this site take seconds.

```
blog.equk.co.uk
Deployed in 21s
```
<img src="/media/logos/netlify-color-bg.svg" alt="Deploys by Netlify" class="inline" />

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

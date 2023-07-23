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

- [x] `postcss` integration
- [x] `esbuild` integration
- [x] blog post permalinks from `title` & `date`
- [x] date filters without `luxon`
- [x] `excerpt` filter for syndication feed
- [x] `livereload` that works with inline styles
- [x] automatic image optimization in `markdown`
- [x] optimized post feature image
- [x] image attribution link
- [x] post list pagination
- [x] `darkmode` support (`localStorage` & `prefers-color-scheme`)
- [x] opengraph meta tags
- [x] seo related meta tags
- [x] create new posts from `cli`
- [x] markdown checklists
- [x] `eslint` with `prettier`
- [x] favicon generation
- [x] webmentions (comment using `mastodon`)

Info on how development has gone so far can be seen in blog post

📝<a href="/2023/06/10/blog-using-eleventy/">Blog Using Eleventy (June 10, 2023)</a><br/>

I still have a todo list of new features I am looking to add.

## Frontmatter

```yaml
  title: -required-
  date: -required-
  draft: -required-
  author: -required-
  tags: -optional-
  image: -optional-
  imgAuthor: -optional-
  imgAuthorURL: -optional-
  permalink: -optional-
```

Post permalinks are generated using `title` & `date` fields.

Resulting in `/YYYY/MM/DD/slugify-title`

## Project Structure

This is the base folder structure.

```bash
    ├── netlify
    │   └── cache-plugin
    ├── public
    │   ├── img
    │   ├── media
    │   └── users
    └── src
        ├── _assets
        ├── atom
        ├── _data
        ├── _includes
        ├── _media
        ├── pages
        ├── posts
        ├── _scripts
        ├── sitemap
        └── _styles
```

Markdown files for `posts` & `pages` are located in `src/`.<br/>
Images for posts are kept in `src/_media/images/`.

Site generation outputs to `dist/`.

## Asset Bundling & Processing

The site uses `esbuild` to optimize & bundle clientside `javascript`.<br/>
The site uses `postcss` to optimize & minify `css`.

### esbuild

- input: `src/_scripts/`
- output: `src/_assets/js/`

Javascript is inserted inline.

### postcss

- input: `src/_styles/`
- output: `src/_assets/css/`

Styles are inserted inline.

## Image Optimization

- [x] Resize images
- [x] Output optimized formats
- [x] Responsive image sizes
- [x] Browser based lazy loading

Image optimization is automatic in `markdown` & image `shortcode` is used in templates.

- input: `src/_media/images/`
- output: `dist/img/`

The site is setup to output optimized `webp` images as well as the original input format.

## Commenting

Comments are based on <a href="/2023/07/18/adding-webmentions-in-eleventy/" target="_blank" rel="noopener noreferrer">webmentions</a> using <a href="https://webmention.io/" target="_blank" rel="noopener noreferrer">webmention.io</a> & <a href="https://brid.gy/" target="_blank" rel="noopener noreferrer">brid.gy</a> to pull in mentions from mastodon.

This includes `likes` & `boosts` received via mastodon.

## Syndication Feed

Syndication feed generation is setup to output an `excerpt` of the latest `10` posts.

## Sitemap

Sitemap generation is based on `posts` & `pages` only _(ignores pagination & tag pages)_.

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

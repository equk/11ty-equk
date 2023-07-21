---
slug:
title: "EQUK Gatsby Powered Blog"
date: 2019-07-07T17:23:52.692Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - react
  - graphql
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"></p>
<p class="text-center"><img src="/media/logos/graphql.svg" alt="graphql logo" width="150px" class="inline"> <img src="/media/logos/react.svg" alt="react logo" width="230px" class="inline"></p>

<br />

I finally changed my website to something based on React and GraphQL.

My job involves using Vuejs, React & GraphQL for web app development so I wanted to use something based on Vue or React.

I spent a while trying different technologies (gridsome, nuxtjs, hugo, vuepress, react, gatsby) before deciding on Gatsby.

I first chose `React` due to how components and hooks work.<br />
I also have experience using `GraphQL` for API based webapps so `Gatsby` seemed like a good choice.

I downloaded a lot of blog starters to get ideas but built the site with my own style & structure.

## Frontmatter

I wanted to keep post and page URLs the same as my old site.<br />
I also wanted to keep featured images on posts so structured the frontmatter fields based on that.

```yaml
  slug: -optional-
  title: -required-
  date: -required-
  draft: -required-
  author: -required-
  tags: -optional-
  image: -optional-
```

To keep post URLs the same I had to add `/YYYY/MM/DD/` & pages extend from `/`.

## Project Structure

This is the base folder structure.

```
    ├── content
    │   ├── pages
    │   └── posts
    ├── node
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── hooks
    │   ├── icon
    │   └── templates
    └── static
        └── media
```

Markdown files with frontmatter for posts & pages are located in `content/`.<br />
The `node` folder has `gatsby-node.js` functions seperated into files.<br />
Images & media for posts are kept in `static/media/`.

## Components

Components are each in a single `.js` file in `src/components/`<br/>
Re-usable micro components are located in `src/components/common/`

Component specific styles are located in their own `.scss` files in `src/assets/scss/components/`

Conditional rendering is done at a component level without any dependance on CSS.

Components use `prop-types` where required (this is also checked with eslint).

## Main Features

- [x] PWA
- [x] Google Workbox Service Worker
- [x] Feature Image
- [x] RSS Feed
- [x] Sitemap
- [x] Disqus Comments
- [x] Syntax Highlighting with `prismjs`
- [x] Pagination

## Development Features

- [x] ESLint with plugins
- [x] Uses `SASS` for styles
- [x] Bulma flex grid
- [x] `postcss` with plugins
- [x] `PurgeCSS` on `build`
- [x] Uses `gatsby-image`
- [x] Uses React `prop-types`
- [x] Uses React `hooks`
- [x] Uses `react-helmet`
- [x] Uses GraphQL

## UX / Design Features

- [x] Images can extend from content
- [x] Code blocks extend from content
- [x] Read / scroll indicator bar at top
- [x] Code blocks have language tabs
- [x] Blockquotes extend from content

I will probably be uploading the site to a public github repo in the future.
---
template: post
title: Site Updates & Opensource
draft: false
date: 2020-03-17T11:09:16.393Z
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - react
  - graphql
---
<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"></p>
<p class="text-center"><img src="/media/logos/graphql.svg" alt="graphql logo" width="150px" class="inline"> <img src="/media/logos/reactsq.svg" alt="react logo" width="180px" class="inline"> <img src="/media/logos/netlify.svg" alt="netlify logo" width="150px" class="inline"></p>

<br />


The site is now available opensource on Github.

## Improvements

- [x] JAMstack with Netlify CMS
- [x] Netlify Continuous Deployment
- [x] Git Hooks Using `Husky`
- [x] ESlint Updates
- [x] Checks `js,jsx,ts,tsx` pre-commit
- [x] Postbuild Script
- [x] Browser Caching for Fonts

## Google Lighthouse

<p class="text-center"><img src="/media/images/equk_lighthouse.png" alt="google lighthouse"></p>

<p class="text-center">Performance: 100%    Accessibility: 100%     Best Practices: 100%    SEO: 100%   PWA</p>

## Frontmatter

Structured around my old site, some fields are optional.

```yaml
  slug: -optional-
  title: -required-
  date: -required-
  draft: -required-
  author: -required-
  tags: -optional-
  image: -optional-
```

Post URLs are created automatically with `/YYYY/MM/DD/` & Pages extend from `/`.

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

## Netlify CMS

The site uses netlify cms & has custom preview components.

Styles are provided by the `postbuild` script.<br />
Main cms component `src/cms/index.js`


## Main Features

- [x] PWA
- [x] Google Workbox Service Worker
- [x] Sitemap
- [x] OpenGraph & Twitter Meta Tags
- [x] Feature Image
- [x] RSS Feed
- [x] ~~Disqus Comments~~
- [x] Gitalk Comments
- [x] Syntax Highlighting with `prismjs`
- [x] Pagination
- [x] Netlify CMS
- [x] Github Pages
- [x] Netlify

## Development Features

- [x] ESLint with plugins
- [x] Uses `SASS` for styles
- [x] Bulma flex grid
- [x] `postcss` with plugins
- [x] `PurgeCSS` on build
- [x] Uses `gatsby-image`
- [x] Uses react `prop-types`
- [x] Uses react `hooks`
- [x] Uses `react-helmet`
- [x] Uses GraphQL
- [x] Husky Git Hooks
- [x] Checks js,jsx,ts,tsx pre-commit
- [x] Postbuild Script

### Eslint config

- [x] Lints JavaScript based on ES6
- [x] Fixes issues using Prettier
- [x] Fixes formatting errors using Prettier
- [x] Lints + Fixes inside of html script tags
- [x] Lints + Fixes React
- [x] Extends airbnb rules
- [x] Checks for react `prop-types`

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
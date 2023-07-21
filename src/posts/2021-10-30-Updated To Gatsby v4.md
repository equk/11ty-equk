---
slug:
title: "Updated To Gatsby v4"
date: 2021-10-30T12:51:11.709Z
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

<br />

The site is now running Gatsby v4 🎉

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/12" target="_blank">Gatsby v4 pull request on github</a>

## New Features

- [x] Parallel Query Running
- [x] Deferred Static Generation
- [x] Server-side Rendering

<blockquote>Gatsby 4 combines the control and scalability of server-side rendering with the performance of static-site generation, creating a whole new web of possibilities.<br /><br />
<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/gatsby-4/" target="_blank" rel="noopener noreferrer">Introducing Gatsby 4</a></blockquote>

### Parallel Query Running

<p class="text-center"><img src="/media/logos/graphql.svg" alt="graphql logo" width="150px" class="inline"></p>

<blockquote>Page queries and static queries to occur in parallel, leading to a 40% reduction in build times for some sites<br /><br />
<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/blog/what-is-parallel-query-running/" target="_blank" rel="noopener noreferrer">Reducing Build Times In Gatsby 4 With Parallel Query Running</a></blockquote>

### Deferred Static Generation

<blockquote>Deferred Static Generation (DSG) allows you to defer non-critical page generation to the first user request, speeding up build times. Instead of generating every page up front, you can decide to generate certain pages at build time and others only when a user accesses the page for the first time.<br /><br />
<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/deferred-static-generation/" target="_blank" rel="noopener noreferrer">Deferred Static Generation API</a></blockquote>

### Server-side Rendering

<blockquote>Server-side Rendering (SSR) is one of Gatsby’s rendering options and allows you to pre-render a page with data that is fetched when a user visits the page.<br /><br />
<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/" target="_blank" rel="noopener noreferrer">Using Server-side Rendering</a></blockquote>

## Upgrade Process

Upgrading to Gatsby v4 was relatively simple.<br />
I didn't run in to any issues & no code changes were required.

<i class="fa fa-link"></i>  <a href="/2021/03/05/updated-to-gatsby-v-3" target="_blank" rel="noopener noreferrer">Migrating from v3 to v4</a>

Build times seem to take longer than v3 on netlify for some reason.

### Netlify Build Times

<p class="text-center"><img class="inline netlify_logo" src="/media/logos/netlify.svg" alt="netlify-logo" width="150px"></p>

**Gatsby v3**

```log
11:58:04 AM: info Done building in 103.589830513 sec
11:58:05 AM: ​
11:58:05 AM: (build.command completed in 1m 50.8s)
```

**Gatsby v4**

```log
3:36:39 PM: info Done building in 136.966769022 sec
3:36:39 PM: ​
3:36:39 PM: (build.command completed in 2m 39s)
```

## Source Code

You can find the full pull request for Gatsby v4 update on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/12" target="_blank">Gatsby v4 pull request on github</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
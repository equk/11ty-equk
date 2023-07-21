---
slug:
title: "Updated To Gatsby v5"
date: 2022-11-22T15:52:06.010Z
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

The site is now running Gatsby v5 🎉

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/18" target="_blank">Gatsby v5 pull request on github</a>

## New Features

- [x] Slice API
- [x] Partial Hydration
- [x] GraphiQL v2

<blockquote>Gatsby 5 introduces the Slices API and Partial Hydration (Beta). Slices unlock up to 90% reduction in build duration for content changes in highly shared components, Partial Hydration allows you to ship only the necessary JavaScript to the browser.<br /><br />
<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/docs/reference/release-notes/v5.0/" target="_blank" rel="noopener noreferrer">Gatsby v5 Release Notes</a></blockquote>

## Dependency Changes

- [x] Node 18
- [x] React 18

## Migration from v4

<i class="fa fa-link"></i>  <a href="https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/" target="_blank" rel="noopener noreferrer">Migrating from v4 to v5 guide</a>

There seem to be a few breaking changes to v5 but the only one this site seemed to be effected by was the graphql changes.

### Update Gatsby

Updating gatsby & related plugins should be pretty simple.

You may still get warnings about plugins being incompatible with gatsby version 5.x but most should work ok.

```bash
warn Plugin gatsby-plugin-xxx is not compatible with your gatsby version 5.0.1 - It requires
gatsby@~2.x.x || ~3.x.x || ~4.x.x
```

### Node 18

<p class="text-center"><img src="/media/logos/nodejs.svg" alt="nodejs logo" width="100px" class="inline"></p>

Make sure build in `netlify.toml` is using node 18

```toml
[build.environment]
  NODE_VERSION = "18"
```

### Updating GraphQL Queries

<p class="text-center"><img src="/media/logos/graphql.svg" alt="graphql logo" width="100px" class="inline"></p>

There is a `codemod` tool for auto conversion but this didn't seem to work.

```bash
SyntaxError: missing ) after argument list
```

<br>

> GraphQL schema: Changes to sort and aggregation fields
> As per the RFC: Change to sort and aggregation fields API the sort argument and aggregation’s field argument were changed from enums to nested input objects.

Update graphql queries which use `sort`

*example diff: src/templates/index-template.tsx*

```diff
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { ne: "page" }, draft: { ne: true } } }
-      sort: { order: DESC, fields: [frontmatter___date] }
+      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
```

As you can see from the diff the changes are relatively simple.

## Source Code

You can find the full pull request for Gatsby v5 update on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/18" target="_blank">Gatsby v5 pull request on github</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
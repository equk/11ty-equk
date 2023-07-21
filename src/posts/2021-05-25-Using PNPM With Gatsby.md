---
slug:
title: "Using PNPM With Gatsby"
date: 2021-05-25T14:18:32.227Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - pnpm
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"> <img src="/media/logos/pnpm.svg" alt="pnpm logo" width="150px" class="inline"></p>

## Why Use PNPM

- [x] Less Disk Space
- [x] Faster Installation Speed
- [x] Extra Features
- [x] Monorepo Workspaces

<blockquote>When using npm or Yarn, if you have 100 projects using a dependency, you will have 100 copies of that dependency saved on disk.<br />
With pnpm, the dependency will be stored in a content-addressable store<br /><br />
<i class="fa fa-link"></i>  <a href="https://pnpm.io/motivation/" target="_blank" rel="noopener noreferrer">Motivation | pnpm</a></blockquote>

There is a lot more information on the pnpm website including benchmarks showing pnpm is faster than npm and yarn.

<a href="https://pnpm.io/benchmarks/" target="_blank" rel="noopener noreferrer">📝 Benchmarks of JavaScript Package Managers</a>

## Using PNPM With Gatsby

You will need to install `gatsby-plugin-pnpm` in order to fix webpack problems.

<blockquote>When using pnpm, building a Gatsby project will fail because pnpm uses a unique node_modules structure, and webpack doesn't know how to resolve packages in it.<br />
This plugin will configure webpack so that it is able to see Gatsby's dependencies.<br /><br />
<i class="fa fa-link"></i>  <a href="https://pnpm.io/benchmarks/" target="_blank" rel="noopener noreferrer">Js-Brecht/gatsby-plugin-pnpm</a></blockquote>

`gatsby-config.js`

```js
/**
  *  PNPM Webpack
  */
'gatsby-plugin-pnpm',
```

## Notes

Comparison of `node_modules` size of this site

```sh
873M	./node_modules_yarn
497M	./node_modules_pnpm
```

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
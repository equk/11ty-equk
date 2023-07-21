---
slug:
title: "Updated To Gatsby v3"
date: 2021-03-05T11:55:53.764Z
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

The site is now running Gatsby v3 🎉

Upgrading was relatively easy

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/2" target="_blank">Gatsby v3 pull request on github</a>

## New Features

### Fast Refresh

> Fast Refresh is an implementation of Hot Reloading with full support from React.<br />
> It replaces unofficial solutions like `react-hot-loader`.

<a href="https://www.gatsbyjs.com/docs/reference/local-development/fast-refresh/" target="_blank">📝 Fast Refresh in Gatsby Docs</a>

## Updated Dependencies

- [x] Node 12
- [x] webpack 5
- [x] React 17
- [x] GraphQL 15
- [x] ESLint 7

### Webpack 5

Key changes:

- Improved build performance with Persistent Caching
- Improved Long-Term Caching with better algorithms and defaults
- Improved bundle size with better Tree Shaking and Code Generation
- Improved compatibility with the web platform
- ECMAScript features/syntax used in generated code

## Problems

### gatsby-plugin-netlify

There was a problem with this plugin so I ended up disabling it temporarily.

```js
 ERROR

(node:21015) [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning:
Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader
```

```diff
-'gatsby-plugin-netlify',
+// disabled due to bug with webpack
+// 'gatsby-plugin-netlify',
```

> gatsby-plugin-netlify
> Automatically generates a _headers file and a _redirects file at the root of the public folder to configure HTTP headers and redirects on Netlify.

Looking at the plugin it's probably not that useful & a workaround would be to add headers to `netlify.toml`

```ini
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "same-origin"
```

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
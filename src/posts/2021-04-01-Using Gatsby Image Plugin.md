---
slug:
title: "Using Gatsby Image Plugin"
date: 2021-04-01T19:11:19.011Z
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

This relates to a previous post [Updated To Gatsby v3](/2021/03/05/updated-to-gatsby-v-3)

Migrating to `gatsby-plugin-image` seemed pretty easy but there was a bug with the way `global` is implemented in the plugin which caused other components to break.

<a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/" target="_blank" rel="noopener noreferrer">📝 Gatsby Image Plugin on Gatsby Documentation</a>

## Migrating to Image Plugin

There are a few steps to migrating an existing site to use the plugin.

- [x] add gatsby-plugin-image and remove gatsby-image 📦
- [x] enable gatsby-plugin-image in main gatsby config 📷
- [x] change graphql query in post template for gatsbyImageData
- [x] change graphql query in page template for gatsbyImageData
- [x] import gatsby-plugin-image & replaced Img with GatsbyImage in post component
- [x] import gatsby-plugin-image & replaced Img with GatsbyImage in page component

Fix bug introduced by `gatsby-plugin-image`

- [x] fix problem with gatsby-plugin-image & webpack 5

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/5" target="_blank" rel="noopener noreferrer">Gatsby Image Plugin pull request on github</a>

### GraphQL Queries

Changes to the graphql image queries were pretty easy.

```diff
image {
  childImageSharp {
-    fluid(maxWidth: 1200) {
-      ...GatsbyImageSharpFluid
-    }
+    gatsbyImageData(layout: FULL_WIDTH)
  }
}
```

### Replacing Img with GatsbyImage

Replace import from `gatsby-image` with `gatsby-plugin-image`

```diff
-import Img from 'gatsby-image'
+import { GatsbyImage } from 'gatsby-plugin-image'
```

Replace `Img` elements with `GatsbyImage` elements referencing new GraphQL query data.

```diff
-<Img fluid={image.childImageSharp.fluid} />
+<GatsbyImage image={image.childImageSharp.gatsbyImageData} />
```

### Fix Bug

After doing all of the above everything seems ok ?<br/>
*Possibly but if you check the console you may find errors with react components referencing `global`.*

<article class="message is-danger">
  <div class="message-body"><p>⚠️ Warning</p>
  <p>If you use 'global' in any plugins or components they will fail with 'global is not defined' due to gatsby-plugin-image.</p>
  </div>
</article>

As a workaround define `global` in `gatsby-browser.js`.

```js
window.global = window
```

Everything should now be working, including plugins & components referencing `global`.

<article class="message is-info">
  <div class="message-body">
  <p>📦 Update</p>
  <p>The global bug is now fixed in <code class="language-text">gatsby-plugin-image@1.2.1</code><br />
  There should be no need to define <code class="language-text">window.global</code> in <code class="language-text">gatsby-browser.js</code>.</p>
  <p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/gatsbyjs/gatsby/commit/a5869e3d26ed0a45f7543ffaf45da9ca4b89ff45#diff-de69e0ec64bc53d10152bc6147ae6c5b76e4a1269bb6d79d578246a1e79bb1c2" target="_blank" rel="noopener noreferrer">gatsbyjs/gatsby@<tt>a5869e3</tt></a>
  </p>
  </div>
</article>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
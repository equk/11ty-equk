---
slug:
title: "React Hooks In Gatsby"
date: 2019-07-04T12:23:20.129Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - react
  - graphql
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"> <img src="/media/logos/react.svg" alt="react logo" width="230px" class="inline"></p>

Using hooks in react gives so many options.

When creating this blog I wondered if anyone within the gatsby community had already implemented any specific react hooks.

It didn't take long before I found <a href="https://www.gatsbyjs.org/blog/2019-02-20-introducing-use-static-query/" target="_blank" rel="noopener noreferrer">this post on the Gatsby Blog "Introducing useStaticQuery"</a>.

Following the blog post & example in the <a href="https://www.gatsbyjs.org/blog/2019-02-20-introducing-use-static-query/" target="_blank" rel="noopener noreferrer">Gatsby docs</a> I soon had a hook for referencing site config variables.

```javascript
import { useStaticQuery, graphql } from 'gatsby'

/**
 * These hooks are re-usable small queries for components using useStaticQuery.
 *
 * Hooks are a new addition in React 16.8. They let you use state
 * and other React features without writing a class
 *
 * ref: useStaticQuery
 * https://www.gatsbyjs.org/blog/2019-02-20-introducing-use-static-query/
 *
 * ref: React Hooks
 * https://reactjs.org/docs/hooks-intro.html
 *
 */

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
```

Referencing the hook in components is then relatively easy.

```javascript
const { copyright, menu } = useSiteMetadata();
```

```jsx
<div className="copyright">{copyright}</div>
```

Other uses for `useStaticQuery` include tag lists & menu items.

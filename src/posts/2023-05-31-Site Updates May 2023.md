---
slug:
title: "Site Updates May 2023"
date: 2023-05-31T13:09:40.504Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - github
  - react
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"></p>

## Changes

- [x] Switch from bulma to tailwindcss
- [x] Custom typography styles
- [x] New font for main content
- [x] New pagination design
- [x] New darkmode toggle component
- [x] Add `mockElement` to fix `toggleDark` SSR
- [x] Tailwind dark mode using `theme`
- [x] New responsive menu with `useState`
- [x] Meta tags cleanup
- [x] Implemented `og:type`
- [x] Implemented `og:url` & `canonical` links
- [x] Changed RSS GraphQL query to limit entries to 20
- [x] Updated `time` references to use `Date` type
- [x] Use `toLocaleDateString` to format `date`

## Switching to Tailwind

<br />
<p class="text-center"><img src="/media/logos/tailwindcss.svg" alt="tailwindcss logo" width="100px" class="inline"></p>
<br />

This is the main change I made for a few reasons.

After working on my `astro` blog with tailwind it seemed clear it would be a lot better than bulma.

It also meant I could drop `bulma`, `node-sass` & `purgecss` which always seemed slow on clean builds. *(doesn't matter so much with gatsby build caching on netlify)*

### Redesign for Tailwind

Unfortunately changing to another CSS framework meant I had to redesign everything.

I had already built a similar blog with `astro` using `tailwind` so fortunately had a sort of template to use for some of the components.

📝 <a href="/2023/02/14/move-blog-to-astro/" target="_blank" rel="noopener noreferrer">Move Blog to Astro</a>

There were a few problems encountered along the way due to how tailwind is implemented & I had to recode the mobile menu in the top menu component with react `useState`.<br />
I also had to change some of the `darkToggle` component due to a problem with gatsby SSR.

📝 <a href="https://react.dev/reference/react/useState/" target="_blank" rel="noopener noreferrer">React Documentation - useState</a>

### Updating darkToggle component

I am using `use-dark-mode` for this component & the code references `document` which is not available at SSR (as it is a DOM element).

*Changing any options in use-dark-mode causes this problem.*

There is a workaround which involves mocking the element to fix SSR errors.

```js
const noop = () => {}

const mockElement = {
  classList: {
    add: noop,
    remove: noop,
  },
}
```

📝 <a href="https://github.com/donavon/use-dark-mode/blob/develop/src/initialize.js#L6" target="_blank" rel="noopener noreferrer">GitHub - donavon/use-dark-mode/src/initialize.js at develop</a>

The default element used for darkmode in `use-dark-mode` is `body` but tailwindcss uses the base `html` element.

```js
const docElement = (global.document && global.document.documentElement) || mockElement
```

📝 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement/" target="_blank" rel="noopener noreferrer">MDN Web Docs - Document: documentElement property</a>

## Google Lighthouse

After a few changes I got everything to 100%.

<p class="text-center"><img src="/media/images/equk-lighthouse-2023.png" alt="google lighthouse score"></p>

## Updating meta Tags

I decided to update meta tags as a lot of tags were not required anymore & new ones needed to be added.<br />
This seemed pretty simple to start with.

```diff
- <meta name="description" content={description} />
- <meta name="twitter:title" content={title} />
- <meta name="twitter:description" content={description} />
- <meta content={ogImage} name="twitter:image" />
- <meta content="1024" name="twitter:image:width" />
- <meta content="512" name="twitter:image:height" />
```

I ended up implementing `og:type` for articles & blog posts using a new variable in the main `Layout` component.

Then I looked into `og:url` which required reading `location.pathname` from `@reach/router`.

📝 <a href="https://www.gatsbyjs.com/docs/location-data-from-props/" target="_blank" rel="noopener noreferrer">Gatsby Documentation - Location Data from Props</a>

### Implementing og:url

There seem to be two options for implementing `og:url` in gatsby.

#### First Option

- use `setHeadComponents` in `onRenderBody` to add element in `gatsby-ssr`
- use DOM manipulation to change element `onRouteUpdate` in `gatsby-browser`

```js
  // modify og:url element
  const domOgurl = document.querySelector(`meta[property='og:url']`)
  if (domOgurl) {
    const existingValue = domOgurl.getAttribute(`content`)
    if (existingValue && baseUrl) {
      let value = `${baseUrl}${location.pathname}`
      value += location.hash
      domOgurl.setAttribute(`content`, `${value}`)
    }
  }
```

#### Second Option

- use `wrapPageElement` with `react-helmet` in both `gatsby-ssr` & `gatsby-browser`

📝 <a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/#usage-in-gatsby-ssr-and-browser-apis" target="_blank" rel="noopener noreferrer">Gatsby Script API - Usage in Gatsby SSR and Browser APIs</a>

I implemented both to test them & ended up using `wrapPageElement` as it is a lot less code.

I also used the same code to create a canonical link element.

## Source Code

You can find the full pull request for these changes on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/21" target="_blank" rel="noopener noreferrer">Site Updates May 2023 pull request on github</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
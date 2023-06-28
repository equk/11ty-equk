---
title: "Generating Slug Using Date & Title In 11ty"
date: 2023-06-20T12:31:52.641Z
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

Eleventy generates post slugs based on filenames by default.

I wanted to change this as my post filenames contain the creation date.

eg: `'2023-06-20-Generating Slug Using Date Title In 11ty.md'`

I also want post permalinks to be `/YYYY/MM/DD/title`.

## Using Date

Generating `YYYY/MM/DD` can be done using `toISOString()` with a combination of `split()` & `join()`.

```js
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date, fileSlug } = data.page
      const dateURL = date.toISOString().split('T')[0].split('-').join('/')
      return `${dateURL}/${fileSlug}/`
    },
  },
```

<i class="fa fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString" target="_blank" rel="noopener noreferrer">Date.prototype.toISOString() - Javascript | MDN</a>

## Using Title

Making eleventy use the post title instead of the filename is really easy.

Replace `fileSlug` with a slugified `title`.

```js
const titleSlug = slugify(data.title, { lower: true })
```

## Final Code

Putting the above changes together allows creation of post permalinks using `date` & `title` fields.

```js
const slugify = require('slugify')

module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date } = data.page
      const dateURL = date.toISOString().split('T')[0].split('-').join('/')
      const titleSlug = slugify(data.title, { lower: true })
      return `${dateURL}/${titleSlug}/`
    },
  },
}
```
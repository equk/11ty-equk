---
title: "Generating Slug From Title In 11ty"
date: 2023-06-20T13:31:30.598Z
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

eg: `"2023-06-20-Generating Slug From Title In 11ty.md"`

## 11tydata

The file `posts.11tydata.js` controls this.

```js
module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date } = data.page
      const dateURL = dateLink(date)
      const titleSlug = slugify(data.title, { lower: true })
      return `${titleSlug}/`
    },
  },
}
```

Basically replace `fileSlug` with a slugified `title`.

<p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/commit/0a5494f19730fd530a72a385e34f9b6789130e87" target="_blank">Jun 20, 2023 - #0a5494f - 11ty-equk on github</a></p>

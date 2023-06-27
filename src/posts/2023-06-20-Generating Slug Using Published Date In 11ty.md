---
title: "Generating Slug Using Published Date In 11ty"
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

I wanted post permalinks to be `/YYYY/MM/DD/slug`.

## dateLink Function

First I created a function which creates a `Date` object using an input.

```js
function dateLink(dateInput) {
  const date = new Date(dateInput)
  const year = date.getFullYear()
  const mnth = date.getMonth() + 1
  const dy = date.getDate()
  let month = ''
  let day = ''

  if (mnth < 10) {
    month = `0${mnth}`
  } else {
    month = `${mnth}`
  }

  if (dy < 10) {
    day = `0${dy}`
  } else {
    day = `${dy}`
  }

  const dateLinkOut = `${year}/${month}/${day}`
  return dateLinkOut
}
```

- seperate day, month & year
- if day or month is less than 10 append 0
- output `YYYY/MM/DD`

```js
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date, fileSlug } = data.page
      const dateURL = dateLink(date)
      return `${dateURL}/${fileSlug}/`
    },
  },
```

Reference this & output `YYYY/MM/DD/slug`.

<p><i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/commit/f64853a3e4c88d212e594e17993d29010b3a5630" target="_blank">Jun 20, 2023 - #0a5494f - 11ty-equk on github</a></p>

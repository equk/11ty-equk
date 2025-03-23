---
title: "Removing Luxon From Eleventy"
date: 2023-06-26T12:23:04.901Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
templateEngineOverride: md
---

![11ty logo](../_media/images/11ty-200.png)

<article class="message is-info">
  <div class="message-body">
    <i class="fa-solid fa-info-circle"></i> luxon is over 4MB, you could probably do the same with built in javascript features.
  </div>
</article>

After looking at code in eleventy I noticed almost every starter template uses `luxon` for formatting dates.

There are possibly cases where using `luxon` is beneficial but in most cases, you are using 4MB for something that could be a small function in a few lines of code.

## Luxon Package Size

Looking on npm luxon seems really popular & unpacked size is over 4MB.

```
Package: luxon
Weekly Downloads: 5,703,454
Version: 3.3.0
License: MIT
Unpacked Size: 4.02 MB
Total Files: 41
```

## 11ty eleventy-base-blog

I based this site on `eleventy-base-blog` so am using this as an example.

There are only two filters using luxon in `eleventy-base-blog`, `readableDate` & `htmlDateString`.

Both take in `Date`

- `readableDate` returns `DD Month YYYY`
- `htmlDateString` returns `YYYY-MM-DD`

```js
eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
  return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
});

eleventyConfig.addFilter('htmlDateString', (dateObj) => {
  return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
});
```

```html
<li><time datetime="{{ page.date | htmlDateString }}">{{ page.date | readableDate }}</time></li>
```

<i class="fa-solid fa-link"></i> <a href="https://github.com/11ty/eleventy-base-blog/blob/5ec08b9765304f1690ffc9d33300adf752b00a9a/eleventy.config.js#L41" target="_blank" rel="noopener noreferrer">11ty/eleventy-base-blog/eleventy.config.js - Github</a>

### Using Node To Check Output

I am going to create a small node script to show how easy this is & also to make sure the outputs are the same as using `luxon`.

```js
#!/usr/bin/env node
const { DateTime } = require('luxon')
const dateObj = new Date()
const htmlDateString = DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
  'yyyy-LL-dd'
)
const readableDate = DateTime.fromJSDate(dateObj, {
  zone: 'utc',
}).toFormat('dd LLLL yyyy')

console.log(dateObj)
console.log('luxon')
console.log(htmlDateString)
console.log(readableDate)
```

This is what the two filters return in eleventy.

```
2023-06-26T12:17:43.887Z
luxon
2023-06-26
26 June 2023
```

### htmlDateString

Easiest is `htmlDateString` (`YYYY-MM-DD`) as this is already in the input.

```js
const htmlDateStr = dateObj.toISOString().split('T')[0]
```

### readableDate

For `readableDate` we can use `toLocaleDateString` with `en-gb`

```js
dateObj.toLocaleDateString('en-gb', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

<i class="fa-solid fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString" target="_blank" rel="noopener noreferrer">Date.prototype.toLocaleDateString() - Javascript | MDN</a>

### Example Node Script

Now lets put it all together in one script so we can directly compare the outputs.

```js
#!/usr/bin/env node
const { DateTime } = require('luxon')
const dateObj = new Date()
const htmlDateString = DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
  'yyyy-LL-dd'
)
const readableDate = DateTime.fromJSDate(dateObj, {
  zone: 'utc',
}).toFormat('dd LLLL yyyy')

console.log(dateObj)
console.log('luxon')
console.log(htmlDateString)
console.log(readableDate)

const htmlDateStr = dateObj.toISOString().split('T')[0]
const readableD = dateObj.toLocaleDateString('en-gb', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

console.log('New')
console.log(htmlDateStr)
console.log(readableD)
```

Output

```
2023-06-26T12:23:13.887Z
luxon
2023-06-26
26 June 2023
New
2023-06-26
26 June 2023
```

## 4MB Saved

Replace the filters in `eleventy.config.js` & luxon can be removed as a dependency saving 4MB.


## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> 11ty-equk</a>

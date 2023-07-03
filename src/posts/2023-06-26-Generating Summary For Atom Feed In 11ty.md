---
title: "Generating Summary For Atom Feed In 11ty"
date: 2023-06-26T12:19:38.633Z
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

I want to setup my syndication feed to display an excerpt for each post as most tech blogs I subscribe to do this.

With `eleventy-base-blog` atom feed generation is done using a njk template with permalink set to `feed.xml` so I decided to create an excerpt njk filter.

## Implementing Excerpt

This filter does a few things

- [x] Remove HTML Tags
- [x] Create 80 Word Excerpt

```js
  // Excerpt filter (used for atom feed)
  eleventyConfig.addFilter('excerpt', (post) => {
    const content = post
      .replace(/(<([^>]+)>)/gi, '')
      .split(' ')
      .slice(0, 80)
      .join(' ')
    return content
  })
```

Take an input, remove all html tags, split it using spaces as seperator (to give us words), then use slice to take the first 80 items, then join it all back again to give a output to return.

## Add Summary Field

Next step is to add the summary field using the filter & remove the old content field.

```diff
-    <content type="html">{{ post.templateContent | transformWithHtmlBase(absolutePostUrl, post.url) }}</content>
+    <summary type="html">{{ post.templateContent | transformWithHtmlBase(absolutePostUrl, post.url) | excerpt | safe }}</summary>
```

Now the feed should have a summary for each post using the excerpt filter.


## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

---
title: "Default RSS Generation In Astro"
date: 2023-02-20T13:34:05.580Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - astro
  - github
image:
---

<p class="text-center"><img class="inline dark-logo" src="/media/logos/astro.svg" alt="astro-logo" width="18%"></p>

Using built in `@astrojs/rss` for generation seems simple but there are a few problems & a lot of missing features.

## Problems

I wanted to generate a feed using an excerpt of the blog post content.

There are two problems with this:

- [ ] Astro does not have atom support
- [ ] MDX is not supported

<i class="fa fa-link"></i> <a href="https://docs.astro.build/en/guides/rss/#including-full-post-content" target="_blank" rel="noopener noreferrer">RSS 🚀 Astro Documentation</a>

I personally don't have any mdx content in posts so using `post.body` with `markdown-it` should be ok.

- [ ] Majority of fields are missing

There are a large number of RSS fields completely missing in `@astrojs/rss`.<br/>
Example missing fields: author, copyright, image, id ...

`astro/astro-rss/src/schema.ts`

```ts
import { z } from 'astro/zod';

export const rssSchema = z.object({
  title: z.string(),
  pubDate: z.union([z.string(), z.number(), z.date()]).transform((value) => new Date(value)),
  description: z.string().optional(),
  customData: z.string().optional(),
  draft: z.boolean().optional(),
});
```

<i class="fa fa-link"></i> <a href="https://github.com/withastro/astro/blob/81dce94f2a6db598bd9e47fc2a4b9d713e58f286/packages/astro-rss/src/schema.ts" target="_blank" rel="noopener noreferrer">withastro/astro/packages/astro-rss/src/schema.ts on Github</a>

- [ ] Output has no CDATA for HTML

The output does not use CDATA sections for HTML.

> CDATA sections may occur anywhere character data may occur; they are used to escape blocks of text containing characters which would otherwise be recognized as markup.

<i class="fa fa-link"></i> <a href="https://www.w3.org/TR/REC-xml/#sec-cdata-sect" target="_blank" rel="noopener noreferrer">W3C Extensible Markup Language (XML) 1.0 (Fifth Edition)</a>

## Adding Content

It is possible to input the content of posts *(mdx not supported)* using `markdown-it` & `sanitize-html`.

`rss.xml.js`

```js
import { getCollection } from 'astro:content'
import { siteConfig } from '~/config'
import createSlug from '~/lib/createSlug'
import slugDate from '~/lib/slugDate'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})
```

```js
content: sanitizeHtml(markdown.render(post.body)),
```

## Adding Excerpt

I wanted to add an excerpt of the content into the description field of the RSS entries. *(most tech blogs I subscribe to do this)*

Implementing excerpt can be done in different ways, a lot of implementations just use `x` characters.<br />
I decided to do it using words *(items seperated by spaces)*

```js
       title: post.data.title,
       description: sanitizeHtml(
         markdown.render(post.body).split(' ').slice(0, 50).join(' ')
       ),
```

Kind of simple, take `post.body` & `split` it using spaces as seperator, then use `slice` to take the first `50` items, then `join` it all back again.

There may be open `<p>` tags within the excerpt but any open tags will get closed with `sanitize-html` making the code safe.

### Fixing Relative Paths

Using `markdown-it` will output relative links & images.<br/>
RSS feeds shouldn't have items with relative paths.

To fix this use `replace()` on `href` & `src` objects starting with `/`.

```js
      description: sanitizeHtml(
        markdown
          .render(post.body)
          .replace('src="/', `src="${siteConfig.url}/`)
          .replace('href="/', `href="${siteConfig.url}/`)
          .split(' ')
          .slice(0, 50)
          .join(' ')
      ),
```

## Notes

I am looking into generating feeds using an external script *(like you would in nextjs)*

A few advantages to this over astrojs/rss:

- [x] reference only `.md` files (exclude `.mdx`)
- [x] clean formatting
- [x] author fields
- [x] updated date fields
- [x] copyright fields
- [x] atom support
- [x] json support
- [x] no dependence on astro

---

Update February 22, 2023

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> I am now using a script to generate atom feeds & do not recommend using <code>@astrojs/rss</code>
  </div>
</article>

📝 [Atom Feed Generation Script](/2023/02/22/atom-feed-generation-script/)

---

<article class="message is-info">
  <div class="message-body">
    <i class="fa fa-info-circle"></i> April 26, 2023 - More fields were added to the astro-rss schema & the documentation was updated<br/>
    <i class="fa fa-link"></i> <a href="https://github.com/withastro/astro/commit/4ea716e5692d23361e9301330ce52733b3d05b01" target="_blank" rel="noopener noreferrer">Commit 4ea716e - withastro/astro on Github</a>
  </div>
</article>

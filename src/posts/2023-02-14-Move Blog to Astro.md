---
title: "Move Blog to Astro"
date: 2023-02-14T13:31:58.329Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - astro
  - github
image:
---

<p class="text-center"><img class="inline dark-logo" src="/media/logos/astro.svg" alt="astro-logo" width="18%"></p>
<p class="text-center"><img class="inline" src="/media/logos/vite.svg" alt="vite_logo" width="15%"> <img class="inline" src="/media/logos/zod.svg" alt="zod-logo" width="16%"></p>

Astro has a huge amount of hype in the developer community at the moment.

I have been thinking of redesigning my blog for a while & maybe even moving away from Gatsby.

***Is it possible to completely replace Gatsby with Astro & keep the same features?***

To try to answer this why not move this blog to Astro ?<br />
*(lets also use tailwind instead of bulma)*

## Init Astro Blog

I looked at some templates but wanted to understand more how Astro worked so used the basic default blog template.

```sh
pnpm create astro@latest -- --template blog
```

I first tried in Astro 1.9.0 & didn't really like the structure of posts etc.

The project sort of got left for a while until Astro 2.0 came out with collections & type safety.<br />
Suddenly Astro looked like it would be a lot easier to structure & use for blogs.

## Linting Code

The default code seems to be all over the place in terms of formatting.<br />
There is a mix of tabs & spaces.

Install ESLint, Prettier & Astro plugins.

```sh
pnpm install -D eslint eslint-plugin-astro @typescript-eslint/parser astro-eslint-parser
pnpm install -D prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss prettier-plugin-astro
```

Setup `.eslintrc.cjs` with override for `.astro` files to use `astro-eslint-parser`.

```js
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
  ],
```

Prettier has a bug with pnpm where it does not find plugins so it requires adding the plugins to the `.prettierrc.cjs` directly.

```js
  plugins: [
    require('prettier-plugin-astro'),
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: '**/*astro',
      options: {
        parser: 'astro',
      },
    },
  ],
```

## Modifying Slug

The first thing I looked at was how slug was generated.<br />
By default slug is generated using filename (makes sense for small sites).

First modification was to generate slug using `title` from `frontmatter`.<br />
This involved creating a slugify function to call when generating slug for links.

```diff
-    params: { slug: post.slug },
+    params: { slug: createSlug(post.data.title) },
```

📝 [Generating Slug From Title In Astro](/2023/02/02/generating-slug-from-title-in-astro/)

I then compared this to my Gatsby setup and thought why not also generate slug using the published date of the post.<br />
This involved using `moment` for a date formatting function.

```diff
-    params: { slug: createSlug(post.data.title) },
+    params: {
+      slug:
+        slugDate(post.data.date.toISOString()) +
+        createSlug(post.data.title),
+    },
```

📝 [Generating Slug Using Published Date In Astro](/2023/02/02/generating-slug-using-published-date-in-astro/)

This also meant I could move `src/pages/blog/[...slug].astro` to `src/pages/[...slug].astro` as all blog posts will have unique slugs.

## Newpost Creation

I moved my newpost script from Gatsby to Astro as an easy way to create posts.

📝 [Gatsby New Post CLI Script - Jul 6, 2019](/2019/07/06/gatsby-new-post-cli-script/)

The script uses `readline` and `fs` which are both core nodejs functions.

```js
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
```

## Pagination

The default blog posts feed was at `/blog` but I wanted to move this to `/`.<br />
I decided to seperate the feed to `/posts` & have the most recent posts on the front page.

Pagination in Astro is really easy as there is a function which pretty much does all the work.

<i class="fa fa-link"></i> <a href="https://docs.astro.build/en/core-concepts/routing/#pagination" target="_blank" rel="noopener noreferrer">Routing 🚀 Astro Documentation</a>

The only problem I had was related to types which was fixed by setting posts to `CollectionEntry<'blog'>` & `typeof posts` when mapping over the array.

```ts
interface Props {
  posts: CollectionEntry<'blog'>
}
```

```ts
page.data.map((post: typeof posts) => (
```

## Syndication Feed Generation

I wanted to generate an atom feed using an excerpt of the blog post content.

There are two problems with this:

- [ ] Astro does not have atom support
- [ ] MDX is not supported

<i class="fa fa-link"></i> <a href="https://docs.astro.build/en/guides/rss/#including-full-post-content" target="_blank" rel="noopener noreferrer">RSS 🚀 Astro Documentation</a>

### RSS v Atom

Looking into syndication feed generation it's like everyone is using rss 2.0 instead of atom.<br />
Atom seems to fit better with syndication & seems to have more features.

<i class="fa fa-link"></i> <a href="https://www.intertwingly.net/wiki/pie/Rss20AndAtom10Compared" target="_blank" rel="noopener noreferrer">Comparison of RSS and Atom Web Feed Formats</a>

## Screenshots

This is what I have so far, the site looks similar to the Gatsby blog.

<p class="text-center">Astro</p>
<img class="border mx-auto" src="/media/images/2023/astro-equk-ss-800.jpg" alt="astro-equk-ss-800">

<p class="text-center">Gatsby</p>
<img class="border mx-auto" src="/media/images/2023/gatsby-equk-ss-800.jpg" alt="gatsby-equk-ss-800">

A lot of time was spent on CSS & there were a few problems with tailwindcss.

## Thoughts So Far

Using Astro 2.0 changed my view, previously I only really used Astro for simplistic sites where content doesn't really change but with the addition of content collections & type schemas it really is nice to work with.

<i class="fa fa-link"></i> <a href="https://astro.build/blog/astro-2/" target="_blank" rel="noopener noreferrer">Astro Blog - Introducing Astro 2.0</a>

I started porting the site over to Astro as a weekend project but ended up working on it in my spare time in the week as it was so interesting to work with.

Things I like:

- [x] zod typechecking
- [x] vite
- [x] templating
- [x] less clientside js

I have not used any advanced features like islands architecture yet.<br />
This will be a useful feature for adding things like dynamic comment components.

<i class="fa fa-link"></i> <a href="https://docs.astro.build/en/concepts/islands/" target="_blank" rel="noopener noreferrer">Astro Islands 🚀 Astro Documentation</a>

It still feels like I've only scratched the surface so far.

## Notes

Trying to recreate my blog using a basic template was much more interesting than just downloading a premade template as I feel like I had to learn different things about Astro I would have otherwise never touched.

I first used `UnoCSS` which was so much faster than `tailwind` + `postcss` but I just could not get darkmode themed properly (the default darkmode did work using default colors).

## Source

The source for my astro blog is available on github.

<a class="github" href="https://github.com/equk/blog-astro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> blog-astro</a>
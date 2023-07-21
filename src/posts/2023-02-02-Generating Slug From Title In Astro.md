---
title: 'Generating Slug From Title In Astro'
date: 2023-02-02T15:03:12.984Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - astro
  - github
image:
---

<p class="text-center"><img class="inline dark-logo" src="/media/logos/astro.svg" alt="astro-logo" width="18%"></p>

By default astro generates slug using filenames.

There are a few changes needed in order to generate the slug from the title field in frontmatter.

- [x] `createSlug` function
- [x] add `createSlug` to slug generation referencing `title`
- [x] link to blog posts using `createSlug`

## createSlug function

This is a simple function which formats the title into a slug.

```ts
// src/lib/createSlug.ts
export default function (title: string) {
  return (
    title
      // remove leading & trailing whitespace
      .trim()
      // remove special characters
      .replace(/[^A-Za-z0-9 ]/g, '')
      // replace spaces
      .replace(/\s+/g, '-')
      // remove leading & trailing separtors
      .replace(/^-+|-+$/g, '')
      // output lowercase
      .toLowerCase()
  )
}
```

## Slug Generation

Instead of referencing `post.slug` we need to call `createSlug` referencing `post.data.title`.

```diff
// src/pages/blog/[...slug].astro
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
-    params: { slug: post.slug },
+    params: { slug: createSlug(post.data.title) },
    props: post,
  }));
}
type Props = CollectionEntry<"blog">;
```

## Blog Post Links

Similar to above reference `post.data.title` using `createSlug` instead of `post.slug`

```diff
// src/pages/blog/index.astro
-  <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
+  <a href={`/blog/${createSlug(post.data.title)}/`}>
+    {post.data.title}
+  </a>
```

## Source

The source for my astro blog is available on github.

<a class="github" href="https://github.com/equk/blog-astro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> blog-astro</a>

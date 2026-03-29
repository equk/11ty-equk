---
title: "11ty Type Validation Schema"
date: 2026-03-29T13:20:20.602Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Adding a data schema for type validation to eleventy using zod"
---

<p class="text-center">
<img src="/media/images/11ty-200.png" alt="11ty logo" loading="lazy" decoding="async" width="200" height="200" class="inline">
<img src="/media/images/2026/zod-logo-200.png" alt="zod logo" loading="lazy" decoding="async" width="200" height="200" class="inline">
</p>
<br/>

Adding a data schema for type validation to eleventy using zod.

> Zod is a TypeScript-first validation library. Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.

[intro - Zod](https://zod.dev/)

## Eleventy DataSchema

Eleventy has the ability to add validation using `eleventyDataSchema`.

> Use the special `eleventyDataSchema` data property to validate data in your Data Cascade.

[Validate Data - Eleventy](https://www.11ty.dev/docs/data-validate/)

### Applying to Posts

I only wanted the schema to apply to posts so added checking to the relevant data file (`src/posts/posts.11tydata.js`).

```js
const postSchema = z.object({
  title: z.string(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  author: z.string().optional(),
  draft: z.boolean().nullish(),
  tags: z.array(z.string()).default([]),
  image: z.string().nullish(),
  imgAuthor: z.string().nullish(),
  imgAuthorURL: z.string().nullish(),
  mastodonPostId: z.string().nullish(),
  blueskyPostId: z.string().nullish(),
  excerpt: z.string().nullish(),
})

```

This added some time `(+430ms)` to builds.

##### Build without data schema

```sh
[11ty] Copied 275 Wrote 239 files in 5.25 seconds (21.9ms each, v3.1.2)
```

##### Build with data schema

```sh
[11ty] Copied 275 Wrote 239 files in 5.68 seconds (23.8ms each, v3.1.2)
```

## Testing Validation

To test validation is working I set draft in schema to expect `string` instead of `boolean`.

Here is the output when trying to build the site.

```sh
[11ty] Wrote 0 files in 2.12 seconds (v3.1.2)
[11ty] Eleventy Fatal Error (CLI):
[11ty] 1. Error in the data schema for: ./src/posts/2011-08-03-netgear-dg823g-modem.md (via `eleventyDataSchema`) (via EleventyDataSchemaError)
[11ty] 2. [
[11ty]   {
[11ty]     "expected": "string",
[11ty]     "code": "invalid_type",
[11ty]     "path": [
[11ty]       "draft"
[11ty]     ],
[11ty]     "message": "Invalid input: expected string, received boolean"
[11ty]   }
[11ty] ] (via ZodError)
```

## Standalone Script

- [x] use `fast-glob` to get `.md` files in posts
- [x] read all files
- [x] get frontmatter from posts
- [x] check each file using `zod` with the schema
- [x] give error feedback using `ZodError`
- [x] track time taken

Running this script took around `100ms`.

```sh
    Starting Schema Check
-
    ./src/posts/2010-10-12-save-chromium-profile-to-ramdisk.md
    ./src/posts/2011-08-03-netgear-dg823g-modem.md
    -- snip --
    ./src/posts/2026-01-19-Screenshots in Sway.md
-
    Schema Check Complete
    137 files checked in 97ms
```

## Standalone vs Eleventy

Eleventy shows an increase in builds of around `430ms`.<br/>
In comparison the standalone script only takes `100ms`.

This isn't a huge difference but my site only has 137 posts.

## Pull Request

The pull request for these changes is available on github.

<i class="fa-solid fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/27" target="_blank" rel="noopener noreferrer">Add data schema for type validation pull request on github</a>

### Changes

- [x] add new devDependencies for type checking schema
- [x] add new schema to posts data using zod for basic type checking
- [x] add new schema script for checking types in posts
- [x] add colors to cli output of schema script
- [x] add schema checking script to package.json


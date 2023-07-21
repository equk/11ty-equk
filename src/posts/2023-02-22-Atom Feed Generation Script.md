---
title: "Atom Feed Generation Script"
date: 2023-02-22T10:58:02.079Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - astro
  - github
image:
---

<p class="text-center"><img class="inline dark-logo" src="/media/logos/astro.svg" alt="astro-logo" width="18%"> <img class="inline" src="/media/logos/typescript.svg" alt="typescript-logo" width="15%"></p>

I decided to create an external script to generate an atom feed from markdown posts as astro doesn't currently support this.

Also `@astrojs/rss` has multiple problems

- [x] majority of fields are missing
- [x] output gives validation warnings
- [x] output has no CDATA for HTML

📝 [Default RSS Generation In Astro](/2023/02/20/default-rss-generation-in-astro/)

## Script Idea

Before starting this is a checklist of requirements for the script.

- [ ] read all `.md` files in `src/content/blog`
- [ ] add `title`, `date`, `link` from frontmatter
- [ ] use excerpt from `content` for `summary`
- [ ] use astro site config for fields
- [ ] sanitize html output
- [ ] use type definitions

## Implementing Excerpt

I wanted to add an excerpt of the content into the summary field of the atom entries. *(most tech blogs I subscribe to do this)*

Implementing excerpt can be done in different ways, a lot of implementations just use `x` characters.<br />
I decided to do it using words *(items seperated by spaces)*

To do this I used `split(' ')` to split words then take a `slice` between 0 to 80 & then `join` everything back up.

```ts
markdown
  .render(content)
  .split(' ')
  .slice(0, 80)
  .join(' ')
```

Then I passed excerpt into `description` field *(corresponds to `summary` in atom in `feed` library)*

### Fixing Relative Paths

Using `markdown-it` will output relative links & images.<br/>
RSS feeds shouldn't have items with relative paths.

To fix this use `replace()` on `href` & `src` objects starting with `/`.

```ts
  markdown
    .render(content)
    .replace('src="/', `src="${siteConfig.url}/`)
    .replace('href="/', `href="${siteConfig.url}/`)
    .split(' ')
    .slice(0, 80)
    .join(' ')
```

## Adding Sanitize

Wrap `markdown-it` with `sanitize-html`

```ts
const excerpt = sanitizeHtml(
  markdown
    .render(content)
    .split(' ')
    .slice(0, 50)
    .join(' ')
)
```

## Connecting Site Config

I decided to link the script with `config.ts` to make things easier.

There are also type definitions in `feed` to use (`FeedOptions`)

```ts
import { siteConfig } from '~/config'
```

```ts
const options: FeedOptions = {
  title: siteConfig.title,
  description: siteConfig.description,
  id: siteConfig.url + '/',
  link: siteConfig.url + '/',
  language: 'en',
  copyright: `copyright ${year} equk.co.uk all rights reserved`,
  author: {
    name: siteConfig.author.name,
    link: siteConfig.url,
  },
  favicon: siteConfig.url + '/favicon.svg',
  feedLinks: {
    atom: siteConfig.url + '/atom.xml',
  },
}
```

## Main Function

Flow of main function (taken from code comments).

- [x] Find markdown files in blog
- [x] Map over array of blog post files
- [x] Generate excerpt from content
- [x] Return data + add extra fields
- [x] Sort posts
- [x] Generate feed
- [x] Add post items
- [x] Check output directory exists
- [x] Write output file

## Adding CLI Feedback

Astro gives feedback on build including time taken so it would be nice to add something similar when running builds.

I also want the script to quit & give feedback if an error occurs.

```
18:36:06 [build] Complete!

    ./dist/atom.xml created (+63ms)
```

## Adding Atom Generation To Astro Build

Add the feed generation script to the end of `build` in `package.json`

```json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build && tsx ./generate-feed.ts",
```

## Comparing Output

To show the difference in output here is an example.

`@astrojs/rss` - `/rss.xml (+57ms)`

```xml
<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>equk&apos;s blog</title><description>blog of a developer &amp; sysadmin</description><link>https://example.com/</link><item><title>Atom Feed Generation Script</title><link>https://example.com/2023/02/22/atom-feed-generation-script/</link><guid>https://example.com/2023/02/22/atom-feed-generation-script/</guid><description>&lt;p&gt; &lt;/p&gt;
&lt;p&gt;I decided to create an external script to generate an atom feed from markdown posts as astro doesn&apos;t currently support this.&lt;/p&gt;
```

`generate-feed.ts` - `/atom.xml (+61ms)`

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <id>https://example.com/</id>
    <title>equk's blog</title>
    <updated>2023-02-22T11:59:34.243Z</updated>
    <generator>https://github.com/jpmonette/feed</generator>
    <author>
        <name>equilibriumuk</name>
        <uri>https://equk.co.uk</uri>
    </author>
    <link rel="alternate" href="https://example.com/"/>
    <link rel="self" href="https://example.com/atom.xml"/>
    <subtitle>blog of a developer &amp; sysadmin</subtitle>
    <icon>https://example.com/favicon.svg</icon>
    <rights>copyright 2023 equk.co.uk all rights reserved</rights>
    <entry>
        <title type="html"><![CDATA[Atom Feed Generation Script]]></title>
        <id>https://example.com/2023/02/22/atom-feed-generation-script/</id>
        <link href="https://example.com/2023/02/22/atom-feed-generation-script/"/>
        <updated>2023-02-22T10:58:02.079Z</updated>
        <summary type="html"><![CDATA[<p> </p>
<p>I decided to create an external script to generate an atom feed from markdown posts as astro doesn't currently support this.</p>
```

## Advantages Over Astrojs/RSS

- [x] Atom support
- [x] Reference only `.md` files
- [x] Better formatting including `CDATA`
- [x] Extra fields (eg: `author`, `copyright`)
- [x] Feed Validation
- [x] No dependence on Astro

As `feed` is used, it's also possible to output to `json` or `rss` with little modification.

## Source

The source for my astro blog is available on github.

<a class="github" href="https://github.com/equk/blog-astro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> blog-astro</a> <a class="github" href="https://github.com/equk/blog-astro/blob/main/generate-feed.ts" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> generate-feed.ts</a>
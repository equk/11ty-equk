---
title: "Bluesky Post Web Component"
date: 2025-01-09T15:34:35.089Z
author: equilibriumuk
draft: false
tags:
 - javascript
 - github
 - bluesky
 - eleventy
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "113799896392150715"
blueskyPostId: "3lfddtkmevs2i"
excerpt: "Web component using the bluesky api to display a single post with count of likes, replies, reposts"
---

<p class="text-center">
<img class="inline" src="/media/logos/bluesky.svg" alt="bluesky-logo" width="150px">
</p>

<br/>

This is a web component which allows embedding bluesky posts with details on likes, replies & reposts.<br/>
I am using it to provide reactions to blog posts using bluesky.

## Bluesky API

Fetching post data requires the dynamic id of the user.

<i class="fa-solid fa-link"></i> <a href="https://docs.bsky.app/docs/advanced-guides/resolving-identities" target="_blank" rel="noopener noreferrer">Resolving Identities | Bluesky</a>

A users `did` can be found via `/xrpc/app.bsky.actor.getProfile`

```sh
curl https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile\?actor\=insert-bluesky-name | jq
```

Fetch post data via `/xrpc/app.bsky.feed.getPosts`

```js
  async postData() {
    const bskyDid = '...'

    const data = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts?uris=at://${bskyDid}/app.bsky.feed.post/${this.postId}`
    ).then((response) => response.json())
    return data.posts[0]
  }
```

<i class="fa-solid fa-link"></i> <a href="https://docs.bsky.app/docs/api/app-bsky-feed-get-posts" target="_blank" rel="noopener noreferrer">app.bsky.feed.getPosts | Bluesky</a>

## Implementing in Eleventy

In order to have a bluesky post linked to a blog post I needed to add a new field to the frontmatter of posts (`blueskyPostId`).

The component is implemented using its own seperate files `bskypost.njk` & `bsky.js`.

Styling is added in the main `css` of the site.

### Workflow

One downside of the current implementation is there is an additional step required when posting to the blog as a bluesky post id is required in the frontmatter of the post.

- [x] Post a blog post
- [x] Post on bluesky linking to the blog post
- [x] Add bluesky post id to blog post

## Styling The Component

I wanted the component to look simple & have a similar design to the bluesky web interface.<br/>
The buttons are `svg` images referenced using svg `use` element.

<blockquote><p>The <strong><code>&lt;use&gt;</code></strong> element takes nodes from within the SVG document, and duplicates them somewhere else.
The effect is the same as if the nodes were deeply cloned into a non-exposed DOM, then pasted where the <code>use</code> element is.</p>
<br/>
<cite><i class="fa-solid fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use" target="_blank" rel="noopener noreferrer">use - SVG: Scalable Vector Graphics | MDN</a></cite>
</blockquote>

### Non JS

If javascript is disabled a element is still shown with a link allowing users to react to the post on bluesky.

## Source Code

Info on the code changes made to implement this component can be seen on Github.

<i class="fa-solid fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/18" target="_blank" rel="noopener noreferrer">Bluesky Post Web Component pull request on github</a>

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> 11ty-equk</a>

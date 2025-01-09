---
title: "Mastodon Post Web Component"
date: 2025-01-08T17:34:54.115Z
author: equilibriumuk
draft: false
tags:
 - javascript
 - github
 - mastodon
 - eleventy
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "113794024107668987"
excerpt: "Web component which uses the mastodon api to display a single post"
---

<p class="text-center">
<img class="inline" src="/media/logos/mastodon-purple.svg" alt="mastodon-logo" width="150px">
</p>

<br/>

This is a web component which allows embedding mastodon posts with details on favourites, replies & boosts.<br/>
I am using it to provide reactions to blog posts using mastodon / fediverse.

## Moving From Webmentions

There are a few reasons to move away from webmentions.

<i class="fa fa-link"></i> <a href="https://rknight.me/blog/webmentions-redux/" target="_blank" rel="noopener noreferrer">Webmentions Redux - Robb Knight</a>

The above post by Robb Knight covers a lot of detail on problems relating to webmentions.<br/>
It also links to a mastodon-post web component made by David Darnes.

This component is a good place to start.

<i class="fa fa-link"></i> <a href="https://darn.es/mastodon-post-web-component/" target="_blank" rel="noopener noreferrer">mastodon-post Web Component - David Darnes</a>

The component uses client-side javascript to pull mastodon post data from the API.

Using client-side javascript means the data shown on the page is near real-time.<br/>
In comparison, the way I had webmentions implemented was dependant on the site building to pull in information.

## Mastodon API

The component uses the mastodon public api meaning no need for tokens.<br/>
The only requirement to get a mastodon post is the `status id`.

<blockquote><p>Once you know a status <code>id</code>, you can use <code>GET /api/v1/statuses/:id</code> to view the status entity.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://docs.joinmastodon.org/client/public/#posts" target="_blank" rel="noopener noreferrer">Playing with public data - Mastodon documentation</a></cite>
</blockquote>

<br/>

```js
  async postData() {
    const data = await fetch(
      `https://hachyderm.io/api/v1/statuses/${this.postId}`
    ).then((response) => response.json())
    return data
  }
```

::: important
The mastodon api returns `html` data for post `content`
:::

## Implementing in Eleventy

In order to have a mastodon post linked to a blog post I needed to add a new field to the frontmatter of posts (`mastodonPostId`).

The component is implemented using its own seperate files `mastopost.njk` & `mastodon.js`.

Styling is added in the main `css` of the site.

### Workflow

One downside of the current implementation is there is an additional step required when posting to the blog as a mastodon post id is required in the frontmatter of the post.

- [x] Post a blog post
- [x] Post on mastodon linking to the blog post
- [x] Add mastodon post id to blog post

## Styling The Component

The example component looks plain but gives a good starting point.

I wanted the component to look simple & have a similar design to mastodons web interface.<br/>
The buttons are `svg` images referenced using svg `use` element.

<blockquote><p>The <strong><code>&lt;use&gt;</code></strong> element takes nodes from within the SVG document, and duplicates them somewhere else.
The effect is the same as if the nodes were deeply cloned into a non-exposed DOM, then pasted where the <code>use</code> element is.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use" target="_blank" rel="noopener noreferrer">use - SVG: Scalable Vector Graphics | MDN</a></cite>
</blockquote>

### Screenshot Example

Here is an example post from my mastodon.

<p class="text-center">
<img class="inline" src="/media/images/2025/mastodon-post.png" alt="mastodon-logo">
</p>

### Non JS

If javascript is disabled a element is still shown with a link allowing users to react to the post on mastodon.

## Source Code

Info on the code changes made to implement this component can be seen on Github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/11ty-equk/pull/16" target="_blank" rel="noopener noreferrer">Mastodon Post Web Component pull request on github</a>


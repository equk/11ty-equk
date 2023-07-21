---
slug:
title: "Gatsby Syndication Feed Generation"
date: 2023-06-02T12:04:55.717Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - github
  - react
image:
---

<p class="text-center"><img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px" class="inline"></p>
<br />

While doing code updates last month I noticed Gatsby RSS generation looked a bit of a mess with graphql queries directly in `gatsby-config` (`gatsby-plugin-feed`).<br/>
The generated RSS feed also did not validate.

I decided to implement my own generation script similar to the script I made for `astro` / `nextjs` but using graphql as a source.

📝 <a href="/2023/02/22/atom-feed-generation-script/" target="_blank" rel="noopener noreferrer">Atom Feed Generation Script</a>

I also decided to use `atom` for feeds as there are a few advantages over `rss`.

## Why Not Use a Plugin?

The problem with blindly using plugins is you have no idea how something is implemented.

Also this site has a different graphql layout for data but all of the plugins I found (apart from `gatsby-plugin-feed`) had the graphql query hard coded.

## Script Idea

Here is a basic checklist of requirements for the script.

- [ ] read all blog entries using `graphql`
- [ ] add fields from `graphql`
- [ ] use excerpt from `html` for `summary`
- [ ] output feeds to `./public`

Gatsby provides `excerpt` with graphql so returning an excerpt should be no problem, also most fields are directly available from graphql.

## Implementation

Looking in Gatsby docs it seems the best way to implement a script is to use `onPostBuild` node API.

<i class="fa fa-link"></i> <a href="https://www.gatsbyjs.org/docs/node-apis/#onPostBuild" target="_blank" rel="noopener noreferrer">Gatsby Node APIs - onPostBuild</a>

I decided to use `jpmonette/feed` as it worked well with my atom feed generation script.

<i class="fa fa-link"></i> <a href="https://github.com/jpmonette/feed" target="_blank" rel="noopener noreferrer">Github - jpmonette/feed: A RSS, Atom and JSON Feed generator for Node.js</a>

As most of the work is done by graphql & gatsby there are very few imports required & the only extra dependency is `feed`.

### Gatsby GraphQL

I already had a query setup for the old plugin which returned blog posts using `filter`.

```graphql
allMarkdownRemark(
  limit: 20
  sort: { frontmatter: { date: DESC } }
  filter: { frontmatter: { template: { ne: "page" }, draft: { ne: true } } }
)
```

This returns tha last `20` entries that do not have `page` template & are not marked as a `draft` & sorts the output in descending order based on `date`.

```graphql
excerpt(format: PLAIN, pruneLength: 450, truncate: false)
```

I also used `excerpt` to return a snippet for the `summary` field in the atom output.

<i class="fa fa-link"></i> <a href="https://www.gatsbyjs.com/docs/graphql-reference/#excerpt" target="_blank" rel="noopener noreferrer">Gatsby - GraphQL Query Options</a>

## Feed Generation

Flow of feed generation.

- [x] Query graphql & return `posts`
- [x] Call `new Feed` referencing fields
- [x] Map over array of blog `posts`
- [x] Add each post using `addItemToFeed`
- [x] Add author using `addContributor`
- [x] Write output files

### Code Snippets

Map over array of blog `posts` & Add each post using `addItemToFeed`.<br/>
Add author using `addContributor`.

```js
  blogPosts.map((posts) => posts.node).forEach(addItemToFeed(feed, siteMetadata))

  feed.addContributor({
    name: options.author,
    link: siteMetadata.site_url,
  })
```

Write output files async.

```js
  await fs.writeFile(`./public/${options.output.atom}`, feed.atom1())
  await fs.writeFile(`./public/${options.output.rss2}`, feed.rss2())
  await fs.writeFile(`./public/${options.output.json}`, feed.json1())
```

## Source Code

You can find the full pull request for these changes on github.

<i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/equk-gatsby/pull/22" target="_blank" rel="noopener noreferrer">Valid Syndication Feed Generation pull request on github</a>

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
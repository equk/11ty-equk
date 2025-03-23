---
title: "Obsidian Book Search Tweaks"
date: 2023-08-22T13:27:49.863Z
author: equilibriumuk
draft: false
tags:
 - github
 - obsidian
 - javascript
image:
imgAuthor:
imgAuthorURL:
templateEngineOverride: md
excerpt: "Tweaking and Improving Book Search Plugin for Obsidian"
---

<p class="text-center"><img src="/media/logos/obsidian.svg" alt="obsidian logo" width="250px" class="inline"></p>

I recently started using Obsidian for note taking & the plugin community is really amazing.

One useful community plugin is Book Search.

<i class="fa-solid fa-link"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/anpigon/obsidian-book-search-plugin">Obsidian Book Search Plugin</a>

While creating templates I noticed this plugin returns small thumbnail images over http.<br/>
I added some javascript to fix these problems.

## Google Books API

The plugin returns images using `thumbnail` size.

```js
  createBookItem(item: VolumeInfo): Book {
    const book: Book = {
      ...
      coverUrl: item.imageLinks?.thumbnail ?? '',
      coverSmallUrl: item.imageLinks?.smallThumbnail ?? '',
      ...
    };
    return book;
  }
```

<i class="fa-solid fa-link"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/anpigon/obsidian-book-search-plugin/blob/master/src/apis/google_books_api.ts">src/apis/google_books_api.ts · anpigon/obsidian-book-search-plugin · GitHub</a>

### Google Books API Documentation

> volumeInfo.imageLinks.thumbnail (string) Image link for thumbnail size (width of ~128 pixels)

<i class="fa-solid fa-link"></i> <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/books/docs/v1/reference/volumes">Volume | Google Books API</a>

## Book Search Tweaks

- [x] fix url to use `https` (default is `http`)
- [x] use large image (default width is `128px`)
- [x] remove page curl on edge of image

## Requirements

I have a template for book notes using the templater community plugin.<br/>
This plugin allows use of javascript when creating new notes with templates.

<i class="fa-solid fa-link"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/SilentVoid13/Templater">Obsidian Templater Plugin</a>

## Book Template

Here is the relevant code from the template for images.

```js
---
cover: {{coverUrl}}
---
![cover|250](<% tp.frontmatter["cover"].replace('\&zoom=1', '').replace('http:\/', 'https:\/').replace('\&edge=curl', '') %>)
```

With this code, new book notes should have the larger image in the body.
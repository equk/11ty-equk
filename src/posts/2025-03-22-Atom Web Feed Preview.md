---
title: "Atom Web Feed Preview"
date: 2025-03-22T20:15:50.648Z
author: equilibriumuk
draft: false
tags:
 - github
 - javascript
 - eleventy
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Providing a web feed preview of a blogs atom feed using XSLT"
templateEngineOverride: md
---

<p class="text-center">
<svg class="feed-ico inline-block" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="200px"><path fill="currentColor" d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"></path></svg>
</p>

> [!Note]
> TLDR I made my atom feed viewable from within the web browser<br/>
> <a target="_blank" rel="noopener noreferrer" href="/atom.xml">View the feed Here →</a>

I have had a atom feed on the blog since it was created but never really thought about viewing it within a browser.

On going to the atom feed firefox just seemed to download the file so after looking around I noticed there was a XSL stylesheet that many blogs RSS feeds seemed to use.

These blog web feeds link to [aboutfeeds.com](https://aboutfeeds.com/) by [Matt Webb](https://interconnected.org/)<br/>
On this page there is a XSL stylesheet [linked](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl)

## Getting a RSS XSL Template

The XSL stylesheet has references to RSS but I am using Atom.

Looking at the template there are references to RSS entries.

```xml
<h2><xsl:value-of select="/rss/channel/title"/></h2>
<p><xsl:value-of select="/rss/channel/description"/></p>
```

```xml
<xsl:for-each select="/rss/channel/item">
  <div class="pb-5">
    <h3 class="mb-0">
      <a target="_blank">
        <xsl:attribute name="href">
          <xsl:value-of select="link"/>
```

## Adjusting XSL for Atom

Changing the references for feed items from RSS to Atom is prety easy.

```diff
-<xsl:for-each select="/rss/channel/item">
+<xsl:for-each select="atom:feed/atom:entry">
  <div class="pb-5">
    <h3 class="mb-0">
      <a target="_blank">
        <xsl:attribute name="href">
-         <xsl:value-of select="link"/>
+         <xsl:value-of select="atom:id"/>
```

## Using XSL Templates

[W3C XSLT Introduction](https://www.w3schools.com/xml/xsl_intro.asp)

> XSL (eXtensible Stylesheet Language) is a styling language for XML.
>
> XSLT stands for XSL Transformations.

I created a template for entries using the example above along with references from the RSS XSL.

```xml
  <xsl:template match="atom:entry">
    <div class="entry">
      <h3>
        <a target="_blank">
          <xsl:attribute name="href">
            <xsl:value-of select="atom:id" />
          </xsl:attribute>
          <xsl:value-of select="atom:title" />
        </a>
      </h3>
      <time>
        <xsl:value-of select="atom:updated" />
      </time>
    </div>
  </xsl:template>
```

## Adding Styles

I added some basic CSS using colors from my site & used `monospace` as the main font to keep things looking simple.

```css
:root {
  --white: #faf5f6;
  --black: #252525;
  --theme-link: #d14;
  --theme-hover: #0282c9;
}

html,
body {
  margin: auto;
  padding: 20px;
  max-width: 56rem;
  background-color: var(--white);
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: var(--black);
  line-height: 1.2;
}

html,
body,
button,
code,
input {
  font-family: monospace;
}
```

I also kept the intro text with a link to aboutfeeds.

## Implementing in 11ty

I created a njk template for `atom.xsl` in the same location as the `atom.xml` generation template to keep things together (`src/atom/`).

```njk
---
permalink: /atom.xsl
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" exclude-result-prefixes="atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
```

Then referenced `atom.xsl` in `atom.njk`.

```xml
<?xml-stylesheet href="/atom.xsl" type="text/xsl"?>
```

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

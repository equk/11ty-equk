---
title: "Site Updates Over 2024"
date: 2024-12-30T14:39:29.057Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
  - security
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "109389406260065173"
excerpt: "Looking at site updates & fixes over the past year"
---

![11ty logo](../_media/images/11ty-200.png)

I've not really posted much over the past year, a lot of updates & changes to the site haven't really been worthy of blog posts.

There have been a few new features added and also some security overrides to fix CVEs.

## Site Features

Jan 8, 2024 - add new filter `htmlDateYear` to `getFullYear`<br/>
May 2, 2024 - created new eslint config for 9.1.1 using esm<br/>
May 2, 2024 - convert prettier config from CJS to ESM<br/>
Jul 3, 2024 - use `undici.fetch` for fetching webmentions from webmention.io<br/>
Sep 24, 2024 - 🤖 add more ai crawlers to `robots.txt`<br/>
Nov 8, 2024 - add new style catppuccin for prismjs<br/>
<a href="/2024/12/06/11ty-fix-inline-styles-livereload/" target="_blank" rel="noopener noreferrer">Dec 6, 2024 - 11ty Fix Inline Styles Livereload</a>

## Security Fixes

Mar 2, 2024 - 📦🔒 update sanitize-html to fix CVE-2024-21501<br/>
Jun 17, 2024 - 📦🔒 add pnpm package override for braces to fix CVE-2024-4068<br/>
Jul 3, 2024 - 📦🔒 add pnpm package override for ws to fix CVE-2024-37890<br/>
Sep 24, 2024 - 📦🔒 add security overrides to fix CVE-2024-4067 & CVE-2024-43799<br/>
Dec 2, 2024 - 📦🔒 add security override to fix CVE-2024-21538 in package cross-spawn<br/>
Dec 2, 2024 - 📦🔒 update eslint related packages to fix CVE-2024-21539

::: note
I wrote a blogpost about using pnpm to create package version overrides to fix security issues

<p><i class="fa fa-link"></i> <a href="/2021/05/27/fix-security-issues-using-overrides/" target="_blank" rel="noopener noreferrer">May 27, 2021 - Fix Security Issues Using PNPM Overrides</a></p>
:::

## 11ty Updates

May 2, 2024 - 📦 updated eleventy to 3.0.0-alpha.10<br/>
Jul 3, 2024 - 📦 updated eleventy to 3.0.0-alpha.14<br/>
Aug 20, 2024 - 📦 switch eleventy to beta branch<br/>
Oct 2, 2024 - 📦 switch eleventy to 3.0.0 release

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

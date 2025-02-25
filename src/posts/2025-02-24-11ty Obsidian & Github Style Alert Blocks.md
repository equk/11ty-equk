---
title: "11ty Obsidian & Github Style Alert Blocks"
date: 2025-02-24T14:46:28.992Z
author: equilibriumuk
draft: false
tags:
 - github
 - eleventy
 - obsidian
 - javascript
image:
imgAuthor:
imgAuthorURL:
mastodonPostId: "114065404598767638"
blueskyPostId: "3lizavzci2k2d"
excerpt: "Adding Obsidian & Github Style Alert / Callout Blocks Using 11ty and markdown-it Plugins"
---

<p class="text-center"><img src="/media/logos/obsidian.svg" alt="obsidian logo" width="200px" class="inline"> <img src="/media/logos/github.svg" alt="github logo" width="200px" class="inline dark-logo"></p>

## Markdown-it Plugin

[Github - antfu/markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts)

## Adding to 11ty

![11ty logo](../_media/images/11ty-200.png)

I already have a callouts markdown-it plugin which uses a different style.

Using the Obsidian & Github style is however nicer as it makes publishing things taken from Obsidian notes a lot easier.

I like to seperate markdown-it plugins into their own config so will add the code & configuration to `eleventy.config.githubalerts.js`.

### Old Style

```md
::: important
This is an important block
:::
```

::: important
This is an important block
:::

### Obsidian & Github Style

```md
> [!Important]
> This is an important block
```

> [!Important]
> This is an important block

### Setting Options

I decided to disable the svg icons in the plugin & use existing css styles to keep everything on the site looking the same.

## Pull Request

There is a pull request on github showing all the code changes.

- [x] new dependency `markdown-it-github-alerts` added
- [x] new eleventy plugin for `github` and `obsidian` style alerts for markdown-it
- [x] import `githubAlerts` eleventy markdown-it plugin & apply with `mdLib.use`
- [x] add custom styles for github and obsidian callout blocks

[Add Obsidian & Github Style Alert Blocks](https://github.com/equk/11ty-equk/pull/20)

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

---
title: "Obsidian Notes in Neovim"
date: 2025-04-04T20:42:58.609Z
author: equilibriumuk
draft: false
tags:
 - github
 - obsidian
 - linux
 - neovim
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Using Neovim for writing notes in Obsidian vault with custom templates for new notes & autocompletion for note references"
---

<p class="text-center">
<img src="/media/logos/obsidian.svg" alt="obsidian logo" width="200px" class="inline"> <img src="/media/logos/neovim-sm.svg" alt="neovim logo" loading="lazy" decoding="async" class="inline" width="165px">
</p><br/>

Recently I've been noticing Obsidian is really slow.

In comparison Neovim opens instantly & has a small memory footprint.

Using Neovim also allows all the plugins, vim motions, keymapping etc of neovim.

## Obsidian.nvim

[Github - epwalsh/obsidian.nvim](https://github.com/epwalsh/obsidian.nvim)

I setup this plugin to make it easier to create notes as electron based obsidian can be slow.

There were a few steps involved in this.

- [x] Custom templates for `obsidian.nvim` (daily & general)
- [x] Use lua functions with `os.date` for substitutions
- [x] Lazy load `obsidian.nvim` on opening md files in vault

This allows creation of daily notes with all the metadata/frontmatter pupulated.

The plugin also has autocompletion for referencing other notes within the vault.

### Obsidian Memory Usage

I removed unused plugins to optimize my obsidian vault but the electron app still seems slow and uses a huge amount of RAM, even with a single note opened.

```sh
       774.04 M /usr/lib/electron34/electron
       875.91 M /usr/lib/electron34/electron
       262.38 M /usr/lib/electron34/electron
        55.39 M /usr/lib/electron34/electron
         5.58 M /usr/lib/electron34/electron
         5.61 M /usr/lib/electron34/electron
         5.61 M /usr/lib/electron34/electron
```

Above is memory usage of obsidian with just one note opened (`1984.52 M`).

```sh
        56.09 M nvim
```

In comparison Neovim uses little memory with a daily note opened (`56.09 M`).

## Notes

I still find myself using the main Obsidian app when writing notes that are media heavy.<br/>
I use `obsidian.nvim` for writing daily notes & quick notes on code.

## Download

The scripts and my dotfiles can be downloaded from github.

<a class="github" href="https://github.com/equk/dotfiles" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Download</a>
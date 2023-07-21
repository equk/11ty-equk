---
slug:
title: "Converting Neovim Config to Lua"
date: 2021-09-15T12:23:18.137Z
draft: false
author: equilibriumuk
tags:
- linux
- archlinux
- github
- neovim
- lua
image:
---

<p class="text-center"><img src="/media/logos/neovim.svg" alt="neovim logo" width="400px" class="inline"></p>

I have been using neovim for a while & was excited about the new features coming in 0.5 so started thinking about changing my config to lua a while ago.

Initially I installed neovim 0.5 beta & used it for `rust` using `rust-analyzer` with `nvim_lsp`. ( 11 Apr 2021 <i class="fa fa-code-fork git-fork"></i> <a href="https://github.com/equk/neovim-lua/commit/fd8701e56638a00ff00fa7181dfdb39fa169357b" target="_blank">/equk/neovim-lua/</a> )

I was really happy with how it worked but held off of converting my full config to lua until 0.5 was officially released.

## Neovim 0.5 New Features

- [x] Built-in LSP client
- [x] Tree-sitter
- [x] Lua API changes

### Language Server Protocol (LSP)

> The Language Server Protocol (LSP) is an open, JSON-RPC-based protocol for use between source code editors or integrated development environments (IDEs) and servers that provide programming language-specific features.<br />
> LSP was originally developed for Microsoft Visual Studio Code and is now an open standard.

<i class="fa fa-link"></i> <a href="https://github.com/Microsoft/language-server-protocol" target="_blank" rel="noopener noreferrer">Language Server Protocol on Github</a>

### Tree-sitter

> Tree-sitter is a parser generator tool and an incremental parsing library. It can build a concrete syntax tree for a source file and efficiently update the syntax tree as the source file is edited.

<i class="fa fa-link"></i> <a href="https://github.com/tree-sitter/tree-sitter" target="_blank" rel="noopener noreferrer">Tree-sitter on Github</a>


## Improvements

The biggest thing with Neovim 0.5 is the built-in lsp client as it meant I could replace a lot of language specific plugins with lsp configs.

Being able to use lua for almost everything also meant I could replace python plugins with more performant lua ones.

- [x] deoplete (python) to cmp (lua)
- [x] Ultisnips (python) to luasnip (lua).

### Config Structure

I first started with a few files to test things but later on I restructured the configs into folders making the configs more modular.

```
.
├── init.lua
└── lua
    └── eq
        ├── ale
        ├── completion
        ├── keymap
        ├── lightline
        ├── lsp
        ├── options
        ├── plugins
        ├── telescope
        └── treesitter
```

This makes it easier to add features & fix problems with specific plugins.

### Completion

At first I was using `completion-nvim` for completion but read a few posts suggesting `cmp` was more actively developed so ended up changing to that.

```lua
---- completion
use {
  'hrsh7th/nvim-cmp',
  requires = {
    'hrsh7th/cmp-buffer',
    'hrsh7th/cmp-path',
    'hrsh7th/cmp-nvim-lua',
    'hrsh7th/cmp-nvim-lsp',
  },
}
```

Using cmp also meant I could use `luasnip` with snippets from `friendly-snippets`.

```lua
---- snippets
-- use snippets from friendly-snippets
local snip_loader = require 'luasnip/loaders/from_vscode'
snip_loader.lazy_load()
```

### Telescope

Telescope is a fuzzy finder with huge customizability & extensive functionality.

This is probably one of my most used plugins when working on large projects.<br />
It is also performant when used with the `fzf-native` extension.

I only have a few keys mapped for it so far but will probably add more as I look into it.

So far I have key mappings setup for

- [x] file searching (without preview)
- [x] git status (with diff preview)
- [x] live grep (search within files)
- [x] git files (without preview)

<i class="fa fa-youtube-play yt-red"></i> <a href="https://www.youtube.com/watch?v=8SqFt5h2Lsg" target="_blank" rel="noopener noreferrer">tjdevries - Why Telescope?</a><br />
<i class="fa fa-youtube-play yt-red"></i> <a href="https://www.youtube.com/watch?v=2tO2sT7xX2k" target="_blank" rel="noopener noreferrer">Vim Telescope: The Ultimate Fuzzy Finder</a><br />
<i class="fa fa-github-alt"></i> <a href="https://github.com/nvim-telescope/telescope.nvim" target="_blank" rel="noopener noreferrer">nvim-telescope/telescope.nvim</a>

### Linting

There seem to be a lot of different implementations for linting files but I have kept it simple with lint on save using the plugin `ale`.

```lua
---- ale config
-- only used for linting on save
vim.g.ale_fix_on_save = 1
vim.g.ale_lint_on_enter = 0
vim.g.ale_lint_on_insert_leave = 0
vim.g.ale_lint_on_filetype_changed = 0
vim.g.ale_lint_on_text_changed = 'never'
vim.g.ale_disable_lsp = 1
```

I notice there are people looking into adding linting using language servers etc so might change later but lint on save seems to work & is performant enough.

## Helpful Resources

Most of the configuration was simple using the documentation provided on github by plugin developers but I did read a few articles & browsed other users configs which helped.

<i class="fa fa-link"></i> <a href="https://github.com/tjdevries/config_manager" target="_blank" rel="noopener noreferrer">tjdevries - config_manager</a><br />
<i class="fa fa-link"></i> <a href="https://github.com/nanotee/nvim-lua-guide" target="_blank" rel="noopener noreferrer">nanotee - neovim lua guide</a><br />
<i class="fa fa-link"></i> <a href="https://sharksforarms.dev/posts/neovim-rust/" target="_blank" rel="noopener noreferrer">sharksforarms  - Neovim and Rust</a><br />
<i class="fa fa-link"></i> <a href="https://github.com/neovim/neovim" target="_blank" rel="noopener noreferrer">Neovim on Github</a>

## Neovim Configs

You can find my dotfiles on github.<br />
I also have a seperate neovim-lua repo which shows how the configs took shape over time while I was testing new features.

<a class="github" href="https://github.com/equk/dotfiles" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> dotfiles</a>  <a class="github" href="https://github.com/equk/neovim-lua" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> neovim-lua</a>
---
title: "Switching to Fish Shell"
date: 2025-04-12T20:28:30.537Z
author: equilibriumuk
draft: false
tags:
 - github
 - linux
image:
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Switching to fish shell from zsh & improving shell with atuin, eza, zoxide"
---

<p class="text-center">
<img src="/media/logos/fish-shell.png" alt="fish shell logo" loading="lazy" decoding="async" class="inline">
</p>

I have had a basic `zsh` setup for ages with the `gentoo` style `PS1`.

After reading about `fish` shell being ported to rust I thought I would give it a try.

> fish’s core code has been ported from C++ to Rust<br/>
> we’ve rebuilt the foundation in Rust to embrace modern computing

[What's new in fish 4.0 - fish blog](https://fishshell.com/blog/new-in-40/)<br/>
[Release fish 4.0.0 - fish-shell/fish-shell](https://github.com/fish-shell/fish-shell/releases/tag/4.0.0)

## Advantages

- [x] Clean Scripting
- [x] Command Suggestions
- [x] Abbreviations
- [x] Web Based Config

## Configuring

Initial config can be done in a web browser by running `fish_config`.

It is also possible to configure from cli using `fish_config`

- `fish_config theme show` (lists builtin themes)
- `fish_config prompt show` (lists builtin prompts)
- `fish_config prompt save <prompt-name>` (saves prompt)
- `fish_config theme save <theme-name>` (saves theme)

There are also additional custom prompts available to download.

I customized the default prompt & am using the `ayu Dark` color theme.

### PWD Dir Sortening

One thing I didn't like with the default setup is how the path displayed in the prompt was shortened.

I quickly found there is a setting to disable this.

> set `fish_prompt_pwd_dir_length` to the number of characters. Setting it to `0` or an invalid value will disable shortening entirely.

```sh
set fish_prompt_pwd_dir_length 0
```

## Fish Functions

There are some helpful functions built in to fish like `fish_add_path`.

> `fish_add_path` is a simple way to add more directories to fish’s PATH. It does this by adding the directories either to fish_user_paths or directly to PATH (if the --path switch is given).
> <cite>[fish_add_path - fish-shell documentation](https://fishshell.com/docs/current/cmds/fish_add_path.html)</cite>

```sh
## $PATH
###
# HOME
fish_add_path $HOME/bin
# NODEJS
fish_add_path $HOME/node/bin
# RUST
fish_add_path $HOME/.cargo/bin
```

## Fish Shell Additions

- [x] Atuin for Shell History
- [x] Replace `ls` with `eza`
- [x] Replace `tree` with `eza`
- [x] Zoxide for directory jumping
- [x] Fish function to extract compressed files
- [x] Support for extracting `.tar.zst`

### Atuin

> Atuin replaces your existing shell history with a SQLite database, and records additional context for your commands.
> <cite> [Github - atuinsh/atuin](https://github.com/atuinsh/atuin)</cite>

### eza

> eza is a modern alternative for the venerable file-listing command-line program ls that ships with Unix and Linux operating systems
> <cite> [Github - eza-community/eza](https://github.com/eza-community/eza)</cite>

### zoxide

> zoxide is a smarter cd command, It remembers which directories you use most frequently, so you can jump to them in just a few keystrokes.
> <cite> [Github - ajeetdsouza/zoxide](https://github.com/ajeetdsouza/zoxide)</cite>

## Download

The scripts and my dotfiles can be downloaded from github.

<a class="github" href="https://github.com/equk/dotfiles" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Download</a>
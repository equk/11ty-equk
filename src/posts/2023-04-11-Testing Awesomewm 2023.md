---
slug:
title: "Testing Awesomewm 2023"
date: 2023-04-11T09:36:57.088Z
draft: false
author: equilibriumuk
tags:
  - github
  - linux
  - lua
image:
---

I decided to give awesomewm a try again.<br />
Over the years I have tried awesome a few times but never really put too much effort into customizing it.

My main desktop window manager [since 2014 has been i3wm](/2014/05/29/switching-to-i3wm/) & the main setup *(key bindings, status bar etc)* has not really changed since then.

<p class="text-center"><img class="inline dark-logo" src="/media/logos/awesome.svg" alt="awesome-logo" width="75%"></p>

<blockquote>
<p><strong><em>What is Awesome Window Manager?</em></strong></p>
<p>awesome is a highly configurable, next generation framework window manager for X. It is very fast, extensible and licensed under the GNU GPLv2 license.</p>
<p>It is primarily targeted at power users, developers and any people dealing with every day computing tasks and who want to have fine-grained control on their graphical environment.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://awesomewm.org/" target="_blank" rel="noopener noreferrer">about - awesome window manager</a></cite>
</blockquote>

## Configuring Awesome

One of the main advantages to using awesome is the ability to script everything using `lua`.

## Replicating i3wm

At first I wanted to replicate a lot of things from my i3wm setup.

- [x] keybindings
- [x] status bar
- [x] launcher
- [x] autostart apps & daemons

With some searching, this was all possible.

### Problems

There were some problems in the way tiling works in awesome vs i3wm.

- [ ] tags are duplicated over monitors
- [ ] custom split sizes on tiling mode

As tags are duplicated, pressing mod+shift+4 moves the window to tag 4 on the current screen but on my i3wm setup this would be moved to my secondary screen as I have workspaces (tags in i3wm) set so odd numbers are assigned to primary monitor & all even numbers are assigned to the secondary monitor.

> I tried using awesome-sharedtags but this introduced a lot of problems

## Custom Split

In i3wm I normally have a screen with a 70% / 30% horizontal split with github on the 70% & social media (mastodon) on the 30%.<br />
This involves pressing `$mod +/-` to resize the split.

I wanted to script this to make it easier & automatic.

### layout-machi

After searching I found a library which adds functionality to create custom layouts.

Creating a 70% / 30% horizontal split

```lua
local mainsplit = machi.layout.create { default_cmd = '73h.' }
```

This works but does not behave as a tiling layout.<br />
As it's not a tiling layout, trying to move windows in directions does not work.

Also when opening a browser session with 2 windows open swaps the window locations.

## Advantages Over i3wm

- [x] Multiple layouts
- [x] Concept of master
- [x] `lua` scripting

# Testing Config

## Xephyr

It is possible to test config changes using Xephyr

```sh
Xephyr -br -ac -noreset -screen 800x600 :1 &
DISPLAY=:1 awesome
```

## Reload Awesome CLI

If you are testing a config live from the desktop & the lua code errors, keybinds do not fully load.<br />
In this case the CLI can be useful for reloading the config.

```sh
echo 'awesome.restart()' | awesome-client
```

# Notes

I'm still using i3wm as my main desktop.

My awesome config files are available on my dotfiles repo on github.<br />
I will probably look into fixing/scripting when I have spare time as it has some advantages over i3wm.

## Source

The source for awesome config is available in my dotfiles repo on github.

<a class="github" href="https://github.com/equk/dotfiles" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> dotfiles</a>
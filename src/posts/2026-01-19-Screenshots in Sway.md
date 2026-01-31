---
title: "Screenshots in Sway"
date: 2026-01-19T18:42:37.472Z
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
excerpt: "Capture Selection, Window or Monitor Using Grim & Sway"
---

<p class="text-center"><img class="inline" src="/media/logos/wayland.svg" alt="wayland-logo" width="25%"></p>

> [!note]
> This is an update to tools documented in a previous post<br> <a href="/2023/10/20/hyprland-screenshots-using-grim/" target="_blank" rel="noopener noreferrer">Hyprland Screenshots Using Grim - October 20, 2023</a>

I made some basic scripts for capturing screenshots in `sway` using `grim` as `scrot` doesn't have support for wayland.

## Changes

I updated the previous scripts by switching `hyprctl` with `swaymsg` to get the active window or active monitor.

I left the code used for hyprland commented in the scripts to make it easy to switch between sway & hyprland.

## Requirements

| App | Description |
|-|-|
| <a href="https://github.com/emersion/grim" target="_blank" rel="noopener noreferrer">Grim</a> | Screenshot utility for Wayland |
| <a href="https://github.com/emersion/slurp" target="_blank" rel="noopener noreferrer">Slurp</a> | Select a region in a Wayland compositor |
| <a href="https://swaywm.org/" target="_blank" rel="noopener noreferrer">Sway</a> | Tiling Wayland compositor and replacement for the i3 window manager |
| <a href="https://stedolan.github.io/jq/" target="_blank" rel="noopener noreferrer">jq</a> | Command-line JSON processor |

## Scripts

I made 3 scripts which all save screenshots in the same directory using the current date & time to provide a unique name.<br/>
The scripts save to `$HOME/Pictures/screenshots/` with unique filename `dd-mm-YYYY-HHSS`.

| Script | Description |
|-|-|
| screenshot | capture active monitor |
| screenactive | capture active window |
| screenselect | capture selection |

These scripts are available in the `bin` directory in my `dotfiles` repo on github.

<a class="github" href="https://github.com/equk/dotfiles/tree/master/configs/bin" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> dotfiles/config/bin</a>

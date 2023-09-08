---
title: "Switching to Wayland"
date: 2023-09-08T17:48:39.536Z
author: equilibriumuk
draft: false
tags:
  - github
  - linux
image:
imgAuthor:
imgAuthorURL:
---

<p class="text-center"><img class="inline" src="/media/logos/wayland.svg" alt="wayland-logo" width="25%"></p>

I decided to give wayland a try again with `hyprland`.<br />
I have tried switching to wayland a few times with `sway` but have always gone back to `i3wm`.

My main desktop window manager [since 2014 has been i3wm](/2014/05/29/switching-to-i3wm/).

<blockquote>
<p>
  Hyprland is a dynamic tiling
  <a href="https://wayland.freedesktop.org/" target="_blank" rel="noopener noreferrer">Wayland</a>
  compositor based on
  <a href="https://way-cooler.org/book/wlroots_introduction.html" target="_blank" rel="noopener noreferrer">wlroots</a>
  that doesn't sacrifice on its looks.
</p>
</blockquote>

## Screenshot

<a href="/media/images/2023/hyprland-04-09-2023.jpg"  target="_blank" rel="noopener noreferrer">

![hyprland screenshot](../_media/images/2023/hyprland-04-09-2023.jpg)

</a>

## Main Apps

| Application | Description |
| -- | -- |
| hyprland | a highly customizable dynamic tiling Wayland compositor based on wlroots |
| alacritty | a cross-platform, GPU-accelerated terminal emulator |
| wofi | a launcher for wlroots based wayland compositors |
| grim | Screenshot utility for Wayland |
| swayidle | Idle management daemon for Wayland |
| swaylock | Screen locker for Wayland |
| swaync | A simple notificaion daemon with a GTK panel |
| wl-clipboard | Command-line copy/paste utilities for Wayland |

## Default Configuration

There should be a example config installed with hyprland to get started with.<br/>
In archlinux this is `/usr/share/hyprland/hyprland.conf`.

The hyprland wiki has a lot of information on configuring hyprland.

<i class="fa fa-link"></i> <a href="https://wiki.hyprland.org/Configuring/Configuring-Hyprland/" target="_blank" rel="noopener noreferrer">Hyprland Wiki - Configuring Hyprland</a>

## Mouse Acceleration

The first thing I noticed after logging in to `hyprland` was that mouse movement felt different.

```properties
input {
  sensitivity = -0.5
  accel_profile = flat
}
```

This still feels different to my xorg config but it is much better than the default settings.

## Monitor Config

I have 2 monitors & in i3wm have odd numbered workspaces on the left monitor & even numbered workspaces on the right monitor.

```sh
$ hyprctl monitors
Monitor DP-2 (ID 0):
        1920x1080@75.000000 at 0x0
...
Monitor DP-3 (ID 1):
        1920x1080@75.000000 at 1920x0
...
```

`DP-2` is the left monitor & `DP-3` is the right monitor.

```properties
workspace = 1, monitor:DP-2
workspace = 2, monitor:DP-3
workspace = 3, monitor:DP-2
workspace = 4, monitor:DP-3
workspace = 5, monitor:DP-2
workspace = 6, monitor:DP-3
workspace = 7, monitor:DP-2
workspace = 8, monitor:DP-3
workspace = 9, monitor:DP-2
workspace = 10, monitor:DP-3
```

## Waybar

I decided to use `waybar` for the top statusbar as it seems similar to `i3bar` & has a lot of built in widgets making it easy to configure.<br/>
It also uses `css` for styling of elements.

### Widgets

<img src="/media/images/2023/waybar-vpn-down.png" alt="waybar screenshot">

There are a lot of builtin widgets in waybar, I use nerdfont patched fonts for adding icons.

### Fixing Workspace Switch in Hyprland

To use workspace switching in hyprland I had to use `hyprland/workspaces` instead of `sway/workspaces`

I also added mouse scroll to switch workspaces & click to select workspace.

```properties
    "hyprland/workspaces": {
        "format": "{name}",
        "on-scroll-up": "hyprctl dispatch workspace e+1",
        "on-scroll-down": "hyprctl dispatch workspace e-1",
        "on-click": "activate"
    },
```

### Multi Monitor Window Title

To display the title of the highlighted window change `sway/window` to `hyprland/window`.

```properties
    "modules-center": ["hyprland/window"]
```
Display title on each monitor.

```properties
    "hyprland/window": {
        "max-length": 200,
        "separate-outputs": true
    },
```

### Set Volume Using Scroll

Increment volume by `5%` using mouse scroll.

```properties
    "pulseaudio": {
        "scroll-step": 5,
        ...
        "on-click": "pavucontrol"
    }
```

## Keybinds

I was able to set keybinds the same as i3wm.

I also added new resize keybinds using arrow keys.

```properties
# resize split
bind = SUPER,left,resizeactive,-80 0
bind = SUPER,right,resizeactive,80 0
bind = SUPER,down,resizeactive,0 80
bind = SUPER,up,resizeactive,0 -80
```

## OBS Pipewire Capture

<blockquote>
<p>An XDG Desktop Portal (later called XDP) is a program that lets other applications communicate swiftly with the compositor through D-Bus</p><br/>
<cite><i class="fa fa-link"></i> <a href="https://wiki.hyprland.org/hyprland-wiki/pages/Useful-Utilities/Hyprland-desktop-portal/" target="_blank" rel="noopener noreferrer">Hyprland Wiki - Hyprland Desktop Portal</a></cite>
</blockquote>


```properties
exec-once=~/.config/hypr/scripts/xdg-desktop-portal-hyprland
```

`~/.config/hypr/scripts/xdg-desktop-portal-hyprland`

```bash
#!/bin/bash
sleep 1
killall -e xdg-desktop-portal-hyprland
killall -e xdg-desktop-portal-wlr
killall xdg-desktop-portal
/usr/lib/xdg-desktop-portal-hyprland &
sleep 2
/usr/lib/xdg-desktop-portal &
```

## Terminal Clipboard

*I use `tmux` for clipboard management with `alacritty` as it allows selecting text with mouse drag & paste using right click (no key combos required).*

Replace `xsel` with `wl-clipboard` commands in `tmux`.

```properties
# use wl-copy for clipboard
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "wl-copy"
# unbind right click menu
unbind-key -T root MouseDown3Pane
# paste using right click
bind-key -T root MouseDown3Pane run -b "wl-paste -n | tmux load-buffer - ; tmux paste-buffer"
```

## Env Variables

```properties
# Running programs natively under Wayland
env = QT_QPA_PLATFORM,wayland-egl
env = QT_WAYLAND_DISABLE_WINDOWDECORATION,1
env = SDL_VIDEODRIVER,wayland
env = ECORE_EVAS_ENGINE,wayland_egl
env = ELM_ENGINE,wayland_egl
```

<i class="fa fa-link"></i> <a href="https://github.com/swaywm/sway/wiki/Running-programs-natively-under-wayland" target="_blank" rel="noopener noreferrer">Sway Wiki - Running programs natively under Wayland</a>


### Electron Apps

Set electron powered apps to use wayland (archlinux).

`~/.config/electron-flags.conf`

```properties
--enable-features=UseOzonePlatform,WaylandWindowDecorations
--ozone-platform=wayland
```

### Visual Studio Code

Set vscode to use wayland (archlinux). `visual-studio-code-bin`

`~/.config/code-flags.conf`

```properties
--enable-features=UseOzonePlatform,WaylandWindowDecorations
--ozone-platform=wayland
```

## Notes

I have been using hyprland over the weekend & after doing a system update I rebooted to find hyprland would not start.<br/>
On searching online I found some tickets relating to issues with hyprland v0.29 so downgraded the package and suddenly everything worked again.

There are some tickets on wlroots gitlab saying they found the commit causing the problem.

<article class="message is-info">
  <div class="message-body">
    <p><i class="fa fa-info-circle"></i> There seems to be a problem with hyprland v0.29 with both AMD & NVIDIA drivers</p>
    <p><i class="fa fa-cog"></i> Downgrading to v0.28 fixes the problem</p>
  </div>
</article>

## Source

The source for my hyprland config is available in my dotfiles repo on github.

<a class="github" href="https://github.com/equk/dotfiles" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> dotfiles</a>
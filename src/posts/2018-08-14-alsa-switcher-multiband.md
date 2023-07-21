---
author: equilibriumuk
comments: true
date: 2018-08-14
draft: false
image:
tags:
  - linux
  - github
  - cli
title: ALSA Switcher & Multiband EQ
slug:
---

![alsa_soundcard_switch](../../src/_media/images/2018/08/alsa_soundcard_switch.png)

<br />

This is a script I made in 2017 but have recently uploaded to github.

Script & Config to utilize a Multiband EQ and switch between audio devices from the linux CLI.

- [x] ALSA (Advanced Linux Sound Architecture)
- [x] LADSPA (Linux Audio Developers Simple Plugin Architecture)
- [x] mbeq (ladspa plugin)

Currently the script switches between a USB DAC & a USB Headset.

The USB DAC (speakers) has no EQ & the USB Headset has a Multiband EQ (based on frequency response graph).

## Requirements

- asoundconf
- ncurses
- dialog
- ladspa
- alsa-plugins

## View & Download

<a href="https://github.com/equk/alsa-sw-eq" target="_blank" rel="noopener noreferrer" aria-label="view alsa-sw-eq on github"><i class="fa fa-github-alt"></i> github repo for alsa-sw-eq</a>

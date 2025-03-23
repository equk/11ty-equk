---
slug:
title: "Brave Browser Profiles"
date: 2021-09-22T18:34:58.217Z
draft: false
author: equilibriumuk
tags:
  - github
  - google
  - linux
image:
---

<p class="text-center"><img src="/media/logos/brave.svg" alt="brave-logo" class="inline dark-logo" width="150px"></p>

I decided to change my main browser from Firefox to Brave after getting annoyed with Firefox design changes & poor User Experience.

Brave has been my main browser on Android for years & I have previously tried using it on linux a few times before but never really used it as my main desktop browser.

I adapted my chromium profile script for use with Brave Browser.

<p class="text-center"><img src="/media/images/2021/brave_linux.png" alt="brave-linux"></p>

## Script Features

- [x] Easy creation of profiles
- [x] Sandbox Check
- [x] Custom commandline flags
- [x] Detect associated Google Account & alert user

<p class="text-center"><img src="/media/images/2021/brave_notify.png" alt="brave-notify" class="inline"></p>

## Options

The main variables are kept at the top of the script making it easy to add or remove commandline options etc.

```bash
## variables

profile_folder="$HOME/.brave_profiles/$profile_name"
brave_bin="/usr/bin/brave"
brave_flags="--ssl-version-min=tls1 --enable-smooth-scrolling --enable-tab-audio-muting"
```

## Google Account Cookie

After looking into how Brave creates profiles I found it keeps a reference to the Google Account Cookie if a user logs in to Google services.

This can be queried from the command line in linux & is stored as json.<br />
On querying a user can see the name of the Google Account, the Cookie hash & the Gmail address.<br />
I'm not sure if this is for extended features for Google services or analytics.

One use for this is to trigger an alert to users on starting profiles with an associated Google account.

I personally use a different profile for Google services to keep things seperated so having an alert should at least let me know if I've accidently logged into google on my other profiles.

## Download

You can download my linux brave profile scripts from Github.

<a class="github" href="https://github.com/equk/brave-profiles" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> brave-profiles</a>

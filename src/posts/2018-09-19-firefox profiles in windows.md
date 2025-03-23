---
author: equilibriumuk
comments: true
date: 2018-09-19T18:42:25+01:00
draft: false
image: ../_media/images/2018/09/mozilla_header.jpg
menu: ""
share: true
tags:
- firefox
- github
- windows
- tweaks
- mozilla
- powershell
title: Firefox Profiles In Windows
url: ""
---

<p class="text-center"><img src="/media/images/2018/09/logo-quantum.png" alt="firefox_logo"></p>

The purpose of this project is to provide a way to create new firefox profiles with security & privacy settings already preset.<br/>
I have also added some style customizations using userChrome.css which is also included in the creation of each profile.

*The idea comes from my linux profile tools which are documented in a previous blog post: <a href="/2018/09/12/firefox-profile-tools/" target="_blank">Firefox Profile Tools</a>*

## Features

creation of new profiles with:

* security & privacy related settings
* custom style overrides
* use RAM for caching
* custom find (top-right drop-down)
* shortcut to each profile

The script uses hardlinks to fix the issue in Windows 10 where you cannot pin firefox more than once.<br/>
With this script you can have a pinned shortcut on the start menu & the taskbar for each profile.

## Custom Styles

I have changed some of the default styling of firefox using a `userChrome.css` file.

<p class="text-center"><img src="/media/images/2018/09/ffox_win_profile.jpg" alt="firefox_banner"></p>

### userChrome.css styles

* move find bar to top
* move find to right styled as a dropdown
* add padding to items on bookmarks bar
* change folder icon in bookmarks to adwaita

## Usage

Download or clone <a href="https://github.com/equk/ffox_profiles_win" target="_blank">repo from <i class="fa-brands fa-github"></i> github</a>.

Edit `ffox_profiles.ps1` & add profiles you require to the profiles array<br/>
Run the script as an administrator<br/>
Pin shortcuts to each profile to the start menu / taskbar

The default path for created profiles is `My Documents\ffox_profiles`
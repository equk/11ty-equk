---
author: equilibriumuk
comments: true
date: 2018-09-12T19:12:29+01:00
draft: false
image: ../_media/images/2018/09/mozilla_header.jpg
menu: ""
share: true
tags:
- firefox
- github
- linux
- tweaks
- mozilla
title: Firefox Profile Tools
url: ""
---

I recently decided to give firefox a go again and so far it seems a lot better than chromium / chrome.<br/>
I found myself adding to <a href="/2015/05/19/firefox-scripts/" target="_blank">my old profile scripts & configs</a> so have decided to make it into a small project.

<p class="text-center"><img src="/media/images/2018/09/logo-quantum.png" alt="firefox_logo"></p>

The purpose of this project is to provide a way to create new firefox profiles with security & privacy settings already preset.<br/>
I have also added some style customizations using userChrome.css which is also included in the creation of each profile.

*The original script was made in 2015 & documented in a previous blog post: <a href="/2015/05/19/firefox-scripts/" target="_blank">Firefox Tweaks & Scripts</a>*


## Features

Creation of new profiles with:

* security & privacy related settings
* custom style overrides
* use RAM for caching
* custom find (top-right drop-down)
* checks for user namespaces (used for sandboxing)

## Custom Styles

I have changed some of the default styling of firefox using a `userChrome.css` file.

<p class="text-center"><img src="/media/images/2018/09/ffox_styles_62.png" alt="firefox_banner"></p>

### userChrome.css styles

* move find bar to top
* move find to right styled as a dropdown
* add padding to items on bookmarks bar
* change folder icon in bookmarks to adwaita

## Usage

Download or clone <a href="https://github.com/equk/ffox_profile_tools" target="_blank">repo from <i class="fa fa-github-alt"></i> github</a>.

You can then rename/copy the script to the profile name required *(script filename = profile name)*.<br/>
Optionally you may also want to change the `profile_folder` variable *(default is ~/.ffox_profiles)*.

The full path for the default profile is `~/.ffox_profiles/firefox`

## Download

The project can be downloaded from the <a href="https://github.com/equk/ffox_profile_tools" target="_blank">ffox_profile_tools repo on my <i class="fa fa-github-alt"></i> github</a>.
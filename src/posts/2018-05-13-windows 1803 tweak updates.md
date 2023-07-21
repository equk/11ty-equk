---
author: equilibriumuk
comments: true
date: 2018-05-17T14:37:52+01:00
draft: false
image:
menu: ""
share: true
tags:
- windows
- security
- microsoft
- powershell
- github
title: Windows 10 1803 Tweak Updates
url: ""
---

<p class="text-center"><img src="/media/images/2015/09/Windows10Logo.png" alt="win10logo"></p>

I have added some new features to my windows 10 powershell scripts on github as there are a lot of changes with 1803.

### Changes I noticed on installing the update

- Cortana persistence seems to have changed
- Edge browser runs in the background
- Windows People Experience
- Start menu includes even more game shortcuts
- Windows Defender has automatic sample submission
- Windows Store is the only way to install apps

### Windows 10 1803 First Boot

<p class="text-center"><img src="/media/images/2018/05/1803_first_boot.jpg" alt="1803_first_boot"></p>

<p class="text-center"><em>does this look like a professional desktop OS ?</em></p>

### Cortana

Cortana seems to have more than one process running making it harder to remove.<br/>
*A lot of people seem to have missed this*.

Microsoft seem to have removed the GPO for disabling cortana in Software Policies.

### Microsoft Edge

Microsoft Edge *(Internet Explorer)* seems to have a background process running at all times <a href="https://twitter.com/equilibriumuk/status/992784485560324096" target="_blank">*(MicrosoftEdgeCP.exe)*</a>.

<p class="text-center"><a href="https://twitter.com/equilibriumuk/status/992784485560324096" target="_blank"><img src="/media/images/2018/05/msedge_chrome.jpg" alt="msedge 1803"></a></p>

### Windows Store

On a default install windows will attempt to force you to install applications via the windows store suggesting apps outside of the store could be malicious.

## Scripts New Features / Changes

- remove edge browser
- remove cortana (rem-sysapps script updated for 1803)
- remove people experience
- disable windows defender automatic submission
- remove unwanted windows optional features
- allow installing of apps outside of windows store
- remove windows store
- disable adverts on lockscreen
- disable adverts on start menu

*note: install chrome, brave or firefox before you remove microsoft edge browser*

More information regarding the scripts can be found on <a href="https://github.com/equk/windows" target="_blank"><i class="fa fa-github-alt"></i> github</a>.


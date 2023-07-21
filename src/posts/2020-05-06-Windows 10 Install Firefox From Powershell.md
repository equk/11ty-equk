---
slug:
title: "Installing Firefox Using Powershell"
date: 2020-05-06T08:38:32.507Z
draft: false
author: equilibriumuk
tags:
  - windows
  - microsoft
  - powershell
  - github
  - firefox
image: ../_media/images/firefox_large_logo.png
---

After rebuilding a few VMs the other day I noticed on doing a new install of Windows 10 it seemed impossible to download & install firefox using Microsoft Edge Browser.<br />
It seemed windows was blocking execution of any `exe` downloaded via Edge.

I ended up using Powershell to download the installer using `Invoke-WebRequest`.

I then automated it by creating a `powershell` script to download & install the latest stable version of Mozilla Firefox.<br />
This removes any requirement to use Microsoft Edge.

<article class="message is-info">
  <div class="message-body">
    <p><em>I remove Microsoft Edge on a new install of Windows 10 using <code>rem-msedge.ps1</code> (available on github)</em></p>
  </div>
</article>

## Firefox Install Script

- [x] Download Mozilla Firefox
- [x] Install Mozilla Firefox
- [x] No dependence on Edge
- [x] Checks for existing installer
- [x] Can be run on a new install of Windows 10

<p class="text-center"><a href="https://www.mozilla.org/en-US/firefox" aria-label="Download Firefox" target="_blank" rel="noopener noreferrer"><img src="/media/logos/firefox.svg" alt="firefox_logo" width="128px" class="inline"></a> <img src="/media/logos/powershell.svg" alt="powershell_logo" width="128px" class="inline"></p>

The script uses `Invoke-WebRequest` to download the latest build of firefox available.

<a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest" aria-label="View Article on Microsoft Docs" target="_blank" rel="noopener noreferrer">📝 Microsoft Powershell Docs Invoke-WebRequest</a>

## Download

The full script can be downloaded from my windows repo on github.

<p><a class="github" href="https://github.com/equk/windows/blob/master/windows_10/firefox-inst.ps1" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> firefox-inst.ps1</a> <a class="github" href="https://github.com/equk/windows/" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> windows</a></p>

---
slug:
title: Windows 10 2004 Tweak Updates
date: 2020-08-10T12:41:30.247Z
draft: false
author: equilibriumuk
tags:
  - windows
  - security
  - microsoft
  - powershell
  - github
image:
---

<p class="text-center"><img src="/media/images/2015/09/Windows10Logo.png" alt="win10logo"></p><br/>

I've updated my windows tweak scripts to reflect changes in Windows 10 2004.<br/>
There are new features & changes with 2004 which effect the way the scripts work.

## Windows 10 2004 Changes

- Windows Defender Detects Changes to HOSTS File
- Windows Defender Potentially Unwanted App (PUA) App Blocking Protection
- Cortana renamed from `Microsoft.Windows.Cortana` to `Microsoft.Windows.Search`
- Cortana install path changed
- Cortana background process changed

<article class="message is-info">
  <div class="message-body">
    HOSTS file changes are detected as this is a known vector for malware.<br/>
If you make changes yourself you can simply click Allow.
  </div>
</article>

PUA protection has been known to remove some apps people find useful & it can be disabled if it causes problems.

```ps
Set-MpPreference -PUAProtection 0
```

<article class="message is-warning">
  <div class="message-body">
    PUA protection may be useful so it's really down to personal preference.
  </div>
</article>

## Changes

- [x] Added info regarding windows 10 2004 update & changes to cortana
- [x] Added new cortana path & executable to `rem-sysapps`
- [x] Added new cortana path & executable to `rem-cortana`
- [x] Added information regarding windows defender potential problems
- [x] Added windows 10 2004 new services info
- [x] Added windows 10 2004 new scheduled tasks info
- [x] Added windows 10 2004 new install apps info
- [x] Added `2004_changes.md` - basic diff ref services, tasks & apps

## Features

- [x] Disable Telemetry
- [x] Disable Problem Steps Recorder
- [x] Disable Application Impact Telemetry
- [x] Disable Customer Experience Improvement Program
- [x] Disable Unwanted Scheduled Tasks
- [x] Disable Unwanted Services
- [x] Disable SMB1 Protocol
- [x] Disable Cortana / Search
- [x] Disable Windows Store Restrictions
- [x] Set Windows Update Settings Using Group Policy
- [x] Remove Unwanted Apps
- [x] Remove Cortana / Search
- [x] Remove Microsoft OneDrive
- [x] Remove Microsoft Edge Browser
- [x] Download & Install Firefox Using Powershell

## Download

The tweak scripts can be downloaded from my windows repo on github.

<p><a class="github" href="https://github.com/equk/windows/" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> windows</a></p>
---
slug:
title: "Windows 10 21h2 Tweak Updates"
date: 2021-12-28T11:45:25.377Z
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

I've updated my windows tweak scripts to reflect changes in Windows 10 21H2.<br/>
There are new features & changes with 21H2 which effect the way the scripts work.

## Windows 10 21H2 Changes

- [x] Added `cleanup-windows` script
- [x] Moved scripts to `old/` folder
- [x] Created `firewall` folder to seperate scripts
- [x] Added feature: disable news & interests in taskbar
- [x] Added disable meet now feature to `misc-tweaks` script

## Windows Cleanup

The main addition to scripts is `cleanup-windows.ps1`.<br />
This script removes unwanted apps, features & sponsored apps.

### Microsoft Apps Removed

<div class="columns">
    <div class="column">
        <ul class="contains-task-list">
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> BingWeather</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> OneNote</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Office Hub</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Solitaire Collection</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> People</li>
</ul>
    </div>
    <div class="column">
        <ul class="contains-task-list">
        <li class="task-list-item"><input type="checkbox" checked="" disabled=""> Skype</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Windows Maps</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Zune Music</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Zune Video</li>
        </ul>
    </div>
</div>

### Sponsored Apps Removed

<div class="columns">
    <div class="column">
        <ul class="contains-task-list">
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Bubble Witch</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Candy Crush</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Dolby</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Duolingo</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Facebook</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Flipboard</li>
</ul>
    </div>
    <div class="column">
        <ul class="contains-task-list">
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Pandora</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Royal Revolt</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Spotify</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Sway</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Twitter</li>
<li class="task-list-item"><input type="checkbox" checked="" disabled=""> Wunderlist</li>
        </ul>
    </div>
</div>

## Features

- [x] Disable Telemetry
- [x] Disable Problem Steps Recorder
- [x] Disable Application Impact Telemetry
- [x] Disable Customer Experience Improvement Program
- [x] Disable Unwanted Scheduled Tasks
- [x] Disable Unwanted Services
- [x] Disable Windows Store Restrictions
- [x] Remove Unwanted Apps
- [x] Remove Sponsored Apps (eg: spotify, facebook, disney+)
- [x] Download & Install Firefox Using Powershell

## Windows 10 21H2 Information

- [x] System Apps now have uninstall options
- [x] Includes stable Microsoft Edge
- [x] Windows Hello Face
- [x] Windows Meet Now

## Notes

Cortana can now be removed in add/remove programs.<br />
This means there is no need for the Cortana removal scripts (they can still be found in the `old` folder).

*You may also want to remove additional features like Windows Hello Face & Windows Meet Now.*

## Download

The tweak scripts can be downloaded from my windows repo on github.

<p><a class="github" href="https://github.com/equk/windows/" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> windows</a></p>
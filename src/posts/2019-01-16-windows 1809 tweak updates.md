---
author: equilibriumuk
comments: true
date: 2019-01-16T18:41:27Z
draft: false
image:
menu: ""
share: true
category: windows
tags:
  - windows
  - security
  - microsoft
  - powershell
  - github
title: Windows 10 1809 Tweak Updates
url: ""
---

<p class="text-center"><img src="/media/images/2015/09/Windows10Logo.png" alt="win10logo"></p><br/>

As it's the new year I've updated my windows tweak scripts on <a href="https://github.com/equk/windows" target="_blank"><i class="fa fa-github-alt"></i> github</a> to reflect changes in Windows 10 1809.

## Changes

- [x] Updated telemetry_hosts list with ~150 more hosts
- [x] Added new power scheme script for desktops & servers
- [x] New information lists added relating to clean install of 1809
- [x] README files cleaned up with new information

## Features

- [x] Disable Telemetry
- [x] Disable Problem Steps Recorder
- [x] Disable Application Impact Telemetry
- [x] Disable Customer Experience Improvement Program
- [x] Disable Unwanted Scheduled Tasks
- [x] Disable Unwanted Services
- [x] Disable SMB1 Protocol
- [x] Disable Cortana
- [x] Disable Windows Store Restrictions
- [x] Set Windows Update Settings Using Group Policy
- [x] Remove Unwanted Apps
- [x] Remove Cortana
- [x] Remove Microsoft OneDrive
- [x] Remove Microsoft Edge Browser

## Blocklists

- [x] Automate Firewall Rules Using IP Blocklists
- [x] Automate Hosts Blocking Using DNS Blocklists

## Windows 10 1809 Information

- [x] Installed Applications List
- [x] List of Scheduled Tasks
- [x] List of Services

## Notes

Microsoft Edge browser background process re-spawns the cortana searchui process if it gets killed.<br/>
_It is possible to remove cortana after removing msedge._

_Some windows updates reinstall Cortana & Edge (they can be removed again with scripts)_

More information regarding the scripts can be found on <a href="https://github.com/equk/windows" target="_blank"><i class="fa fa-github-alt"></i> github</a>.

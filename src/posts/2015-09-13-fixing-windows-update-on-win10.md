---
date: 2015-09-13T12:18:16Z
image: ../_media/images/2015/09/powershell_banner.jpg
tags:
- windows
- microsoft
- powershell
title: Fixing Windows Update on Windows 10 Pro
slug: fixing-windows-update-on-win10/
---

<p class="text-center"><img src="/media/images/2015/09/Windows10Logo.png" alt="win10logo"></p>

A lot of people have been complaining that Windows 10 has no option within settings to change the way Windows Update works.
This is true in the sense that the GUI only shows 2 options.

You can however use software policies to force these settings, this option is probably included for large companies who don't really want to have hundreds of systems downloading every update as it comes out & prompting the users to reboot.

The registry path we are interested in is:

	HKLM:\SOFTWARE\Wow6432Node\Policies\Microsoft\Windows\WindowsUpdate\AU

There are various settings and options, the main one is AUOptions.

    AUOptions      : 0 - Default (Uses Settings UI Which Is Limited In WIN10)
                     1 - Never Check
                     2 - Notify
                     3 - Download & Notify
                     4 - Auto Download & Schedule Install

I personally use option 2 as I like windows to notify me of updates so I can install them & reboot when I have time.

Automating the setting of these keys is relatively simple using Powershell.
I have coded a script to set the Automatic Updates to notify & also disable DeliveryOptimization.
The script can be <a href="https://github.com/equk/windows/blob/master/windows_10/set-windowsupdate.ps1" target="_blank">downloaded form my github.</a>

Below is what you should see once the settings are set correctly (run the script & reboot).

<p class="text-center"><img src="/media/images/2015/09/win10_updates.jpg" alt="win10logo"></p>

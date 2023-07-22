---
date: 2015-09-13T12:16:38Z
image: ../_media/images/2015/09/powershell_banner.jpg
tags:
- security
- windows
- microsoft
- powershell
title: Tweaking Windows 10 With Powershell
slug: tweaking-windows-10-with-powershell/
---

<p class="text-center"><img src="/media/images/2015/09/Windows10Logo.png" alt="win10logo"></p>

I have been watching over Windows 10 since it's release.
There seem to be a lot of privacy & security concerns caused by a lot of Windows 10 features (eg: cortana search).
*note: make sure you use custom install so you can set the correct privacy settings (<a href="https://equk.co.uk/2014/11/20/windows-8-1-share-browsing-history-location/" target="_blank">just like on windows 8.1</a>). <a href="http://www.howtogeek.com/224352/what%E2%80%99s-the-difference-between-windows-10%E2%80%99s-express-or-custom-setup/" target="_blank">here is a windows 10 specific guide</a>*

Some basic tweaks for fixing/mitigating information leaking include disabling & blocking telemetry.

**Disable Telemetry In Powershell:**

	mkdir -Force "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection"
    sp "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection" "AllowTelemetry" 0
    sp "HKLM:\SOFTWARE\Wow6432Node\Policies\Microsoft\Windows\DataCollection" "AllowTelemetry" 0

A lot of people are also using a HOSTS file to block the servers.

## Disabling Services

To save time doing this manually I have <a href="https://github.com/equk/windows/blob/master/windows_10/disable-services.ps1" target="_blank">coded a powershell script.</a>
The default options disable a lot of services relating to information exposure/leaking.
I have layed out the services list to be easily edited depending on the environment, eg: people who use Windows 10 for gaming may want to use the Xbox Live services.

**Services Considered To Have Spying/Leaking Capabilities:**

    Data Collection and Publishing Service
    Microsoft (R) Diagnostics Hub Standard Collector Service
    Diagnostics Tracking Service
    Sensor Monitoring Service
    WAP Push Message Routing Service
    Geolocation Service
    Downloaded Maps Manager
    Net.Tcp Port Sharing Service
    Routing and Remote Access
    Remote Registry
    Internet Connection Sharing (ICS)
    Distributed Link Tracking Client
    Windows Biometric Service
    Windows Media Player Network Sharing Service
    Windows Search

Most of these are self explanatory.
<p class="text-center"><img src="/media/images/2015/09/cortana_logo.jpg" alt="cortanalogo"></p>
A little more detail on **Windows Search**
Cortana in Windows 10 references internet history from Edge, metadata from emails, indexed files on local filesystems, email contacts & applications installed. (cortana also stores location based information long/lat & the time the location was visited)
A lot of the Microsoft core applications use EDB databases to store information making it easier for Cortana to access it (which also means data recovery/surveillance specialists can access it with relative ease).

## Disabling Built-in Tasks

By default there are also a lot of scheduled tasks within Windows 10.
The main ones to note are Customer & Application Experience tasks.

    TaskPath                                       TaskName                          State
    --------                                       --------                          -----
    \Microsoft\Windows\AppID\                      SmartScreenSpecific               Disabled
    \Microsoft\Windows\Application Experience\     Microsoft Compatibility Appraiser Disabled
    \Microsoft\Windows\Application Experience\     ProgramDataUpdater                Disabled
    \Microsoft\Windows\Autochk\                    Proxy                             Disabled
    \Microsoft\Windows\Customer Experience Impr... Consolidator                      Disabled
    \Microsoft\Windows\Customer Experience Impr... KernelCeipTask                    Disabled
    \Microsoft\Windows\Customer Experience Impr... UsbCeip                           Disabled
    \Microsoft\Windows\DiskDiagnostic\             Microsoft-Windows-DiskDiagnost... Disabled
    \Microsoft\Windows\DiskDiagnostic\             Microsoft-Windows-DiskDiagnost... Disabled
    \Microsoft\Windows\PI\                         Sqm-Tasks                         Disabled

## Powershell Scripts

I have coded 2 Powershell scripts to automate disabling of services and scheduled tasks.
Both of the <a href="https://github.com/equk/windows/tree/master/windows_10" target="_blank">scripts are available for download on my github.</a>
They are both layed out very similarly making it easy for people to comment out (or add) to the lists.

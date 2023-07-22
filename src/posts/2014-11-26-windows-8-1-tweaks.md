---
date: 2014-11-26T13:20:30Z
title: Windows 8.1 Tweaks
slug: windows-8-1-tweaks/
tags:
  - windows
  - microsoft
---

<p class="text-center"><img src="/media/images/2014/Nov/win81_header.jpg" alt=""></p>

## Intro

I work as a Server Administrator / IT Technician / IT Consultant.
I mainly admin linux servers but also support windows servers and networks.
Over the past 6 months I have seen an increase of malware infected windows systems and decided to write a mini tweaks page (similar to my windows 7 tweaks page I wrote in 2009).

<p class="text-center"><img src="/media/images/2014/Nov/win8_privacy_banner.jpg" alt=""></p>

The first thing is when installing Windows 8.1 make sure you select your privacy options correctly (read [this post](https://equk.co.uk/2014/11/20/windows-8-1-share-browsing-history-location/) for more detail).

## General Tweaks

Run these scripts in Command Prompt as Administrator.
Press START+X on keyboard and click Command Prompt as Administrator.

### Disable Hibernate

    powercfg.exe /hibernate off

### Cleanup Start Apps

_This command needs to be run in Windows PowerShell as Administrator._

    Get-AppxPackage -AllUsers | Remove-AppxPackage

Personally, I don't use the start menu for anything in windows (I use WIN+S as a launcher).

<p class="text-center"><img src="/media/images/2014/Nov/win8_start_default_300.jpg" alt=""> <img src="/media/images/2014/Nov/win8_start_clean_300.jpg" alt=""></p>

One thing that is annoying is the way apps/tiles on the start menu connect to the internet, pulling in un-needed data (also sending location data if you have it enabled for weather updates).
I always run this script to cleanup the menu as it clears some resources and also stops random network usage.

### Run Windows System Assessment Tool

    winsat formal -v

This will test the system and set specific options within the registry to tweak things like prefetch depending on whether you have a SSD etc.
_There is a bug with windows 8.1 update where prefetch seems to be enabled on SSDs causing problems but this command should also fix that._

## Network Tweaks

I wrote a script on my old website from 2009 for windows 7 to tweak network interfaces in an attempt to improve latency.
The script sets **TcpAckFrequency** and **TCPNoDelay** in the registry for all network adapters.
You can download the script [from my github](https://raw.githubusercontent.com/equk/windows/master/tweaks/net_tweaks.cmd).
Once downloaded, right click the file and click run as administrator.
Then reboot to apply the changes.

## Use a RAMDisk

RAMDisks are very useful for speeding things up (they are used more in linux).
Using RAMDisks for temporary storage is best as they are a volatile medium and should not be relied on for important data.

<p class="text-center"><img alt="crystaldisk_ddr3" src="/media/images/2014/Nov/crystaldisk_ddr3.jpg"></p>
I personally use a [RAMDisk for cache in google chrome](https://equk.co.uk/2013/05/05/using-a-ramdisk-in-windows-for-browser-cache/).
**Note:** *Do not use amd radeonmemory ramdisk as there is no option to not save the disk on shutdown.*

## Security Software

I use various security products for windows but am not going to go into too much detail here as it's really down to personal preference.

I'm not going to tell people which antivirus product to use but it might be worth looking at av-test.org to get a comparison.
At the time of writing this article, **Microsoft Windows Defender** (the antivirus which comes with Windows 8.1) scored **0/6 for protection**, [missing 33% of 0-day threats in September 2014](http://www.av-test.org/en/antivirus/home-windows/windows-8/october-2014/microsoft-windows-defender-4.4-144071/).

[Here is the comparison for av-test.org from October 2014](http://www.av-test.org/en/antivirus/home-windows/windows-8/october-2014/).

I personally use a custom setup with sandboxing, HIPS, software firewall, hosts blocking, cookie whitelisting, javascript whitelisting, Enforced HTTPS & TLS cert revocation.
My system is also behind a Linux firewall.

_Being honest, most people have malware through installing questionable software or using peer-to-peer networks._

## Web Browsers

<p class="text-center"><img src="/media/images/2014/Nov/google_chrome_ico_128.png"> <img src="/media/images/2014/Nov/firefox_ico_128.png" alt=""> <img src="/media/images/2014/Nov/ie_11_ico_128.png" alt=""></p>

**Search Engine**

I personally change the default search engine on all browsers to DuckDuckGo

**Google Chrome Extensions**

Disconnect
Tampermonkey
HTTPS Everywhere
Adblock Pro

(optional) Vanilla Cookie Manager

**Firefox Add-Ons**

Disconnect
Greasemonkey
HTTPS Everywhere (available from EFF.org)
Adblock Edge

(optional) NoScript

**Internet Explorer 11**

Install Tracking Protection

Go to tools > internet options > programs(tab) > Manage add-ons > Tracking Protection > Get a Tracking Protection List online ...

_Disable the annoying default start page (seems aimed at 13yr old girls)_

## Other Tweaks

_these are more specific but might be of use_<br/>

### Use dnscrypt without OpenDNS
My article regarding this:
[Using DNSCrypt WITHOUT OpenDNS](https://equk.co.uk/2014/04/07/using-dnscrypt-without-opendns/)

**Reasons to drop opendns:**<br/>
_everything is logged<br/>
opendns control, change & block (without you knowing)
opendns guide
possible security issues with dns hijacking way of providing transparent CDN for google services (see image below)_

<p class="text-center"><img alt="plusnet_google_ssl" width="300px" src="/media/images/2014/Sep/plusnet_google_ssl.png"></p>

### Remove Activex Flashplayer
_Microsoft included flashplayer as part of the OS and gave you no uninstall option._<br/>
Also google chrome has pepper flash so you don't have to install flash or its updater.

### Move Pagefile
This is optional but recommended if you have a SSD

### Disable Indexing of File Contents
Indexing the contents of files doesn't seem like a feature that would be very beneficial.
It also uses a lot of resources.

### Feedback
If you have any suggestions, additions, questions or comments please leave a comment using disquss.

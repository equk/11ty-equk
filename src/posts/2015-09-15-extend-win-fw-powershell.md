---
date: 2015-09-15T16:15:00Z
tags:
  - github
  - security
  - windows
  - firewall
  - powershell
title: Extending Windows Firewall With Powershell
slug: extend-win-fw-powershell/
---

<p class="text-center"><img src="/media/images/2015/09/powershell_banner.jpg" alt="powershell banner"></p>

The GUI with Windows Firewall isn't the prettiest & adding multiple rules within the GUI is pretty tiresome ( _so why not automate it?_ ).

A lot of people use custom software firewalls but Windows Firewall is actually pretty good when working on large corporate networks, automating things with Group Policies & Powershell can be fun.

Here are some simple scripts which should help both power users & systems administrators.
The main task I found tiresome is adding IP specific blocks, especially when there are multiple IPs involved.

I first made a script to simply block a single IP.

```powershell
.\fw-block.ps1 add 94.229.78.58
```

I then expanded on this script, adding the ability to use blocklists.

### Windows Firewall IP Blocklist Script

This script allows you to block based on a blocklist provided.
_The blocklist should be a text file with IP addresses on each line._

The script syntax is pretty simple & has 3 parameters.

```powershell
fw-blocklist.ps1 [-Action] <String> -BlockList <String> [-BlockGroup <String>]
```

BlockGroup is optional, the default group name is "CLI Added IP Blocklist"
You should see each rule created in the CLI.

```powershell
DisplayName           : BlockList 94.229.78.58
Description           :
DisplayGroup          : CLI Added IP BlockList
Group                 : CLI Added IP BlockList
Enabled               : True
Profile               : Any
```

Here is how the rules screen should look in the Windows Firewall with Advanced Security view after successfully adding a blocklist.

<p class="text-center"><img src="/media/images/2015/09/fw_blocklist.png" alt="wfirewall"></p>

To remove a blocklist simply use the remove action, this will remove the IP addresses listed within the blocklist you provide.

The scripts can be downloaded from <a href="https://github.com/equk/windows/tree/master/windows_10" target="_blank">my windows <i class="fa fa-github-alt"></i> github repo</a>.

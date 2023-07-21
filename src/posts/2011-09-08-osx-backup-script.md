---
author: equilibriumuk
comments: true
date: 2011-09-08T10:01:48Z
draft: false
image:
menu: ""
share: true
tags:
- apple
- mac
- github
title: OSX User Backup Script
url: ""
---

I just made a new rsync script for backing up user folders in osx as I got fed up with time machine grinding the harddrive &amp; only really need to do full system backups periodically (ie- not everyday).

It’s based on my old linux home backup script but tweaked with some new variables and general bug fixes (like checking for input before trying to run a rsync).

    #
    # osx_user_backup  Copyright (C) 2011
    # This program comes with ABSOLUTELY NO WARRANTY.
    # This is free software, and you are welcome to redistribute it
    # under certain conditions. See GNU GPLv3.
    #
    ::  Starting Sync Process to: /Volumes/-snip-
    ::  Backing up Documents Folder
    ::  Documents Sync Complete
    ::  log saved to /-snip-/log.txt
    ::  Backing up Pictures Folder
    ::  Pictures Sync Complete
    ::  log saved to /-snip-/log2.txt

I noticed there are a lot of graphical rsync programs for osx but I like cli.
Also you can set this up on a cron job.

No more drive grinding and it’s a lot quicker as it only syncs changes made.

<strong>Update:</strong>

<img src="/media/images/2011/09/osx_backup_growl.png" alt="osx backup growl" />The script now has growl support.
Mainly for use with cron jobs so you can get a simple notification of when a backup has taken place.

It’s pretty simple but the script saves log files so if there’s trouble you can still check those.
Any suggestions on how to improve the script etc are appreciated as I’ve only just really moved from linux to osx so growl etc is new to me.

~~View/Download the script at <a title="equk osx github" href="https://github.com/equk/osx" target="_blank">github</a>~~

Updated link: <a href="https://github.com/equk/macos/blob/master/old/osx_user_backup.sh" target="_blank"><i class="fa fa-github-alt"></i> github</a>

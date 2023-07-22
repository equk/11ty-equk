---
date: 2010-10-12T10:00:00Z
tags:
  - linux
  - chromium
  - ramdisk
title: save chromium profile to ramdisk
slug: save-chromium-profile-to-ramdisk/
---

This is a follow on from the <a href="http://blog.equk.co.uk/2010/10/using-a-ramdisk-to-speed-up-linux-keep-disk-writes-down/" target="_blank">previous article on creating a ramdisk for /tmp</a>
You probably know google chromium reads and writes a lot to the drive due to caching etc (causing potential problems for SSD owners)
With a few tools we can relocate the userdata and profile to the /tmp ramdrive which will make chromium a lot quicker and also give your harddrive less of a hard time.
You will need to install rsync (would expect most people to have this already).
The script:

    #!/bin/bash
    #
    # sync chrome profile to ramdisk on /tmp with seperate user profiles
    #
    # wp.equk.co.uk
    STATIC=chrome
    LINK=chromium
    PROFILE=/tmp/$USER/chromium

    cd ~/.config/

    [[ -r $PROFILE ]] || install -dm700 $PROFILE

    if [[ `readlink $LINK` != $PROFILE ]]; then
      mv $LINK $STATIC
      ln -s $PROFILE $LINK
    fi

    if [[ -e $LINK/.unpacked ]]; then
      rsync -av --delete --exclude .unpacked ./$LINK/ ./$STATIC/
    else
      rsync -av ./$STATIC/ ./$LINK/
      touch $LINK/.unpacked
    fi

Save this script wherever you want (eg /usr/share/bin).

Then you need to add the script to crontab or somewhere on login/logout (you will need it to sync when you logout as on reboot it will be cleared)

You can also download/view this script <a href="http://github.com/equk/linux/blob/master/scripts/chrome_sync.sh" target="_blank">on my github</a>.
Any suggestions on any improvements are appreciated.

**note:** _google have added a commandline option within chrome to set the cache directory and I have a new script which replaces this one._<br/>
_The new script saves temporary data to the ramdisk which means there is no need to sync any of the data._

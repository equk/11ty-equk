---
date: 2014-05-15T15:16:15Z
tags:
- linux
- sublime-text
title: upgrading to sublime text 3
slug: upgrading-to-sublime-text-3/
---

I've been using sublime text 2 for a while now.
I know the beta of version 3 has been ongoing for a while but the last time I tried, I had some problems with the addons/packages.

<img src="/media/images/2014/May/subl3_19_05_2014.jpg" alt="subl3">

I ran into a few problems when upgrading.
The main one seemed to be caused by some old configuration files for packages.

I tried the suggested upgrade of install subl3, <a href="https://sublime.wbond.net/installation#ST3" target="_blank">install the new Package Control system</a>, copy your old packages but do not copy Default or Package Control.
This worked but I still had some weird issues with the sidebar and the tabs.

In the end I deleted the User folder from Packages and started again with my user prefs.

One other tip once you have removed sublime text 2 is to symlink subl to subl3.

I keep a list of sublime text <a href="https://github.com/equk/linux/blob/master/configs/sublime-text-3/Packages/packages.txt" target="_blank">addons/packages I have installed on github</a>
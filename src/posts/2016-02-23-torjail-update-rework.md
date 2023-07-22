---
date: 2016-02-23T21:23:00Z
tags:
  - github
  - security
  - infosec
  - linux
  - tor
  - sandbox
  - cli
title: torjail - update & rework
slug: torjail-update-rework/
---

<p class="text-center"><img src="/media/images/2016/01/tor_screen_sm.jpg" alt="tor_screen_small"></p>

I had to <a href="https://github.com/equk/torjail/commit/b549b8b918fa7f1a378760caecd7cee376c74576" target="_blank">redesign and recode</a> some of this project due to firejail removing 'private-home'.
I changed the way it works to now create a home within a ramdisk (tmpfs).

I also added some new variables for configuration.

```diff
torbrowser.sh
 @@ -30,9 +30,10 @@ TORJAIL_DISPLAY=":6"
 #   you probably don't need to change anything below this line
 #*****************************************************************
 TORJAIL="torbrowser"
-TORJAIL_HOME="${TORJAIL_BASE}/tor-browser_en-US/Browser"
 TORJAIL_XAUTH="/tmp/.Xauthority-$TORJAIL"
 TORJAIL_TMP="/tmp/.torxephyr"
+TORJAIL_RAM="/tmp/torjail"
+TORJAIL_HOME="${TORJAIL_RAM}/tor-browser_en-US/Browser"
```

The main features are <a href="https://equk.co.uk/2016/01/13/torjail-sandboxed-torbrowser/" target="_blank">still as before</a> (<a href="https://www.torproject.org/docs/verifying-signatures.html.en" target="_blank"><i class="fa fa-lock"></i>GPG verification</a>, auto-update etc).
You can download the updated version from <a href="https://github.com/equk/torjail" target="_blank"><i class="fa fa-github-alt"></i> github</a>

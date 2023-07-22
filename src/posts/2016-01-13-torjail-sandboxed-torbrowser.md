---
date: 2016-01-13T16:39:25Z
tags:
- github
- security
- infosec
- linux
- tor
- sandbox
title: torjail - sandboxed torbrowser
slug: torjail-sandboxed-torbrowser/
---

I have decided to opensource this project & it is now available on <a href="https://github.com/equk/torjail" target="_blank"><i class="fa fa-github-alt"></i> github</a>.

**tl-dr:** *this script downloads & runs torbrowser in a sandbox within a seperate windowed X session using Xephyr*

<p class="text-center"><img src="/media/images/2016/01/tor_screen_sm.jpg" alt="tor_screen_sm"></p>

This started as a simple Xephyr script which sandboxed torbrowser to enable seccomp.
It then evolved to include ramdisk opreation.
I then found torbrowser used by some of my VMs were not kept up to date using the OS package managers so I extended it again to include installing of torbrowser into its own folder within the users home directory.
The final addition was checksum & GPG verification (ref: <a href="https://www.torproject.org/docs/verifying-signatures.html.en" target="_blank">tor gpg verification</a>)

    The script sets up a working env within ~/.torjail
    It then downloads torbrowser bundle from tor (also has a update function)
    Downloads and verifies files are valid using GPG key and sha256 checksum.
    Extracts torbrowser into ~/.torjail
    Sets up the env for a WM (am using DWM as it is small & self-contained)
    Runs torbrowser in a firejail sandbox in memory inside of a xephyr session.
    Once finished it kills the Xephyr session.

If anything doesn't pass the checksum or GPG checks it tells the user, removes the files & exits.

**Main components used**

    firejail   https://firejail.wordpress.com/
    xephyr     https://wiki.freedesktop.org/www/Software/Xephyr/
    dwm        http://dwm.suckless.org/
    torbrowser https://www.torproject.org/projects/torbrowser.html.en

The script is released under MIT license. (other components have various licenses)
You can download it from <a href="https://github.com/equk/torjail" target="_blank"><i class="fa fa-github-alt"></i> github</a>
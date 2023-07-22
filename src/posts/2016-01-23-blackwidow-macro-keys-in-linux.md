---
date: 2016-01-23T13:30:28Z
image: ../_media/images/2016/01/rzr_bwidow_head.jpg
tags:
  - github
  - linux
  - archlinux
  - cli
title: BlackWidow Macro Keys In Linux
slug: blackwidow-macro-keys-in-linux
---

<p class="text-center"><img src="/media/images/2016/01/bwidow_header_white.jpg" alt="bwidow_header"></p>

This is a C program which sends the init code from Razer windows proprietary drivers to initialize the 'macro' keys on Razer BlackWidow keyboards on Linux.
Linux users can then use the keys for macros using tools like xmacro or even just bind the keys to functions, scripts or programs using the window manager.
If you really wanted you could also rebind keys to existing keyboard functions using xmodmap.

The init code was taken from the windows drivers using wireshark usb capture.

The source code is available on <a href="https://github.com/equk/blackwidow_macro" target="_blank"><i class="fa fa-github-alt"></i> github</a> under MIT license.

    Razer BlackWidow Macro Keys v1
    Razer BlackWidow Device Found
    Sending data:
     00 00 00 00 00 02 00 04
     02 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     00 00 00 00 00 00 00 00
     04 00
    Transmitted: 90

**keycode reference**

- M1 = 191
- M2 = 192
- M3 = 193
- M4 = 194
- M5 = 195

**notes:**<br/>
The program requires root access due to using <a href="http://libusb.info/" target="_blank">libusb</a> to send to the device over USB.
There is also a udev rule for automatic initialization included.

**info:**<br/>
Razer BlackWidow keyboards have no memory to store macros.
Razer use software for all macro functionality. This forces windows users to use their cloud Synapse drivers which require users to register the device using a account with a email address.
Razer BlackWidow keyboards from 2014 onwards also use cheaper cherry clone switches (which are shortened).

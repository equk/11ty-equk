---
date: 2016-01-23T13:30:28Z
image:
tags:
  - github
  - linux
title: BlackWidow Macro Keys In Linux
slug: blackwidow-macro-keys-in-linux
---

<p class="text-center"><img src="/media/images/2016/01/bwidow_header_white.jpg" alt="bwidow_header"></p>

This is a C program which sends the init code from Razer windows proprietary drivers to initialize the 'macro' keys on Razer BlackWidow keyboards on Linux.

Linux users can then use the keys for macros using tools like `xmacro` or even just bind the keys to functions, scripts or programs using the window manager.<br/>
If you really wanted you could also rebind keys to existing keyboard functions using `xmodmap`.

The init code was taken from the windows drivers using <a href="https://wiki.wireshark.org/CaptureSetup/USB" target="_blank" rel="noopener noreferrer">wireshark usb capture</a>.

The source code is available on <a href="https://github.com/equk/blackwidow_macro" target="_blank" rel="noopener noreferrer"><i class="fa fa-github-alt"></i> github</a> under MIT license.

::: note
The program requires root access due to using <a href="http://libusb.info/" target="_blank" rel="noopener noreferrer">libusb</a> to send to the device over USB.<br/>
There is also a udev rule for automatic initialization included.
:::

<br/>

```sh
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
```

## Keycode Reference

| Key | Keycode |
|-----|---------|
| M1 | 191 |
| M2 | 192 |
| M3 | 193 |
| M4 | 194 |
| M5 | 195 |

## Hardware Info

Razer BlackWidow keyboards have no memory to store macros.

Razer use software for all macro functionality.<br/>
*This forces windows users to use their cloud Synapse drivers which require users to register the device using a account with a email address.*

Razer BlackWidow keyboards from 2014 onwards also use cheaper cherry clone switches.

## References

<ul dir="auto">
<li><a href="https://wiki.wireshark.org/CaptureSetup/USB" target="_blank" rel="noopener noreferrer">Wireshark USB Capture Setup</a></li>
<li><a href="https://github.com/libusb/libusb"target="_blank" rel="noopener noreferrer">libusb on github</a></li>
<li><a href="https://github.com/libusb/libusb/wiki"target="_blank" rel="noopener noreferrer">libusb wiki on github</a></li>
</ul>

## Source Code

The source for this project is available on github.

<a class="github" href="https://github.com/equk/blackwidow_macro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> blackwidow_macro</a>
---
title: "BlackWidow Macro Keys Rewrite"
date: 2025-10-24T18:40:43.811Z
author: equilibriumuk
draft: false
tags:
 - github
 - linux
image: ../_media/images/hero/cherry_blues_w.jpg
imgAuthor: equilibriumuk
imgAuthorURL: https://equk.co.uk/about
mastodonPostId:
blueskyPostId:
excerpt: "C program that sends the init code to initialize macro keys on Razer BlackWidow keyboards on Linux"
---

I decided to rewrite most of the code in this old project to make it easier to add devices.<br/>
I also replaced all the code relating to opening usb devices.

## Info

This is a C program that sends the init code to initialize the 'macro' keys on Razer BlackWidow keyboards on Linux.

Linux users can then use the macro keys on their keyboard.

> [!note]
> More info on the original project can be found in my old blog post
> <p>📝 <a href="/2016/01/23/blackwidow-macro-keys-in-linux/" target="_blank" rel="noopener noreferrer">January 23, 2016 - BlackWidow Macro Keys In Linux</a></p>

## Changes

### Improvements

- [x] new code for opening usb devices
- [x] array of keyboard device IDs
- [x] new cli feedback
- [x] support for more keyboards

<br/>

### Updating libusb Code

I have been meaning to update the code to replace `libusb_open_device_with_vid_pid()`

> <code>libusb_open_device_with_vid_pid()</code><br/>
> This function is intended for those scenarios where you are using libusb to knock up a quick test application

#### New Handle Code

Use `libusb_get_device_list()` to check the device exists in the system before calling `libusb_open()` to open the connection.

> <code>libusb_get_device_list()</code><br/>
> Returns a list of USB devices currently attached to the system.<br/>
> This is your entry point into finding a USB device to operate.

> <code>libusb_open()</code><br/>
> Open a device and obtain a device handle.<br/>
> This is a non-blocking function; no requests are sent over the bus.

- [x] Get USB Device List
- [x] Check For Matching `venid` & `devid`
- [x] Open Handle On Match

<i class="fa-solid fa-link"></i> <a href="https://libusb.sourceforge.io/api-1.0/group__libusb__dev.html" target="_blank" rel="noopener noreferrer">libusb: Device handling and enumeration</a>

### Adding More Devices

The old code was a mess when it came to this.

I changed the way this was implemented so it now uses an array of known devices.<br/>
This makes it a lot easier to add support for more keyboards.

| ID | Device Name |
|---|---|
| 010D | Razer BlackWidow Ultimate |
| 010E | Razer BlackWidow |
| 011B | Razer BlackWidow 2013 |
| 0203 | Razer BlackWidow Chroma |
| 0221 | Razer BlackWidow Chroma V2 |
| 011A | Razer BlackWidow Ultimate 2014 |

## Usage

```sh
Razer BlackWidow Macro Keys v2.0
Sending Keyboard Macro Init Sequence for [1532:011b]

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

```sh
Arguments:
        -s      send init packet
        -v      show verbose output
```

## Related

<p>📝 <a href="/2016/01/23/blackwidow-macro-keys-in-linux/" target="_blank" rel="noopener noreferrer">January 23, 2016 - BlackWidow Macro Keys In Linux</a></p>
<p>📝 <a href="/2023/09/25/reset-usb-device-in-linux/" target="_blank" rel="noopener noreferrer">September 25, 2023 - Reset USB Device In Linux</a></p>

## Source Code

The source for this project is available on github.

<a class="github" href="https://github.com/equk/blackwidow_macro" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> blackwidow_macro</a>
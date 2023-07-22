---
date: 2014-06-18T17:21:39Z
image: ../_media/images/2014/Jun/c7_chrome_logo-1.jpg
tags:
- linux
- archlinux
- coreboot
- chromeos
- chromebook
title: New linux netbook
slug: new-linux-netbook/
---

I finally decided to replace my old Turion 64 ML-34 laptop for something a bit newer and a lot smaller.
<p class="text-center"><img src="/media/images/2014/Jun/acer_c710.jpg" alt="acer_c710_chromebook"></p>
After looking around at different models I decided to go for a chromebook.
I ended up buying a <a href="https://play.google.com/store/devices/details/Acer_C7_Chromebook?id=chromebook_acer_c710" target="_blank">Acer C710 Chromebook</a> for various reasons.

The main reasons:

* start / search button
* <a href="http://www.coreboot.org/" target="_blank">coreboot</a> support
* linux support

Things the c710 has over the c720:

* start / search button (I use this as the modifier key for i3wm)
* sdcard fits flush (sticks out on c720)
* ram is upgradable (ram soldered on c720)
* hdd is a standard 2.5" 7mm (c720 uses expensive ngff ssd)
* wifi nic easily changed
* battery removable / replaceable

A added bonus is 100GB of google drive storage for 2 years (normally $2/mo - $48 for 24months) is also nice. (would suggest encrypting files before uploading to google drive <a href="https://productforums.google.com/forum/#!msg/drive/6AdrOutSoFU/sgixqxX3yfQJ" target="_blank">ref this response on google support</a>)

<p class="text-center"><img src="/media/images/2014/Jun/c7_chrome_logo-1.jpg" alt="c7_chrome_logo"></p>

I tried using chromeos for a while and I really like a lot of the design behind it.
The whole <a href="https://twitter.com/equilibriumuk/status/477061149918502912" target="_blank">filesystem / partition layout</a> seems really nice and the use of <a href="http://www.chromium.org/chromium-os/chromiumos-design-docs/protecting-cached-user-data" target="_blank">eCryptfs for cached userdata</a> is nice.
*For someone who just wants to browse or doesn't want/need to know much about computers chromeos seems pretty perfect.*

It isn't for me tho.
The lack of core applications and the feeling of being locked down meant I couldn't really use it to any extent.
<p class="text-center"><img src="/media/images/2014/Jun/acer_c710_keyboard.jpg" alt="acer_c710_keyboard"></p>
It wasn't very long before I installed archlinux onto the system.
The 1.1Ghz sandybridge cpu is actually really fast.
I found installing linux and compiling applications / kernels to be quick.

The battery seems to also last a lot longer running linux in comparison to running chromeos (altho I have a minimalistic setup with i3wm using 160mb at desktop after boot - the mem use in chromeos was always over 1GB).

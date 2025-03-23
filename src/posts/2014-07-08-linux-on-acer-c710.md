---
date: 2014-07-08T17:47:49Z
image: ../_media/images/2014/Aug/arch_ssd_chromebook_sm.jpg
tags:
- linux
- archlinux
- coreboot
- chromebook
title: linux on acer c710
slug: linux-on-acer-c710/
---

<img src="/media/images/2014/Jun/c7_chrome_logo-1.jpg" alt="c7_chrome_logo_2">

Running linux on the <a href="https://play.google.com/store/devices/details/Acer_C7_Chromebook?id=chromebook_acer_c710" target="_blank">Acer C710 Chromebook</a> is easy once you have decided which <a href="http://www.coreboot.org/Payloads" target="_blank">payload</a> to use with <a href="http://www.coreboot.org/" target="_blank">coreboot</a>.

## Coreboot

You will need to build or download a custom Coreboot firmware image.

### Building Coreboot

Information on building Coreboot can be found on <a href="https://www.coreboot.org/Build_HOWTO" target="_blank">the wiki</a>.

## Specific Configuration

**Synaptics Tweaks**

*/etc/X11/xorg.conf.d/10-cros-touchpad.conf*

    Section "InputClass"
        Identifier      "touchpad peppy cyapa"
        MatchIsTouchpad "on"
        MatchDevicePath "/dev/input/event*"
        MatchProduct    "cyapa"
        Option          "FingerLow" "10"
        Option          "FingerHigh" "25"
    EndSection

**WiFi / Bluetooth Tweaks**

*/etc/modprobe.d/ath9k.conf*

    options ath9k btcoex_enable=1 ps_enable=1 bt_ant_diversity=1

**Graphics Configuration**

*/etc/X11/xorg.conf.d/20-intel.conf*

    Section "Device"
        Identifier  "Intel Graphics"
        Driver      "intel"
        Option      "AccelMethod"  "sna"
        Option      "TearFree"  "true"
    EndSection

**GPU Packages**

    extra/intel-dri
    extra/libva-intel-driver
    extra/xf86-video-intel
    multilib/lib32-intel-dri

**optional: linux-ck-sandybridge**

**notes:**

Some people have reported problems with the wifi dropping on specific configurations, this can be fixed by adding ***nohwcrypt=1*** to the options within *ath9k.conf*

Backlight can be set using ***xbacklight*** (eg: xbacklight -set 75)

You may need to setup the keyboard mapping using ***setxkbmap*** (dependant on layout)

I use ***wicd*** for wifi configuration

I have a dotfiles style repo on <a href="https://github.com/equk/c710" target="_blank"><i class="fa-brands fa-github"></i> github for linux on the c710</a>

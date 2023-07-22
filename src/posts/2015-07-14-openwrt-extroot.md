---
date: 2015-07-14T17:54:20Z
tags:
  - linux
  - openwrt
  - extroot
title: OpenWrt extroot
slug: openwrt-extroot/
---

<p class="text-center"><img src="/media/images/2015/07/openwrtlogo_sm.png" alt="wnr2200_head"></p>

The main purpose of using extroot is to extend the storage capacity of the device.
Pivoting /overlay (or root) gives you the ability to install packages onto a USB storage device.

There is a more detailed overview on how pivot works on the <a href="http://wiki.openwrt.org/doc/howto/extroot/extroot.theory" target="_blank">OpenWrt wiki</a>.

**Preparing USB Flash Storage**

You will need to decide how much space will be used for /overlay and also how many other mount points you want.
The easiest way to partition the storage device is to use gparted on a linux system.

I decided to give the overlay plenty of storage, have a small swap partition and use a /data mountpoint for the rest of the device.

    /dev/sda1     1.3GB   EXT4    /overlay
    /dev/sda2     524MB   SWAP
    /dev/sda3     5.4GB   EXT4    /data

<br/>

**Setting up /overlay Pivot**

Format partitions

    mkfs.ext4 /dev/sda1
    mkfs.ext4 /dev/sda3

mount primary usb partition and copy /overlay to it

    mount /dev/sda1 /mnt
    tar -C /overlay -cvf - . | tar -C /mnt -xf -

generate fstab with UUID's of partitions

    block detect > /etc/config/fstab

edit fstab setting mount points + enabling them

    vim /etc/config/fstab

copy fstab to the usb stick /overlay

    cp /etc/config/fstab /mnt/upper/etc/config/fstab

unmount device

    umount /mnt

reboot router & check the partitions are mounted as expected

    root@OpenWrt:~# df -h
    Filesystem                Size      Used Available Use% Mounted on
    rootfs                    1.3G      6.5M      1.2G   1% /
    /dev/root                 2.5M      2.5M         0 100% /rom
    tmpfs                    29.5M    224.0K     29.3M   1% /tmp
    /dev/sda1                 1.3G      6.5M      1.2G   1% /overlay
    overlayfs:/overlay        1.3G      6.5M      1.2G   1% /
    tmpfs                   512.0K         0    512.0K   0% /dev
    /dev/sda3                 5.4G     11.2M      5.1G   0% /data

If you don't see /dev/sda1 mounted you might have problems with usb module initialization.
Check dmesg output to see when USB is initialized.
For more info regarding this <a href="/2015/07/13/netgear-wnr2200-openwrt-usb-support/">see my wnr2200 post</a>.

Below is an example of the mounts in luci.

<p class="text-center"><img src="/media/images/2015/07/usb_overlay_mount.jpg" alt=""></p>

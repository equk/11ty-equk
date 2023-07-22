---
date: 2015-07-13T12:39:09Z
tags:
  - github
  - linux
  - python
  - openwrt
  - extroot
  - firmware
  - netgear
title: Netgear wnr2200 OpenWrt USB Support
slug: netgear-wnr2200-openwrt-usb-support/
---

<p class="text-center"><img width="600px" src="/media/images/2015/07/wnr2200_head.jpg" alt="wnr2200_head"></p>

I recently setup a wnr2200 on openwrt and found that altho people have submitted patches to openwrt (one patch was submitted 6 months ago) for usb support, it's still not in the main release or even in the trunk release.

I have used OpenWrt on various routers over the years, the first router which I used it on was the Linksys WRT54GS back in 2006.
I fully support what OpenWrt are about and that so many projects have been forked or designed around it.

As the main purpose for this router requires usb storage I decided to compile a custom openwrt image for it.
For info about compiling OpenWrt from source <a href="http://wiki.openwrt.org/doc/howto/buildroot.exigence" target="_blank">see their wiki.</a>
The wnr2200 USB patch can be found on <a href="https://github.com/equk/openwrt" target="_blank">my <i class="fa fa-github-alt"></i> github repo</a>.

On making my first image (took 2hours to compile a base image without luci etc) I found USB worked.

The only problem was when trying to pivot overlay the device was unable to find anything on USB.
Looking in dmesg it seemed apparent that the USB wasn't getting loaded until after mount_root.

    [    9.930000] mount_root: loading kmods from internal overlay
    [   10.410000] jffs2: notice: (366) jffs2_build_xattr_subsystem: complete building xattr subsystem, 0 of xdatum (0 unchecked, 0 orphan) and 0 of xref (0 dead, 0 orphan) found.
    [   10.430000] block: attempting to load /tmp/jffs_cfg/upper/etc/config/fstab
    [   10.450000] block: extroot: device not present, retrying in 5 seconds
    [   15.460000] block: extroot: cannot find device with UUID eca54660-3cb4-421f-b35d-d60f86dca6a4
    ---snip---
    [   25.390000] usb 1-1: new high-speed USB device number 2 using ehci-platform
    [   25.550000] usb 1-1: New USB device found, idVendor=0951, idProduct=1613
    [   25.550000] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
    [   25.560000] usb 1-1: Product: DT 101 II
    [   25.560000] usb 1-1: Manufacturer: Kingston
    [   25.570000] usb 1-1: SerialNumber: 5B891E000014
    [   25.580000] usb-storage 1-1:1.0: USB Mass Storage device detected
    [   25.590000] scsi host0: usb-storage 1-1:1.0

I could have just gave up here but I really wanted to get overlay pivot working.
On looking at the layout of openwrt I found there was a preinit stage where you can run custom scripts before the mount_root stage.
So I decided to add <a href="https://raw.githubusercontent.com/equk/openwrt/master/wnr2200/target/linux/ar71xx/base-files/lib/preinit/83_load_ath9k_mod" target="_blank">my own script specific to ar71xx</a>.

```bash
#!/bin/sh
#
# Added equk 12-07-2015
#
/usr/sbin/modprobe ath9k
```

After another compile I put the image onto the router and found it now initialized the USB before running mount_root.

    [    6.980000] usb 1-1: new high-speed USB device number 2 using ehci-platform
    [    7.140000] usb 1-1: New USB device found, idVendor=0951, idProduct=1613
    [    7.140000] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
    [    7.150000] usb 1-1: Product: DT 101 II
    [    7.150000] usb 1-1: Manufacturer: Kingston
    [    7.160000] usb 1-1: SerialNumber: 5B891E000014
    [    7.160000] usb-storage 1-1:1.0: USB Mass Storage device detected
    [    7.170000] scsi host0: usb-storage 1-1:1.0
    ---snip---
    [   10.900000] sd 0:0:0:0: [sda] Attached SCSI removable disk
    [   16.080000] EXT4-fs (sda1): recovery complete
    [   16.090000] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts:
    [   16.100000] mount_root: switched to extroot

The patch and the script can be found on <a href="https://github.com/equk/openwrt" target="_blank">my <i class="fa fa-github-alt"></i> github repo</a>.
<br/><br/>
**Installing Custom Build Packages**

As the firmware is custom, you will also need to build kernel based packages you require for the device.

I used SimpleHTTPServer in Python. (on port 8080 as not running as root)

    cd /directory/of/openwrt/
    python2 -m SimpleHTTPServer 8080
    Serving HTTP on 0.0.0.0 port 8080 ...

Edit the opkg config (/etc/opkg.conf) and add in your own server.

    src/gz chaos_calmer_base http://192.168.1.100:8080/ar71xx/generic/packages/base

now run opkg update and you should see your http server serving the data.

    192.168.1.1 - - [12/Jul/2015 12:51:35] "GET /ar71xx/generic/packages/base/Packages.gz HTTP/1.1" 200 -
    192.168.1.1 - - [12/Jul/2015 12:51:35] "GET /ar71xx/generic/packages/base/Packages.sig HTTP/1.1" 200 -

Now you can install the packages required.

You can also copy the files onto your usb storage if you want to keep everything on the device and set the paths (see example below)

    src/gz local file:////path/to/packagesDirectory

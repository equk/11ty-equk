---
author: equilibriumuk
comments: true
date: 2016-10-04T11:35:15+01:00
draft: false
image: ../_media/images/2016/10/bt_hh5a_banner.jpg
tags:
  - openwrt
  - hardware
  - linux
title: Unlocking BT HomeHub 5a
slug: unlocking-bt-homehub-5a
---

_There is an updated post regarding this process_

<a href="/2022/04/11/unlocking-plusnet-hub-one/" target="_blank" aria-label="read blog post new linux netbook" rel="noopener noreferrer">📝 Apr 11, 2022 - Unlocking Plusnet Hub One</a>

## Why Do This?

There are various reasons for doing this, the main is to gain more control over the router allowing you to add more features.<br />
_Features the default firmware does not have: QoS, VPN, Dnscrypt, Dnsmasq, vlans, dyndns, live traffic analysis._<br />
_All of these can be added to OpenWrt_

<blockquote><p><strong>What is OpenWrt?</strong></p>

<p>Instead of trying to create a single, static firmware, OpenWrt provides a fully writable filesystem with optional package management.</p>
<p>This frees you from the restrictions of the application selection and configuration provided by the vendor and allows you to use packages to customize an embedded device to suit any application.</p>
<p>For developers, OpenWrt provides a framework to build an application without having to create a complete firmware image and distribution around it.</p>
<p>For users, this means the freedom of full customization, allowing the use of an embedded device in ways the vendor never envisioned.</p></blockquote>

_Disclaimer: I have been modding routers, switches & embedded devices for years.<br/>
This article is just a writeup & not really meant as a guide. (info is intentionally missing)<br/>
I would not recommend anyone try this without previous experience in soldering & hardware modification._

<article class="message is-warning">
  <div class="message-header">
    <p>Warning</p>
  </div>
  <div class="message-body">
    BT HomeHub 5a is only supported by the trunk (testing/dev) build of OpenWrt
  </div>
</article>

## HomeHub 5a Spec

    Bootloader: U-Boot
    SoC: Lantiq Xway VR9 VRX268 PSB 80910 (MIPS 34Kc) v1.2.1
    CPU/Speed: 500 MHz
    NAND Flash: 128MiB Spansion ML01G100BHI00
    RAM: DDR2 128MiB @ 250MHz Samsung
    Wireless: Atheros AR9227 b/g/n 2x2 + Qualcomm QCA9880-BR4A a/b/g/n+ac 3x3
    Ethernet: 5x 10/100/1000 BASE-TX Ethernet
    xDSL: Lantiq XWAY VRX208
        ADSL1/2/2+ (G.992.1/3/5) Annexes A, B, I, J, M, L,
        VDSL1 (G.993.1, T1.424, TS 101 270),
        VDSL2 (G.993.2),
        ITU-T G 998.2 Bonding,
        EFM (IEEE 802.3ah)
    USB: 1x USB 2.0

## Serial UART

To start with we need to solder some SMD pads which are really small.<br/>
To get an idea of how small the points are here is a image of the full pcb.

<img class="border" src="/media/images/2016/10/hh5a_internal.jpg" alt="hh5a_internal">

We need to solder the UART points below the flash memory R77 & R78 which trace back to SoC VRX268 pins B22 & C23.<br/>
The U-Boot doesn't have bootdelay variable so we also need to solder to BOOT_SEL2 to enable UART.

Here is a zoomed image of the points after soldering (R77, R78, R45).

<img class="border" src="/media/images/2016/10/serial_bootsel_solder.jpg" alt="serial_bootsel_solder">

Connect up a serial device to TXD, RXD & GND (R77 is TXD, R78 is RXD, R45 is BOOT_SEL2).<br />
I used a CH340G USB to Serial adapter. It's also possible to use a <a href="http://pinout.xyz/pinout/uart" target="_blank">Raspberry Pi</a>.

## U-Boot

To boot the device over UART you need to put BOOT_SEL2 to GND on powering the device.

You should see this message on powering the device:

    ROM VER: 1.1.4
    CFG 04
    UART

If BOOT_SEL2 is not grounded you will see:

    ROM VER: 1.1.4
    CFG 06
    NAND
    NAND Read OK

After you see UART send the u-boot ramdisk image over serial. _(using picocom + cat in linux)_

You should see:

    Board: BT Home Hub 5A
    SoC:   Lantiq VRX268 v1.2
    CPU:   125 MHz
    IO:    125 MHz
    BUS:   125 MHz
    BOOT:  UART
    DRAM:  128 MiB
    NAND:  128 MiB
    Using default environment

    In:    Serial
    Out:   Serial
    Err:   Serial
    Net:   ltq-eth
    BTHOMEHUBV5A #

Once U-Boot is loaded upload the openwrt install image over tftp using tftpboot from U-Boot to download the image to memory & then boot from memory using bootm.

## Backup NAND

Before continuing make sure you backup the current NAND flash memory (128MB) to USB storage or over netcat.

```bash
mkdir /mnt/usb
mount /dev/sda1 /mnt/usb
nanddump -f /mnt/usb/hh5a.nanddump /dev/mtd6
dd if=/dev/mtd6 of=/mnt/usb/hh5a.dd
```

<img class="border" src="/media/images/2016/10/hh5a_nanddump.jpg" alt="hh5a_nanddump">

## Backup UBI Calibration Data

Create a backup of the calibration data (required for full functionality)

Detatch any existing UBI's

```bash
ubidetach -m 4
ubidetach -m 5
```

Attach UBI & Backup _(if errors occur do not continue)_

```bash
ubiattach -m 5
dd if=/dev/ubi0_3 of=/tmp/hh5a-caldata-backup
cp /tmp/hh5a-caldata-backup /mnt/usb/hh5a-caldata-backup
```

## Installing Unlocked U-Boot & OpenWrt

If you are using the installation image provided by openwrt there should be a script to overwrite uboot & keep the calibration data.

Read & follow the prompts

Once this has finished you should have a unlocked U-Boot & are now ready to install a openwrt image.

The BT HomeHub 5a is only supported by the trunk (testing/dev) build so you will need to compile from source using the <a href="https://wiki.openwrt.org/doc/howto/build" target="_blank">OpenWrt build system</a> or use a custom prebuilt image.

To install an image you need to use sysupgrade.<br/>
Build or download a image & copy it to the device then run sysupgrade to install.

On reboot the device will boot to UART prompt.

Power cycle the device & you should now see openwrt booting.

<a href="https://wiki.openwrt.org/doc/howto/firstlogin" target="_blank"><img src="/media/images/2015/07/openwrtlogo_sm.png" alt="openwrt_logo"></a>

<p class="text-right"><em>Related: <a href="/2015/07/13/netgear-wnr2200-openwrt-usb-support/">Netgear wnr2200</a> Ref: <a href="http://www.denx.de/wiki/U-Boot/" target="_blank">Das U-Boot</a> / <a href="https://wiki.openwrt.org/about/start" target="_blank">About OpenWrt</a> / <a href="https://wiki.openwrt.org/toh/bt/homehub_v5a" target="_blank">OpenWrt HH5A</a></em></p>

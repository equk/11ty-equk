---
author: equilibriumuk
comments: true
date: 2011-08-23T11:21:18+01:00
draft: false
image:
menu: ""
share: true
tags:
  - hardware

title: Turn a netgear DG834G into a Modem
slug: netgear-dg834g-modem
---

You can get these routers for little money and they are perfect for sitting in front of a firewall system with little hassle. (perfect for cisco, openwrt, iptables, pfsense etc)

_this also works with DG934G routers as you can reflash them to DG834v3, loads on ebay branded Sky for *£5-10*_

![dg834g setup cgi](../../src/_media/images/2011/dg834g_modem.jpg)

All you need to do is access a hidden option screen.
Open up the configuration in a browser and change `setup.cgi?next_file=start.htm` to `setup.cgi?next_file=mode.htm`
You can then select Modem and Apply.

Now setup the firewall that is behind the DG834G to connect via PPPoE on port1.

Reasons for having this setup: stop double NAT, firewall has a real external IP, no more DMZ or invisible proxy.

_post taken from equk's miniblog_

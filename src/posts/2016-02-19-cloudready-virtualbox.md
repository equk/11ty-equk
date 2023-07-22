---
date: 2016-02-19T15:07:27Z
tags:
- linux
- google
- chromeos
- chromebook
- chromium
title: Running Neverware Cloudready on Virtualbox
slug: cloudready-virtualbox/
---

neverware provide a raw image of their chromiumos build <a href="http://www.neverware.com/freedownload" target="_blank">free on their website</a>

<p class="text-center"><a href="/media/images/2016/02/vbox_cloudready.jpg" target="_blank"><img alt="vbox_cloudready" src="/media/images/2016/02/vbox_cloudready_sm.jpg"></a></p>

download the bin.zip (eg: cloudready-free-45.3.39.bin.zip) & extract the bin.

### convert the raw image to vdi

     vboxmanage convertdd chromiumos_image.bin chromiumos_image.vdi

optional: copy or move *chromiumos_image.vdi* to *virtualbox machines* folder

### create a vm in virtualbox

* name it whatever you want
* select linux > other linux (64-bit)
* set the memory (eg: 1024mb)
* use existing virtual hard disk
* browse to chromiumos_image.vdi

### configure virtual machine

* go to settings > system
* change pointing device to PS/2 Mouse
* tick Enable EFI (special OSes only)

That's all, now boot the machine.

**Note:** *Enabling 3D Acceleration does nothing*

<article class="message is-warning">
  <div class="message-header">
    <p>Warning</p>
  </div>
  <div class="message-body">
    There are problems booting cloudready on virtualbox since version 5 (see comments below)
  </div>
</article>
---
author: equilibriumuk
comments: true
date: 2018-04-19T11:43:27+01:00
draft: false
image:
menu: ""
share: true
tags:
  - linux
  - google
  - chromeos
  - chromebook
  - chromiumos
  - kvm
  - qemu
title: Chromium OS & Cloudready on QEMU
url: ""
---

After reading about some new features relating to running linux applications coming to Chrome OS I thought it was time to revisit the possibility of running Chromium OS in a virtual environment.

## Screenshots

**Chromium OS 67.0.3390.0**

<p class="text-center"><img src="/media/images/2018/04/chromiumos_1080p_800.jpg" alt="acer_c710_chromebook"></p>

**Neverware Cloudready 63.3.41**

<p class="text-center"><img alt="qemu_cloudready" src="/media/images/2018/04/cloudready_qemu_800.png"></p>

Chromium OS seems to run really well on QEMU & there are none of the <a href="/2016/02/19/cloudready-virtualbox/" target="_blank">boot problems encountered on VirtualBox</a>.

## Chrome OS vs Chromium OS

<p class="text-center"><img src="/media/images/2018/04/chromeos_vs_chromiumos.png" alt="acer_c710_chromebook"></p>

<div class="columns">
    <div class="column">
        <h3 id="Chrome OS">Chrome OS</h3>
        <p><i class="fa fa-thumbs-o-up"></i> Playstore for Android Apps<br/>
        <i class="fa fa-thumbs-o-up"></i> Verified Boot<br/>
        <i class="fa fa-thumbs-o-up"></i> Security Updates
        </p>
    </div>
    <div class="column">
        <h3 id="Chromium OS">Chromium OS</h3>
        <p><i class="fa fa-thumbs-o-down"></i> No Playstore for Android Apps<br/>
<i class="fa fa-thumbs-o-down"></i> No Verified Boot<br/>
<i class="fa fa-unlock"></i> Default shell account has no password & can <code>sudo</code>
    </div>
</div>

## The Future Of Chromebooks & Chrome OS

The future of Chrome OS looks really interesting.<br/>
Google are working on getting linux desktop apps running using kvm & other technologies.<br/>

<a href="https://chromium.googlesource.com/chromiumos/platform/crosvm/" target="_blank" aria-label="go to crosvm" rel="noopener noreferrer">crosvm</a> is currently available to <a href="https://store.google.com/product/google_pixelbook" target="_blank" aria-label="go to google store" rel="noopener noreferrer">google pixelbook</a> users via the beta channel.

There are also some interesting high-end chromebooks coming out like the <a href="https://www.samsung.com/us/computing/chromebooks/12-14/xe513c24-k01us-xe513c24-k01us/" target="_blank" aria-label="go to samsung" rel="noopener noreferrer">Samsung Chromebook Plus</a> which has an ARM based CPU, touchscreen & a high resolution screen _(basically an arm version of the pixelbook)_.

## Conclusion

Getting Chromium OS running was a bit more involved than virtualbox but it runs really quick.<br/>
Once running, it provides a platform for testing things in linux without the need for chromebook hardware.

For long term use I would say buying a chromebook with Chrome OS would be much better than relying on Chromium OS as you gain so much in terms of support, features & security. _(Also basic chromebooks are really cheap)_

<p class="text-right"><em>ref: <a href="https://www.neverware.com/" target="_blank" aria-label="go to neverware" rel="noopener noreferrer">Neverware Cloudready</a> / <a href="https://www.chromium.org/chromium-os" target="_blank" aria-label="go to chromiumos" rel="noopener noreferrer">Chromium OS</a></em></p>

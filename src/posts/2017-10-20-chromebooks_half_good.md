---
author: equilibriumuk
date: 2017-10-20T12:54:24+02:00
draft: false
image: ../_media/images/2014/Jun/c7_chrome_logo-1.jpg
tags:
- chromebook
- chromeos
- google
- security
- youtube
title: Chromebooks For Development Work?
---

I've been looking into getting a new laptop/chromebook for a while now as the battery on <a href="/2014/06/18/new-linux-netbook/" target="_blank">my C710</a> stopped taking charge.

After reading some really interesting posts on using chromebooks for development I thought I'd take a look at getting a chromebook & this time actually keeping the OS. *(currently run <a href="https://equk.co.uk/2014/07/08/linux-on-acer-c710/" target="_blank">linux on C710</a> using coreboot)*

The idea would be to have something to travel with that is cheap & also has the added security features of ChromeOS.

## Chromebook Security

Chromebooks have some advantages over PC laptops as both the hardware & software is designed to be secure.

::: important
Installing ChromiumOS onto a PC will not give you these advantages.
:::

### Security Advantages

- [x] U2F for user login
- [x] User data encrypted (per user)
- [x] Verified Boot
- [x] TPM
- [x] Secure Boot

<i class="fa fa-youtube-play yt-red"></i> <a href="https://www.youtube.com/watch?v=maCSmdy3an4" target="_blank" rel="noopener noreferrer">Chrome OS Security Guide</a>

I <a href="https://twitter.com/equilibriumuk/status/477061149918502912" target="_blank">noted in 2014</a> that I really like the design of ChromeOS due to the <a href="https://www.chromium.org/chromium-os/chromiumos-design-docs/disk-format" target="_blank">structure of the filesystem</a>, the bootloader & the <a href="https://www.chromium.org/developers/design-documents/tpm-usage" target="_blank">use of TPM</a>.

More information on ChromeOS security features & design can be found on the <a href="https://www.chromium.org/chromium-os/chromiumos-design-docs/security-overview" target="_blank">chromiumos wiki</a>.

## Keyboard Problems

<p class="text-center"><img class="border" src="/media/images/2017/10/chromebook_keyboard.jpg" alt="chromebook_keyboard"></p>

After looking at newer chromebooks I found they all have massive CTRL + ALT keys with no dedicated search key on the bottom row of the keyboard.<br />
Not only this but they have replaced CAPS LOCK with SEARCH.<br />
*(you need to press ALT + SEARCH for capslock)*

<div class="ux_info">Surely you would want familiarity to bring new users from mac, windows & linux to your platform?</div>

Most new chromebooks also have a POWER 'key' at the top right of the keyboard above the BACKSPACE key.<br />
I spoke to some people on IRC who have newer chromebooks who said this is a problem for them as they often press power by accident.

Another issue I would have is that the top row of keys are not function keys & seem to default to keys you wouldn't often use on a laptop.
*Keys like screen brightness & audio volume are things that would normally require a modifier key combo.*

**The keyboard layout is differrent for the sake of being different**, *not because it adds any function.*

I <a href="https://twitter.com/equilibriumuk/status/917363151313735680" target="_blank">tweeted about the keyboard issues</a> & got a reply from an account which looks like a twitter bot.<br />
I received a reply suggesting I should upgrade as the C710 is the only chromebook with a spinning disk.

My <a href="https://twitter.com/equilibriumuk/status/918071439902855168" target="_blank">last response</a> was to point out most chromebooks are underspec'd, running on eMMC, a slow CPU & a small amount of RAM.<br />
Also to point out that I had upgraded the RAM & installed a SSD on the C710 ( *thanks to it having a SATA disk slot* )

## Usable By Developers?

Being of a low spec brings up the issue with software developers wanting to use chromebooks.<br />
The operating system could be really nice to use if the hardware was there to support it.

Also in order to setup a working environment for developing terminal based linux/unix apps you would need to have some sort of `chroot` which would require installing something like <a href="https://github.com/termux" target="_blank">termux</a>.

::: warning
**DO NOT USE DEVELOPER MODE / CROUTON** to achieve `chroot` as you will have to disable most security features of the chromebook.
:::

I understand chromebooks being something you might take on a flight etc as they are cheap & data is encrypted but you still need to be able to use them for your work.

## Conclusion

Despite having some interesting ideas on OS design I think chromebooks seem flawed in many ways *(poor hw spec and/or poor keyboard layout)*.

There is also the addition of android apps via the google playstore.<br />
This can be seen as a positive & a negative as it provides more app options but in terms of security it opens up ChromeOS to the possibility of rogue android apps.

A lot of what I said in <a href="/2014/06/18/new-linux-netbook/" target="_blank">my previous article from 2014</a> *when I bought the Chromebook C710* still stands which is a little disappointing.

<blockquote><p>I tried using chromeos for a while and I really like a lot of the design behind it.</p>
<p>The whole <a href="https://twitter.com/equilibriumuk/status/477061149918502912" target="_blank">filesystem / partition layout</a> seems really nice and the use of <a href="http://www.chromium.org/chromium-os/chromiumos-design-docs/protecting-cached-user-data" target="_blank">eCryptfs for cached userdata</a> is nice.</p>
<br/>
<p><em>For someone who just wants to browse or doesn't want/need to know much about computers chromeos seems pretty perfect.</em></p></blockquote>

## Notes

*Make sure you set a <a href="https://support.google.com/chrome/answer/165139" target="_blank">sync passphrase</a> on your google account so data isn't stored in plaintext on google servers*<br/>
*If you are looking to buy a chromebook check out the <a href="https://support.google.com/chrome/a/answer/6220366?hl=en" target="_blank">Auto Update policy</a> to see how long each model is supported for.*
---
author: equilibriumuk
comments: true
date: 2017-02-13T21:33:07Z
draft: false
image: ../_media/images/2017/02/macbook_keys.jpg
menu: ""
share: true
tags:
  - mac
  - apple
  - macos
  - github
  - security
title: Macbook Pro macOS Sierra
url: ""
---

I decided to get back into macOS as it seems really popular among professionals.

I now have a MacBook Pro (13-inch Early 2011) with a i7-2620M CPU.<br/>
I have previously used macOS 10 back when I had a Mac Pro C2D with a AMD HD5770.
<br/>
<br/>
<br/>
<img src="/media/images/2017/02/macbook_2011_sierra.jpg" alt="macbook pro sierra">
<br/>
<br/>
<br/>
So far Sierra seems better than Lion.

## Installing

I was surprised that the sierra installer seems to try force you into connecting the wifi<br/>
(if you click cancel on network setup there is a message asking 'are you sure?')<br/>
It then suggests sending information to not only apple but also to app store developers. (are we paying to beta test software?)<br/>
This really <a href="/2014/11/20/windows-8-1-share-browsing-history-location/" target="_blank">reminds me of Windows</a>.

I'm also not into the idea of having Siri on a laptop but it can at least be disabled easily.

<img src="/media/images/2017/02/sierra_ico.jpg" alt="sierra_icon">

## Privacy Related Things

<img src="/media/images/2017/02/spotlight_settings_sm.png" alt="spotlight_settings">

- Spotlight sends search information (ref: spotlight suggestions & websearch)
- Safari sends search queries to Apple (ref: search suggestions)
- Share crash information with app developers (default)
- Send diagnostic & usage data to Apple (default)
- Spotlight indexes all volumes (default)

_These things can be disabled with tweaks and settings, there are also a few background agents connecting to apple services which most users will not even notice as there is no outbound application firewall._

## Firewall

<img src="/media/images/2017/02/openbsd_200.png" alt="openbsd_logo">

MacOS comes with a port of <a href="http://www.openbsd.org/faq/pf/" target="_blank">OpenBSD PF</a> & an Application Firewall. _(both disabled at default settings)_<br/>
The application firewall only supports filtering/blocking of inbound connections.<br/>
PF is used/enabled for the _"stealth mode"_ feature but it seems if you want to make full use of PF you will have to write your own rules or buy a gui app.

The inbound Application Firewall seems a bit of a chocolate fireguard considering malware is known to be actively targeting macOS.<br/>
Most power users will probably install something like littlesnitch but in 2017 outbound rules should surely be something included in the OS?<br/>
_(in comparison, windows has had a built-in application firewall with both inbound & outbound rules since 2006)_

## Final Thoughts

So far my overall view is that macOS Sierra is simplistic. (easy to use but limited)

There are still problems with font rendering, mouse acceleration & window management even after tweaking the OS.<br/>
_(I had most of these problems back when I used Lion so I guess nothing has changed)_

Font rendering is more noticeable in terminal & when using monospaced fonts. _(you cannot distinguish any difference between bold & normal text using monospaced fonts with subpixel font rendering enabled)_<br/>
The rendering also seems less legible when put side-by-side with linux <a href="https://github.com/equk/macos/commit/9b3110356648c1c6db26b6760c01b11152f08dbb#diff-1a6b8c760346e7cd5871bf39ecb99758" target="_blank">even with subpixel rendering disabled</a>.

I like that you can install unix cli stuff.

At the moment I don't see it as a replacement for linux with a tiling window manager.

Once configured & tweaked it is ok to use on a laptop.<br/>
Setting up keyboard shortcuts for Spotlight & Mission Control makes desktop management a lot easier.<br/>
_I also had to swap around the modifier keys as I am used to CTRL+C etc._

I have a <a href="https://github.com/equk/macos" target="_blank"><i class="fa-brands fa-github"></i> github repository</a> with my configs and scripts along with my old scripts from 2010.<br/>
_I also added [some old apple related articles from my old blog](/tag/apple)_

If anyone has any suggestions for apps or feedback on fixes to problems I have posted, please leave a comment below.

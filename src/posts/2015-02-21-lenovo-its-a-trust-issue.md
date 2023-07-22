---
date: 2015-02-21T09:40:55Z
tags:
- security
- infosec
- windows
title: Lenovo - It's a trust issue
slug: lenovo-its-a-trust-issue/
---

<p class="text-center"><img class="len_fish_head" src="/media/images/2015/02/len_fish_head.jpg"></p>

It seems Lenovo have got themselves in some real trouble this week with superfish (mitm adware).
Lenovo bundled adware with their laptops, the adware installs a self signed certificate and actively uses a mitm proxy to inject js elements providing pop-up adverts.
The bundled software is named "Visual Discovery" and no doubt was infuriating for users as it showed adverts / popups.

What is worse is their conflicting statements they put out.

First statement:

<blockquote>We have thoroughly investigated this technology and do not find any evidence to substantiate security concerns.</blockquote>

Changed to:

<blockquote>we are working directly with Superfish and with other industry partners to ensure we address any possible security issues</blockquote>

The software is bundled with the private key, allowing anyone to issue their own superfish certificate.
The adware also injects the certificate into thunderbird & firefox

You can view the full statements on the web archive: <a href="http://web.archive.org/web/20150219191531/http://news.lenovo.com/article_display.cfm?article_id=1929" target="_blank">first statement</a> - <a href="http://web.archive.org/web/20150220180448/http://news.lenovo.com/article_display.cfm?article_id=1929" target="_blank">second statement</a>

You can check if you are affected by going to this website: <a href="https://filippo.io/Badfish/" target="_blank">https://filippo.io/Badfish/</a>

<p class="text-center"><img class="wdef_superfish" src="/media/images/2015/02/wdefender_superfish.jpg"></p>

Windows Defender now detects the software and hopefully other AV companies will be doing the same.

The main message now is, never trust Lenovo.
Who knows what else is bundled with/in their hardware.

**Update - More info**

The installer detects various antivirus and runs itself virtualized in order to prevent detection.
The software installs a driver (has 32-bit and 64-bit variants) both drivers are self signed by superfish.
The driver uses WFP to implement a proxy for a mitm attack on encrypted connections.
The private key password is komodia

more info: <a href="http://www.0xebfe.net/blog/2015/02/20/the-analysis-of-superfish-adware/" target="_blank">in depth analysis of SuperFish adware</a>

**Update #2:** A lot of antivirus products now detect visualdiscovery (<a href="https://www.virustotal.com/en/file/dc937aec71daf6ebcb5876c3e9ba26846d6c4678cb95c60fc9dde6ff81b5323a/analysis/" target="_blank">click for virustotal</a>)

**Update #3:** After looking into the js it seems at some point they tried adding a check on the querystring to disable injection on https pages for lenovo users.
The if statement seems to be commented out now but here is the code:

    function run() {
       var queryString = extractQueryString();
     // if (false && location.protocol === 'https:' && queryString.search(/dlsource=hdrykzc/i) !== -1) // Patch for Lenovo - do not run on https sites if (queryString.search(/dlsource=hdrykzc/i) !== -1) // Disable Lenovo users {
       return;
    }

Bit of a silly workaround and missing the point but interesting.
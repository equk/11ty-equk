---
title: "Using DoH on Android with Firefox"
date: 2023-11-14T15:31:44.376Z
author: equilibriumuk
draft: false
tags:
  - github
  - firefox
  - javascript
  - linux
image: ../_media/images/2018/09/mozilla_header.jpg
---

<blockquote><p>DNS over HTTPS (DoH) is a protocol for performing remote Domain Name System (DNS) resolution via the HTTPS protocol. A goal of the method is to increase user privacy and security by preventing eavesdropping and manipulation of DNS data by man-in-the-middle attacks by using the HTTPS protocol to encrypt the data between the DoH client and the DoH-based DNS resolver.</p>
<br/>
<cite><i class="fa fa-link"></i> <a href="https://en.wikipedia.org/wiki/DNS_over_HTTPS" target="_blank" rel="noopener noreferrer">DNS over HTTPS - Wikipedia</a></cite>
</blockquote>

DNS Over HTTPS can be useful on Android if you want to use blocklists without the need for addons or extra software.

I previously wrote about Mozilla forcing Cloudflare DoH being a negative thing, mainly due to <a href="/2021/09/13/dropping-firefox/#doh" target="_blank" rel="noopener noreferrer">centralizing all requests to a single service</a>.<br/>
Since then there has been an effort to create more options with more providers setting up services.

## Picking a Server

Things to look for

- [x] Zero Logging
- [x] DNSSEC
- [x] IPv6

The best list of public DoH services I could find is on the curl wiki.

<i class="fa fa-link"></i> <a href="https://github.com/curl/curl/wiki/DNS-over-HTTPS" target="_blank" rel="noopener noreferrer">Public DNS over HTTPS Servers - curl/curl Wiki - Github</a>

There are many options with different features including malware blocking & cloud services that allow the use of custom blocklists.

## Configuration

::: important
DNS Over HTTPS only works on **Firefox Nightly** at time of writing
:::

::: warning
Nightly is an unstable testing and development platform
:::

<i class="fa fa-link"></i> <a href="https://play.google.com/store/apps/details?id=org.mozilla.fenix" target="_blank" rel="noopener noreferrer">Firefox Nightly for Developers - Apps on Google Play</a>

::: note
The interface for setting DNS over HTTPS is not implemented in Firefox on Android<br/>
Set these options in `about:config`.
:::

1. Open `about:config`
2. Type **network.trr.mode**
3. Set Value to **3**
4. Type **network.trr.custom_uri**
5. Set Value to provider uri (eg: `https://cusom-server-uri/dns-query`)

## Disable WebRTC

If you are using a VPN you may want to disable WebRTC to prevent your real IP being exposed.

1. Open `about:config`
2. Type **media.peerconnection.enabled**
3. Toggle to **false**

<i class="fa fa-link"></i> <a href="https://en.wikipedia.org/wiki/WebRTC#Vulnerability" target="_blank" rel="noopener noreferrer">Vulnerability - WebRTC - Wikipedia</a>

## Disable Data Collection

::: important
By default, Firefox Nightly automatically sends data to Mozilla
:::

As nightly is considered a development platform & sends data you may want to disable data collection.

1. Open **Settings**
2. Go To **Data collection**
3. Disable Options

- Usage and technical data
- Marketing data (mobile marketing vendor)
- Studies

## Check Settings Applied

Click the links below to check the settings have been successfully applied.

<i class="fa fa-link"></i> <a href="https://browserleaks.com/dns" target="_blank" rel="noopener noreferrer">Check DNS currently in use - BrowserLeaks</a>

<i class="fa fa-link"></i> <a href="https://browserleaks.com/webrtc" target="_blank" rel="noopener noreferrer">Check for WebRTC leaks - BrowserLeaks</a>

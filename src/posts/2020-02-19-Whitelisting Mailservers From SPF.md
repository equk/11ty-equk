---
slug:
title: "Whitelisting Mailservers From SPF"
date: 2020-02-19T17:45:01.540Z
draft: false
author: equilibriumuk
tags:
  - linux
  - postfix
  - mail
  - bash
  - cli
  - github
image: ../_media/images/2020/02/network_rack.jpg
---

This is an old script I made while setting up whitelists on mailservers to speed up `postscreen` greylisting for known domains.

It can also be useful for permenantly blacklisting servers.

More info on how these scripts work and why they are needed can be found in my previous article [Extracting Mailserver List From SPF](/2020/02/19/extracting-mailserver-list-from-spf).

Some example domains you might want to whitelist:

- `google.com` (services like gmail)
- `microsoft.com` (hosted exchange email)
- `amazonses.com` (used for aws servers for automated emails)
- `alibaba.com` (notifications from sellers)

## Postscreen

<blockquote>The Postfix postscreen daemon provides additional protection against mail server overload.
<br/>One postscreen process handles multiple inbound SMTP connections,
and decides which clients may talk to a Postfix SMTP server process.
<br/>By keeping spambots away postscreen leaves more SMTP server processes available for legitimate clients and delays the onset of server overload conditions.</blockquote>

## Postfix Config

### Whitelisting / Blacklisting domains based on SPF

You can `permit` or `reject` entries in `cidr` lists set in `postscreen_access_list` setting. *(cidr allows for IP ranges to be added)*

<blockquote>Classless Inter-Domain Routing (CIDR) is an expansion of the IP addressing system
that allows for a more efficient and appropriate allocation of addresses.</blockquote>

Most installs have a single cidr file set in the main.cf config.

```conf
        postscreen_access_list = permit_mynetworks,
            cidr:/etc/postfix/postscreen_access.cidr
```

You can also extend this by creating seperate whitelist and blacklist files if needed.

## Script Usage Example

Add domain to whitelist

```sh
./spf_permit.sh google.com >> /etc/postfix/postscreen_access.cidr
```

## Download

The project can be viewed and downloaded from github.

<a class="github" href="https://github.com/equk/spf_list/" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Download</a>
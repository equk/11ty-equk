---
slug:
title: "Finding Subdomains From TLS"
date: 2017-01-20T18:18:06.704Z
draft: false
author: equilibriumuk
tags:
  - linux
  - bash
  - mail
  - github
  - infosec
  - security
image:
---

This is a basic `osint` tool for finding subdomains via alternate names set in TLS certificates.

There seem to be many osint tools which use wordlists to find subdomains.
<br/>Looking up alternate names in certificates is a lot quicker.

## Features

- [x] Extract Subdomains from HTTPS Websites
- [x] Extract Subdomains from SMTP Mailservers

## Interesting Fields

If you work with TLS certificates you will know they contain a lot of information and have various sections & fields.

One interesting field is `Subject Alternative Name` which can provide all subdomains that can use the certificate. *(unless the company uses a wildcard certificate)*

<blockquote>
A lot of people are using letsencrypt which does not support wildcard certificates.
</blockquote>

```psk
Certificate:
    Data:
        X509v3 extensions:
            X509v3 Subject Alternative Name:
```

This is the main field the script will try to extract.

A lot of domains will have multiple servers & services which can all share the same certificate.

We can exploit this when gathering information on a companies systems to find otherwise hidden servers & also possibly finding IP addresses which are behind things like reverse proxies or firewalls (eg: `cloudflare`).

*A lot of people forget to block traffic to webservers behind cloudflare.*
<br />I wrote a script to do this in 2014 - [Blog Post - Cloudflare Iptables](/2015/06/13/cloudflare-iptables/).

## Inspecting TLS Via CLI

You can view a certificate in the commandline by using `openssl s_client`.
<br />We want to see the X509 extensions so need to extend the output using the `x509` flag.

```sh
openssl s_client -connect website.com:443 | openssl x509 -text
```

This results in a wall of text which is annoying to scroll through when looking for relevant fields.

## Mailservers

Most mailservers support TLS and allow upgrading to TLS over `SMTP`.
<br />We can use this to gather more information.

If a company hosts their own email servers they will likely not be behind a reverse proxy so this can give more insight compared to `HTTPS`.

*This is still completely dependant on whether they use shared TLS certificates.*

## Example Script Output

```sh
./https_altnames.sh example.com
[+] Getting TLS over HTTPS for  [  example.com  ]
[+] Checking for Subject Alt Names

example.com
www.example.com
mail.example.com
dev.example.com
smtp.example.com
hidden.example.com
```

## Download

The project can be viewed and downloaded from github.

<a class="github" href="https://github.com/equk/tls-altnames/" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> Download</a>
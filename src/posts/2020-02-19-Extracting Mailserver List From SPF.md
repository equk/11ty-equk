---
slug:
title: "Extracting Mailserver List From SPF"
date: 2020-02-19T17:34:10.010Z
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

<blockquote>SPF (Sender Policy Framework) allows the receiver to check that an email claimed to have come from a specific domain comes from an IP address authorized by that domain's administrators.</blockquote>

## Domain SPF

You can lookup `TXT` entries of a domain pretty easily to get a `SPF` record but the problem is most mail services will have multiple servers seperated into lists of their own. *(most companies rely heavily on these external services)*
<br />This can also include external providers for sending newsletters.

Example google.com

```sh
    dig +short google.com TXT | grep spf1
    "v=spf1 include:_spf.google.com ~all"
```

In some cases these include lists expand into even more lists.
```sh
    dig +short _spf.google.com TXT | grep spf1
    "v=spf1 include:_netblocks.google.com include:_netblocks2.google.com include:_netblocks3.google.com ~all"
```

Now we have 3 lists to look into.

```sh
    dig +short _netblocks.google.com TXT | grep spf1
    "v=spf1 ip4:35.190.247.0/24 ip4:64.233.160.0/19 ip4:66.102.0.0/20 ip4:66.249.80.0/20 ip4:72.14.192.0/18 ip4:74.125.0.0/16 ip4:108.177.8.0/21 ip4:173.194.0.0/16 ip4:209.85.128.0/17 ip4:216.58.192.0/19 ip4:216.239.32.0/19 ~all"
```

Finally we hit some server IP addresses.

<article class="message is-info">
  <div class="message-header">
    <p>Security Note</p>
  </div>
  <div class="message-body">
    If you have an external provider included in your SPF you are giving full trust to their servers, allowing them to send from any address (@yourdomain) on your behalf.
  </div>
</article>

## CLI Script

It would be nice to be able to type one command in CLI with a domain and have it extract all of these server IPs.
<br />You could then use it to whitelist or blacklist IP addresses.

```sh
    └── google.com
        └── v=spf1 include:_spf.google.com
            └── v=spf1 include:_netblocks.google.com include:_netblocks2.google.com include:_netblocks3.google.com
```

Given the problem shown above we will need to iterate over each spf list.

This involves using a function to extract `ip4:` and `ip6:` entries which can loop itself using `include:` as an input until there are no `include:` remaining.

### Example Output

```sh
./spf_list.sh github.com
[+] looking up SPF records for domain [  github.com  ]
[+] IP addresses allowed to send from domain  github.com

# github.com
## 19/02/2020

# github.com
192.30.252.0/22
208.74.204.0/22
46.19.168.0/23
# _spf.google.com
# _netblocks.google.com
35.190.247.0/24
-snip-
```

## Download

The script can be downloaded from github.

<a class="github" href="https://github.com/equk/spf_list/" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> Download</a>
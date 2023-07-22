---
date: 2015-06-13T12:07:24Z
tags:
  - nginx
  - php
  - linux
  - cloudflare
  - iptables
  - firewall
title: Cloudflare iptables
slug: cloudflare-iptables/
---

<p class="text-center"><img width="360px" src="/media/images/2015/06/cf-logo-v-rgb_m.png" alt=""></p>

This is a simple script for people who are running servers behind cloudflare.

For most people cloudflare acts as a reverse proxy for traffic to your website so for the majority of users there is no need for any other external IP to hit their server on HTTP + HTTPS.

The script downloads cloudflares IP ranges and sets rules to allow only those ranges to access the server on http + https (80 + 443).

```bash
#!/bin/bash
##
#
# cf_iptables
# ===========
#
# Simple iptables script for cloudflare
#
# Sets iptables rules to only allow cloudflare IP ranges
# This stops direct traffic from visitors / hackers & means every visitor is
# connecting via cloudflare.
#
##
# equk 2014 - equk.co.uk
##

# check if root (required for iptables)
if [ $(whoami) != "root" ]; then
    echo "ERROR: Please Run As Root User (required for iptables)"
    exit 1
fi

# cloudflare ipv4
for i in `curl https://www.cloudflare.com/ips-v4`; do iptables -I INPUT -p tcp -s $i --dport http -j ACCEPT; done
for i in `curl https://www.cloudflare.com/ips-v4`; do iptables -I INPUT -p tcp -s $i --dport https -j ACCEPT; done

# cloudflare ipv6
for i in `curl https://www.cloudflare.com/ips-v6`; do ip6tables -I INPUT -p tcp -s $i --dport http -j ACCEPT; done
for i in `curl https://www.cloudflare.com/ips-v6`; do ip6tables -I INPUT -p tcp -s $i --dport https -j ACCEPT; done

# drop all others ipv4
iptables -A INPUT -p tcp --dport http -j DROP
iptables -A INPUT -p tcp --dport https -j DROP
# drop all others ipv6
ip6tables -A INPUT -p tcp --dport http -j DROP
ip6tables -A INPUT -p tcp --dport https -j DROP
```

The script is also available <a href="https://github.com/equk/linux/blob/master/scripts/cf_iptables.sh" target="_blank">on my <i class="fa fa-github-alt"></i>github</a>.

I also also posted this script <a href="https://www.reddit.com/r/webdev/comments/2i7wa9/behind_proxy_cloudflare_cdn_just_give_me_the/" target="_blank">last year (Oct 2014) on reddit as a response</a> to a PHP library.
I've been using it on servers since 2013.

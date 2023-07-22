---
date: 2014-04-07T14:20:15Z
tags:
- privacy
- dns
- dnscrypt
- opendns
title: using dnscrypt without opendns
slug: using-dnscrypt-without-opendns/
---

This relates to [my previous post](http://equk.co.uk/2014/04/07/uk-isps-providing-cdn-for-google/) regarding opendns, google & various ISP's within the UK.
I thought I'd make this post as a lot of people don't realise it is possible to use dnscrypt with other providers.

Reasons to drop opendns:

* everything is logged
* opendns control, change & block (without you knowing)
* opendns guide

Why use opendns when they log everything and seem to be striking deals with other companies to change things on live networks.

Also opendns guide - when you try a url that does not exist opendns redirects you to their guide.
This may seem ok but it is VERY annoying if you are working on CLI as you don't get expected errors eg: 'unknown host'.
Opendns guide also has at least 4 analytics scripts running, logging your requests.

Configuring Dnscrypt
---------------

Changing dnscrypt is pretty easy.
Details of various providers can be found on <a href="http://dnscrypt.org/" target="_blank">dnscrypt.org</a> & <a href="https://github.com/jedisct1/dnscrypt-proxy/blob/master/dnscrypt-resolvers.csv" target="_blank"><i class="fa fa-github-alt"></i> dnscrypt-proxy github</a>

It's also possible to setup dnscrypt on your own nameserver using <a href="https://github.com/Cofyc/dnscrypt-wrapper" target="_blank"><i class="fa fa-github-alt"></i> dnscrypt-wrapper</a>.

**<i class="fa fa-linux"></i> setup dnscrypt on linux**

If you installed dnscrypt using the default package manager there should be a config file within conf.d.
All you need to do is edit this file and replace the relevant lines.

See example config below.

*/etc/conf.d/dnscrypt-proxy*

	DNSCRYPT_LOCALIP=127.0.0.1
	DNSCRYPT_LOCALPORT=53
	DNSCRYPT_USER=nobody
	DNSCRYPT_PROVIDER_NAME=2.dnscrypt-cert.resolver1.dnscrypt.eu
	DNSCRYPT_PROVIDER_KEY=67C0:0F2C:21C5:5481:45DD:7CB4:6A27:1AF2:EB96:9931:40A3:09B6:2B8D:1653:1185:9C66
	DNSCRYPT_RESOLVERIP=176.56.237.171
	DNSCRYPT_RESOLVERPORT=443
    
To apply this just restart the daemon (or just reboot) and make sure you have your local nameserver set to 127.0.0.1 (*/etc/resolv.conf*)

You can also see the status of dnscrypt with 'systemctl status dnscrypt-proxy' or 'service dnscrypt-proxy status' (depending on version of linux)

    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Initializing libsodium for optimal performance
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Generating a new key pair
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Done
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Server certificate #808464433 received
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] This certificate looks valid
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Chosen certificate #808464433 is valid from [2013-10-22] to [2014-10-22]
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Server key fingerprint is 923B:5...1:E253
    Apr 07 15:58:50 dnscrypt-proxy[377]: [INFO] Proxying from 127.0.0.1:53 to 178.216.201.222:2053


**<i class="fa fa-windows"></i> setup dnscrypt on windows**

<a href="https://github.com/jedisct1/dnscrypt-proxy/blob/master/README-WINDOWS.markdown" target="_blank">The best guide for windows setup can be found on the dnscrypt-proxy github.</a>

**update:** <a href="https://github.com/Noxwizard/dnscrypt-winclient" target="_blank">this tool makes windows configuration easy</a>

You can test if this has applied by going to: <a href="http://dnsleaktest.com/" target="_blank">dnsleaktest.com</a>

related info: <a href="https://en.wikipedia.org/wiki/DNSCurve" target="_blank">DNSCurve</a>
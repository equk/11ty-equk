---
date: 2014-04-07T22:36:04Z
image: ../_media/images/2014/Sep/plusnet_google_ssl.png
tags:
- google
- security
- infosec
title: UK ISP's providing cdn for google
slug: uk-isps-providing-cdn-for-google/
permalink: /2014/04/07/uk-isps-providing-cdn-for-google/
---

I read a post this morning regarding virgin media using their own hosted cdn servers for google.com (and related domains/subdomains)

<a href="https://www.reddit.com/r/privacy/comments/22bxxg/virgin_media_why_are_you_manipulating_my_traffic/" target="_blank">Virgin Media, why are you manipulating my traffic?</a>

The end of the article seems to say that if you use opendns dnscrypt it fixes the problem. **(it doesn't)**

Unfortunately traffic to google domains still get directed to the ISP specific CDN.

So after looking into it on plusnet it seems opendns are doing this.
If the ISP is doing some sort of MITM how does this work with dnscrypt? (it seems opendns could be providing this service?)

Anyway here is a dump of information from a plusnet connection:

**using dnscrypt (with opendns)**
-------------

dig a google.com

    ;; ANSWER SECTION:
    google.com.     300 IN  A   212.56.71.212
    google.com.     300 IN  A   212.56.71.216
    google.com.     300 IN  A   212.56.71.229
    google.com.     300 IN  A   212.56.71.227
    google.com.     300 IN  A   212.56.71.223
    google.com.     300 IN  A   212.56.71.238
    google.com.     300 IN  A   212.56.71.219
    google.com.     300 IN  A   212.56.71.208
    google.com.     300 IN  A   212.56.71.251
    google.com.     300 IN  A   212.56.71.241
    google.com.     300 IN  A   212.56.71.230
    google.com.     300 IN  A   212.56.71.240
    google.com.     300 IN  A   212.56.71.245
    google.com.     300 IN  A   212.56.71.249
    google.com.     300 IN  A   212.56.71.234
    google.com.     300 IN  A   212.56.71.218

dig a google.com @ns1.google.com

    ;; ANSWER SECTION:
    google.com.     300 IN  A   212.56.71.227
    google.com.     300 IN  A   212.56.71.216
    google.com.     300 IN  A   212.56.71.245
    google.com.     300 IN  A   212.56.71.240
    google.com.     300 IN  A   212.56.71.251
    google.com.     300 IN  A   212.56.71.234
    google.com.     300 IN  A   212.56.71.249
    google.com.     300 IN  A   212.56.71.223
    google.com.     300 IN  A   212.56.71.241
    google.com.     300 IN  A   212.56.71.229
    google.com.     300 IN  A   212.56.71.218
    google.com.     300 IN  A   212.56.71.219
    google.com.     300 IN  A   212.56.71.238
    google.com.     300 IN  A   212.56.71.230
    google.com.     300 IN  A   212.56.71.208
    google.com.     300 IN  A   212.56.71.212

ping google.com

    PING google.com (212.56.71.218) 56(84) bytes of data.
    64 bytes from ggc01.plus.net (212.56.71.218): icmp_seq=1 ttl=58 time=13.8 ms

**using opennic**
------------

http://www.opennicproject.org/ - Total DNS Neutrality

dig a google.com

    ;; ANSWER SECTION:
    google.com.     49  IN  A   173.194.45.37
    google.com.     49  IN  A   173.194.45.40
    google.com.     49  IN  A   173.194.45.41
    google.com.     49  IN  A   173.194.45.32
    google.com.     49  IN  A   173.194.45.34
    google.com.     49  IN  A   173.194.45.33
    google.com.     49  IN  A   173.194.45.38
    google.com.     49  IN  A   173.194.45.36
    google.com.     49  IN  A   173.194.45.39
    google.com.     49  IN  A   173.194.45.46
    google.com.     49  IN  A   173.194.45.35

dig a google.com @ns1.google.com

    ;; ANSWER SECTION:
    google.com.     300 IN  A   212.56.71.154
    google.com.     300 IN  A   212.56.71.152
    google.com.     300 IN  A   212.56.71.181
    google.com.     300 IN  A   212.56.71.176
    google.com.     300 IN  A   212.56.71.166
    google.com.     300 IN  A   212.56.71.163
    google.com.     300 IN  A   212.56.71.170
    google.com.     300 IN  A   212.56.71.174
    google.com.     300 IN  A   212.56.71.159
    google.com.     300 IN  A   212.56.71.187
    google.com.     300 IN  A   212.56.71.177
    google.com.     300 IN  A   212.56.71.185
    google.com.     300 IN  A   212.56.71.155
    google.com.     300 IN  A   212.56.71.144
    google.com.     300 IN  A   212.56.71.148
    google.com.     300 IN  A   212.56.71.165

ping google.com

    PING google.com (173.194.45.41) 56(84) bytes of data.
    64 bytes from par03s12-in-f9.1e100.net (173.194.45.41): icmp_seq=1 ttl=53 time=21.4 ms


**using google public nameservers**
-------------------------

    PING google.com (212.56.71.170) 56(84) bytes of data.
    64 bytes from ggc02.plus.net (212.56.71.170): icmp_seq=1 ttl=58 time=13.4 ms

dig a google.com +trace

    ; <<>> DiG 9.9.2-P2 <<>> a google.com +trace
    ;; global options: +cmd
    .           21179   IN  NS  d.root-servers.net.
    .           21179   IN  NS  g.root-servers.net.
    .           21179   IN  NS  l.root-servers.net.
    .           21179   IN  NS  b.root-servers.net.
    .           21179   IN  NS  m.root-servers.net.
    .           21179   IN  NS  i.root-servers.net.
    .           21179   IN  NS  h.root-servers.net.
    .           21179   IN  NS  a.root-servers.net.
    .           21179   IN  NS  f.root-servers.net.
    .           21179   IN  NS  k.root-servers.net.
    .           21179   IN  NS  j.root-servers.net.
    .           21179   IN  NS  e.root-servers.net.
    .           21179   IN  NS  c.root-servers.net.
    .           21179   IN  RRSIG   NS 8 0 518400 20140413000000 20140405230000 40926 . DEdujVD4EJYvj4oUNwyAwykWYGE8y7cON3cYIdUqtzCbGo13kP64HZxI E+dNDywsKz0kUcufD0mKjYxFnid/dYlmmwxY9lQCknzaU7FIc2l/POly rZEXnrZXZqi3oVSQFkP/cmOKGTh8l9Pk4ZwCdTipogsjkqGVOPeet0jw xRg=
    ;; Received 397 bytes from 8.8.8.8#53(8.8.8.8) in 269 ms

    com.            172800  IN  NS  a.gtld-servers.net.
    com.            172800  IN  NS  b.gtld-servers.net.
    com.            172800  IN  NS  c.gtld-servers.net.
    com.            172800  IN  NS  d.gtld-servers.net.
    com.            172800  IN  NS  e.gtld-servers.net.
    com.            172800  IN  NS  f.gtld-servers.net.
    com.            172800  IN  NS  g.gtld-servers.net.
    com.            172800  IN  NS  h.gtld-servers.net.
    com.            172800  IN  NS  i.gtld-servers.net.
    com.            172800  IN  NS  j.gtld-servers.net.
    com.            172800  IN  NS  k.gtld-servers.net.
    com.            172800  IN  NS  l.gtld-servers.net.
    com.            172800  IN  NS  m.gtld-servers.net.
    com.            86400   IN  DS  30909 8 2 E2D3C916F6DEEAC73294E8268FB5885044A833FC5459588F4A9184CF C41A5766
    com.            86400   IN  RRSIG   DS 8 1 86400 20140413000000 20140405230000 40926 . Pdq6H1mhyBA1nRVqvG+9CEvfKXYTqvmpI0rnL+fmw+MRHvF3LQ3xgnEI eZo5CMRh9fsofQovjDjVspwww2kKo/NurBSG6jvBA1kDy5O4VlPNtCs6 CgD564CaKee8jjK70i5g22WCAddFt8Lty/H2s3rJ5gy36kHfE8A2Ojqm bJY=
    ;; Received 734 bytes from 193.0.14.129#53(193.0.14.129) in 263 ms

    google.com.     172800  IN  NS  ns2.google.com.
    google.com.     172800  IN  NS  ns1.google.com.
    google.com.     172800  IN  NS  ns3.google.com.
    google.com.     172800  IN  NS  ns4.google.com.
    CK0POJMG874LJREF7EFN8430QVIT8BSM.com. 86400 IN NSEC3 1 1 0 - CK0QFMDQRCSRU0651QLVA1JQB21IF7UR NS SOA RRSIG DNSKEY NSEC3PARAM
    CK0POJMG874LJREF7EFN8430QVIT8BSM.com. 86400 IN RRSIG NSEC3 8 2 86400 20140411044821 20140404033821 45932 com. N3zqzBYNJnebZPJnMWTx6ixHUAzYpBw5FKiYN9gnvm2ik9C6vWxoVkr2 r7J2aLYUCfZqcQYoHfsDNuBWIDZW3Jty0Y1/r0oB/b1kbQO5FwIQTbMO UrNz3Kds4yOg96AbS93C58yg2O0B2Gm6GTZkxNAGLjNQySG7oa8LYheH lnk=
    S849U7S2572D0AU6AMC3AJOAU7UEJJTV.com. 86400 IN NSEC3 1 1 0 - S84ED76QR4M9JN21LN5DUGRUI706HHUF NS DS RRSIG
    S849U7S2572D0AU6AMC3AJOAU7UEJJTV.com. 86400 IN RRSIG NSEC3 8 2 86400 20140413044651 20140406033651 45932 com. sSnwONORtD2BVU/TZHujuFIrKH1inhvLRPPzLo9Fo+fONuYBpEfDY6IV POrgLN4NyASecTuV2l2TVCZ0pr//77WnXwQhh38BbYrYgbnr9YlEfOfo i6UQc6dCzEI+bxFrVSRtBXJkaoVVJtN+zrlFxDezRtcVN7miWSN6NdU/ j3o=
    ;; Received 660 bytes from 192.12.94.30#53(192.12.94.30) in 114 ms

    google.com.     300 IN  A   212.56.71.163
    google.com.     300 IN  A   212.56.71.144
    google.com.     300 IN  A   212.56.71.166
    google.com.     300 IN  A   212.56.71.148
    google.com.     300 IN  A   212.56.71.187
    google.com.     300 IN  A   212.56.71.170
    google.com.     300 IN  A   212.56.71.185
    google.com.     300 IN  A   212.56.71.155
    google.com.     300 IN  A   212.56.71.177
    google.com.     300 IN  A   212.56.71.154
    google.com.     300 IN  A   212.56.71.165
    google.com.     300 IN  A   212.56.71.152
    google.com.     300 IN  A   212.56.71.174
    google.com.     300 IN  A   212.56.71.159
    google.com.     300 IN  A   212.56.71.176
    google.com.     300 IN  A   212.56.71.181
    ;; Received 284 bytes from 216.239.34.10#53(216.239.34.10) in 22 ms

From a quick look into this it seems answers to all of these domains/subdomains are redirected to the 'cdn'.

* google.com
* encrypted.google.com
* google.co.uk
* youtube.com

There are probably more.

So what are your options if you want to opt-out of using these cdn's ?

* find a better nameserver to use
* setup hosts file to direct queries to google IP's (not really ideal)

**notes:** [It is possible to use dnscrypt with other nameserver providers or even implement it on your own nameserver](http://equk.co.uk/2014/04/07/using-dnscrypt-without-opendns/)

### update 22/09/2014

Just thought I'd add this
The plusnet hosted servers seem to have valid 'google.com' SSL certificates.

<p class="text-center"><img alt="plusnet_google_ssl" src="/media/images/2014/Sep/plusnet_google_ssl.png"></p>

Try it for yourself: <a href="https://212.56.71.212/" target="_blank">https://212.56.71.212/</a> also <a href="http://whois.domaintools.com/212.56.71.212" target="_blank">whois on 212.56.71.212</a> shows plusnet ownership.

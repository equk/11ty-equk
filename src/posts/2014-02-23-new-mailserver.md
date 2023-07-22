---
date: 2014-02-23T11:01:57Z
tags:
- postfix
- dovecot
- email
- postscreen
title: new mailserver
slug: new-mailserver/
---

<p class="text-center"><img src="/media/images/2014/Feb/postfix_logo.png" alt="postfix"><img src="/media/images/2014/Feb/dovecot_logo.png" alt="dovecot"></p>
I recently decided to setup my own email server.

After testing various email systems on virtual machines I decided on postfix + dovecot.
I also decided to use MySQL/mariadb as the user/email database as it supports SHA-512 (bcrypt soon?).

I had previously worked on servers with exim + spamassassin + clamav but the memory usage always seemed quite high (especially with clamav scanning zip attachments).
So I looked around and found dspam was an alternative, from what I had read it seemed as much a resource hog as spamassassin.
Then I found **postscreen**.

Here is a graph of memory usage from 15th Feb:
<p class="text-center"><img src="/media/images/2014/Feb/mail_mem_15feb_24hr.png" alt="mail_mem_15feb"></p>
Hardly any memory used, this was after the server had been running for a week.

**Base packages:** postfix, dovecot, mariadb<br />
**Antispam:** postscreen, header checks<br />
**Protocols:** IMAPS, SMTP (TLS, SASL)<br />
**Administration:** Python CLI Tools*<br />
**Other:** SPF + DKIM (signing and checking)

**I wrote my own Python CLI Tools for administration of domains, mailboxes and aliases (will hopefully be releasing these on github soon)*
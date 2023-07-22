---
date: 2016-02-14T00:22:52Z
tags:
  - tor
  - kickstarter
title: eBlocker - anonabox style magicbox - with added MITM
slug: eblocker-kickstarter/
---

I'm going to start by saying this project came to my attention when they followed me on twitter.

<p class="text-center"><img src="/media/images/2016/02/newfollower_eblocker.jpg" alt="eblocker_header"></p>

I was astounded to find they have been backed on kickstarter with a huge sum of money.
The product has so many similarities with Anonabox (a flawed product which was pulled by kickstarter).

### At a Glance

Here are some glaringly obvious things you will find on the <a href="https://www.kickstarter.com/projects/eblocker/the-first-plug-and-play-privacy-solution-for-all-y" target="_blank">eblocker kickstarter page</a>.

**Actively using MITM to inject content into client sessions**

<blockquote>After checking a page, eBlocker inserts the eBlocker activity icon indicating how many URLs were eblocked. This icon provides 1-click access to the eBlocker Controlbar.</blockquote>

**Attempts to route everything via tor**

<blockquote>Let eBlocker hide your real IP-address by routing the traffic through the Tor network</blockquote>

### In practice

**eBlocker does not work with HTTPS / TLS Websites** (currently).<br/>
It will never be able to safely work with TLS (https) due to actively using a proxy to inject content.

<a href="http://user.forum.eblocker.com/topic/does-eblocker-blocks-all-https-sites-instead-of-only-ignoring-them" target="_blank">support ref#1</a>

<blockquote>eBlocker only filters network packages on port 80 (HTTP) yet. All other ports like 443 (HTTPS) are ignored.</blockquote>

<a href="http://user.forum.eblocker.com/topic/https-facebook-google" target="_blank">support ref#2</a>

<blockquote>the eBlocker is still in development. SSL support is not included in the current early access release, but it is an upcoming feature (we will implement it propably until 02/2016). Therefore your right: Without SSL support is Facebook blocking not possible yet.</blockquote>

<a href="http://user.forum.eblocker.com/topic/how-real-is-the-anonymization" target="_blank">support ref#3</a>

<blockquote>check.torproject.org uses HTTPS / SSL. HTTPS support is not included in the current release. So the anonymization does not work. We are working on this task and will implement HTTPS support soon.</blockquote>

As it does not work on TLS (https) websites, users cannot be sure they are visiting the site via a direct connection or tor (or a vpn if it supports that).

The buzzword on the kickstarter page seems to be protection.
The only possible protection could be blocking of trackers, something that can already be achieved with most modern web browsers by using blocklists. (most tracker javascript is served over https, something eblocker does not support)

Looking at the software image available (0.8.1 beta) it seems the device currently attempts to route traffic through tor, for many reasons this is not the best idea.

### False Claims in Advertising

<blockquote>eBlocker is a smart device that anonymizes your online behavior. It stops all trackers, blocks all ads and protects your kids online.</blockquote>

How does it stop <u>all</u> trackers when it can only block externally referenced javascript?
There are a number of other ways to track people online.
The same with the <u>all</u> ads statement, it blocks based on blocklists so there is no guarantee this will block <u>all</u> ads.

Also do not think you are anonymous by simply routing everything via tor while also having javascript enabled.

### Similarities to Anonabox

- Attempts to route everything via tor
- Funded via kickstarter
- claims to protect users

### But Kickstarter is safe?

Here are some quotes from <a href="https://www.kickstarter.com/help/faq/kickstarter%20basics" target="_blank">kickstarter terms of service</a>.

<blockquote>Kickstarter does not guarantee projects or investigate a creator's ability to complete their project. On Kickstarter, backers (you!) ultimately decide the validity and worthiness of a project by whether they decide to fund it.</blockquote>
<blockquote>Can Kickstarter refund the money if a project is unable to fulfill?</blockquote>
<blockquote>No, Kickstarter doesn't issue refunds. Transactions are between backers and creators directly. Creators receive all funds (less fees) soon after their campaign ends.</blockquote>

### What is injected into every website you visit

It seems eBlocker injects a large amount of code into pages you visit in order to display the icon in the top corner & when clicked the controlbar for configuration. (screenshots of this <a href="http://user.forum.eblocker.com/knowledge-base/article/using-the-controlbar" target="_blank">can be seen on the eblocker knowledge base</a>)

the icon element is injected

```html
<div
  id="eblocker-icon-right"
  class="WHITELISTED"
  draggable="true"
  style="display: none; position: fixed; right: 0px; top: 0px; padding: 0px; border: 0px; z-index:2147483646; cursor: pointer;"
>
  <img
    src="http://192.168.3.113/images/eblocker-icon-44x44.png"
    style="height:44px; width:auto;"
  />
</div>
```

javascript then runs, polling eBlocker every 2 seconds

```javascript
if (this==top) {
	document.getElementById('eblocker-icon-right').style.display='block';
	window.addEventListener("message", receiveEblockerMessage, false);

	intervalID = window.setInterval(eblockerUpdateBadge, 2000);
}
function eblockerUpdateBadge() {
	---snip---
	req.open('GET', 'http://192.168.3.113/filter/badge/@EBLOCKER_PAGE_CONTEXT_ID@', true);
	req.setRequestHeader('Accept', 'application/json');
	req.send();
}
```

when clicked a iframe (controlbar.html) is referenced to show the options interface

```javascript
function createEblockerIframe(frameId, parentId, location) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", frameId);
  iframe.setAttribute("src", location);
  iframe.setAttribute(
    "style",
    "border:0px; width:100%; height:100%; overflow:hidden; background-color:#ffffff00;"
  );
  iframe.setAttribute("scrolling", "no");
  document.getElementById(parentId).appendChild(iframe);
}
```

In total there are ~100 lines of javascript & ~50 lines of html injected into every website you visit (before you click on the button).
Once you click the button & controlbar.html is referenced, ~6M of javascript is loaded due to the options interface being based on angular.js.

    6.5M	./javascripts
    	6.1M	./angularjs
        212K	./angular-material
        112K	./bootstrap
    924K	./stylesheets

As the eBlocker device has no trusted TLS certificate it cannot reference any of this over TLS without causing the browser to error.

### What's inside the sw image?

The main software components used for eBlocker features:

- squid
- redsocks
- tor

Blocking seems to use free (adblock) blocklists.

    $ ls -l /opt/eblocker-lists/lists-source
    total 2.3M
    -rw-r--r-- 1 root root 366K Oct 20 16:30 easylistgermany.txt_src
    -rw-r--r-- 1 root root 1.6M Oct 20 16:30 easylist.txt_src
    -rw-r--r-- 1 root root 288K Oct 20 16:30 easyprivacy.txt_src
    -rw-r--r-- 1 root root  404 Oct 20 16:30 tracking-redirect.txt_src

_Interestingly none of the lists block eTracker tracking javascript._

There are also a few proprietary daemons relating to ARP manipulation & modification of HTTP headers which seem to be written by eBlocker.

### eBlocker CEO founded a huge analytics company

The CEO of eBlocker is the founder, ex-CEO & <a href="https://www.linkedin.com/in/christianbennefeld/de" target="_blank">current shareholder</a> of eTracker, a huge tracking company.

<blockquote>Christian Bennefeld studied computer science.....
    .....he founded etracker GmbH in 2000, a specialist for web-analytics and online-marketing optimization.
    He served as CEO until 2013 and succeeded in making etracker one of Europe’s market leaders.</blockquote>

The eBlocker website actively uses eTracker to track visitors to their website despite promoting the blocking of website tracking.

```html
src="//static.etracker.com/code/e.js"></script>
```

### What is next?

It is going to be interesting to see how or even if eBlocker decide to support TLS.
Due to the excessive use of injection via an invisible proxy it seems very unlikely eBlocker will be able achieve this without removing or breaking some of the security TLS provides.

Apparently they are working on this feature but will it be a feature before kickstarter take the funds from backers on Wed, Feb 17 2016 ??

The main thing you should know is most websites use TLS (HTTPS) to help secure your browsing.
Currently eBlockers features do not work on any top websites (eg: google, youtube, facebook, twitter, reddit).
eBlocker also does not block any of these TLS based analytics tracker platforms (google, yahoo, etracker, piwik, adobe, Kissmetrics, Mixpanel)

**update 18-02-2016**

The kickstarter finished yesterday.

<blockquote>While the world of web development is working towards securing website users from mitm attacks implementing things like TLS certificates, 3,000+ people pledge over €540,000 to have mitm in the form of a insecure magic box which actually provides a larger attack surface than before</blockquote>

It will be very clear to any infosec people that these devices create a huge attack surface (just from the small amount of code shown on this blog post).

**update 22-03-2016**

eBlocker changed their hardware to standard banana pi m2 boxes with a clear perspex case. (~€40 from china)
In addition to this, eblockers <a href="http://www.haz.de/Nachrichten/Wirtschaft/Niedersachsen/CD-Hersteller-EDC-in-Langenhagen-von-Insolvenz-bedroht" target="_blank">manufacturing partner seems to have filed for bankruptcy</a>.
Their shop seems to suggest delivery for end of July 2016 (previously stated June) & also states more features including manipulating the browsers useragent.

**update 05-04-2016**

There are multiple known vulnerabilities in anonabox beta, most are due to poor software design & implementation (these range from code injection to code execution).

_The product seems flawed in its use of ARP poisoning, packet manipulation & active code injection._

Various technologies that exist today completely block eblocker MITM attempts.
These technologies exist in modern web browsers & servers.

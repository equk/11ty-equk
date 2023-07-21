---
slug:
title: "Dropping Firefox"
date: 2021-09-13T19:06:54.499Z
draft: false
author: equilibriumuk
tags:
  - github
  - firefox
  - javascript
image: ../_media/images/firefox_large_logo.png
---

I have used Mozilla Firefox as my main browser for a long time now.<br />
It is a fundamental part of the web & provides the only real alternative to browsers based on the Google Blink engine.

There are various posts on this site regarding scripts I've written for Firefox both on Linux & on Windows but recent changes have lead me to stop using Firefox completely.

*updated Oct 8 2021 added information regarding Firefox Suggest*

## Negative Changes

- [x] Forcing Pocket
- [x] Pocket Recommendations (Adverts on New Tab)
- [x] Forcing DNS over HTTPS
- [x] GUI That Looks Like a Webpage
- [x] Firefox Suggest (Adverts in Address Bar)

The most recent change which made me question whether to continue to try to fix things was the GUI.

Mozilla released a update which made tabs look like webapp buttons.

Then last week they released version 92.0 changing bookmarks dropdown menus to be huge adding padding & rounded corners.

> I personally don't expect desktop applications to look like someones first time using CSS.

Over time I've built up a `userChrome.css` to fix a lot of changes but as time goes on & Mozilla diverge away from desktop app design I start to question if it's even worth it.

I also have a  custom `prefs.js` disabling many builtin features of Firefox.

### Forced Features

There are various features which seem to have been added & have become enabled by default in Firefox.

#### DoH

This can be detrimental to many users depending on how their network is setup as it bypasses the nameserver set by the network.<br />
This can lead to DNS lookup problems & bypasses any blocking people may have setup (eg: many use dnsmasq with pihole to block adverts & tracking).

There's also the view that forcing users to use a single nameservice creates a central point for monitoring & analytics.

#### Pocket

This is a small thing but it should not be forced onto users.

In addition a default install also has Pocket Recommendations (Adverts) on new tabs (introduced in Firefox 77).

<p class="text-center"><img src="/media/images/2021/ffox_77_pocket.png" alt="ffox_77_pocket"></p>

This feature <a href="https://twitter.com/equilibriumuk/status/1310892618679816192/photo/1" aria-label="equilibriumuk on twitter" target="_blank" rel="noopener noreferrer">is still active with pocket disabled</a>.

### GUI Changes

Huge zoomed urlbar introduced in Firefox 75

<p class="text-center"><img src="/media/images/2021/ffox_75_search.png" alt="firefox-75-search"></p>

Tabs that look like webapp buttons introduced in Firefox 89

Huge bookmarks dropdown with rounded corners introduced in Firefox 92

<p class="text-center"><img src="/media/images/2021/ffox_newtab.png" alt="firefox-linux"></p>

Comparing the two screenshots above you can see that tabs went from square with a color accent above to show active tab to being a rounded button with no color & a smaller close button.

#### Mozilla Remove Compact Option

Mozilla want to remove the compact layout in firefox & so far have removed the option from the browser, stating they will not support it.<br />
*There is a thread on bugzilla showing there are no real benefits in doing this*

<i class="fa fa-link"></i> <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1693028" target="_blank" rel="noopener noreferrer">Bugzilla: Remove compact mode inside Density menu of customize palette</a>

The OP does a good job of showing how bad their UX is without even realizing suggesting the customize option is *'fairly hard to discover'*.

They also seem to assume the use of compact mode directly relates to desktop resolution despite not showing any reasoning or stats referencing this.

#### Mozilla Adds Firefox Suggest

Mozilla have now added adverts in the address bar with Firefox Suggest (version 93.0 Oct 5 2021).

<p class="text-center"><img src="/media/images/2021/ffox_93_suggest.png" alt="ffox_93_suggest"></p>

This feature is enabled by default meaning users need to opt out.

<i class="fa fa-link"></i> <a href="https://blog.mozilla.org/data/2021/09/15/data-and-firefox-suggest/" target="_blank" rel="noopener noreferrer">Mozilla Blog: Data and Firefox Suggest</a><br /><i class="fa fa-link"></i> <a href="https://support.mozilla.org/en-US/kb/navigate-web-faster-firefox-suggest" target="_blank" rel="noopener noreferrer">Mozilla Support: Firefox Suggest</a>


## Conclusion

Some of these things might seem small to many but a large percentage of time on the computer is spent looking at the web browser & there are many other options with better features when it comes to UX & UI design.

I question whether Mozilla see Firefox as a desktop app or a web app as it seems the more changes they make the more their web browser looks like a web app.

As a user I feel like I shouldn't be trying to fix GUI changes over and over so am now testing out alternatives like Brave.

## Firefox Fixes

I have scripts for creating profiles with fixes for most of the GUI changes & settings overrides available on github.

<a class="github" href="https://github.com/equk/ffox_profile_tools" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> ffox_profile_tools</a>

I recently added a fix for the bookmark spacing *(there are still rounded corners on the dropdown so it still looks bad)*.
---
title: "Firefox Forcing LLM Features"
date: 2025-10-28T18:15:55.014Z
author: equilibriumuk
draft: false
tags:
  - github
  - firefox
  - javascript
image: ../_media/images/2018/09/mozilla_header.jpg
imgAuthor:
imgAuthorURL:
mastodonPostId:
blueskyPostId:
excerpt: "Mozilla forcing llm features and providing no gui for users to disable them"
---

Mozilla has been adding in llm & ai related features to Firefox for a while, enabling them by default without asking the user.

The main problem with this is users are having this forced on them with no gui option to disable these features.

There have been reports of high cpu & ram usage with firefox local ai features.

Mozilla also had some trouble with their wording in their ToS relating to user data which seems to tie in to these ai features being pushed.

## Disable LLM

It doesn't seem there are many options relating to disabling ai features in the gui of firefox, they instead hide it behind config variables.

> [!note]
> I had `browser.ml.enable` & `browser.ml.chat.enable` set to `false` but still had a option in the context menu saying 'ask an ai chatbot (z)'.

This lead to me adding even more preferences into `prefs.js` on my profile scripts.

Here is a listing of options to disable llm & ai related features in firefox.

```js
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.chat.hideFromLabs", true);
user_pref("browser.ml.chat.hideLabsShortcuts", true);

user_pref("browser.ml.chat.page", false);
user_pref("browser.ml.chat.page.footerBadge", false);
user_pref("browser.ml.chat.page.menuBadge", false);
user_pref("browser.ml.chat.menu", false);
user_pref("browser.ml.linkPreview.enabled", false);
user_pref("browser.ml.pageAssist.enabled", false);

user_pref("browser.tabs.groups.smart.enabled", false);
user_pref("browser.tabs.groups.smart.userEnabled", false);

user_pref("extensions.ml.enabled", false);
```

You can set these in `about:config` or add them to `prefs.js` in your profile folder.

I have [automated scripts](#download) to add these settings to every profile on my system.

## Alternatives

There are a few projects that are forks of firefox with these features removed.

I would think most non technical users would just use a different browser.

Mozilla Firefox share of the browser market is already tiny.

### Browser Market Share Worldwide - September 2025

- Chrome: 71.77%
- Safari: 13.9%
- Edge: 4.67%
- Firefox: 2.17%

[Browser Market Share Worldwide](https://gs.statcounter.com/browser-market-share)

## Download

My firefox profile scripts are available on github with a default `prefs.js` included.

<a class="github" href="https://github.com/equk/ffox_profile_tools" aria-label="View ffox_profile_tools on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> ffox_profile_tools</a> <a class="github" href="https://github.com/equk/ffox_profile_tools/blob/master/ffox_data/def_prefs.js" aria-label="View def_prefs.js on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> def_prefs.js</a>

## Related

📝 <a href="/2023/03/29/firefox-in-2023/" target="_blank" rel="noopener noreferrer">Mar 29, 2023 - Firefox in 2023</a>

📝 <a href="/2018/09/12/firefox-profile-tools/" target="_blank" rel="noopener noreferrer">Sep 12, 2018 - Firefox Profile Tools</a>
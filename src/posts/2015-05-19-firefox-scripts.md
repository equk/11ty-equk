---
date: 2015-05-19T16:11:12Z
tags:
- github
- linux
- tweaks
- mozilla
- firefox
title: Firefox Tweaks & Scripts
slug: firefox-scripts/
---

<p class="text-center"><img src="/media/images/2015/05/firefox_wordmark-logo.png" alt=""></p>


### about:config tweaks

**Write cache to RAM**

    "browser.cache.disk.enable", false
    "browser.cache.memory.enable", true
    "browser.cache.memory.max_entry_size", -1

**Disable 3rd Party Cookies**

    "network.cookie.cookieBehavior", 1

**Disable geolocation**

	"geo.enabled", false

**Disable Google SafeBrowsing**

	"browser.safebrowsing.enabled", false
	"browser.safebrowsing.malware.enabled", false
	"browser.safebrowsing.downloads.enabled", false
	"browser.safebrowsing.downloads.remote.enabled", false

**Disable Prefetch & Search suggestions**

	"network.prefetch-next", false
	"browser.search.suggest.enabled", false

**Disable PDFJS**

    "pdfjs.disabled", true
*I personally don't want the browser to automatically open PDF files.*

### linux profile scripts

I made these scripts to utilize multiple profiles while also keeping the tweaks listed above.
All of these scripts are on my github, if anyone has any suggestions for improvements please leave a comment.

**<i class="fa fa-github-alt"></i> Scripts:**

* <a href="https://github.com/equk/linux/blob/master/bin/ffox" target="_blank">ffox</a> - default profile script
* <a href="https://github.com/equk/linux/blob/master/bin/ffoxdev" target="_blank">ffoxdev</a> - example secondary profile script
* <a href="https://github.com/equk/linux/blob/master/bin/ffox_data/def_prefs.js" target="_blank">def_prefs.js</a> - custom preferences

I personally don't like the Firefox ProfileManager so use the --profile commandline option.

The main reason behind having different profiles is using them for testing things, I can remove a profile, run the script and have a completely new, clean & tweaked profile.

### useful extensions

* **Classic Theme Restorer** - allows you to tweak a lot of firefox styling options
* **Greasemonkey** - allows use of userscripts
* **HTTPS-Everywhere** - forces HTTPS on specific sites & services
* **uBlock Origin** - element blocking
* **Disconnect** - blocking of tracking scripts etc
* **Self-Destructing Cookies** - removes cookies unless whitelisted

* **FireBug** - useful for debugging & testing

### other options

**force socks proxy dns resolution**

    "network.proxy.socks_remote_dns", true
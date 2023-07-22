---
date: 2013-05-05T10:00:00Z
tags:
- windows
- chromium
- ramdisk
title: Using a RAMDisk in windows for browser cache
slug: using-a-ramdisk-in-windows-for-browser-cache/
---

I've recently been using windows for a new project (normally spend 80% of my time in linux) so thought I'd try this.

The idea comes from my linux install and relates to my <a title="using a ramdisk to speedup google chromium" href="https://equk.co.uk/2010/10/12/save-chromium-profile-to-ramdisk/" target="_blank">previous posts from 2010</a> regarding the usage of ramdisks for temporary storage.

I looked online and found <a title="amd radeon ramdisk" href="http://www.radeonmemory.com/" target="_blank">AMD have ramdisk software</a> (well they seem to have paid dataram for ramdisk software).
I downloaded both versions and found the dataram one was a later revision and was also half the size. Both are hosted &amp; coded by dataram.

Install <a title="dataram ramdisk" href="http://memory.dataram.com/products-and-services/software/ramdisk" target="_blank">dataram ramdisk</a>.

<p class="text-center"><img alt="dataram_set" src="/media/images/2014/Nov/dataram_set.jpg"/></p>

Start it up and select the settings required (I went for 512MB FAT32). On the load/save tab I didn't select anything as the cache directory is temporary storage and doesn't need to be kept.

The next thing is to set the cache directory for chrome.
This can be done using a commandline switch (disk-cache-dir). I also set a maximum size limit as the ramdisk is only 512mb.

Change your shortcut to include these options:

    --disk-cache-dir="R:/" --disk-cache-size=524288000
    
(change R to your ramdisk letter - I forced mine to R for ramdisk)

Startup chrome using the new shortcut and you should see a cache directory appear in the ramdisk.
Loading times etc should also be a lot faster.

Another optional step is to set these variables within the registry (for when you click links etc from other applications).

    HKEY_CLASSES_ROOT\\ChromeHTML\\shell\\open\\command

Benchmark of a DDR3 ramdisk:
<p class="text-center"><img alt="crystaldisk_ddr3" src="/media/images/2014/Nov/crystaldisk_ddr3.jpg"/></p>
<strong>Notes for other browsers:</strong>
<em><strong>firefox</strong> - 2 settings in about:config</em> - browser.cache.disk.parent_directory &amp; browser.cache.disk.capacity
<em><strong>opera</strong> - opera:config#UserPrefs|CacheDirectory4</em>

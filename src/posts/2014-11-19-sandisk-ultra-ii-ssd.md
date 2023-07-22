---
date: 2014-11-19T12:55:20Z
tags:
- github
- linux
- archlinux
- ssd
title: Sandisk Ultra II SSD
slug: sandisk-ultra-ii-ssd/
---

<p class="text-center"><img src="/media/images/2014/Nov/sandisk_ultra_ii_title.jpg" alt="sandisk_ultra_ii"></p>

I've been waiting for a while to get a SSD for my main system & finally decided to get a new SanDisk as I'm very happy with the <a href="https://equk.co.uk/2014/08/05/c710-ssd-upgrade/" target="_blank">Ultra Plus in my linuxbook</a>.
I was looking at the Samsung 840 EVO until I saw some <a href="http://www.phoronix.com/scan.php?page=article&item=samsung_840evo_ssd&num=3" target="_blank">840 EVO benchmarks on linux</a>.

SanDisk finally came out with a fast and affordable TLC Solid State Drive.
This should mean more competition for Samsung who seem to have been the most popular with their 840 EVO drives (despite their deterioration problems + RAM usage).

SanDisk have teamed up with Toshiba and use 128Gbit 19nm TLC memory with a Marvell 88SS9190 controller.

The Ultra II has some advanced techniques to provide faster write speeds with the addition of a large SLC write cache (nCache 2.0).
The size of the SLC cache differs according to the size of the SSD (120GB has 5GB cache, 240GB has 10GB cache, 480GB has 20GB cache)

The speeds advertised are 550MB/s Sequential Read and 500MB/s Sequential Write across all of the available sizes.


<p class="text-center"><img src="/media/images/2014/Nov/sandisk_ultra_ii_atto_read.jpg" alt=""></p>

On benchmarking the drives perform to the spec.
The write speeds are phenomenal for such affordable drives, although the lifetime of the drive may be lower than a MLC drive.
I guess it depends on what you are using the drive for but I'm very happy with it so far, benchmarking read speeds of 530MB/s in Windows 8.1 and 505MB/s on linux.

    SSD Speed (hdparm -tT):
    1518 MB in  3.00 seconds = 505.71 MB/sec

My boot time in linux has changed from <a href="https://github.com/equk/linux/commit/fa29352b8d60335c30fa7e7e2342c65d27cc4734" target="_blank">7.6s (on a 7200rpm drive) to 2.6s</a> (systemd-analyze).

Related links: <a href="http://www.sandisk.com/products/ssd/sata/ultra-ii" target="_blank">SanDisk Product Page</a> | <a href="http://www.anandtech.com/show/8520/sandisk-ultra-ii-240gb-ssd-review" target="_blank">AnandTech Review</a> | <a href="http://www.guru3d.com/articles_pages/sandisk_ultra_ii_240_gb_ssd_review,10.html" target="_blank">Guru3D Review</a>

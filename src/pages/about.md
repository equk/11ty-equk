---
layout: layouts/page.njk
eleventyNavigation:
  key: About
  order: 3
title: About
permalink: about/index.html
---
<div class="bg-gray-100 border border-gray-400 shadow rounded-lg p-5 dark:bg-gray-900 dark:border-gray-800">
    <div class="flex flex-col gap-1 text-center items-center">
        <img class="h-32 w-32 bg-white p-2 rounded-full shadow mb-4" src="/users/equilibriumuk.jpg" alt="">
        <p class="text-3xl">equilibriumuk</p>
    </div>
    <div class="flex justify-center items-center gap-2 my-0">
        <p class="text-center"><span class="language-color js"></span> Javascript <span class="language-color ts"></span> Typescript <span class="language-color rust"></span> Rust <span class="language-color lua"></span> Lua <span class="language-color go"></span> Go <br/><span class="language-color sh"></span> Bash <span class="language-color c"></span> C <span class="language-color py"></span> Python <span class="language-color ps"></span> Powershell</p>
    </div>
</div>

## Linux

I use Archlinux as my desktop OS with a tiling wm.<br />
Screenshots & info: <i class="fa fa-link"></i> <a href="https://github.com/equk/dotfiles" target="_blank" rel="noopener noreferrer">equk/dotfiles on GitHub</a>

<p class="text-center"><img class="inline" src="/media/images/2019/05/gentoo-signet.svg" alt="gentoo" width="128px">
<img class="inline" src="/media/images/2014/Feb/arch_128.png" alt="archlinux">
<img class="inline" src="/media/logos/nixos.svg" alt="nixos" width="132px">
<img class="inline" src="/media/images/2014/Feb/freebsd_128.png" alt="freebsd"></p>

I started learning linux with Slackware then went on to Gentoo (stage 1 install) & then moved on to using Archlinux.

Servers I work on use NixOS, Debian, Ubuntu, freebsd.

## Contact

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
    <p class="mt-1 text-xl font-bold">Email Address</p>
    <p>
    <code class="language-text">equilibriumuk AT protonmail DOT com</code>
    </p>
</div>
<div>
    <p class="mt-1 text-xl font-bold">GPG Key</p>
    <p>
    <a href="https://keybase.io/equilibriumuk/pgp_keys.asc?fingerprint=25fc07669118b3b9b79beae40e53a3c22664d113" target="_blank" rel="noopener noreferrer">0E53 A3C2 2664 D113</a>
    </p>
</div>
<div>
    <p class="mt-1 text-xl font-bold">Social Media</p>
    <p>Mastodon: <a href="https://{{ metadata.author.contacts.mastodon_url }}" target="_blank" rel="noopener noreferrer">{{ metadata.author.contacts.mastodon }}</a></p>
    <p>Github: <a href="https://github.com/{{ metadata.author.contacts.github }}" target="_blank" rel="noopener noreferrer">github.com/{{ metadata.author.contacts.github }}</a></p>
    <p>Bluesky: <a href="https://{{ metadata.author.contacts.bluesky_url }}" target="_blank" rel="noopener noreferrer">{{ metadata.author.contacts.bluesky }}</a></p>
</div>
</div>

---

## About This Site

This site is powered by eleventy.<br/>

<img class="inline javascript_logo" src="/media/logos/javascript.svg" alt="javascript-logo" width="80px">
<img class="inline 11ty_logo" src="/media/logos/11ty-96x96.png" alt="11ty-logo" width="80px">
<img class="inline nunjucks_logo" src="/media/logos/nunjucks.png" alt="nunjucks-logo" width="80px">

The source code can be found on github & the site is hosted on netlify.

<a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer"><img src="/media/logos/netlify-color-bg.svg" alt="Deploys by Netlify" class="inline" /> </a>

More info on the features of this site can be <a href="/2023/07/13/11ty-site-now-live/" target="_blank" rel="noopener noreferrer">found here</a>.

### Comments

Comments are based on <a href="/2023/07/18/adding-webmentions-in-eleventy/" target="_blank" rel="noopener noreferrer">webmentions</a> using <a href="https://webmention.io/" target="_blank" rel="noopener noreferrer">webmention.io</a> & <a href="https://brid.gy/" target="_blank" rel="noopener noreferrer">brid.gy</a> to pull in mentions from mastodon.

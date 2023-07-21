---
slug:
title: "Android App With Hidden Features"
date: 2021-06-30T15:44:46.388Z
draft: false
author: equilibriumuk
tags:
  - google
  - security
image: ../_media/images/2021/android_dark.jpg
---

I stumbled upon an app which seems out of place & has many strange permissions.

<article class="message is-info">
  <div class="message-body">
    <p><i class="fa fa-info-circle"></i> The app is advertised as a way to check your user profile for a website.</p>
  </div>
</article>

The function of the app could be served by a PWA.

A few things which stood out with this app:

- [x] App size (100MB+)
- [x] Questionable Permissions
- [x] Strange App Reviews

Looking into the apk:

- [x] Offers Relating To Cryptocurrency
- [x] Face Verification Libraries
- [x] ID Scanning Libraries
- [x] Ability To Run On Device Start
- [x] Ability To Force Device On (Wakelock)

This raises some questions regarding Google Play.

<article class="message is-danger">
  <div class="message-body">
    <p><i class="fa fa-exclamation-triangle"></i> I reported this to Google Play on 11th May 2021, App is still available for users to download</p>
  </div>
</article>

## Permissions

- [x] Write System Settings
- [x] Run On Device Startup
- [x] Wakelock
- [x] Read & Write External Storage
- [x] Require Camera Present
- [x] Access Camera
- [x] Access Microphone

*The functionality of the app on Google Play has no requirement for a camera.*

## Opening The APK

Looking into the apk I found references to cryptocurrency, including advertising a crypto exchange offering 18 types of cryptocurrency.<br />
*(the app is not in any category relating to cryptocurrency or banking)*

In addition to this there are 2 face verification libraries.

### Face Verification Libraries

- [x] com.facetec.zoom.sdk
- [x] com.sumsub.sns.prooface

> FaceTec's two-second video-selfie verifies 3D Liveness, matches the user's 3D Face to their Photo ID, OCRs the Text on their ID, and sets up their new account.

> Prooface is a facial biometrics technology that distinguishers honest users from masks, deepfakes, or look-alikes. This is done by creating a 3D FaceMap of each user that’s continuously referenced for verifying document uploads and login attempts.

Looking at the quotes above it seems these libraries allow the app to

- [x] scan existing personal identity documents
- [x] verify the user via a live selfie using 3D FaceMap

*There are instructions on scanning birth cirtificates, passports, ID cards & recent bills in the code referencing KYC checks.*

<img src="/media/images/2021/jadx-facemesh.jpg" alt="jadx-facemesh">

In addition there are entries relating to `faceMesh`

<blockquote><strong><i class="fa fa-link"></i>  <a href="https://github.com/tensorflow/tfjs-models/tree/master/facemesh" target="_blank" rel="noopener noreferrer">Google Tensorflow Face Mesh</a></strong><br /><br />
MediaPipe Facemesh is a lightweight machine learning pipeline predicting 486 3D facial landmarks to infer the approximate surface geometry of a human face</blockquote>

### Cryptocurrency

There are various references to cryptocurrency including offers & the suggestion this app serves as a secure wallet for storing cryptocurrency.

Here is an example of a push notification found in the code.

<article class="message is-success">
  <div class="message-body">
    <p><strong><i class="fa fa-btc"></i>  AppName</strong></p>
    <p>inviting you to join $XXX Offering up to 18 different types of currencies,<br /> $XXX’s crypto wallet is fast, safe, and secure</p>
  </div>
</article>

One offer suggests you could earn credit by completing KYC check (providing personal details & a selfie).<br />
This seems a red flag as the ID information provided could allow impersonation of users. *(eg: passport, photo, bills, name, dob, address)*

*There have been mobile apps in the past which serve dual functionality.*<br />
*eg: <a href="https://web.archive.org/web/20210415173933/https://twitter.com/keleftheriou/status/1382750329972805633" target="_blank" rel="noopener noreferrer">children's game on App Store flips to online casino for users in Turkey</a>*

## Notes

I reported this to Google Play on 11th May 2021 but have not heard anything back & the app is still available for users to download.

A few observations / opinions

- [x] It's difficult to contact Google Play
- [x] Permissions should relate to app function/category
- [x] Permissions should be clear to user before downloading apps
- [x] Libraries referenced should relate to app category

I would think biometric libraries relating to KYC like 3D facemap should trigger <a href="https://developers.google.com/android/play-protect/" target="_blank" rel="noopener noreferrer">Google's Play Protect</a> if the app is not in the banking category.

<blockquote><strong><i class="fa fa-link"></i>  <a href="https://en.wikipedia.org/wiki/Know_your_customer" target="_blank" rel="noopener noreferrer">Know your customer</a></strong><br /><br />
The know your customer or know your client (KYC) guidelines in financial services require that professionals make an effort to verify the identity, suitability, and risks involved with maintaining a business relationship</blockquote>

## Tools Used

- [x] <a href="https://github.com/iBotPeaches/Apktool"  target="_blank" rel="noopener noreferrer">APKTool</a>
- [x] <a href="https://play.google.com"  target="_blank" rel="noopener noreferrer">Google Play</a>
- [x] <a href="https://github.com/skylot/jadx"  target="_blank" rel="noopener noreferrer">jadx</a>
- [x] <a href="https://github.com/BurntSushi/ripgrep"  target="_blank" rel="noopener noreferrer">ripgrep</a>

## Contact

If you want to contact me regarding this article please leave a comment or email me using details in the contact section on the <a href="/about#contact"  target="_blank" rel="noopener noreferrer">about page</a>
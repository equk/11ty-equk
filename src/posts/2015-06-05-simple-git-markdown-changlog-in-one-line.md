---
date: 2015-06-05T17:08:51Z
tags:
  - nodejs
  - github
  - linux
  - python
  - bash
  - git
title: Simple git markdown changlog in one line
slug: simple-git-markdown-changlog-in-one-line/
---

<p class="text-center"><img width="360px" src="/media/images/2015/06/gitscm-logo.png" alt=""></p>

This is a really simple script but first I want to say that I have seen 20+ scripts which do the exact same thing but have 150+ lines of code.
I've seen this in nodejs, ruby & even python.

Personally I think that says a lot about the current state of 'coders' / 'developers'.

In the various examples I found people were writing functions just to remove whitespace, functions with supposed 'options' & multiple regex queries for formatting.
They also added in a nice "this was generated using xxx" at the top of the changelog.md.
There was a python one with a suggestion of putting the script in the base directory of the project (never heard of \$path or aliases?), this one did import subprocess & spawn multiple processes tho so I shouldn't be surprised.

**Just STOP....**

**What we want to do:** have a list of changes to add in markdown from git (very VERY simple)

After looking at the <a href="https://git-scm.com/docs/git-log" target="_blank">git log documentation</a> I decided to use RFC2822 style for date & --pretty as it gives some options for formatting.
On running the script you get empty newlines (oh noes, must regex in python/ruby/nodejs as we've never used cli before) but that is sorted easily with sed.

**One line script to output our changelog:**

```bash
git log --pretty=format:"* %aD %s  %n%b" --date=short | sed '/^\s*$/d'
```

example (4 lines from my <a href="https://github.com/equk/linux" target="_blank">linux repo on <i class="fa fa-github-alt"></i>github</a>)

    * Thu, 4 Jun 2015 22:22:08 +0100 updated README - new custom kernel etc
    * Sun, 24 May 2015 22:11:25 +0100 added more firefox about:config tweaks
    * Thu, 21 May 2015 16:15:33 +0100 switched to firefox aurora / dev
    * Tue, 19 May 2015 18:04:41 +0100 new firefox scripts added

But we want to make a changelog.md?
Simple enough to put into a file with > ... ?

```bash
git log --pretty=format:"* %aD %s  %n%b" --date=short | sed '/^\s*$/d' > changelog.md
```

That's it really.
You can now add an alias in your profile/bash/zsh/whatever rc file or you can create a script which is in \$PATH to have it global.

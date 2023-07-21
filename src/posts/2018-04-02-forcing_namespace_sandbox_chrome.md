---
author: equilibriumuk
date: 2018-04-02T14:54:24+02:00
draft: false
image:
tags:
  - google
  - linux
  - security
  - github
title: Forcing Namespace Sandbox in Chrome & Electron
---

There seems to be a problem in certain linux distributions where user namespace is disabled. (eg: debian, archlinux)<br/>
This affects sandboxing in google chrome/chromium as well as applications built on electron (eg: discord, slack, brave, atom, keybase, github desktop)

<p class="text-center"><img class="inline" width="150px" src="/media/images/2015/06/chrome_chromium.png" alt="chrome_chromium"><img class="inline" width="150px" src="/media/images/2018/04/electron_ico.png" alt="electron_ico"></p><p class="text-center">
<img src="/media/images/2018/04/electron_apps.png" alt="electron_apps"></p>

To check if you are affected, go to `chrome://sandbox`, if you see `Namespace Sandbox: No` you are affected.

## Background

Google Chrome (& Chromium) on linux uses various technologies for different layers of sandboxing & despite people noting possible security problems with the use of SUID sandboxing google still continue to support it (for legacy/compatibility).<br/>
Chrome supports user namespaces for Layer-1 sandboxing as well as using seccomp-bpf for Layer-2.

Looking at the chromium mailing list you can see some <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=312380" target="_blank">points against the use of setuid (from 2013)</a>.

<blockquote>The setuid sandbox has to go:

- For each "chroot me" event, the current mechanism requires having previously started a setuid helper.
  This is not compatible with a more generic and universal Zygote.
  It is in conflict with the flexibility we want for Mojo.
- chroot helpers are tied to new PID and network namespaces.
  Again, this conflicts with flexibility as network namespaces use a lot of kernel memory.
- Shipping a setuid binary on Linux and on Chrome OS is bad for security.
- Having to update a setuid executable on our bots when we want to make changes is problematic</blockquote>

## The Problem

Although user namespace has been supported by the linux kernel since 3.8 it is not enabled by default on some linux distributions. <em>(So far I have only noticed this on Archlinux &amp; Debian)</em>

<p class="text-center"><img class="inline" src="/media/images/2014/Feb/arch_128.png" alt="archlinux">
<img class="inline" src="/media/images/2014/Feb/debian_128.png" alt="debian"></p>

If you check your lxc config you may think everything is fine.

```bash
$ lxc-checkconfig
--- Namespaces ---
Namespaces: enabled
Utsname namespace: enabled
Ipc namespace: enabled
Pid namespace: enabled
User namespace: enabled
Network namespace: enabled
```

If you check your kernel config you will probably find user namespace is enabled

```bash
zcat /proc/config.gz | grep CONFIG_USER_NS
CONFIG_USER_NS=y
```

But if you check chrome / chromium `chrome://sandbox` will show the namespace sandbox is not being used.<br/>
This is because `unprivileged_userns_clone` variable is disabled.

```bash
sysctl kernel.unprivileged_userns_clone
kernel.unprivileged_userns_clone = 0
```

You will need to enable this in order to use the namespace sandbox.

## The Fix

To fix this you need to enable the `unprivileged_userns_clone` variable in the kernel.

```bash
sudo sysctl -w kernel.unprivileged_userns_clone=1
```

Now when you run chromium, `chrome://sandbox` should show the namespace sandbox is enabled.<br/>
To make this change permanent add the user namespace setting to `sysctl.d`.

```bash
sudo sh -c "echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/00-userns.conf"
```

## Forcing Namespace Sandbox

I <a href="https://github.com/equk/linux/commit/8ae7804c133b6d5a77784c66dd4f6954b3ec7469" target="_blank">added a check</a> in my <a href="https://github.com/equk/linux/blob/master/bin/chrome" target="_blank">chrome script on github</a> to check if user namespace is enabled before executng chromium. (if it is not enabled you get an error message with information on google chromium sandboxing on linux)

```bash
# Check if user namespaces is enabled (for sandbox)
# Note: this is to enforce user namespaces for Layer-1 sandbox
if [[ ! (-r /proc/sys/kernel/unprivileged_userns_clone && $(< /proc/sys/kernel/unprivileged_userns_clone) == 1 && -n $(zcat /proc/config.gz | grep CONFIG_USER_NS=y) ) ]]; then
    echo "User namespaces are not detected as enabled on your system, this is required for Layer-1 sandbox"
    echo "No usable sandbox! Update your kernel or see https://github.com/chromium/chromium/blob/master/docs/linux_sandboxing.md for more information."
    exit 1
fi
```

More information regarding chromium sandboxing on linux can be found on <a href="https://github.com/chromium/chromium/blob/master/docs/linux_sandboxing.md" target="_blank">github</a> & <a href="https://chromium.googlesource.com/chromium/src/+/b4730a0c2773d8f6728946013eb812c6d3975bec/docs/design/sandbox.md" target="_blank">googlesource</a>

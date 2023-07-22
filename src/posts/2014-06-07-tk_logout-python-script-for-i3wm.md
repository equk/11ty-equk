---
date: 2014-06-07T13:34:57Z
tags:
- github
- linux
- python
title: tk_logout - python script for i3wm
slug: tk_logout-python-script-for-i3wm/
---

I just uploaded a small tkinter python script I made for i3wm.
The script is very minimal and provides a small interface to shutdown/logout/reboot (might add suspend/hibernate).

Here is a screenshot of how it looks on my current config.
<p class="text-center"><img alt="tk_logout" src="/media/images/2014/Jun/tk_logout_07062014.png"></p>
The script is <a href="https://github.com/equk/linux/blob/master/configs/.i3/tk_logout.py" target="_blank">available for download at <i class="fa fa-github-alt"></i> github</a>.

To get the floating window you need to add the following to your i3 config.

```
for_window [class="Tk" title="tk_logout"] floating enable, border 1pixel
```

If anyone has any suggestions or feedback, please leave a comment.

<a href="https://github.com/equk/linux/blob/master/configs/.i3/tk_logout.py" target="_blank"><i class="fa fa-github-alt"></i> view tk_logout.py at github</a>.
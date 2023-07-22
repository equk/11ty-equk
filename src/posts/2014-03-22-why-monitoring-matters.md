---
date: 2014-03-22T16:13:36Z
tags:
  - nodejs
  - newrelic
title: why monitoring matters
slug: why-monitoring-matters/
---

<p class="text-center"><img src="/media/images/2014/Mar/nodejs_logo_w_128.png" alt=""></p>
I've been working on a node.js project for the past few weeks and finally put it into production.
The site/webapp seemed to be running quite happily until I checked the memory stats on newrelic, there seemed to be a memory leak within node.js.

![](../_media/images/2014/Mar/node_newrelic_21_04_2014.jpg)

It was only small but over 6hours had eaten up around 200mb on the server.

After some debugging (using node-inspector) I found it was one of the modules, fortunately it was relatively easy to switch to something else (something without memory leaks).

![](../_media/images/2014/Mar/node_newrelic_22_04_2014.jpg)

Now running using around 16mb.

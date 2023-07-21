---
slug:
title: "Github Powered Comments With Gitalk"
date: 2020-04-07T17:57:16.428Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - github
  - react
  - graphql
image:
---

<p class="text-center"><i class="fa fa-github-alt fa-5x"></i><br /><img src="/media/logos/gitalk.svg" alt="gitalk logo" width="150px" class="inline"></p>

I decided to change the comment system on the site to something based on Github as it seems more fitting to the continuous deployment with JAMstack.

Gitalk seems to be the best free option available at the moment.

I looked around at gatsby sites with gitalk on github & found they all seem to use old components with no hook support.<br />
So I ended up creating a new component that allows the use of hooks for the GraphQL queries.

## Gitalk Features

- [x] Authentication with Github account
- [x] Serverless (all comments stored as github issues)
- [x] Both personal and organization github projects can be used to store comments
- [x] Localization, support multiple languages [en, zh-CN, zh-TW, es-ES, fr, ru, de]
- [x] Hotkey submit comment (cmd|ctrl + enter)
- [x] Markdown support

## Creating a Component With Hooks

I used `useEffect` to load Gitalk after the comments component is loaded.<br/>
(old non hook components I found use `componentDidMount`)

```jsx
useEffect(() => {
  const GitTalkInstance = new Gitalk({
    clientID:  "...",
  // ...
  // options below
  })
  GitTalkInstance.render('gitalk-container')
})
```

This allows use of react hooks.<br />
I use `useSiteMetadata` hooks for the GraphQL queries.

## Source Code

The source for the site is available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
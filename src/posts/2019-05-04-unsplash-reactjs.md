---
author: equilibriumuk
comments: true
date: 2019-05-04T11:21:18+01:00
draft: false
image: ../_media/images/2018/08/unsplash_js_banner.jpg
menu: ""
share: true
category: javascript
tags:
  - javascript
  - unsplash
  - json
  - api
  - dom
  - react
  - github
  - async
title: Unsplash React.js Search
slug: unsplash-react-search/
permalink: /2019/05/04/unsplash-react-search/
---

<p class="text-center"><img class="inline" src="/media/images/2019/05/react-logo.svg" alt="reactjs_logo" width="25%"> <img class="inline" src="/media/images/2019/05/unsplash.svg" alt="unsplash-logo" width="13%"></p>

This is a working example of a react.js app using state to render an array of images utilizing the virtual DOM.<br/>
The project also uses the `fetch()` api which provides asynchronous requests with the use of promises.<br/>
The design & layout is based on my previous vanillajs project unsplash-js-search.<br/>
My <a href="/2018/08/01/unsplash-javascript-search/" target="_blank">blog post for unsplash-js-search</a> has more information regarding design aspects & working with the unsplash api.

All code for this project is on <a href="https://github.com/equk/unsplash-react" target="_blank"><i class="fa fa-github-alt"></i> github</a>

## Main Features

- [x] Stateful Components
- [x] Loading Feedback
- [x] Async API Requests
- [x] API Key Seperated Using `.env`
- [x] Conditional Rendering
- [x] Virtual DOM

<img src="/media/images/2019/05/unsplash_react_ss.jpg" alt="unsplash_react_ss">

## Requirements

### Getting an API Key

In order to make any requests you will need to <a href="https://unsplash.com/developers" target="_blank">signup to unsplash as a developer</a> & request an API key.

### Adding API Key to App

Add unsplash developer key to `.env` file in the base directory of the project.

```bash
REACT_APP_API_CLIENTID = "insert-api-key-here";
```

## Development

### Commit History

<p class="git-commit"><i class="fa fa-code-fork"></i> new react app - first commit :ship:</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> installed eslint with babel and required plugins for jsx + react</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added eslint config for babel, airbnb, prettier & react</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added basic README with references to unsplash api</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> cleaned up App.js and set serviceworker for offline mode in Index.js</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added main css and removed app.css reference in App.js</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added basic structure for page</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added constructor for basic state of search form</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added basic unsplash api call which logs output to console</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added API KEY to seperate .env file</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added loading animation with loading state on form submit / api request</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added images array to state & map over the array to display img + stop loading image</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added attribution links & css styles for image results</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added screenshot to repo and README</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added info regarding unsplash API key to .env file</p>
<p class="git-commit"><i class="fa fa-code-fork"></i> added checklist of features to README</p>

View the project on <a href="https://github.com/equk/unsplash-react" target="_blank"><i class="fa fa-github-alt"></i> github</a>.

<p class="text-right"><em>References: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">fetch()</a> / <a href="http://reactjs.org/" target="_blank">reactjs</a>  / <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">promises</a>  /  <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></em></p>

<div class="width-full"><img src="/media/images/2018/08/unsplash_js_banner.jpg" class="image" alt="unsplash_js"></div>

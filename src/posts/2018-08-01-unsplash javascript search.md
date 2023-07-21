---
author: equilibriumuk
comments: true
date: 2018-08-01T18:38:34Z
draft: false
image: ../_media/images/2018/08/unsplash_js_banner.jpg
menu: ""
share: true
tags:
  - javascript
  - unsplash
  - json
  - api
  - dom
  - vanillajs
  - github
  - async
title: Unsplash Javascript Search
url: ""
---

I thought I'd make this project to show how much you can do with vanilla javascript without any frameworks or templating engines (eg: react, vuejs, ember, jsx)<br/>
All code for this project is on <a href="https://github.com/equk/unsplash-js-search" target="_blank"><i class="fa fa-github-alt"></i> github</a>

## Getting an API Key

In order to make any requests we will need to <a href="https://unsplash.com/developers" target="_blank">signup to unsplash as a developer</a> & request an API key.

## Basic Design

The first thing to do is get a basic idea of what we want to make.

Things we will need:

- Title
- Search Form
- Results Section

```javascript
<body>
  <h1>Unsplash Search</h1>
  <form>
    <label for="searchTerm">Image Search</label>
    <input class="searchBox" type="text" id="searchTerm" name="searchTerm" />
    <button type="submit">Search</button>
  </form>
  <section class="images" />
  <div class="createdby">
    <p>
      created by <a href="https://github.com/equk">equk</a>
    </p>
  </div>
</body>
```

<p class="git-commit"><i class="fa fa-code-fork"></i> created basic html sructure with some css styles <a href="https://github.com/equk/unsplash-js-search/commit/a279fd7e423198acdf210d117fa7c42149ab4073" target="_blank">a279fd7</a></p>

## Adding Javascript

Start with some basic consts for using the unsplash API & the selector for the output div.

<i class="fa fa-file-code-o"></i> **public/js/app.js**

```javascript
const API_CLIENTID = "-insert-your-api-key-";
const form = document.querySelector("form");
const input = document.querySelector("input");
const imageSection = document.querySelector(".images");
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${API_CLIENTID}`;
```

<p class="git-commit"><i class="fa fa-code-fork"></i> added js file with some basic const variables <a href="https://github.com/equk/unsplash-js-search/commit/40692d7a70fccf09222ed0b93825d1c74bef01dd" target="_blank">40692d7</a></p>

## First API Request

Now we want to setup a request to pull in some json using the API.<br/>
We will use the `fetch()` API as it will let us use promises utilizing async requests.

At first we just log this to the console to test the request returns something we can parse.

```diff
- const API_CLIENTID = '-insert-your-api-key-'
+ const API_CLIENTID = ''
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${API_CLIENTID}`
+
+ form.addEventListener('submit', formSubmitted);
+
+ function formSubmitted(event) {
+   event.preventDefault();
+   let searchTerm = input.value;
+
+   search(searchTerm)
+ }
+
+ function search(searchTerm) {
+   let url = `${API_URL}&query=${searchTerm}`;
+   return fetch(url)
+     .then(response => response.json())
+     .then(result => {
+         console.log(result.results);
+     });
+ }
```

<p class="git-commit"><i class="fa fa-code-fork"></i> setup a fetch request to pull in json & log to console <a href="https://github.com/equk/unsplash-js-search/commit/3b4106e9a260fb6cb57ddb66a2b854ba5529c009" target="_blank">3b4106e</a></p>

So far we have javascript which sends a request using the `fetch()` API which creates a `promise` that resolves a `response` & writes it to the `console`.

## Parsing API Request

Next we want to parse the API request to something usable.

At first we just want to output some images to the output div.<br/>
In order to do this with vanilla javascript we will use DOM Manipulation (something most old javascript developers will have used before).

```diff
event.preventDefault();
  let searchTerm = input.value;

+   searchStart();
  search(searchTerm)
+     .then(displayImages)
+ }
+
+ function searchStart() {
+   imageSection.innerHTML = '';
}

function search(searchTerm) {
  let url = `${API_URL}&query=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
-         console.log(result.results);
+         return result.results;
    });
}
+
+ function displayImages(images) {
+   images.forEach(image => {
+     let imageElement = document.createElement('img');
+     imageElement.src = image.urls.regular;
+     imageSection.appendChild(imageElement);
+   });
+ }
```

<p class="git-commit"><i class="fa fa-code-fork"></i> added function to display images using DOM manipulation <a href="https://github.com/equk/unsplash-js-search/commit/cdaf1410aaae60bfb56028cd8fa0a676eb1f438c" target="_blank">cdaf141</a></p>

We now have some images appearing in the output div but they are all over the place so lets set some CSS for each item turning them into a grid of square images.

<i class="fa fa-file-code-o"></i> **public/css/app.css**

```diff
+ img {
+   object-fit: cover;
+   width:350px;
+   height:350px;
+   padding: 0 4px;
+ }
```

<p class="git-commit"><i class="fa fa-code-fork"></i> styled images to be small boxes 350px with grid padding <a href="https://github.com/equk/unsplash-js-search/commit/2813e4d01e434d00aab830963f7b67e6a4e25927" target="_blank">2813e4d</a></p>

## Unsplash API Terms

Looking into the Unsplash API Terms there are some rules regarding attribution.

> Unsplash API Terms (Attribution)
>
> Each time you or your Developer App displays a Photo, your Developer App must attribute Unsplash, the Unsplash photographer, and contain a link back to the photographer’s Unsplash profile.

## Adding Attribution Information

Lets parse more data from the API response and add in more fields (unsplash link, user, profile link).

<i class="fa fa-file-code-o"></i> **public/js/app.js**

```javascript
function displayImages(images) {
  images.forEach(image => {
    let imageContainer = document.createElement("div");
    imageContainer.className = "ImageResult";
    imageContainer.innerHTML = `<img src="${image.urls.regular}">
    <a href="${image.links.html}" target="_blank" class="view_link">View on Unsplash</a>
    <a href="${user.links.html}" target="_blank" class="user_link">Photo by: ${image.user.name}</a>`;
    imageSection.appendChild(imageContainer);
  });
}
```

<p class="git-commit"><i class="fa fa-code-fork"></i> re-structured displayImages using innerHTML <a href="https://github.com/equk/unsplash-js-search/commit/bbda79bd9125ca0d75e0cbc9a81b37fb84b3a03c" target="_blank">bbda79b</a></p>

## Final Design

We now have a project that is able to send requests to a json api using a valid id utilizing promises (async) & return a gallery of results using DOM manipulation.<br/>
This is all done in vanilla javascript without the need of any frameworks (jquery, react etc).

<img src="/media/images/2018/08/unsplash_js_search.jpg" alt="unsplash_js_search_ss">

View the project on <a href="https://github.com/equk/unsplash-js-search" target="_blank"><i class="fa fa-github-alt"></i> github</a>.

<p class="text-right"><em>References: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">fetch()</a> / <a href="http://vanilla-js.com/" target="_blank">vanillajs</a>  / <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">promises</a> / <a href="https://developer.mozilla.org/en-US/docs/Glossary/DOM" target="_blank">DOM</a>  /  <a href="https://unsplash.com/developers" target="_blank">Unsplash API</a></em></p>

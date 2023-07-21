---
slug:
title: "Using Medium Zoom In Nuxtjs"
date: 2019-06-18T10:58:52.624Z
published: false
author: equilibriumuk
tags:
  - javascript
  - vuejs
  - nuxtjs
  - github
  - nodejs
image:
---

<p class="text-center"><img src="/media/logos/vue.svg" alt="vue logo" width="150px" class="inline"> <img src="/media/logos/nuxt.svg" alt="nuxt logo" width="150px" class="inline"></p>

I find Vuejs amazing for building websites & Nuxtjs helps provide more framework with features like server side rendering out of the box.<br />
It's also really easy to implement vuejs components as plugins.

## Implementing medium-zoom

Sometimes you need to use <a href="https://vuejs.org/v2/guide/mixins.html" target="_blank" rel="noopener noreferrer">vue mixins</a> to help implement something.

In order to implement medium-zoom I used `mixins` with vue `lifecycle hooks`.

> Mixins are a flexible way to distribute reusable functionalities for Vue components.<br />
> A mixin object can contain any component options.<br />
> When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

In order to understand lifecycle hooks it's worth looking at the <a href="https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram" target="_blank" rel="noopener noreferrer">Lifecycle Diagram in the Vuejs docs</a>.

> Lifecycle Hooks give users the opportunity to add their own code at specific stages.

I'm going to use `mounted` and `updated` to run the `medium-zoom` function whenever the virtualDOM is updated from a change (eg: a user clicks a image to zoom).

<img src="/media/images/vue_lifec_mounted.png" alt="vue lifecycle mounted">

<br />

Install `medium-zoom` using yarn or npm

Next create a plugin file

<i class="fa fa-file-code-o"></i> `plugins/medium-zoom.js`

```javascript
import Vue from 'vue'
import zoom from 'medium-zoom'

const initZoom = () => {
  zoom('img.zoom:not(.medium-zoom-image)')
}

Vue.mixin({
  mounted: function() {
    initZoom()
  },
  updated: function() {
    initZoom()
  },
})
```

Now edit `nuxt.config.js` and add `medium-zoom` to plugins.

```js
plugins: ['~/plugins/medium-zoom'];
```

The plugin is setup to use CSS selector for class `zoom`, so any `img` elements with this class should now be zoomable.

Optionally you could change this to whatever you like as <a href="https://github.com/francoischalifour/medium-zoom" target="_blank" rel="noopener noreferrer">medium-zoom</a> supports selectors for CSS, HTMLElement, NodeList, Array.

## Download

The medium-zoom nuxtjs plugin can downloaded from github.

<a class="github" href="https://github.com/equk/nuxt-medium-zoom" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> Download</a>

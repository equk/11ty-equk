---
template: post
title: Blogging on JAMstack
slug: blogging-on-jamstack
draft: false
date: 2020-03-16T21:55:35.656Z
tags:
  - github
  - gatsby
  - react
  - javascript
  - nodejs
---
<p class="text-center"><img src="/media/images/jamstack-full-logo.svg" alt="jamstack logo" width="600px" class="inline"></p>

I decided to finally update the site to use JAMstack with continuous deployment using Netlify CMS, Netlify hosting & Github.

JAM: Javascript APIs Markup

<p class="text-center"><img src="/media/images/netlify_cms_500.png" alt="netlify cms logo" width="300px" class="inline"></p>

I already had a netlify cms `config.yml` setup from July 2019 based on the layout of the GraphQL & frontmatter but needed to setup `react` layouts for the preview pane in netlify cms.

## Problems With CSS

I had a small problem with `gatsby-plugin-netlify-cms` which seemed to happen when adding styles to netlify cms.<br/> I found importing sass caused `postcss` & `purgecss` to run twice doubling the built css & making netlify deploys fail.

```sh
error UNHANDLED EXCEPTION Callback was already called.
```

Looking in the code of `gatsby-plugin-netlify-cms` I found the cms tries to import a stylesheet from `/admin/cms.css` (even if none exist) so as a workaround I just copied the built css to `static/admin/cms.css` which fixed the styles in the cms preview pane.

## Workaround Script

I ended up making a `postbuild` script which looks for the built css file & copies it to `public/admin/cms.css`.<br/> I then added the script to `build` in `package.json` allowing it to automatically trigger on each deploy/build.

```js
const css = fs.readdirSync(publicFolder).filter(fn => fn.endsWith('.css'))

if (css.length === 1) {
  console.log(`INFO: copying ${publicFolder + css[0]} to ${outFile}`)
  fs.copyFile(publicFolder + css[0], outFile, err => {
    if (err) throw err
    console.log(`${publicFolder + css[0]} was copied to ${outFile}`)
  })
} else {
  console.log(`ERROR: ${css.length} files found expected 1`)
  process.exit(1)
}
```

The full script can be found on github, it looks for files with the `.css` extension in the `public/` folder & then if one is found copies it to `public/admin/cms.css`.

It  uses `nodejs` core functions so has no extra dependencies & has checking to make sure public exists etc.

## Font Caching

I also decided to setup browser caching for fonts in the `netlify.toml` config as fonts rarely change.

```toml
[[headers]]
    for = "/*.woff2"
    [headers.values]
        Cache-Control = "public, max-age=2592000"
```

The default for netlify hosting is to have no browser caching of anything.<br /> There are various reasons for this (more information can be found on the netlify blog: <a href="https://www.netlify.com/blog/2017/02/23/better-living-through-caching/" target="_blank" aria-label="go to netlify blogpost" rel="noopener noreferrer">Better Living Through Caching</a> ).

Looking at the headers for a netlify site

```sh
HTTP/2 200
cache-control: public, max-age=0, must-revalidate
server: Netlify
```

With the config above you can see this changes on `woff2` fonts.

```sh
HTTP/2 200
content-type: font/woff2
server: Netlify
cache-control: public,max-age=2592000
```
All scripts & configs mentioned in this article are available on github.

<a class="github" href="https://github.com/equk/equk-gatsby" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> equk-gatsby</a>
---
title: "Postcss 11ty Integration Update"
date: 2023-06-29T10:12:51.885Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
templateEngineOverride: md
---

![11ty logo](../_media/images/11ty-200.png)

Previous Article: 📝[Integrating Tailwindcss With Eleventy](/2023/06/24/integrating-tailwindcss-with-eleventy/)

<article class="message is-info">
  <div class="message-body">
    <i class="fa-solid fa-info-circle"></i> More optimized implementation: <a href="/2023/06/29/11ty-postcss-integration-optimized/">11ty Postcss Integration Optimized</a>
  </div>
</article>

In my previous post I wrote about using a nunjucks filter for integrating postcss (& tailwindcss) to eleventy.

I have been playing around with eleventy transforms for html minification so thought why not use a transform to run postcss instead of using a nunjucks filter.

## Using a Transform

Using a transform means we can inject content into html pages which means we can inject a `style` element inside of `head` for inline css.

- [x] Read input css
- [x] Run postcss with plugins
- [x] Inject styles into head

I based this on the html minifier example in the 11ty docs.

```js
// PostCSS transform
  eleventyConfig.addTransform(
    'postcss-trans',
    async (contentInput, outputPath) => {
      let content = contentInput
      if (outputPath && outputPath.endsWith('.html')) {
        const cssInput = fs.readFileSync('src/_styles/_global.css', {
          encoding: 'utf-8',
        })
        const minified = await postcss([
          tailwindcss(),
          autoprefixer(),
        ])
          .process(cssInput, { from: undefined })
          .then((r) => {
            return r.css
          })
        content = content.replace(
          '</head>',
          `<style>${minified}</style></head>`
        )
      }
      return content
    }
  )
```

The speed is similar to using the nunjucks filter.

```
[11ty] Benchmark    896ms  33%    25× (Configuration) "postcss-trans" Transform
[11ty] Copied 11 files / Wrote 25 files in 2.39 seconds (95.6ms each, v2.0.1)
```

```
[11ty] Benchmark    977ms  34%    23× (Configuration) "postcss" Nunjucks Async Filter
[11ty] Copied 11 files / Wrote 26 files in 2.61 seconds (100.4ms each, v2.0.1)
```

This could be useful for people not using nunjucks.

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> 11ty-equk</a>

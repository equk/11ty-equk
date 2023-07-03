---
title: "11ty Postcss Integration Optimized"
date: 2023-06-29T11:47:02.613Z
author: equilibriumuk
draft: false
tags:
  - javascript
  - eleventy
  - github
image:
imgAuthor:
imgAuthorURL:
---

![11ty logo](../_media/images/11ty-200.png)

One problem with the previous integrations was that postcss was called on every page doing the same thing every time.

It would be much better to run postcss once.

## Final Integration

- [x] Read input css
- [x] Run postcss with plugins once
- [x] Inject styles into head

After working on the eleventy site for a while I got this idea from esbuild implementation & my previous post on using a transform.

Putting these together I thought why not use `eleventy.before` to run postcss to output a minified css file (like esbuild) then use a transform to inject styles into head (see previous post).

📝[Postcss 11ty Integration Update (Using a Transform)](/2023/06/29/postcss-11ty-integration-update/)

📝[Using Esbuild With Eleventy (eleventy.before)](/2023/06/26/using-esbuild-with-eleventy/)

## Running Postcss Once

Here is the `eleventy.before` section.

```js
  // Run postcss (insert css to html later)
  eleventyConfig.on('eleventy.before', async () => {
    const cssInput = fs.readFileSync('src/_styles/_global.css', {
      encoding: 'utf-8',
    })
    const cssOutDir = 'src/_assets/css/'
    const cssOutFile = 'styles.css'
    const cssOutput = cssOutDir + cssOutFile
    if (!fs.existsSync(cssOutDir)) {
      fs.mkdirSync(cssOutDir, { recursive: true })
    }
    const minified = await postcss([tailwindcss(), autoprefixer()])
      .process(cssInput, { from: undefined })
      .then((r) => {
        fs.writeFile(cssOutput, r.css, (err) => {
          if (err) throw err
          console.log(`[11ty] Writing Postcss Output: ${cssOutput}`)
        })
      })
    return minified
  })
```

## Inject CSS Using Transform

Here is the `transform` section.

```js
  // PostCSS transform
  eleventyConfig.addTransform('postcss', function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
      const minCSS = fs.readFileSync('src/_assets/css/styles.css', {
        encoding: 'utf-8',
      })
      content = content.replace('</head>', `<style>${minCSS}</style></head>`)
    }
    return content
  })
```

## Speed Improvement

Speed wise this is a lot faster.

```log
[11ty] Copied 11 files / Wrote 27 files in 0.79 seconds (29.3ms each, v2.0.1)
```

```log
[11ty] Benchmark    896ms  33%    25× (Configuration) "postcss-trans" Transform
[11ty] Copied 11 files / Wrote 25 files in 2.39 seconds (95.6ms each, v2.0.1)
```

```log
[11ty] Benchmark    977ms  34%    23× (Configuration) "postcss" Nunjucks Async Filter
[11ty] Copied 11 files / Wrote 26 files in 2.61 seconds (100.4ms each, v2.0.1)
```

## Related Posts

📝[Integrating Tailwindcss With Eleventy](/2023/06/24/integrating-tailwindcss-with-eleventy/) | 📝[Postcss 11ty Integration Update](/2023/06/29/postcss-11ty-integration-update/)

## Source Code

The source for my 11ty blog is available on github.

<a class="github" href="https://github.com/equk/11ty-equk" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> 11ty-equk</a>

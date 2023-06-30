const esbuild = require('esbuild')
const fs = require('fs')

const markdownItAnchor = require('markdown-it-anchor')
const markdownItTaskLists = require('markdown-it-task-lists')

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginBundle = require('@11ty/eleventy-plugin-bundle')
const pluginNavigation = require('@11ty/eleventy-navigation')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
const pluginSEO = require('eleventy-plugin-seo')

const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcssimport = require('postcss-import')
const cssnano = require('cssnano')

const pluginDrafts = require('./eleventy.config.drafts.js')
const pluginImages = require('./eleventy.config.images.js')

const metadata = require('./src/_data/metadata.js')

module.exports = function (eleventyConfig) {
  // Run esbuild before anything else (using bundle for js)
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: ['src/_scripts/darkmode.js'],
      outdir: 'src/_assets/js',
      minify: true,
      sourcemap: false,
    })
  })

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
    const minified = await postcss([
      tailwindcss(),
      autoprefixer(),
      postcssimport(),
      cssnano({
        preset: [
          'lite',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
    ])
      .process(cssInput, { from: undefined })
      .then((r) => {
        fs.writeFile(cssOutput, r.css, (err) => {
          if (err) throw err
          console.log(`[11ty] Writing Postcss Output: ${cssOutput}`)
        })
      })
    return minified
  })

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `dist/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
    './src/_assets/fonts': '/fonts',
  })

  // Disable livereload injection (use patched instead)
  // This fixes inlined CSS (default changes style link elements)
  eleventyConfig.setServerOptions({
    liveReload: false,
    domDiff: false,
  })

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  // eleventyConfig.addWatchTarget('src/**/*.{svg,webp,png,jpeg}')
  // Watch for css changes.
  eleventyConfig.addWatchTarget('src/_styles/*.css')
  // Watch for js changes
  eleventyConfig.addWatchTarget('src/_scripts/*.js')

  // App plugins
  eleventyConfig.addPlugin(pluginDrafts)
  eleventyConfig.addPlugin(pluginImages)

  // Official plugins
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  eleventyConfig.addPlugin(pluginBundle)

  // Other plugins
  eleventyConfig.addPlugin(pluginSEO, {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    author: metadata.author.name,
    twitter: metadata.author.contacts.twitter,
    image: metadata.url + '/media/social.png',
  })

  // Filters
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return dateObj.toLocaleDateString('en-gb', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('readableDateUS', (dateObj) => {
    return dateObj.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dateObj.toISOString().split('T')[0]
  })

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  // Return all the tags used in a collection
  eleventyConfig.addFilter('getAllTags', (collection) => {
    const tagSet = new Set()
    for (const item of collection) {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    }
    return Array.from(tagSet)
  })

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    )
  })

  // Excerpt filter (used for atom feed)
  eleventyConfig.addFilter('excerpt', (post) => {
    const content = post
      .replace(/(<([^>]+)>)/gi, '')
      .split(' ')
      .slice(0, 80)
      .join(' ')
    return content
  })

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: 'header-anchor',
        symbol: '#',
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    })
    mdLib.use(markdownItTaskLists, { label: true })
  })

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

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
      input: 'src',
      output: 'dist',
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.
    pathPrefix: '/',
  }
}

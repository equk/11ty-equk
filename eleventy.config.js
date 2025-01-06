import esbuild from 'esbuild'
import fs from 'fs'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTaskLists from 'markdown-it-task-lists'
import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import pluginNavigation from '@11ty/eleventy-navigation'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'
import pluginSEO from 'eleventy-plugin-seo'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssimport from 'postcss-import'
import cssnano from 'cssnano'
import sharp from 'sharp'
import sanitizeHTML from 'sanitize-html'
import pluginDrafts from './eleventy.config.drafts.js'
import pluginImages from './eleventy.config.images.js'
import containerPlugin from './eleventy.config.markdown.js'
import metadata from './src/_data/metadata.js'

export default function (eleventyConfig) {
  // Run esbuild
  eleventyConfig.on('eleventy.before', async () => {
    await esbuild.build({
      entryPoints: [
        'src/_scripts/darkmode.js',
        'src/_scripts/mobilenav.js',
        'src/_scripts/mastodon.js',
      ],
      outdir: 'src/_assets/js',
      minify: true,
      sourcemap: false,
    })
  })

  // Run postcss
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
        let cleanCSS = r.css
        cleanCSS = cleanCSS.replace(/,$\n/gm, ',')
        fs.writeFile(cssOutput, cleanCSS, (err) => {
          if (err) throw err
          console.log(`[11ty] Writing Postcss Output: ${cssOutput}`)
        })
      })
    return minified
  })

  // Generate favicon from svg input
  // Only run on production build
  if (process.env.NODE_ENV === 'production') {
    eleventyConfig.on('eleventy.before', async () => {
      console.log('[11ty] Generating Favicon')
      await sharp('src/_media/favicon.svg')
        .png()
        .resize(96, 96)
        .toFile('public/img/icon-96x96.png')
        .catch(function (err) {
          console.log('[11ty] ERROR Generating favicon')
          console.log(err)
        })
    })
  }
  eleventyConfig.watchIgnores.add('public/img/icon-96x96.png')

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `dist/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
    './src/_media/images': '/media/images',
    './src/_assets/fonts': '/fonts',
  })

  if (process.env.NODE_ENV !== 'production') {
    eleventyConfig.addPassthroughCopy({
      './src/_assets/css/styles.css': '/css/styles.css',
    })
  }

  // Enable livereload injection
  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
  })

  // Enable Eleventy Bundle for JS + CSS
  eleventyConfig.addBundle('css')
  eleventyConfig.addBundle('js')

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

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

  // Other plugins
  eleventyConfig.addPlugin(pluginSEO, {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    author: metadata.author.name,
    twitter: metadata.author.contacts.twitter,
    image: metadata.url + '/media/social.png',
    options: {
      twitterCardType: 'summary_large_image',
    },
  })

  // Collections
  // Listing of top used tags
  eleventyConfig.addCollection('tagList', (collection) => {
    const tagsObject = {}
    collection.getFilteredByGlob('src/posts/*.md').forEach((item) => {
      if (!item.data.tags) return
      item.data.tags
        .filter((tag) => !['posts', 'all', 'github', 'gatsby'].includes(tag))
        .forEach((tag) => {
          if (typeof tagsObject[tag] === 'undefined') {
            tagsObject[tag] = 1
          } else {
            tagsObject[tag] += 1
          }
        })
    })
    const tagList = []
    Object.keys(tagsObject).forEach((tag) => {
      tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
    })
    return tagList.sort((a, b) => b.tagCount - a.tagCount).slice(0, 4)
  })

  // Filters
  eleventyConfig.addFilter('readableDate', (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-gb', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('readableDateUS', (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('readableDateShort', (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-gb', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('htmlDateString', (date) => {
    const dateObj = new Date(date)
    return dateObj.toISOString().split('T')[0]
  })

  eleventyConfig.addFilter('htmlDateYear', (date) => {
    const dateObj = new Date(date)
    return dateObj.getFullYear()
  })

  // XML Formatting
  eleventyConfig.addFilter('titleXML', (content) => {
    return content.replace(/&/g, '&amp;')
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

  // Webmentions
  eleventyConfig.addFilter('webmentionsByUrl', function (webmentions, url) {
    const allowedTypes = ['in-reply-to', 'like-of', 'repost-of']
    const allowedHTML = {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        a: ['href'],
      },
    }

    const data = {
      'like-of': [],
      'repost-of': [],
      'in-reply-to': [],
    }

    const hasRequiredFields = (entry) => {
      const { author, published, content } = entry
      return author.name && published && content
    }

    const filtered = webmentions
      .filter((entry) => entry['wm-target'] === url)
      .filter((entry) => allowedTypes.includes(entry['wm-property']))

    filtered.forEach((m) => {
      if (data[m['wm-property']]) {
        const isReply = m['wm-property'] === 'in-reply-to'
        const isValidReply = isReply && hasRequiredFields(m)
        if (isReply) {
          if (isValidReply) {
            m.sanitized = sanitizeHTML(m.content.html, allowedHTML)
            data[m['wm-property']].unshift(m)
          }
          return
        }
        data[m['wm-property']].unshift(m)
      }
    })

    data['in-reply-to'].sort((a, b) =>
      a.published > b.published ? 1 : b.published > a.published ? -1 : 0
    )

    return data
  })

  // Customize Markdown library settings
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
    mdLib.use(containerPlugin)
    mdLib.use(markdownItTaskLists, { label: true })
    mdLib.enable('code')
  })

  // Clean HTML output (just simple regex)
  eleventyConfig.addTransform('clean-html', function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
      content = content.replace(/^\s*\n/gm, '')
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

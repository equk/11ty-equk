const path = require('path')
const eleventyImage = require('@11ty/eleventy-img')
const postsPath = './src/posts/'

module.exports = (eleventyConfig) => {
  function relativeToInputPath(inputPath, relativeFilePath) {
    const split = inputPath.split('/')
    split.pop()

    return path.resolve(split.join(path.sep), relativeFilePath)
  }

  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    'image',
    async function imageShortcode(src, alt, widths, sizes) {
      // Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
      // Warning: Avif can be resource-intensive so take care!
      const formats = ['webp', 'auto']
      const file = relativeToInputPath(this.page.inputPath, src)
      const metadata = await eleventyImage(file, {
        widths: widths || [400, 800, 1200],
        formats,
        outputDir: path.join(eleventyConfig.dir.output, 'img'), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
      })

      // TODO loading=eager and fetchpriority=high
      const imageAttributes = {
        alt,
        sizes: '(max-width: 1200px) 100vw, 1200px',
        loading: 'lazy',
        decoding: 'async',
      }
      return eleventyImage.generateHTML(metadata, imageAttributes)
    }
  )

  // Add markdown support
  eleventyConfig.amendLibrary('md', (markdown) => {
    markdown.renderer.rules.image = function (tokens, idx) {
      const token = tokens[idx]
      const src = relativeToInputPath(postsPath, token.attrGet('src'))
      const alt = token.content
      const formats = ['webp', 'auto']
      const metadata = eleventyImage.statsSync(src, {
        widths: [400, 800, 1200],
        formats,
        outputDir: path.join(eleventyConfig.dir.output, 'img'), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
      })
      return eleventyImage.generateHTML(metadata, {
        alt,
        loading: 'lazy',
        decoding: 'async',
        sizes: '(max-width: 1200px) 100vw, 1200px',
      })
    }
  })
}

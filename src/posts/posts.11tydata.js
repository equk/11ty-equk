const slugify = require('slugify')

module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date } = data.page
      const dateURL = date.toISOString().split('T')[0].split('-').join('/')
      const titleSlug = slugify(data.title, { lower: true })
      return `${dateURL}/${titleSlug}/`
    },
  },
}

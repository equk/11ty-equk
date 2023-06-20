function dateLink(dateInput) {
  const date = new Date(dateInput)
  const year = date.getFullYear()
  const mnth = date.getMonth() + 1
  const dy = date.getDate()
  let month = ''
  let day = ''

  if (mnth < 10) {
    month = `0${mnth}`
  } else {
    month = `${mnth}`
  }

  if (dy < 10) {
    day = `0${dy}`
  } else {
    day = `${dy}`
  }

  const dateLinkOut = `${year}/${month}/${day}`
  return dateLinkOut
}

module.exports = {
  tags: ['posts'],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink(data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date, fileSlug } = data.page
      const dateURL = dateLink(date)
      return `${dateURL}/${fileSlug}/`
    },
  },
}

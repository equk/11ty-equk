import slugify from 'slugify'
import z from 'zod'

export default {
  eleventyDataSchema: function (data) {
    const postSchema = z
      .object({
        title: z.string(),
        date: z
          .string()
          .or(z.date())
          .transform((val) => new Date(val)),
        author: z.string().optional(),
        draft: z.boolean().nullish(),
        tags: z.array(z.string()).default([]),
        image: z.string().nullish(),
        imgAuthor: z.string().nullish(),
        imgAuthorURL: z.string().nullish(),
        mastodonPostId: z.string().nullish(),
        blueskyPostId: z.string().nullish(),
        excerpt: z.string().nullish(),
      })
      .parse(data)
    return postSchema
  },
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

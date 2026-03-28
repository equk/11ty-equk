/*!
 * post schema check script
 *
 * https://github.com/equk/
 *
 */

import fs from 'fs/promises'
import fg from 'fast-glob'
import z from 'zod'
import { simplematter } from 'simplematter'

const postSchema = z.object({
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

async function CheckSchema() {
  const start = +new Date()
  const files = await fg('./src/posts/*.md')
  const posts = await Promise.all(
    files.map(async (file_in) => {
      const source = await fs.readFile(file_in, 'utf-8')
      const [frontmatter] = simplematter(source)
      return {
        frontmatter,
        file_in,
      }
    })
  )
  posts.forEach(
    (postIn) =>
      console.log(postIn.file_in) & postSchema.parse(postIn.frontmatter)
  )
  const end = +new Date()
  console.log(`\n    ${posts.length} files checked in ${end - start}ms\n`)
}

CheckSchema()

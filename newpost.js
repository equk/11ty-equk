/*!
 * gatsby-new-post-cli v1.0.0
 *
 * https://github.com/equk/gatsby-new-post-cli
 *
 * Copyright (c) 2019 B.Walden.  All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 *
 * Updated for use with 11ty - 2023
 *
 */

import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Post Title:', (title) => {
  const author = 'equilibriumuk'
  const dateNow = new Date()
  const year = dateNow.getFullYear()
  const month = `${dateNow.getMonth() + 1 < 10 ? '0' : ''}${
    dateNow.getMonth() + 1
  }`
  const day = `${dateNow.getDate() < 10 ? '0' : ''}${dateNow.getDate()}`
  const blogPostFolder = './src/posts'
  const blogPostDate = `${blogPostFolder}/${year}-${month}-${day}`

  if (!fs.existsSync(blogPostFolder)) {
    console.log(`ERROR: posts folder not found: ${blogPostFolder}`)
    rl.close()
    process.exit(1)
  }

  const output = `---\ntitle: "${title}"\ndate: ${dateNow.toISOString()}\nauthor: ${author}\ndraft: false\ntags:\n - github\nimage:\nimgAuthor:\nimgAuthorURL:\nexcerpt:\n---\n\n`

  fs.writeFileSync(`${blogPostDate}-${title}.md`, output)

  console.log(`Post: '${title}' was created successfully`)
  console.log(`Location: '${blogPostDate}-${title}.md'`)
  rl.close()
  process.exit(0)
})

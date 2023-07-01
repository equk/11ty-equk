---
slug: ''
title: "Gatsby New Post CLI Script"
date: 2019-07-06T15:00:20.444Z
draft: false
author: equilibriumuk
tags:
  - javascript
  - gatsby
  - nodejs
  - cli
  - github
image: ''
---

<img src="/media/logos/gatsby.svg" alt="gatsby logo" width="150px">

<br />

This is a small script for creating new posts for markdown generated blogs like Gatsby.

I looked around for a script to use until I decide on which JAMStack CMS I want to implement but every example script I found seemed to have a lot of dependencies.

So I decided to make one myself using core `nodejs` features.<br />
The script uses `readline` and `fs` which are both core nodejs functions.

```javascript
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
```

Use `readline.createInterface` to listen on `process.stdin`.

```javascript
const dateNow = new Date()
```

Use `Date()` to get current date and time for the blog posts published time.

```javascript
const blogPostFolder = './content/posts'
const blogPostDate = `${blogPostFolder}/${year}-${month}-${day}`

if (!fs.existsSync(blogPostFolder)) {
  console.log(`ERROR: posts folder not found: ${blogPostFolder}`)
  rl.close()
  process.exit(1)
}
```

Check the folder specified exists, exit with error if content folder does not exist.

```javascript
fs.writeFileSync(`${blogPostDate}-${title}.md`, output)

console.log(`Post ${title} was created successfully`)
console.log(`Location: ${blogPostDate}-${title}.md`)
rl.close()
process.exit(0)
```

Write to markdown file and give feedback to user with location of new blog post file created.

### Optional

You can add the script to `package.json` to run the script using `yarn` or `npm`.

```json
  "scripts": {
    "newpost": "node newpost.js"
  },
```

## Download

The full script can be downloaded from github.

<a class="github" href="https://github.com/equk/gatsby-new-post-cli" aria-label="Download on GitHub" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i> Download</a>
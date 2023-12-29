// fetch webmentions & cache using netlify - original source: https://github.com/maxboeck/mxb
import fs from 'fs'

import unionBy from 'lodash'
import metadata from './metadata.js'

import 'dotenv/config'

const CACHE_DIR = '_cache'
const API = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since, perPage = 10000) {
  const { domain } = metadata
  if (!domain) {
    console.warn(
      '[11ty] ERROR: Unable to fetch webmentions: no domain name specified in metadata.js'
    )
    return false
  }

  if (!TOKEN) {
    console.warn(
      '[11ty] ERROR: Unable to fetch webmentions: no access token specified in environment.'
    )
    return false
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
  if (since) url += `&since=${since}`

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(
      `[11ty] ${feed.children.length} New webmentions fetched from ${API}`
    )
    return feed
  }

  return null
}

function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id')
}

function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`
  const fileContent = JSON.stringify(data, null, 2)
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR)
  }
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err
    console.log(`[11ty] Webmentions saved to ${filePath}`)
  })
}

function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`

  if (fs.existsSync(filePath)) {
    const cacheFile = fs.readFileSync(filePath)
    return JSON.parse(cacheFile)
  }

  return {
    lastFetched: null,
    children: [],
  }
}

export default async function () {
  const cache = readFromCache()

  if (cache.children.length) {
    console.log(`[11ty] ${cache.children.length} Webmentions loaded from cache`)
  }

  // fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    const feed = await fetchWebmentions(cache.lastFetched)
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      }

      writeToCache(webmentions)
      return webmentions
    }
  }

  return cache
}

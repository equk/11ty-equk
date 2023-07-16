// fetch webmentions & cache using netlify - original source: https://github.com/maxboeck/mxb
const fs = require('fs')
const unionBy = require('lodash/unionBy')
const metadata = require('./metadata.js')

require('dotenv').config()

const CACHE_DIR = '_cache'
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since) {
  const { domain } = metadata

  if (!domain || domain === 'myurl.com') {
    console.warn(
      '[11ty] ERROR: unable to fetch webmentions: no domain specified in metadata.'
    )
    return false
  }
  if (!TOKEN) {
    console.warn(
      '[11ty] ERROR: unable to fetch webmentions: no access token specified in environment.'
    )
    return false
  }

  let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}`
  if (since) {
    url += `&per-page=100&&since=${since}`
  } else {
    url += `&per-page=999`
  }

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(
      `${feed.children.length} webmentions fetched from ${API_ORIGIN}`
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
    console.log(`webmentions cached to ${filePath}`)
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

module.exports = async function () {
  const cache = readFromCache()
  const { lastFetched } = cache

  if (process.env.ELEVENTY_ENV === 'production' || !lastFetched) {
    const feed = await fetchWebmentions(lastFetched)

    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      }

      writeToCache(webmentions)
      return webmentions
    }
  }

  console.log(`${cache.children.length} webmentions loaded from cache`)
  return cache
}

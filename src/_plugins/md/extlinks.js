// Add target & rel attributes to external links
// Add css class to external links
// equk.co.uk
import metadata from './src/_data/metadata.js'

export default (md) => {
  md.use(tokensIter, 'extLink', function (tokens, idx) {
    const [t, href] = tokens[idx].attrs.find((attr) => attr[0] === 'href')

    if (
      t &&
      href &&
      !href.includes(metadata.domain) &&
      !href.startsWith('/') &&
      !href.startsWith('#')
    ) {
      tokens[idx].attrPush(['target', '_blank'])
      tokens[idx].attrPush(['rel', 'noopener noreferrer'])
      tokens[idx].attrPush(['class', 'ext-link'])
    }
  })
}

// Iterate over link tokens
//
// `/markdown-it/markdown-it/blob/master/lib/rules_core/`
// `/markdown-it/markdown-it-for-inline`
function tokensIter(md, ruleName, iterator) {
  function findTokens(state) {
    let blkIdx
    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== 'inline') continue
      const readTokens = state.tokens[blkIdx].children
      for (let i = readTokens.length - 1; i >= 0; i--) {
        if (readTokens[i].type !== 'link_open') continue
        iterator(readTokens, i)
      }
    }
  }
  md.core.ruler.push(ruleName, findTokens)
}

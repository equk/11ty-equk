const container = require('markdown-it-container')

// Custom Callout Blocks Plugin For Markdown-it
// equk.co.uk

module.exports = (md) => {
  md.use(...createContainer('tip', 'Tip', md))
    .use(...createContainer('info', 'Info', md))
    .use(...createContainer('warning', 'Warning', md))
    .use(...createContainer('danger', 'Danger', md))
    .use(...createContainer('note', 'Note', md))
    .use(...createContainer('important', 'Important', md))
    .use(...createContainer('details', 'Details', md))
}

function createContainer(conClass, defaultTitle, md) {
  return [
    container,
    conClass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(conClass.length).trim()
        const attrs = md.renderer.renderAttrs(token)
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (conClass === 'details')
            return `<details class="${conClass} callout-block"${attrs}><summary>${title}</summary>\n`
          return `<div class="${conClass} callout-block"${attrs}><p class="callout-block-title">${title}</p>\n`
        } else return conClass === 'details' ? `</details>\n` : `</div>\n`
      },
    },
  ]
}

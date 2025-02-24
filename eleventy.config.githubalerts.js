import GithubAlerts from 'markdown-it-github-alerts'

// Github Style Callout Blocks Plugin For Markdown-it
// https://github.com/antfu/markdown-it-github-alerts

// Disable SVG Icons & Set Custom classPrefix for CSS
export default (md) => {
  md.use(GithubAlerts, {
    classPrefix: 'callout-block',
    icons: '',
    markers: [
      'TIP',
      'NOTE',
      'IMPORTANT',
      'WARNING',
      'CAUTION',
      'DANGER',
      'INFO',
    ],
  })
}

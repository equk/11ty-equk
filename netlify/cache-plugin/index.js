export default {
  async onPreBuild({ utils }) {
    console.log('Restoring ./_cache/ folder')
    await utils.cache.restore('./_cache')
  },
  async onPostBuild({ utils }) {
    console.log('Saving ./_cache/ folder for future builds')
    await utils.cache.save('./_cache')
  },
}

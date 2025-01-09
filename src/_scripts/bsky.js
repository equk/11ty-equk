class BskyPost extends HTMLElement {
  constructor() {
    super()
  }

  static observedAttributes = ['postId']

  async connectedCallback() {
    const template = document.querySelector('#bluesky-template')
    const node = document.importNode(template.content, true)

    const data = { ...(await this.postData()) }

    if (data) {
      node.querySelector('[data-key="postText"]').innerHTML = data.record.text
        .replace(/\n/g, '<br />')
        .replace(/\bequk.co.uk\S+/gi, '')
      node.querySelector('[data-key="likeCount"]').textContent = data.likeCount
      node.querySelector('[data-key="replyCount"]').textContent =
        data.replyCount
      node.querySelector('[data-key="repostCount"]').textContent =
        data.repostCount
    }

    this.append(node)
  }

  get postId() {
    return this.getAttribute('postId')
  }

  async postData() {
    const bskyDid = 'did:plc:adfrie77wcnyovawzf2bzbet'

    const data = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts?uris=at://${bskyDid}/app.bsky.feed.post/${this.postId}`
    ).then((response) => response.json())
    return data.posts[0]
  }
}

customElements.define('bluesky-post', BskyPost)

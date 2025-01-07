class MastodonPost extends HTMLElement {
  constructor() {
    super()
  }

  static observedAttributes = ['postId']

  async connectedCallback() {
    const template = document.querySelector('#mastodon-template')
    const node = document.importNode(template.content, true)

    const data = { ...(await this.postData()) }

    if (data) {
      node.querySelector('[data-key="postText"]').innerHTML = data.content
        .replace(/<a.*?>/gi, '')
        .replace(/<\/a>/gi, '')
      node.querySelector('[data-key="likeCount"]').textContent =
        data.favourites_count
      node.querySelector('[data-key="replyCount"]').textContent =
        data.replies_count
      node.querySelector('[data-key="repostCount"]').textContent =
        data.reblogs_count
    }

    this.append(node)
  }

  get postId() {
    return this.getAttribute('postId')
  }

  async postData() {
    const data = await fetch(
      `https://hachyderm.io/api/v1/statuses/${this.postId}`
    ).then((response) => response.json())
    return data
  }
}

customElements.define('mastodon-post', MastodonPost)

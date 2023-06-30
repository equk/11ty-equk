const root = document.documentElement

function getThemePref() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const isDark = getThemePref() === 'dark'

const observer = new MutationObserver(() => {
  const rootIsDark = root.classList.contains('dark')

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', rootIsDark ? 'dark' : 'light')
  }
})
observer.observe(root, { attributeFilter: ['class'] })

root.classList.toggle('dark', isDark)

class ToggleDark extends HTMLElement {
  constructor() {
    super()
    const button = this.querySelector('button')

    function setTheme(dark) {
      document.documentElement.classList.toggle('dark', dark)
      button.setAttribute('aria-pressed', String(dark))
    }

    button.addEventListener('click', () => setTheme(!this.isDark()))

    setTheme(this.isDark())
  }

  isDark() {
    return document.documentElement.classList.contains('dark')
  }
}

customElements.define('toggle-dark', ToggleDark)

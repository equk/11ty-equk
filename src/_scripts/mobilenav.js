document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav')
  const toggleMenuButton = document.getElementById('toggle-navigation-menu')
  let menuOpen = false

  function toggleClass(element, className) {
    element.classList.toggle(className)
  }

  toggleMenuButton.addEventListener('click', () => {
    toggleClass(nav, 'hidden')
    menuOpen = !menuOpen
    toggleMenuButton.setAttribute('aria-expanded', menuOpen.toString())
  })
})

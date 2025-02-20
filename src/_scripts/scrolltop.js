const scrollButton = document.querySelector('.scroll-to-top')
const scrollToggle = () => {
  scrollButton.classList.toggle('show', window.scrollY > 100)
}
document.addEventListener('scroll', () => {
  scrollToggle()
})

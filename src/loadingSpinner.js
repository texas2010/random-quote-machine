export const show = () => {
  document.getElementById('loadingSpinner').classList.add('showSpinner')
}

export const remove = () => {
  document.getElementById('loadingSpinner').classList.remove('showSpinner')
}
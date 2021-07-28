export const revealPassword = (inputId: string) => {
  const passwordInput = document.getElementById(inputId)
  if (passwordInput !== null) {
    const type =
      passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
  }
}

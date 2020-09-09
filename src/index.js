import './styles/main.css'
import './styles/loadingSpinner.css'
import getJSON from './request'
import DOM from './view-function'
import * as loadingSpinner from './loadingSpinner'

const render = ({ quoteText, quoteAuthor }) => {
  DOM.id('text').textContent = quoteText
  DOM.id('author').textContent = quoteAuthor
  DOM.id('tweet-quote').href = `https://twitter.com/intent/tweet?text="${quoteText}" ${quoteAuthor}&hashtags=quotes`
}

const newQuoteMessage = async () => {
  DOM.id('new-quote').disabled = true;
  DOM.id('messageBox').classList.add('hidden')
  loadingSpinner.show()
  const data = await getJSON('https://quota.glitch.me/random')
  render(data)
  loadingSpinner.remove()
  DOM.id('messageBox').classList.remove('hidden')
  DOM.id('new-quote').disabled = false;
}

DOM.id('new-quote').addEventListener('click', newQuoteMessage)

newQuoteMessage()
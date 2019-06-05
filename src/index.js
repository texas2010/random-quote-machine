import getJSON from './request'
import DOM from './view-function'

const render = ({ quoteText, quoteAuthor }) => {
  DOM.id('text').textContent = quoteText
  DOM.id('author').textContent = quoteAuthor
  DOM.id('tweet-quote').href = `https://twitter.com/intent/tweet?text="${quoteText}" ${quoteAuthor}&hashtags=quotes`
}

const newQuoteMessage = async () => {
  const data = await getJSON('https://quota.glitch.me/random')
  render(data)
}

DOM.id('new-quote').addEventListener('click', newQuoteMessage)

newQuoteMessage()
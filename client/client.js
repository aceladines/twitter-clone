const form = document.querySelector('form')
const loading = document.querySelector('.loading')
const URL_POST = 'http://localhost:3000/tweets/post'
const URL_GET = 'http://localhost:3000/tweets'
const tweetArea = document.querySelector('.tweets')
const errorMessage = document.querySelector('.error-message')

errorMessage.style.display = 'none'

loading.style.display = ''

getAllTweets()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let formData = new FormData(form)
  let name = formData.get('name')
  let message = formData.get('tweet')

  const tweet = {
    name,
    message
  }

  loading.style.display = ''
  form.style.display = 'none'

  function validTweet(params) {
    return tweet.name && tweet.name.toString().trim() !== '' &&
      tweet.message && tweet.message.toString().trim() !== ''
  }

  if (validTweet(tweet)) {
    fetch(URL_POST, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweet),
      }).then(response => response.json())
      .then(createdTweet => {
        console.log(createdTweet);
        form.reset()
        setTimeout(() => {
          errorMessage.style.display = 'none'
          form.style.display = ''
          loading.style.display = 'none'
        }, 15000);
      })
    getAllTweets()
  } else {
    errorMessage.style.display = ''
    errorMessage.textContent = 'Name and Tweet are required!'
    form.style.display = ''
    loading.style.display = 'none'
  }
})

function getAllTweets() {
  tweetArea.innerHTML = ''
  fetch(URL_GET)
    .then(response => response.json())
    .then(data => {
      data.forEach((value) => {

        const tweets = document.createElement('div')
        tweets.classList.add('tweet')

        const name = document.createElement('h3')
        name.textContent = value.name

        const message = document.createElement('p')
        message.textContent = value.tweet

        tweets.appendChild(name)
        tweets.appendChild(message)
        tweetArea.appendChild(tweets)

      })
    })
  loading.style.display = 'none'
}
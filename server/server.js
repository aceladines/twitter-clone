require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const tweetModel = require('./models/tweet');

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  max: 1 // limit each IP to 100 requests per windowMs
});


app.get('/', (req, res) => {
  res.json({
    message: 'Hi there user! 🤗'
  })
})

app.post('/tweets/post', limiter, (req, res) => {
  const tweet = new tweetModel({
    name: req.body.name,
    tweet: req.body.message
  })

  tweet.save()
    .then(createdTweet => res.json(createdTweet))
    .catch(err => res.json(err.message))
})

app.get('/tweets', (req, res) => {
  tweetModel.find((err, result) => {
    err ? res.json(err) : res.json(result.reverse())
  })
})


app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
})
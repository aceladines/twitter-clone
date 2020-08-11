const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tweetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  tweet: {
    type: String,
    required: true,
    trim: true
  }
})


const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
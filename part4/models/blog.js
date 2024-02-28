const config = require('../utils/config')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog',blogSchema)
  const mongoUrl = String(config.MONGODB_URI)
  
  mongoose.connect(mongoUrl)
      .then(result => console.log('connected to MongoDB'))
      .catch(error =>logger.error('error connecting to MongoDB:',error.message))

      blogSchema.set('toJSON', {
        transform: (document, returnedObject) =>
        {
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
      })
      
module.exports = mongoose.model('Blog', blogSchema)
const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

// HTTP GET request for all blogs
blogRouter.get('/', async (request, response) =>{

const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

response.status(201).json(blogs)
})

// HTTP GET request for one blog
blogRouter.get('/:id', async (request, response) =>  {

logger.info(`Getting specific blog via HTTP GET request`)
const blog = await Blog.findById(request.params.id)

response.status(201).json(blog)
})

// HTTP POST request for a new blog entry
blogRouter.post('/', async (request, response) => {

  const body = request.body

  const locatedUser = await User.findById(body.user)

  // Check if required properties are present in the request body
  if (!body || !body.title || !body.author || !body.url || !body.user)
  {
    return response.status(400).json({ error: 'Missing required fields' });
  }

let newBlog 
  if(!body.likes){
   newBlog = new Blog({
    title: body.title,
    author: body.author,
    likes: 0,
    url: body.url,
    user: body.user
  })} else {
    newBlog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: body.user
})}

let savedBlog = await newBlog.save()
locatedUser.blogs = locatedUser.blogs.concat(savedBlog.id)
await locatedUser.save()

response.status(201).json(savedBlog)
})
 
// HTTP PUT request to update blog in mongodb
blogRouter.put('/:id', async (request, response) => {

  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

// HTTP DELETE request to delete blog post
blogRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = blogRouter
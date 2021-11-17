const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs);
  //   });
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.title || body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    // blog
    //   .save()
    //   .then(result => {
    //     response.status(201).json(result);
    //   });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog.toJSON());
  } else {
    response.status(400).end();
  }
});

module.exports = blogsRouter;

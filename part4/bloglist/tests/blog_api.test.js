const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

jest.setTimeout(100000);

beforeEach(async () => {
  await Blog.find({}); // buffer for MongooseError Timeout
  await Blog.deleteMany({});

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('formatted id exists', async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach(element => {
    expect(element.id).toBeDefined();
  });
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'LiveOverflow',
    author: 'Fabian Faessler',
    url: 'https://liveoverflow.com/topic/blog/',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map(blog => blog.title);
  expect(titles).toContain(
    'LiveOverflow',
  );
});

test('no likes defaults to zero', async () => {
  const newBlogNoLikes = {
    title: 'LiveOverflow',
    author: 'Fabian Faessler',
    url: 'https://liveoverflow.com/topic/blog/',
  };

  await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogNoLikes = response.body
    .filter(b => b.title === 'LiveOverflow');

  expect(blogNoLikes[0].likes).toBe(0);
});

test('no url and no title is a bad request', async () => {
  const noURLAndTitle = {
    author: 'Fabian Faessler',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(noURLAndTitle)
    .expect(400);

  const response = await api.get('/api/blogs');
  const blogsAtEnd = response.body;
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test('yes url and no title is good', async () => {
  const yesURLAndNoTitle = {
    author: 'Fabian Faessler',
    url: 'https://liveoverflow.com/topic/blog/',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(yesURLAndNoTitle)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogsAtEnd = response.body;
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
});

test('no url and yes title is good', async () => {
  const noURLAndYesTitle = {
    title: 'LiveOverflow',
    author: 'Fabian Faessler',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(noURLAndYesTitle)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogsAtEnd = response.body;
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
});

afterAll(() => {
  mongoose.connection.close();
});

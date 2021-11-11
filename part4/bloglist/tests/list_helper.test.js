const listHelper = require('../utils/list_helper');

const blogs = [
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

const oneElement = [
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const emptyList = [];

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList);
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test('of one blog is its own likes', () => {
    const result = listHelper.totalLikes(oneElement);
    expect(result).toBe(2);
  });

  test('of multiple blogs is correct', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog(emptyList);
    expect(result).toBe(undefined);
  });

  test('of one blog is its own likes', () => {
    const expected = {
      title: oneElement[0].title,
      author: oneElement[0].author,
      likes: oneElement[0].likes,
    };
    const result = listHelper.favoriteBlog(oneElement);
    expect(result).toEqual(expected);
  });

  test('of multiple blogs is correct', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(expected);
  });
});

describe('mostBlogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toBe(undefined);
  });

  test('of one blog is one', () => {
    const expected = {
      author: oneElement[0].author,
      blogs: 1,
    };

    const result = listHelper.mostBlogs(oneElement);
    expect(result).toEqual(expected);
  });

  test('of multiple blogs to be correct', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    };

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(expected);
  });
});

describe('mostLikes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toBe(undefined);
  });

  test('of one blog is one', () => {
    const expected = {
      author: oneElement[0].author,
      likes: oneElement[0].likes,
    };

    const result = listHelper.mostLikes(oneElement);
    expect(result).toEqual(expected);
  });

  test('of multiple blogs to be correct', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(expected);
  });
});

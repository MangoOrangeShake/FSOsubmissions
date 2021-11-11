const dummy = blogs => (blogs ? 1 : 0);

const totalLikes = blogs => {
  const total = blogs.reduce((sum, element) => sum + element.likes, 0);

  return blogs.length === 0 ? 0 : total;
};

const favoriteBlog = blogs => {
  const likesArray = blogs.map(n => n.likes);
  const mostUpvoted = blogs.filter(n => n.likes === Math.max(...likesArray));

  return blogs.length === 0
    ? undefined
    : {
      title: mostUpvoted[0].title,
      author: mostUpvoted[0].author,
      likes: mostUpvoted[0].likes,
    };
};

const mostBlogs = blogs => {
  const authors = blogs.map(n => n.author);
  const uniqueAuthors = [...new Set(authors)];
  const numOfBlogs = new Array(uniqueAuthors.length).fill(0);

  uniqueAuthors.forEach((element, index) => {
    const instances = authors.filter(n => n === element);
    numOfBlogs[index] = instances.length;
  });

  const number = Math.max(...numOfBlogs);

  const final = {
    author: uniqueAuthors[numOfBlogs.indexOf(number)],
    blogs: number,
  };

  return blogs.length === 0
    ? undefined
    : final;
};

const mostLikes = blogs => {
  const authorsAndLikes = blogs.reduce((finalArr, element) => {
    finalArr[element.author] = finalArr[element.author] || [];
    finalArr[element.author].push(element.likes);
    return finalArr;
  }, {});

  const authors = Object.entries(authorsAndLikes)
    .map(element => element[0]);

  const likes = Object.entries(authorsAndLikes)
    .map(element => element[1])
    .reduce((finalArr, element) => {
      const sum = element.reduce((total, number) => total + number, 0);
      finalArr.push(sum);
      return finalArr;
    }, []);

  const number = Math.max(...likes);

  const final = {
    author: authors[likes.indexOf(number)],
    likes: number,
  };

  return blogs.length === 0
    ? undefined
    : final;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
    }
  
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
    }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      author: String!
      setBornTo: Int!
    ): Author 
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filtered = books;
      if (args.author) {
        filtered = filtered.filter((book) => book.author === args.author);
      }
      if (args.genres) {
        filtered = filtered.filter((book) =>
          args.genres.every((genre) => book.genres.includes(genre))
        );
      }
      return filtered;
    },
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (parent) => {
      return books.filter((book) => book.author === parent.name).length;
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);

      const authorExists = authors.some(
        (author) => author.name === args.author
      );
      if (!authorExists) {
        const newAuthor = {
          name: args.author,
          id: uuid(),
          born: null,
        };
        authors = authors.concat(newAuthor);
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.author);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((p) =>
        p.name === args.author ? updatedAuthor : p
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

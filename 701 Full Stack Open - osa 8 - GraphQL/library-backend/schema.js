const typeDefs = `
  type User {
    username: String!
    friends: [Author!]!
    id: ID!
  }

  type Token {
    value: String!
  }
    
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    author: Author!
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

    createUser(
      username: String!
    ) : User
    
    login(
      username: String!
      password: String!
    ) : Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;

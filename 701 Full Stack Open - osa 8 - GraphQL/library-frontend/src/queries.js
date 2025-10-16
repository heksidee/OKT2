import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query AllBooks($genres: [String]) {
    allBooks(genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      title
      published
      id
      genres
      author {
        name
        born
        id
      }
    }
  }
`;

export const EDIT_BORN_YEAR = gql`
  mutation editAuthor($author: String!, $setBornTo: Int!) {
    editAuthor(author: $author, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Recommendations = ({ show, favoriteGenre }) => {
  const result = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks || [];

  const recommendedBooks = favoriteGenre
    ? books.filter((book) => book.genres.includes(favoriteGenre))
    : [];

  return (
    <div>
      <h2>recommendations</h2>
      {favoriteGenre ? (
        <>
          <p>
            Books in your favorite genre: <strong>{favoriteGenre}</strong>
          </p>
          <table>
            <tbody>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
              </tr>
              {recommendedBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No favorite genre selected.</p>
      )}
    </div>
  );
};

export default Recommendations;

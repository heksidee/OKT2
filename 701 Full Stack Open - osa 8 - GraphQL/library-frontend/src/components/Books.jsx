import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import "./componentStyles.css";

const Books = ({ show, token, favoriteGenre, setFavoriteGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const allGenresFavorite = useQuery(ALL_BOOKS);
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: selectedGenre ? { genres: [selectedGenre] } : {},
  });

  if (!show) {
    return null;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  const books = data?.allBooks || [];

  const allGenres = allGenresFavorite.data?.allBooks
    ?.flatMap((book) => book.genres || [])
    .filter((genre, index, self) => self.indexOf(genre) === index);

  return (
    <div>
      <h2>books</h2>
      <div>
        <button
          onClick={() => setSelectedGenre(null)}
          className={selectedGenre === null ? "active" : ""}
        >
          all genres
        </button>
        {allGenres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={selectedGenre === g ? "active" : ""}
          >
            {g}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <div>
          <p>Select your favorite genre</p>
          <select
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
          >
            <option value="">genres</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Books;

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN_YEAR } from "../queries";

const BornForm = () => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { author: name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  const authors = result.data.allAuthors || [];

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option value="">Select author</option>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BornForm;

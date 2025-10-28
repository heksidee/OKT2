import type { Diary } from "../types";

interface Props {
  diaries: Diary[];
}

const Diaries = ({ diaries }: Props) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default Diaries;

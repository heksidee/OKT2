import { useState } from "react";
import type { NewDiary } from "../types";

interface Props {
  onSubmit: (newDiary: NewDiary) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Date:
          <input
            type="date"
            value={date}
            min="2000-01-01"
            max="2030-12-31"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Visibility:
          {["great", "good", "ok", "poor"].map((option) => (
            <label key={option} style={{ margin: "0.5em" }}>
              {option}
              <input
                value={option}
                type="radio"
                checked={visibility === option}
                onChange={(e) => setVisibility(e.target.value)}
              />
            </label>
          ))}
        </div>
        <div>
          Weather:
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((option) => (
            <label key={option} style={{ margin: "0.5em" }}>
              {option}
              <input
                value={option}
                type="radio"
                checked={weather === option}
                onChange={(e) => setWeather(e.target.value)}
              />
            </label>
          ))}
        </div>
        <div>
          Comment:
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Add new diary</button>
      </form>
    </div>
  );
};

export default DiaryForm;

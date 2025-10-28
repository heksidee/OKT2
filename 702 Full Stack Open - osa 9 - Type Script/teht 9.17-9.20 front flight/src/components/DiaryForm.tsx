import { useState } from "react";
import type { Diary } from "../types";

interface Props {
  onSubmit: (newDiary: Omit<Diary, "id">) => void;
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
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          Visibility:
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          Weather:
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
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

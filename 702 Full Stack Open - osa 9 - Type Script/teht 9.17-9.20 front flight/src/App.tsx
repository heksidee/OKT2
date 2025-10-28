import { useState, useEffect } from "react";
import DiaryForm from "./components/DiaryForm";
import Diaries from "./components/Diaries";
import type { Diary } from "./types";
import { getAllDiaries } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
      console.log(data);
    });
  }, []);

  const addDiary = (newDiary: Omit<Diary, "id">) => {
    const diaryWithId: Diary = {
      ...newDiary,
      id: String(diaries.length + 1),
    };
    setDiaries([...diaries, diaryWithId]);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <DiaryForm onSubmit={addDiary} />;
      <Diaries />
    </div>
  );
}

export default App;

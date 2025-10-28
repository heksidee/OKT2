import { useState, useEffect } from "react";
import axios from "axios";
import DiaryForm from "./components/DiaryForm";
import Diaries from "./components/Diaries";
import Notification from "./components/Notification";
import type { Diary, NewDiary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(null), 5000);
    }
  });

  const addDiary = (newDiary: NewDiary) => {
    createDiary(newDiary)
      .then((savedDiary) => {
        setDiaries([...diaries, savedDiary]);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          const data = error.response.data;

          if (
            typeof data === "object" &&
            "message" in data &&
            "field" in data &&
            "received" in data
          ) {
            setErrorMessage(`Error: Incorrect ${data.field}: ${data.received}`);
          } else if (typeof data === "string") {
            setErrorMessage(data);
          } else {
            setErrorMessage("Tuntematon virhe palvelimelta.");
          }
        } else {
          setErrorMessage("Tuntematon virhe päiväkirjan tallennuksessa.");
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <DiaryForm onSubmit={addDiary} />;
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;

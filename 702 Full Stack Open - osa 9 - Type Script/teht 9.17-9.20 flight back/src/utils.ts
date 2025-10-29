import { z } from "zod";
import { NewDiaryEntry } from "./types";

export const NewEntrySchema = z.object({
  weather: z.enum(["sunny", "rainy", "cloudy", "stormy", "windy"]),
  visibility: z.enum(["great", "good", "ok", "poor"]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  comment: z.string(),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};

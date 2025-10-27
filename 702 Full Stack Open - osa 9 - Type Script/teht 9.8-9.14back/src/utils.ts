import { NewPatientEntry } from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val))),
  ssn: z.string().refine((val) => /^\d{6}-[0-9A-Za-z]{4}$/.test(val)),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};

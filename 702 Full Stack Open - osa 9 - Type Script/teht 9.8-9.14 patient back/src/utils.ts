import { NewPatientEntry, NewEntry } from "./types";
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

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val))),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().min(0).max(3),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val))),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine((val) => !isNaN(Date.parse(val))),
      endDate: z.string().refine((val) => !isNaN(Date.parse(val))),
    })
    .optional(),
});

export const NewEntriesSchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const toNewEntry = (object: unknown): NewEntry => {
  const parsedEntry = NewEntriesSchema.parse(object);
  return parsedEntry;
};

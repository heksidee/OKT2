import patientsData from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  Patient,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): PatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;
  return {
    ...patient,
    ssn: patient.ssn!,
    entries: patient.entries,
  };
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry = {
    ...entry,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};

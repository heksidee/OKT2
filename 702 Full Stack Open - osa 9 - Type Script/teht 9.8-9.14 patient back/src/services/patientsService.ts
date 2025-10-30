import patientsData from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientsData;

//const indPatient: Patient[] = patientsData

const getPatients = (): PatientEntry[] => {
  return patients;
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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
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

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById,
};

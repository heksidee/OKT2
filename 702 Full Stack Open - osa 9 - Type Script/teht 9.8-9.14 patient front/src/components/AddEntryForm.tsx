import { useState } from "react";
import { Diagnosis, Entry } from "../types";
import patientService from "../services/patients";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import { Alert } from "@mui/material";

type EntryType = Entry["type"];

interface Props {
  patientId: string;
  onAddEntry: (entry: Entry) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ patientId, onAddEntry, diagnoses }: Props) => {
  const [selectedType, setSelectedType] = useState<EntryType | "">("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCancel = () => {
    setSelectedType("");
  };

  const handleSubmit = async (entry: Omit<Entry, "id">) => {
    try {
      const newEntry = await patientService.createEntry(patientId, entry);
      onAddEntry(newEntry);
      setSelectedType("");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error while adding inputs");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <label htmlFor="entry-type">Choose entry: </label>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <select
        id="entry-type"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value as EntryType)}
      >
        <option value=""></option>
        <option value="Hospital">Hospital</option>
        <option value="HealthCheck">Health check</option>
        <option value="OccupationalHealthcare">Occupational healthcare</option>
      </select>
      {selectedType === "Hospital" && (
        <HospitalForm
          type={selectedType}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          setError={setErrorMessage}
          diagnoses={diagnoses}
        />
      )}
      {selectedType === "HealthCheck" && (
        <HealthCheckForm
          type={selectedType}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          setError={setErrorMessage}
          diagnoses={diagnoses}
        />
      )}
      {selectedType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm
          type={selectedType}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          setError={setErrorMessage}
          diagnoses={diagnoses}
        />
      )}
    </div>
  );
};

export default AddEntryForm;

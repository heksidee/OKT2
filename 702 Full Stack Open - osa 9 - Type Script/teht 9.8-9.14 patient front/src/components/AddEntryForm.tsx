import { useState } from "react";
import { Entry } from "../types";

import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

type EntryType = Entry["type"];

const AddEntryForm = () => {
  const [selectedType, setSelectedType] = useState<EntryType | "">("");

  const handleCancel = () => {
    setSelectedType("");
  };

  return (
    <div>
      <label htmlFor="entry-type">Choose entry: </label>
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
        <HospitalForm type={selectedType} onCancel={handleCancel} />
      )}
      {selectedType === "HealthCheck" && (
        <HealthCheckForm type={selectedType} onCancel={handleCancel} />
      )}
      {selectedType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm
          type={selectedType}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AddEntryForm;

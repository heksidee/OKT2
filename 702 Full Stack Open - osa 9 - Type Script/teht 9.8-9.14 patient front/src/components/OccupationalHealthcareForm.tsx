import { useState } from "react";
import { OccupationalHealthcareEntry } from "../types";

import { TextField, Button } from "@mui/material";

interface Props {
  type: OccupationalHealthcareEntry["type"];
  onCancel: () => void;
}

const OccupationalHealthcareForm = ({ type, onCancel }: Props) => {
  const [occupational, setOccupational] = useState<
    OccupationalHealthcareEntry | undefined
  >(undefined);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialst] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employer, setEmployer] = useState("");
  const [sickLeave, setSickleave] = useState("");

  return (
    <div>
      <h3>New {type} entry</h3>
      <form>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialst"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialst(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="Employer"
          fullWidth
          value={employer}
          onChange={({ target }) => setEmployer(target.value)}
        />
        <TextField
          label="Sickleave"
          fullWidth
          value={sickLeave}
          onChange={({ target }) => setSickleave(target.value)}
        />
        <Button
          color="error"
          variant="contained"
          style={{ float: "left" }}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{ float: "right" }}
          type="button"
        >
          Add entry
        </Button>
      </form>
    </div>
  );
};

export default OccupationalHealthcareForm;

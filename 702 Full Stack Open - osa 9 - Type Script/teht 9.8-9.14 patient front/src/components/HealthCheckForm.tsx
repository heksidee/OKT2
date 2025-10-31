import { useState } from "react";
import { HealthCheckEntry } from "../types";

import { TextField, Button } from "@mui/material";

interface Props {
  type: HealthCheckEntry["type"];
  onCancel: () => void;
}

const HealthCheckForm = ({ type, onCancel }: Props) => {
  const [healthcheck, setHealthcheck] = useState<HealthCheckEntry | undefined>(
    undefined
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialst] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

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
          label="Healthcheck Rating"
          fullWidth
          value={healthRating}
          onChange={({ target }) => setHealthRating(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
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

export default HealthCheckForm;

import { SyntheticEvent, useState } from "react";
import { HospitalEntry, Diagnosis } from "../types";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";

interface Props {
  type: HospitalEntry["type"];
  onCancel: () => void;
  onSubmit: (values: HospitalEntry) => void;
  setError: (msg: string | null) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({
  type,
  onCancel,
  onSubmit,
  setError,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialst] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });

  const addHospitalEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!description || !date || !specialist || !diagnosisCodes || !discharge) {
      setError("Fill every input");
    }
    onSubmit({
      id: "",
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
      discharge,
    });
  };

  return (
    <div>
      <h3>New {type} entry</h3>
      <form onSubmit={addHospitalEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Specialst"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialst(target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="diagnosis-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-label"
            multiple
            value={diagnosisCodes}
            onChange={(e) =>
              setDiagnosisCodes(e.target.value as unknown as string[])
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                {diag.code} – {diag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Discharge date"
          type="date"
          fullWidth
          value={discharge.date}
          onChange={({ target }) =>
            setDischarge({ ...discharge, date: target.value })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={discharge.criteria}
          onChange={({ target }) =>
            setDischarge({ ...discharge, criteria: target.value })
          }
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
          type="submit"
        >
          Add entry
        </Button>
      </form>
    </div>
  );
};

export default HospitalForm;

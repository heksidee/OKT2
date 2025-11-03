import { SyntheticEvent, useState } from "react";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";

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
  type: OccupationalHealthcareEntry["type"];
  onCancel: () => void;
  onSubmit: (values: OccupationalHealthcareEntry) => void;
  setError: (msg: string | null) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareForm = ({
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
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickleaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const addOccupationalEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      !description ||
      !date ||
      !specialist ||
      !diagnosisCodes ||
      !employerName ||
      !sickLeaveStart ||
      !sickLeaveEnd
    ) {
      setError("Fill every input");
    }
    onSubmit({
      id: "",
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
      employerName,
      sickLeave:
        sickLeaveStart && sickLeaveEnd
          ? {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd,
            }
          : undefined,
    });
  };

  return (
    <div>
      <h3>New {type} entry</h3>
      <form onSubmit={addOccupationalEntry}>
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
          label="Employer"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Sickleave start"
          type="date"
          fullWidth
          value={sickLeaveStart}
          onChange={({ target }) => setSickleaveStart(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Sickleave end"
          type="date"
          fullWidth
          value={sickLeaveEnd}
          onChange={({ target }) => setSickLeaveEnd(target.value)}
          InputLabelProps={{ shrink: true }}
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

export default OccupationalHealthcareForm;

import { useState, SyntheticEvent } from "react";
import { HealthCheckEntry, HealthCheckRating, Diagnosis } from "../types";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

interface Props {
  type: HealthCheckEntry["type"];
  onCancel: () => void;
  onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
  setError: (msg: string | null) => void;
  diagnoses: Diagnosis[];
}

const HealthCheckForm = ({
  type,
  onCancel,
  onSubmit,
  setError,
  diagnoses,
}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialst] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | undefined
  >(undefined);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const addHealtCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      healthCheckRating === undefined ||
      healthCheckRating < 0 ||
      healthCheckRating > 3
    ) {
      setError(`Value of Healthcheck rating incorrect: ${healthCheckRating}`);
      return;
    }
    if (
      !description ||
      !date ||
      !specialist ||
      !diagnosisCodes ||
      !healthCheckRating
    ) {
      setError("Fill every input");
    }
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
      healthCheckRating,
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };

  return (
    <div>
      <h3>New {type} entry</h3>
      <form onSubmit={addHealtCheckEntry}>
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
        <TextField
          label="Healthcheck Rating (0-3)"
          type="number"
          inputProps={{ min: 0, max: 3 }}
          fullWidth
          value={healthCheckRating ?? ""}
          onChange={({ target }) => {
            const ratingValue = target.value;
            if (ratingValue === "") {
              setHealthCheckRating(undefined);
            } else {
              setHealthCheckRating(Number(target.value) as HealthCheckRating);
            }
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="diagnosis-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-label"
            multiple
            value={diagnosisCodes}
            onChange={(e) => {
              const value = e.target.value;
              setDiagnosisCodes(
                typeof value === "string" ? value.split(",") : value
              );
            }}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                <Checkbox checked={diagnosisCodes.includes(diag.code)} />
                <ListItemText primary={`${diag.code} – ${diag.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default HealthCheckForm;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService
        .getPatient(id)
        .then((data) => setPatient(data))
        .catch(() => setPatient(null));
    }
  }, [id]);

  if (!patient) {
    return <p>Patient not found</p>;
  }

  const genderIcon = () => {
    if (patient.gender === "male") {
      return <MaleIcon />;
    } else if (patient.gender === "female") {
      return <FemaleIcon />;
    } else {
      return <TransgenderIcon />;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetail;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from "../services/patients";
import {
  Patient,
  Entry,
  Diagnosis,
  HealthCheckRating,
  HealthCheckEntry,
} from "../types";

import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [patientData, diagnosesData] = await Promise.all([
          patientService.getPatient(id),
          patientService.getDiagnoses(),
        ]);
        setPatient(patientData);
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error("Error fetching patient or diagnose data");
        setPatient(null);
      }
    };
    fetchData();
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

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    const textStyle = { LineHeight: "1.2", margin: "4px 0" };
    return (
      <div
        style={{
          border: "solid 1px",
          borderRadius: "6px",
          paddingLeft: "6px",
          marginBottom: "1rem",
        }}
      >
        <p style={textStyle}>
          <strong>{entry.date}</strong> {getTypeIcon(entry)}
        </p>
        <p style={textStyle}>{entry.description}</p>
        {isHealthCheckEntry(entry) && (
          <p style={textStyle}>{heartIcon(entry.healthCheckRating)}</p>
        )}
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => {
              const diagnosis = findDiagnosis(code);
              return (
                <li key={code}>
                  {code} {diagnosis ? `– ${diagnosis.name}` : ""}
                </li>
              );
            })}
          </ul>
        )}
        <p>diagnose by {entry.specialist}</p>
      </div>
    );
  };

  const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
    return entry.type === "HealthCheck";
  };

  const findDiagnosis = (code: string): Diagnosis | undefined =>
    diagnoses.find((d) => d.code === code);

  const getTypeIcon = (entry: Entry) => {
    const iconStyle = { fontSize: 20, verticalAlign: "middle" };
    switch (entry.type) {
      case "HealthCheck":
        return <MedicalServicesIcon style={iconStyle} />;
      case "Hospital":
        return <LocalHospitalIcon style={iconStyle} />;
      case "OccupationalHealthcare":
        return <WorkIcon style={iconStyle} />;
      default:
        return null;
    }
  };

  const heartIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: "orange" }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientDetail;

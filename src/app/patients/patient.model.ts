import { Patient, PatientDTO } from "./patient.types";

export async function getPatientById(id: string): Promise<Patient | null> {
  return null;
}

export async function getAllPatients(
  query: {},
  limit: number
): Promise<Patient[]> {
  return [];
}

export async function getPatientsByField(
  data: string | number | boolean,
  field: string
): Promise<Patient[] | null> {
  return null;
}
export async function getPatientsByTutorId(
  id: string
): Promise<Patient | null> {
  return null;
}

export async function createPatient(data: {}): Promise<string | null> {
  return "";
}

export async function updatePatientObservationRouteObservation(data: {}): Promise<
  string | null
> {
  return "";
}

export async function deletePatient(data: {}): Promise<string | null> {
  return "";
}

function makePatientResponse(patient: PatientDTO): Patient {
  return {
    id: patient.id,
    tutorId: patient.tutorId,
    species: patient.species,
    name: patient.name,
    bloodType: patient.bloodType,
    observation: patient.observation,
    allergy: patient.allergy,
    sex: patient.sex,
    birthDate: patient.birthDate,
    onTreatment: patient.onTreatment,
  };
}

function makePatientListResponse(
  patients: PatientDTO[]
): Patient[] {
  return patients.map<Patient>((pat) => makePatientResponse(pat));
}
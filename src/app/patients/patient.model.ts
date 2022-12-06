import logger from "../../utils/logger";
import {
  getTutorById,
  insertPatientOnTutorArray,
  removePatientFromTutorArray,
} from "../tutors/tutor.model";
import {
  listLimit,
  read,
  readByField,
  readByForeignId,
  readNames,
  remove,
  store,
  update,
} from "./patient.repository";
import { Allergy, Patient, PatientDTO, Sex, Species } from "./patient.types";

export async function getPatientById(id: string): Promise<Patient | null> {
  const log = logger.child({
    func: "getPatientById",
    data: { id },
  });
  try {
    const patient = await read(id);

    if (patient) {
      return makePatientResponse(patient);
    }
    return null;
  } catch (error) {
    log.error("error getting patient by id", error);
    throw error;
  }
}

export async function getAllPatients(
  query: {},
  limit: number
): Promise<Patient[]> {
  const log = logger.child({
    func: "getAllPatients",
  });
  try {
    const patients = await listLimit(query, limit);
    return makePatientListResponse(patients);
  } catch (error) {
    log.error("error getting all patients", error);
    throw error;
  }
}

export async function getPatientsByField(
  data: string | number | boolean,
  field: string
): Promise<Patient[] | null> {
  const log = logger.child({
    func: "getPatientsByField",
    data: { data, field },
  });
  try {
    const patients = await readByField(data, field, 50);

    if (patients) {
      return makePatientListResponse(patients);
    }
    return null;
  } catch (error) {
    log.error("error getting patients by field", error);
    throw error;
  }
}
export async function getPatientsByTutorId(
  id: string
): Promise<Patient[] | null> {
  const log = logger.child({
    func: "getPatientsByTutorId",
    data: { id },
  });
  try {
    const patients = await readByForeignId("tutorId", id, 50);

    if (patients) {
      return makePatientListResponse(patients);
    }
    return null;
  } catch (error) {
    log.error("error getting patients by foreign field", error);
    throw error;
  }
}

export async function createPatient(data: {
  tutorId: string;
  name: string;
  bloodType?: string;
  observation?: string;
  species: Species;
  allergy?: Allergy;
  sex: Sex;
  birthDate: Date;
  onTreatment?: boolean;
  weight: number;
}): Promise<string | null> {
  const log = logger.child({
    func: "createPatient",
    data,
  });
  try {
    const tutor = await getTutorById(data.tutorId);
    if (!tutor) {
      log.error("tutor not found", { tutorId: data.tutorId });
      return "tutor not found";
    }
    const id = await store({
      ...data,
    });
    if (!id) {
      log.error("tutor not found", { data });
      return "failed while storing patient";
    }
    const ok = await insertPatientOnTutorArray(data.tutorId, id);
    if (!ok) {
      log.error("tutor not found", { data, id });
      return "created but not inserted on tutor list";
    }
    return id;
  } catch (error) {
    log.error("error creating patient", error);
    throw error;
  }
}

export async function updatePatient(data: {
  id: string;
  tutorId: string;
  name?: string;
  bloodType?: string;
  observation?: string;
  species?: Species;
  allergy?: Allergy;
  sex?: Sex;
  birthDate?: Date;
  onTreatment?: boolean;
  weight: number;
}): Promise<boolean> {
  const log = logger.child({
    func: "updatePatient",
    patientId: data.id,
    tutorId: data.tutorId,
  });
  try {
    const response = await update({
      ...data,
    });
    return response;
  } catch (error) {
    log.error("error while updating patient", error);
    throw error;
  }
}

export async function deletePatient(
  patientId: string,
  tutorId: string
): Promise<boolean> {
  const log = logger.child({
    func: "deletePatient",
    patientId,
    tutorId,
  });
  try {
    const tutor = await getTutorById(tutorId);
    if (!tutor) {
      throw {
        error: "not found tutor",
      };
    }
    const responsePatient = await remove(patientId);
    if (!responsePatient) {
      throw {
        error: "unknown error at remove patient",
      };
    }
    const responseTutor = await removePatientFromTutorArray(tutorId, patientId);
    if (!responseTutor) {
      throw {
        error: "unknown error at remove patient from tutor array",
      };
    }
    return true;
  } catch (error) {
    log.error("error while removing patient", error);
    throw error;
  }
}

export async function translatePatientNames(
  tutorId: string,
  patientsNames?: Array<string>
): Promise<Array<string>> {
  const log = logger.child({
    func: "deletePatient",
    data: {tutorId, patientsNames},
  });
  try {
    if (!patientsNames || patientsNames.length === 0) {
      const tutor = await getTutorById(tutorId);
      patientsNames = tutor?.patientsName || [];
    }

    const response = await readNames(patientsNames);
    return response;
  } catch (error) {
    log.error("error while removing patient", error);
    throw error;
  }
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
    weight: patient.weight,
  };
}

function makePatientListResponse(patients: PatientDTO[]): Patient[] {
  return patients.map<Patient>((pat) => makePatientResponse(pat));
}

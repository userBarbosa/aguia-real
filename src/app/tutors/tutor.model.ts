import logger from "../../utils/logger";
import {
  read,
  listLimit,
  readByField,
  store,
  update,
  remove,
  updatePatientArray,
} from "./tutor.repository";
import { Tutor, TutorDTO, Address } from "./tutor.types";

export async function getTutorById(id: string): Promise<Tutor | null> {
  const log = logger.child({
    func: "getTutorById",
    data: { id },
  });
  try {
    const tutor = await read(id);

    if (tutor) {
      return makeTutorResponse(tutor);
    }
    return null;
  } catch (error) {
    log.error("error getting tutor by id", error);
    throw error;
  }
}

export async function getAllTutors(query: {}, limit: number): Promise<Tutor[]> {
  const log = logger.child({
    func: "getAllTutors",
  });
  try {
    const tutors = await listLimit(query, limit);
    return makeTutorListResponse(tutors);
  } catch (error) {
    log.error("error getting all tutors", error);
    throw error;
  }
}

export async function getTutorsByField(
  data: string | number | boolean,
  field: string
): Promise<Tutor[] | null> {
  const log = logger.child({
    func: "getTutorsByField",
    data: { data, field },
  });
  try {
    const tutors = await readByField(data, field, 50);

    if (tutors) {
      return makeTutorListResponse(tutors);
    }
    return null;
  } catch (error) {
    log.error("error getting tutors by field", error);
    throw error;
  }
}

export async function createTutor(data: {
  name: string;
  documentNumber: string;
  phoneNumber: string;
  observation: string;
  address: Address;
}): Promise<string | null> {
  const log = logger.child({
    func: "createTutor",
    data,
  });
  try {
    const id = await store({
      ...data,
    });
    return id;
  } catch (error) {
    log.error("error creating tutor", error);
    throw error;
  }
}

export async function updateTutor(data: {
  id: string;
  name: string;
  documentNumber: string;
  phoneNumber: string;
  observation: string;
  address: Address;
}): Promise<boolean> {
  const log = logger.child({
    func: "updateTutor",
    data,
  });
  try {
    const response = await update({
      ...data,
    });
    return response;
  } catch (error) {
    log.error("error while updating tutor", error);
    throw error;
  }
}

export async function deleteTutor(id: string): Promise<boolean> {
  const log = logger.child({
    func: "deleteTutor",
    id,
  });
  try {
    const updated = await remove(id);
    return updated;
  } catch (error) {
    log.error("error while removing tutor", error);
    throw error;
  }
}

export async function removePatientFromTutorArray(
  id: string,
  patientId: string
): Promise<string> {
  const log = logger.child({
    func: "removePatientFromTutorArray",
    id,
    patientId,
  });
  try {
    const ok = await updatePatientArray(id, patientId, "pull");
    if (!ok) {
      throw {
        error: "error trying to updateArray",
      };
    }
    const tutor = await getTutorById(id);
    if (!tutor) {
      throw {
        error: "some error has occour while trying to get tutor",
      };
    }
    const patients = tutor.patientsName.join(", ");
    return patients;
  } catch (error) {
    log.error("error while removing patient", error);
    throw error;
  }
}

export async function insertPatientOnTutorArray(
  id: string,
  patientId: string
): Promise<string> {
  const log = logger.child({
    func: "insertPatientOnTutorArray",
    id,
    patientId,
  });
  try {
    const ok = await updatePatientArray(id, patientId, "push");
    if (!ok) {
      throw {
        error: "error trying to updateArray",
      };
    }
    const tutor = await getTutorById(id);
    if (!tutor) {
      throw {
        error: "some error has occour while trying to get tutor",
      };
    }
    const patients = tutor.patientsName.join(", ");
    return patients;
  } catch (error) {
    log.error("error while removing patient", error);
    throw error;
  }
}

function makeTutorResponse(tutor: TutorDTO): Tutor {
  return {
    name: tutor.name,
    documentNumber: tutor.documentNumber,
    phoneNumber: tutor.phoneNumber,
    observation: tutor.observation,
    patientsName: tutor.patientsName,
    address: tutor.address,
  };
}

function makeTutorListResponse(tutors: TutorDTO[]): Tutor[] {
  return tutors.map<Tutor>((tutor) => makeTutorResponse(tutor));
}

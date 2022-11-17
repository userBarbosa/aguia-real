import {
  insertOne,
  select,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
  removeOne
} from "../../services/database/index";
import { Allergy, Patient, PatientDTO, Sex, Species } from "./patient.types";
import logger from "../../utils/logger";
import { ObjectId } from "mongodb";

const COLLECTION = "patients";

export async function list(): Promise<PatientDTO[]> {
  try {
    const response = await selectAll<PatientDTO>(COLLECTION, {});
    return response;
  } catch (error) {
    logger.error(error);
  }
  return [];
}

export async function listLimit(
  query: any,
  limit: number
): Promise<PatientDTO[]> {
  try {
    const response = await selectWithLimit<PatientDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting all patients", error);
  }
  return [];
}

export async function read(id: string): Promise<PatientDTO | null> {
  try {
    const response = await selectById<PatientDTO>(COLLECTION, id);

    return response;
  } catch (error) {
    logger.error("Error getting patient by id", error);
  }
  return null;
}

export async function readByForeignId(
  field: string,
  id: string,
  limit: number
): Promise<PatientDTO[]> {
  try {
    let data: { [key: string]: ObjectId } = {};
    data[field] = new ObjectId(id);

    const response = await selectWithLimit<PatientDTO>(
      COLLECTION,
      data,
      limit
    );

    return response;
  } catch (error) {
    if (error instanceof Error && error.stack) {
      for (const property of Object.getOwnPropertyNames(error)) {
      }
    }
    logger.error("Error getting patient by id", error);
    throw {
      message: "Error getting patient by id",
      error,
    };
  }
}

export async function readByField(
  data: string | number | boolean,
  field: string,
  limit: number
): Promise<PatientDTO[]> {
  try {
    let query: { [key: string]: string | number | boolean } = {};
    query[field] = data;

    const response = await selectWithLimit<PatientDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting patient by field", error);
  }
  return [];
}

export async function store(data: {
  tutorId: string;
  name: string;
  bloodType?: string;
  observation?: string;
  species: Species;
  allergy?: Allergy;
  sex: Sex;
  birthDate: Date;
  onTreatment?: boolean;
}): Promise<string | null> {
  try {
    const response = await insertOne(COLLECTION, {
      tutorId: new ObjectId(data.tutorId),
      name: data.name,
      bloodType: data.bloodType,
      observation: data.observation,
      species: data.species,
      allergy: data.allergy,
      sex: data.sex,
      birthDate: data.birthDate,
      onTreatment: data.onTreatment
    });
    return response
  } catch (error) {
    logger.error("error creating patient", error)
  }
  return null;
}


export async function update (data: {
  id: string,
  tutorId: string;
  name: string;
  bloodType?: string;
  observation?: string;
  species: Species;
  allergy?: Allergy;
  sex: Sex;
  birthDate: Date;
  onTreatment?: boolean;
}): Promise<boolean> {
  try {
    const response = await updateOne(COLLECTION, {_id: new ObjectId(data.id)}, {
      tutorId: data.tutorId,
      name: data.name,
      bloodType: data.bloodType,
      observation: data.observation,
      species: data.species,
      allergy: data.allergy,
      sex: data.sex,
      birthDate: data.birthDate,
      onTreatment: data.onTreatment,
      updatedAt: new Date()
    })

    return response
  } catch (error) {
    logger.error('Error updating patient', error)
  }

  return false
}

export async function remove (data: {id: string}): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, {_id: new ObjectId(data.id)})

    return response
  } catch (error) {
    logger.error('Error removing patient', error)
  }

  return false
}
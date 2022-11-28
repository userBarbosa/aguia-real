import {
  insertOne,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
  removeOne,
} from "../../services/database/index";
import { Allergy, PatientDTO, Sex, Species } from "./patient.types";
import { ObjectId } from "mongodb";
import { removingNullValues } from "../utilities/utility.controller";

const COLLECTION = "patients";

export async function list(): Promise<PatientDTO[]> {
  try {
    const response = await selectAll<PatientDTO>(COLLECTION, {});
    return response;
  } catch (error) {
    throw {
      message: "error while trying to return all",
      error,
    };
  }
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
    throw {
      message: "error while trying to return all",
      params: { query, limit },
      error,
    };
  }
}

export async function read(id: string): Promise<PatientDTO | null> {
  try {
    const response = await selectById<PatientDTO>(COLLECTION, id);

    return response;
  } catch (error) {
    throw {
      message: "error while trying to return patient",
      id,
      error,
    };
  }
}

export async function readByForeignId(
  field: string,
  id: string,
  limit: number
): Promise<PatientDTO[]> {
  try {
    let data: { [key: string]: ObjectId } = {};
    data[field] = new ObjectId(id);

    const response = await selectWithLimit<PatientDTO>(COLLECTION, data, limit);

    return response;
  } catch (error) {
    throw {
      message: "Error getting patient by foreign id",
      params: { field, id, limit },
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
    throw {
      message: "Error getting patient by field",
      params: { field, data, limit },
      error,
    };
  }
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
      onTreatment: data.onTreatment,
    });
    return response;
  } catch (error) {
    throw {
      message: "Error getting patient by field",
      data,
      error,
    };
  }
}

export async function update(data: {
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
}): Promise<boolean> {
  try {
    const cleanedPatientObject = removingNullValues({
      id: data.id,
      tutorId: data.tutorId,
      name: data.name,
      species: data.species,
      sex: data.sex,
      birthDate: data.birthDate,
      bloodType: data.bloodType,
      observation: data.observation,
      allergy: data.allergy,
      onTreatment: data.onTreatment,
    });
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(data.id) },
      {
        ...cleanedPatientObject,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update patient",
      error,
      data,
    };
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, { _id: new ObjectId(id) });

    return response;
  } catch (error) {
    throw {
      message: "error at remove patient",
      error,
      id,
    };
  }
}

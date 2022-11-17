import {
  insertOne,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
  removeOne
} from "../../services/database/index";
import logger from "../../utils/logger";
import { ObjectId } from "mongodb";
import { Address, TutorDTO } from './tutor.types';

const COLLECTION = "tutors";

export async function list(): Promise<TutorDTO[]> {
  try {
    const response = await selectAll<TutorDTO>(COLLECTION, {});
    return response;
  } catch (error) {
    logger.error(error);
  }
  return [];
}

export async function listLimit(
  query: any,
  limit: number
): Promise<TutorDTO[]> {
  try {
    const response = await selectWithLimit<TutorDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting all tutors", error);
  }
  return [];
}

export async function read(id: string): Promise<TutorDTO | null> {
  try {
    const response = await selectById<TutorDTO>(COLLECTION, id);

    return response;
  } catch (error) {
    logger.error("Error getting tutor by id", error);
  }
  return null;
}

export async function readByForeignId(
  field: string,
  id: string,
  limit: number
): Promise<TutorDTO[]> {
  try {
    let data: { [key: string]: ObjectId } = {};
    data[field] = new ObjectId(id);

    const response = await selectWithLimit<TutorDTO>(
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
    logger.error("Error getting tutor by id", error);
    throw {
      message: "Error getting tutor by id",
      error,
    };
  }
}

export async function readByField(
  data: string | number | boolean,
  field: string,
  limit: number
): Promise<TutorDTO[]> {
  try {
    let query: { [key: string]: string | number | boolean } = {};
    query[field] = data;

    const response = await selectWithLimit<TutorDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting tutor by field", error);
  }
  return [];
}

export async function store(data: {
  id: string;
  name: string;
  documentNumber: string;
  phoneNumber: string;
  observation:string;
  patientsName: Array<string>;
  address: Address;
}): Promise<string | null> {
  try {
    const response = await insertOne(COLLECTION, {
      name: data.name,
      documentNumber: data.documentNumber,
      phoneNumber: data.phoneNumber,
      observation: data.observation,
      patientsName: data.patientsName,
      address: data.address,
      createdAt: new Date()
    });

    return response
  } catch (error) {
    logger.error("error creating tutor", error)
  }
  return null;
}


export async function update (data: {
  id: string;
  name: string;
  documentNumber: string;
  phoneNumber: string;
  observation:string;
  patientsName: Array<string>;
  address: Address;
}): Promise<boolean> {
  try {
    const response = await updateOne(COLLECTION, {_id: new ObjectId(data.id)}, {
      name: data.name,
      documentNumber: data.documentNumber,
      phoneNumber: data.phoneNumber,
      observation: data.observation,
      patientsName: data.patientsName,
      address: data.address,
      updatedAt: new Date()
    })

    return response
  } catch (error) {
    logger.error('error updating tutor', error)
  }

  return false
}

export async function remove (data: {id: string}): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, {_id: new ObjectId(data.id)})

    return response
  } catch (error) {
    logger.error('Error removing tutor', error)
  }

  return false
}
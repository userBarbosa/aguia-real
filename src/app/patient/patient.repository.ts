import { ObjectId } from "mongodb";
import {
  insertOne,
  removeOne,
  select,
  selectAll,
  selectById,
  updateOne,
} from "../../services/database";
import logger from "../../utils/logger";
import { Patient, PatientDTO, Species, Allergy, Sex } from "./patient.types";

const COLLECTION = "patients";

export async function list(): Promise<PatientDTO[]> {
  try {
    const response = await selectAll<PatientDTO>(COLLECTION, {});
    return response;
  } catch (error) {
    logger.error("Error getting patients ", error);
  }

  return [];
}

export async function read(id: string): Promise<PatientDTO | null> {
  try {
    const response = await selectById<PatientDTO>(COLLECTION, id);
    return response;
  } catch (error) {
    logger.error("Error getting patient", error);
  }

  return null;
}

export async function update(data: {
  id: string;
  name: string;
  bloodType: string;
  observation: string;
  species: Species;
  allergy: Allergy;
  sex: Sex;
  birthDate: Date;
  onTreatment: boolean;
}): Promise<boolean> {
  try {
    const filter = { _id: new Object(data.id) };

    const content = {
      name: data.name,
      bloodType: data.bloodType,
      observation: data.observation,
      species: data.species,
      allergy: data.allergy,
      sex: data.sex,
      birthDate: data.birthDate,
      onTreatment: data.onTreatment,
    };

    const response = await updateOne(COLLECTION, filter, content);

    if (response) {
      return true;
    }
  } catch (error) {
    logger.error("Error updating patient", error);
  }

  return false;
}

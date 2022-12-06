import {
  insertOne,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
  removeOne,
  pushOne,
  pullOne,
} from "../../services/database/index";
import { ObjectId } from "mongodb";
import { Address, TutorDTO } from "./tutor.types";
import { translatePatientNames } from "../patients/patient.model";

const COLLECTION = "tutors";

export async function list(): Promise<TutorDTO[]> {
  try {
    const response = await selectAll<TutorDTO>(COLLECTION, {});
    if (response && response.length > 0) {
      let responseArray = [];
      for (const tutor of response) {
        const patientsNames = await translatePatientNames(
          tutor.id,
          tutor?.patientsName
        );
        tutor.patientsName = patientsNames;
        responseArray.push(tutor);
      }
      return responseArray;
    }
    return response;
  } catch (error) {
    throw {
      message: "error while trying to return all tutors",
      error,
    };
  }
}

export async function listLimit(
  query: any,
  limit: number
): Promise<TutorDTO[]> {
  try {
    const response = await selectWithLimit<TutorDTO>(COLLECTION, query, limit);
    if (response && response.length > 0) {
      let responseArray = [];
      for (const tutor of response) {
        const patientsNames = await translatePatientNames(
          tutor.id,
          tutor?.patientsName
        );
        tutor.patientsName = patientsNames;
        responseArray.push(tutor);
      }
      return responseArray;
    }
    return response;
  } catch (error) {
    throw {
      message: "error while trying to return tutors",
      error,
    };
  }
}

export async function read(id: string): Promise<TutorDTO | null> {
  try {
    const tutor = await selectById<TutorDTO>(COLLECTION, id);
    if (tutor) {
      const patientsNames = await translatePatientNames(
        id,
        tutor?.patientsName
      );
      tutor.patientsName = patientsNames;
      return tutor;
    }
    return tutor;
  } catch (error) {
    throw {
      message: "error while trying to return all tutors",
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

    const response = await selectWithLimit<TutorDTO>(COLLECTION, query, limit);

    if (response && response.length > 0) {
      let responseArray = [];
      for (const tutor of response) {
        const patientsNames = await translatePatientNames(
          tutor.id,
          tutor?.patientsName
        );
        tutor.patientsName = patientsNames;
        responseArray.push(tutor);
      }
      return responseArray;
    }

    return response;
  } catch (error) {
    throw {
      message: "Error getting tutor by field",
      params: { field, data, limit },
      error,
    };
  }
}

export async function store(data: {
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  observation: string;
  address: Address;
}): Promise<string | null> {
  try {
    const response = await insertOne(COLLECTION, {
      name: data.name,
      email: data.email,
      documentNumber: data.documentNumber,
      phoneNumber: data.phoneNumber,
      observation: data.observation,
      address: data.address,
      createdAt: new Date(),
    });

    return response;
  } catch (error) {
    throw {
      message: "error getting patient by field",
      data,
      error,
    };
  }
}

export async function update(data: {
  id: string;
  name: string;
  email: string;
  documentNumber: string;
  phoneNumber: string;
  observation: string;
  address: Address;
}): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(data.id) },
      {
        name: data.name,
        email: data.email,
        documentNumber: data.documentNumber,
        phoneNumber: data.phoneNumber,
        observation: data.observation,
        address: data.address,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update tutor",
      error,
      data,
    };
  }
}

export async function updatePatientArray(
  id: string,
  patientId: string,
  operation: string
): Promise<boolean> {
  try {
    if (operation === "pull") {
      const response = await pullOne(
        COLLECTION,
        { _id: new ObjectId(id) },
        { patientsName: patientId },
        { updatedAt: new Date() }
      );
      return response;
    } else {
      const response = await pushOne(
        COLLECTION,
        { _id: new ObjectId(id) },
        { patientsName: patientId },
        { updatedAt: new Date() }
      );
      return response;
    }
  } catch (error) {
    throw {
      message: "error updating patient array",
      data: { id, patientId, operation },
      error,
    };
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, { _id: new ObjectId(id) });

    return response;
  } catch (error) {
    throw {
      message: "Error removing tutor",
      error,
      id,
    };
  }
}

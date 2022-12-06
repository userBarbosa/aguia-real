import { ObjectId } from "mongodb";
import {
  insertOne,
  removeOne,
  select,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
} from "../../services/database";
import { removingNullValues } from "../utilities/utility.controller";
import { Specialty, UserDTO, UserType } from "./user.types";

const COLLECTION = "users";

export async function list(): Promise<UserDTO[]> {
  try {
    const response = await selectAll<UserDTO>(COLLECTION, {});

    return response;
  } catch (error) {
    throw {
      message: "error while trying to list appointments",
      error,
    };
  }
}

export async function listLimit(query: any, limit: number): Promise<UserDTO[]> {
  try {
    const response = await selectWithLimit<UserDTO>(COLLECTION, query, limit);

    return response;
  } catch (error) {
    throw {
      message: "error while trying to list limited appointments",
      error,
    };
  }
}

export async function read(id: string): Promise<UserDTO | null> {
  try {
    const response = await selectById<UserDTO>(COLLECTION, id);

    return response;
  } catch (error) {
    throw {
      message: "error while trying to list limited appointments",
      error,
    };
  }
}

export async function readByEmail(email: string): Promise<UserDTO | null> {
  try {
    const response = await select<UserDTO>(COLLECTION, { email });

    return response;
  } catch (error) {
    throw {
      message: "error while trying to return patient",
      email,
      error,
    };
  }
}

export async function readByField(
  data: string | number | boolean,
  field: string,
  limit: number
): Promise<UserDTO[]> {
  try {
    let query: { [key: string]: string | number | boolean } = {};
    query[field] = data;

    const response = await selectWithLimit<UserDTO>(COLLECTION, query, limit);

    return response;
  } catch (error) {
    throw {
      message: "Error getting user by field",
      params: { field, data, limit },
      error,
    };
  }
}

export async function store(data: {
  name: string;
  email: string;
  password: string;
  type: UserType;
  emailConfirmed?: Date;
  phoneNumber?: string;
  documentNumber?: string;
  medicalLicense?: string;
  specialty?: Specialty;
  active?: boolean;
  birthDate?: Date;
  observation?: string;
}): Promise<string | null> {
  try {
    const cleanedUserObject = removingNullValues({
      name: data.name,
      email: data.email,
      emailConfirmed: data.emailConfirmed,
      password: data.password,
      type: data.type,
      createdAt: new Date(),
      active: true,
      phoneNumber: data.phoneNumber,
      documentNumber: data.documentNumber,
      medicalLicense: data.medicalLicense,
      specialty: data.specialty,
      birthDate: data.birthDate,
      observation: data.observation,
    });
    const id = await insertOne(COLLECTION, {
      ...cleanedUserObject
    });

    return id;
  } catch (error) {
    throw {
      message: "error while storing user",
      error,
      data,
    };
  }
}

export async function update(data: {
  id: string;
  name?: string;
  email?: string;
  type?: UserType;
  phoneNumber?: string;
  documentNumber?: string;
  medicalLicense?: string;
  specialty?: Specialty;
  active?: boolean;
  birthDate?: Date;
  observation?: string;
}): Promise<boolean> {
  try {
    const cleanedUserObject = removingNullValues({
      name: data.name,
      email: data.email,
      type: data.type,
      phoneNumber: data.phoneNumber,
      documentNumber: data.documentNumber,
      medicalLicense: data.medicalLicense,
      active: data.active,
      specialty: data.specialty,
      birthDate: data.birthDate,
      observation: data.observation,
    });
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(data.id) },
      {
        ...cleanedUserObject,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update user",
      error,
      data,
    };
  }
}

export async function updateType(id: string, type: UserType): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(id) },
      {
        type,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update user type",
      error,
      data: { id, type },
    };
  }
}

export async function updateActiveState(
  id: string,
  active: boolean
): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(id) },
      {
        active,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update user active state",
      error,
      data: { id, active },
    };
  }
}

export async function updateEmailConfirmedState(
  id: string,
  emailConfirmed: Date
): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(id) },
      {
        emailConfirmed,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update user",
      error,
      data: { id, emailConfirmed },
    };
  }
}

export async function updatePassword(
  id: string,
  password: string
): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(id) },
      {
        password,
        updatedAt: new Date(),
      }
    );

    return response;
  } catch (error) {
    throw {
      message: "error at update user password",
      error,
    };
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, {
      _id: new ObjectId(id),
    });

    return response;
  } catch (error) {
    throw {
      message: "error at remove patient",
      error,
      id,
    };
  }
}

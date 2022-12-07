import logger from "../../utils/logger";
import { createHash, validateHash } from "../../utils/crypt";
import {
  listLimit,
  read,
  readByEmail,
  readByField,
  store,
  update,
  updateType,
  updateActiveState,
  updateEmailConfirmedState,
  updatePassword,
  remove,
} from "./user.repository";
import {
  SigninUserResponse,
  Specialty,
  User,
  UserDTO,
  UserType,
} from "./user.types";
import { createToken } from "../../utils/token";
import { TokenUserPayload } from "../../utils/token/types";

export async function getAllUsers(): Promise<User[]> {
  const log = logger.child({
    func: "getAllUsers",
  });
  try {
    const users = await listLimit({}, 50);

    return makeUserListResponse(users);
  } catch (error) {
    log.error("error getting all users", error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const log = logger.child({
    func: "getUserById",
    data: { id },
  });
  try {
    const user = await read(id);
    if (user) {
      return makeUserResponse(user);
    }
    return null;
  } catch (error) {
    log.error("error getting user by id", error);
    throw error;
  }
}

export async function signinUser(
  email: string,
  password: string
): Promise<SigninUserResponse | null> {
  const log = logger.child({
    func: "confirmUserEmail",
    data: { email },
  });
  try {
    const existingUser = await readByEmail(email);

    if (existingUser) {
      const validation = await validateHash(password, existingUser.password);

      if (validation) {
        const tokenUserPayload: TokenUserPayload = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          type: existingUser.type,
          emailConfirmed: existingUser.emailConfirmed,
        };
        const token = await createToken(tokenUserPayload);

        return {
          ...tokenUserPayload,
          token,
        };
      }
    }

    return {} as SigninUserResponse;
  } catch (error) {
    log.error("error logging user", error);
    throw error;
  }
}

export async function confirmUserEmail(id: string): Promise<boolean> {
  const log = logger.child({
    func: "confirmUserEmail",
    data: { id },
  });

  try {
    const emailConfirm = new Date();
    const result = await updateEmailConfirmedState(id, emailConfirm);

    if (result) return result;
    else throw result;
  } catch (error) {
    log.error("error on updating user", { error });
    throw error;
  }
}

export async function getUsersByField(
  data: string | number | boolean,
  field: string
): Promise<User[] | null> {
  const log = logger.child({
    func: "getUsersByField",
    data: { data, field },
  });

  try {
    const users = await readByField(data, field, 50);

    if (users) {
      return makeUserListResponse(users);
    }
    return null;
  } catch (error) {
    log.error("error getting user by field", { error });
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const log = logger.child({
    func: "getUserByEmail",
    data: { email },
  });

  try {
    const user = await readByEmail(email);

    if (user) {
      return makeUserResponse(user);
    }
    return null;
  } catch (error) {
    log.error("error getting user by field", { error });
    throw error;
  }
}

export async function getUserToken(
  user: User,
  expMilli?: number
): Promise<string> {
  const log = logger.child({
    func: "users.model.getUserToken",
    data: { user, expMilli },
  });

  try {
    const tokenUserPayload: TokenUserPayload = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      type: user.type,
      emailConfirmed: undefined,
    };

    const token = await createToken(tokenUserPayload, { exp: expMilli });
    return token;
  } catch (error) {
    log.error("error on getting user token", { error });
    throw error;
  }
}

export async function createUser(data: {
  name: string;
  email: string;
  type: UserType;
  password?: string;
  phoneNumber?: string;
  documentNumber?: string;
  medicalLicense?: string;
  specialty?: Specialty;
  active?: boolean;
  birthDate?: Date;
  observation?: string;
}): Promise<string | null> {
  const log = logger.child({
    func: "createUser",
    data,
  });

  try {
    const existingUser = await readByEmail(data.email);

    if (existingUser) {
      return "existing";
    } else {
      const password = data.password ? await createHash(data.password) : await createHash("Mudar@123");
      const response = await store({ ...data, password });

      return response;
    }
  } catch (error) {
    log.error("error creating user", error);
    throw error;
  }
}

export async function updateUser(data: {
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
  const log = logger.child({
    func: "updateUser",
    data,
  });
  try {
    const ok = await update(data);
    return ok;
  } catch (error) {
    log.error("error updating user", error);
    throw error;
  }
}

export async function updateUserActiveState(
  id: string,
  active: boolean
): Promise<boolean> {
  const log = logger.child({
    func: "updateUserActiveState",
    data: { id, active },
  });
  try {
    const ok = await updateActiveState(id, active);
    return ok;
  } catch (error) {
    log.error("error updating user", error);
    throw error;
  }
}

export async function updateUserType(
  id: string,
  type: UserType
): Promise<boolean> {
  const log = logger.child({
    func: "updateUserType",
    data: { id, type },
  });
  try {
    const ok = await updateType(id, type);
    return ok;
  } catch (error) {
    log.error("error updating user type", error);
    throw error;
  }
}

export async function updateUserPassword(
  id: string,
  password: string
): Promise<boolean> {
  const log = logger.child({
    func: "updateUserPassword",
    data: { id },
  });
  try {
    const hashedPassword = await createHash(password)
    const ok = await updatePassword(id, hashedPassword);
    return ok;
  } catch (error) {
    log.error("error updating user password", error);
    throw error;
  }
}

export async function removeUser(id: string): Promise<boolean> {
  const log = logger.child({
    func: "removeUser",
    data: { id },
  });
  try {
    const ok = await remove(id);
    return ok;
  } catch (error) {
    log.error("error removing user", error);
    throw error;
  }
}

function makeUserResponse(user: UserDTO): User {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
    emailConfirmed: user.emailConfirmed,
    phoneNumber: user.phoneNumber,
    documentNumber: user.documentNumber,
    medicalLicense: user.medicalLicense,
    specialty: user.specialty,
    active: user.active,
    birthDate: user.birthDate,
    observation: user.observation,
  };
}

function makeUserListResponse(users: UserDTO[]): User[] {
  return users.map<User>((user) => makeUserResponse(user));
}

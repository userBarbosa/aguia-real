import logger from '../../utils/logger';
import { createHash, validateHash } from '../../utils/crypt';
import { list, read, readByEmail, readByField, remove, store, update, updateEmailConfirm, updatePassword, updateType } from './user.repository';
import { SigninUserResponse, User, UserDTO, UserType } from './user.types';
import { createToken } from '../../utils/token';
import { TokenUserPayload } from '../../utils/token/types';

export async function getAllUsers(): Promise<User[]> {
  const users = await list()

  return makeUserListResponse(users)
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await read({id})

  return user ?
    makeUserResponse(user)
    : null
}

export async function signinUser(email: string, password: string): Promise<SigninUserResponse | null> {
  try {
    const existingUser = await readByEmail({email})

    if (existingUser) {
      const validation = await validateHash(password, existingUser.password)

      if (validation) {
        const tokenUserPayload: TokenUserPayload = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          type: existingUser.type,
          emailConfirmed: existingUser.emailConfirmed
        }
        const token = await createToken(tokenUserPayload)

        return { 
          ...tokenUserPayload,
          token
        }
      } 
    } 

    return {} as SigninUserResponse
  } catch (error) {
    logger.error('Error logging user', error)
  }

  return null
}

export async function confirmUserEmail(data: {
  id: string,
}): Promise<boolean> {
  const log = logger.child({ func: "users.model.confirmUserEmail", id: data.id })

  try {  
    const result = await updateEmailConfirm({...data, emailConfirm: true})

    if (result) return result
    else throw result
  } catch (error) {
    log.error('Error on updating user', {error})

    throw error
  }
}

export async function getAppointmentsByField(
  data: string | number | boolean,
  field: string
): Promise<User[] | null> {
  const users = await readByField(data, field, 50);

  if (users) {
    return makeUserListResponse(users);
  }
  return null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return null
}

export async function getUserToken(user: User, expMilli?: number): Promise<string> {
  const log = logger.child({ func: 'users.model.getUserToken', user, expMilli })

  try {
    const tokenUserPayload: TokenUserPayload = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      type: user.type,
      emailConfirmed: undefined
    }
  
    const token = await createToken(tokenUserPayload, {exp: expMilli})
  
    return token
  } catch (error) {
    log.error("Error on getting user token", {error})

    throw error
  }
}

export async function createUser(data: {
  name: string,
  email: string,
  password: string,
  type: UserType,
}): Promise<string | null> {
  try {
    const existingUser = await readByEmail({email: data.email})

    if (existingUser) {
      return 'existing'
    } else {
      const password = await createHash(data.password)
      const response = await store({...data, password})
    
      return response
    }
  } catch (error) {
    logger.error('Error creating user', error)
  }

  return null
}

export async function updateUser(data: {
  id: string,
  name: string,
}): Promise<boolean> {
  try {  
    return await update(data)
  } catch (error) {
    logger.error('Error updating user', error)
  }

  return false
}

export async function updateUserType(data: { id: string, type: UserType }): Promise<boolean> {
  try {
    return await updateType(data)
  } catch (error) {
    logger.error('Error updating user type', error)
  }

  return false
}

export async function updateUserPassword(data: { id: string, password: string }): Promise<boolean> {
  try {
    return await updatePassword(data)
  } catch (error) {
    logger.error('Error updating user password', error)
  }

  return false
}

export async function removeUser(data: { id: string }): Promise<boolean> {
  try {
    return await remove(data)
  } catch (error) {
    logger.error('Error removing user', error)
  }

  return false
}

function makeUserListResponse(users: UserDTO[]): User[] {
  return users.map<User>(user => makeUserResponse(user))
}

function makeUserResponse(user: UserDTO): User {
  return { 
    id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
  }
}
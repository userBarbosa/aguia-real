import { GenericDTO } from '../../services/database/mongodb/types'

export type SigninUserResponse = {
  id: string,
  name: string,
  email: string,
  type: UserType,
  token: string,
};

export type UserDTO = {
  id: string,
  name: string,
  email: string,
  password: string,
  type: UserType,
} & GenericDTO;

export type User = {
  id?: string,
  name: string,
  email: string,
  type: UserType,
  password?: string,
  phoneNumber?: string,
  documentNumber?: string,
  medicalLicense?: string,
  specialty?: Specialty,
  active?: boolean,
  birthDate?: Date,
};

export enum UserType {
  ADMIN='admin',
  DOCTOR='doctor',
  ASSISTANT='assistant'
};

export enum Specialty {
  cat = 1,
  dog = 2,
  bird = 4,
  fish = 8, 
  rodent = 16,
  reptile = 32,
  wild = 64,
  farm = 128,
  marine = 256,
};
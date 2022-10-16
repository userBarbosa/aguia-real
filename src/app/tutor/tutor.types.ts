import { GenericDTO } from '../../services/database/mongodb/types'

export type Tutor = {
    id?: string;
    name: string;
    documentNumber: string;
    phoneNumber: string;
    observation?:string;
    patientsName: Array<string>;
    address: Address;
};

export type TutorDTO = {
    id: string;
    documentNumber: string;
} & GenericDTO;

export type Address = {
    zipCode: string;
    state: string;
    city: string;
    neighbourhood: string;
    streetName: string;
    number: string;
    complement: string;
};
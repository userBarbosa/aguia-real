import { GenericDTO } from '../../services/database/mongodb/types'

export type Patient = {
    id?: string;
    tutorId: string;
    name: string;
    bloodType?: string;
    observation?: string;
    species: Species;
    allergy?: Allergy;
    sex: Sex;
    birthDate: Date;
    onTreatment?: boolean;
};

export type PatientDTO = {
    id: string,
    tutorId: string;
    species: string;
} & GenericDTO;

export enum Species {
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

export enum Allergy {
    fleaAllergy = 1,
    skinAllergy = 2,
    foodAllergy = 4,
    medAllergy = 8,
    others = 16,
};

export enum Sex {
    female = 1,
    male = 2,
};
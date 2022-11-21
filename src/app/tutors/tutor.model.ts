import { Tutor, TutorDTO } from "./tutor.types";

export async function getTutorById(id: string): Promise<Tutor | null> {
  return null;
}

export async function getAllTutors(query: {}, limit: number): Promise<Tutor[]> {
  return [];
}

export async function getTutorsByField(
  data: string | number | boolean,
  field: string
): Promise<Tutor[] | null> {
  return null;
}
export async function getTutorsByTutorId(id: string): Promise<Tutor | null> {
  return null;
}

export async function createTutor(data: {}): Promise<string | null> {
  return "";
}

export async function updateTutorObservationRouteObservation(data: {}): Promise<
  string | null
> {
  return "";
}

export async function deleteTutor(data: {}): Promise<string | null> {
  return "";
}

function makeTutorResponse(tutor: TutorDTO): Tutor {
  return {
    name: tutor.name,
    documentNumber: tutor.documentNumber,
    phoneNumber: tutor.phoneNumber,
    observation: tutor.observation,
    patientsName: tutor.patientsName,
    address: tutor.address,
  };
}

function makeTutorListResponse(tutors: TutorDTO[]): Tutor[] {
  return tutors.map<Tutor>((tutor) => makeTutorResponse(tutor));
}

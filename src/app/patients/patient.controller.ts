import { Request, Response } from "express";
import logger from "../../utils/logger";
import {
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import {
  getPatientById,
  getAllPatients,
  getPatientsByField,
  getPatientsByTutorId,
  createPatient,
  updatePatient,
  deletePatient,
} from "./patient.model";
import { translateData } from "../utilities/utility.controller";

export async function getPatientByIdRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const patient = await getPatientById(id);

      if (patient) {
        SuccessResponse(res, patient);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Paciente não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAllPatientsRoute(req: Request, res: Response) {
  try {
    const limit = req.query ? Number(req.query.limit) : 50;
    const list = await getAllPatients({}, limit);
    SuccessResponse(res, list);
  } catch (error) {
    logger.error("Error getting patient list", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getPatientsByFieldRoute(req: Request, res: Response) {
  try {
    let { data, field } = req.query;

    if (!data || !field) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      field = String(field);
      data = String(data);

      const translatedData = translateData(data);

      const patient = await getPatientsByField(translatedData, field);

      if (patient) {
        SuccessResponse(res, patient);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Agendamento não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getPatientsByTutorRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const patient = await getPatientsByTutorId(id);

      if (patient) {
        SuccessResponse(res, patient);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Paciente não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function createPatientRoute(req: Request, res: Response) {
  try {
    const {
      tutorId,
      name,
      bloodType,
      observation,
      species,
      allergy,
      sex,
      onTreatment,
      weight,
    } = req.body;
    let { birthDate } = req.body;
    if (!tutorId || !name || !species || !sex || !birthDate || !weight) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      birthDate = new Date(birthDate);
      const id = await createPatient({
        tutorId,
        name,
        bloodType,
        observation,
        species,
        allergy,
        sex,
        onTreatment,
        birthDate,
        weight,
      });

      if (id) {
        if (id !== "already exists") {
          SuccessResponse(res, { id });
        } else {
          const error = { message: "already exists" };
          logger.error("error creating an patient", error);
          ErrorResponse(res, ErrorType.Forbidden, error);
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    logger.error("error creating an patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updatePatientRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      tutorId,
      name,
      species,
      sex,
      bloodType,
      observation,
      allergy,
      onTreatment,
      weight,
    } = req.body;
    let { birthDate } = req.body;

    if (!id || !tutorId || !name || !species || !sex || !birthDate || !weight) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      birthDate = new Date(birthDate);

      const updated = await updatePatient({
        id,
        tutorId,
        name,
        species,
        sex,
        bloodType,
        observation,
        allergy,
        birthDate,
        onTreatment,
        weight
      });
      if (updated) {
        SuccessResponse(res, updated);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error updating patient",
          patientId: id,
        });
      }
    }
  } catch (error) {
    logger.error("error updating patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function deletePatientRoute(req: Request, res: Response) {
  try {
    const { id, tutorId } = req.params;
    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const deleted = await deletePatient(id, tutorId);
      if (deleted) {
        SuccessResponse(res, deleted);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error deleting patient",
          patientId: id,
        });
      }
    }
  } catch (error) {
    logger.error("error deleting patient", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

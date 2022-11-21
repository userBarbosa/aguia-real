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
  updatePatientObservationRouteObservation,
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
          msg: "Paciente não encontrado",
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
          msg: "Agendamento não encontrado",
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
          msg: "Paciente não encontrado",
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
    } = req.body;
    let { birthDate } = req.body;
    if (!tutorId || !name || !species || !sex || !birthDate) {
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
      });

      if (id) {
        if (id !== "already exists") {
          SuccessResponse(res, { id });
        } else {
          const error = { msg: "already exists" };
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

export async function updatePatientObservationRoute(
  req: Request,
  res: Response
) {
  await updatePatientObservationRouteObservation({});
  SuccessResponse(res, 200);
}

export async function deletePatientRoute(req: Request, res: Response) {
  const id = ""
  await deletePatient(id);
  SuccessResponse(res, 200);
}

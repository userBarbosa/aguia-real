import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';
import { translateData } from '../utilities/utility.controller';
import { getTutorById, getAllTutors, getTutorsByField, getTutorsByTutorId, createTutor, updateTutorObservationRouteObservation, deleteTutor } from './tutor.model';

export async function getTutorByIdRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const tutor = await getTutorById(id);

      if (tutor) {
        SuccessResponse(res, tutor);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          msg: "Paciente não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAllTutorsRoute(req: Request, res: Response) {
  try {
    const limit = req.query ? Number(req.query.limit) : 50;
    const list = await getAllTutors({}, limit);
    SuccessResponse(res, list);
  } catch (error) {
    logger.error("Error getting tutor list", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getTutorsByFieldRoute(req: Request, res: Response) {
  try {
    let { data, field } = req.query;

    if (!data || !field) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      field = String(field);
      data = String(data);

      const translatedData = translateData(data);

      const tutor = await getTutorsByField(translatedData, field);

      if (tutor) {
        SuccessResponse(res, tutor);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          msg: "Agendamento não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getTutorsByTutorRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const tutor = await getTutorsByTutorId(id);

      if (tutor) {
        SuccessResponse(res, tutor);
      } else {
        ErrorResponse(res, ErrorType.NotFound, {
          msg: "Paciente não encontrado",
        });
      }
    }
  } catch (error) {
    logger.error("Error getting an tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function createTutorRoute(req: Request, res: Response) {
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
      const id = await createTutor({
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
          logger.error("error creating an tutor", error);
          ErrorResponse(res, ErrorType.Forbidden, error);
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    logger.error("error creating an tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateTutorObservationRoute(
  req: Request,
  res: Response
) {
  await updateTutorObservationRouteObservation({});
  SuccessResponse(res, 200);
}

export async function deleteTutorRoute(req: Request, res: Response) {
  const id = ""
  await deleteTutor(id);
  SuccessResponse(res, 200);
}

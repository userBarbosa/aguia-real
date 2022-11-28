import { Request, Response } from "express";
import logger from "../../utils/logger";
import {
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import { translateData } from "../utilities/utility.controller";
import {
  getTutorById,
  getAllTutors,
  getTutorsByField,
  createTutor,
  updateTutor,
  deleteTutor,
} from "./tutor.model";

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
          msg: "Tutor não encontrado",
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
          msg: "Tutor não encontrado",
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
    const { name, documentNumber, phoneNumber, observation, address } =
      req.body;
    if (!name || !documentNumber || !phoneNumber || !observation || !address) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      const id = await createTutor({
        name,
        documentNumber,
        phoneNumber,
        observation,
        address,
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

export async function updateTutorRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, documentNumber, phoneNumber, observation, address } =
      req.body;

    if (!id || !name || !documentNumber || !phoneNumber || !address) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      const updated = await updateTutor({
        id,
        name,
        documentNumber,
        phoneNumber,
        observation,
        address,
      });
      if (updated) {
        SuccessResponse(res, 200);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          msg: "error updating tutor",
          id,
        });
      }
    }
  } catch (error) {
    logger.error("error updating tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function deleteTutorRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const deleted = await deleteTutor(id);
      if (deleted) {
        SuccessResponse(res, 200);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          msg: "error deleting tutor",
          id,
        });
      }
    }
  } catch (error) {
    logger.error("error deleting tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function deletePatientFromTutor(req: Request, res: Response) {}
export async function insertPatientFromTutor(req: Request, res: Response) {}

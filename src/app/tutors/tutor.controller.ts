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
  removePatientFromTutorArray,
  insertPatientOnTutorArray,
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
          message: "Tutor não encontrado",
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
          message: "Tutor não encontrado",
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
    const { name, email, documentNumber, phoneNumber, observation, address } =
      req.body;
    if (!name || !email || !documentNumber || !phoneNumber || !address) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      const id = await createTutor({
        name,
        email,
        documentNumber,
        phoneNumber,
        observation,
        address,
      });

      if (id) {
        if (id !== "already exists") {
          SuccessResponse(res, { id });
        } else {
          const error = { message: "already exists" };
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
    const { name, email, documentNumber, phoneNumber, observation, address } =
      req.body;

    if (!id || !name || !email || !documentNumber || !phoneNumber || !address) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      const updated = await updateTutor({
        id,
        name,
        email,
        documentNumber,
        phoneNumber,
        observation,
        address,
      });
      if (updated) {
        SuccessResponse(res, updated);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error updating tutor",
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
        SuccessResponse(res, deleted);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error deleting tutor",
          id,
        });
      }
    }
  } catch (error) {
    logger.error("error deleting tutor", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function deletePatientFromTutor(req: Request, res: Response) {
  try {
    const { id, patientId } = req.params;
    if (!id || !patientId) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await removePatientFromTutorArray(id, patientId);
      if (ok) {
        if (ok !== "patient not found") {
          SuccessResponse(res, ok);
        } else {
          const error = { message: "patient not found" };
          logger.error("error trying removing patient from tutor array", error);
          ErrorResponse(res, ErrorType.Forbidden, error);
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error trying removing patient from tutor array",
          id,
          patientId,
        });
      }
    }
  } catch (error) {
    logger.error("error trying removing patient from tutor array", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function insertPatientFromTutor(req: Request, res: Response) {
  try {
    const { id, patientId } = req.params;
    if (!id || !patientId) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const response = await insertPatientOnTutorArray(id, patientId);
      if (response) {
        SuccessResponse(res, response);
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error trying inserting patient on tutor array",
          id,
          patientId,
        });
      }
    }
  } catch (error) {
    logger.error("error trying inserting patient on tutor array", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

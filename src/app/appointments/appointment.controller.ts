import { Request, Response } from "express";
import logger from "../../utils/logger";
import {
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  getAppointmentsByField,
  getAppointmentsByForeignId,
  updateAppointmentState,
  updateAppointment,
  deleteAppointment,
  insertDiagnosticAndAppState,
  isReserved,
} from "./appointment.model";
import { translateData } from "../utilities/utility.controller";

export async function getAppointmentByIdRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getAppointmentByIdRoute - controller" });
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const appointment = await getAppointmentById(id);

      if (appointment) {
        SuccessResponse(res, appointment);
      } else {
        log.error("error getting an appointment", { id });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Agendamento não encontrado",
        });
      }
    }
  } catch (error) {
    log.error("error getting an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAllAppointmentsRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getAllAppointmentsRoute - controller" });
  try {
    const limit = req.query ? Number(req.query.limit) : 50;
    const list = await getAllAppointments({}, limit);
    // if (list.length > 0) {
    SuccessResponse(res, list);
    // }
  } catch (error) {
    log.error("error getting appointment list", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAppointmentsByFieldRoute(req: Request, res: Response) {
  const log = logger.child({
    func: "getAppointmentsByFieldRoute - controller",
  });
  try {
    let { data, field } = req.query;

    if (!data || !field) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      field = String(field);
      data = String(data);

      const translatedData = translateData(data);

      const appointment = await getAppointmentsByField(translatedData, field);

      if (appointment) {
        SuccessResponse(res, appointment);
      } else {
        log.error("error getting an appointment", { data, field });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Agendamento não encontrado",
        });
      }
    }
  } catch (error) {
    log.error("error getting an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAppointmentsByForeignIdRoute(
  req: Request,
  res: Response
) {
  const log = logger.child({
    func: "getAppointmentsByForeignIdRoute - controller",
  });
  try {
    let { id, field } = req.query;

    if (!id || !field) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      id = String(id);
      field = String(field);
      const appointment = await getAppointmentsByForeignId(id, field);

      if (appointment) {
        SuccessResponse(res, appointment);
      } else {
        log.error("error getting an appointment", { id, field });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Agendamento não encontrado",
        });
      }
    }
  } catch (error: unknown) {
    log.error("error getting an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getAppointmentsInDateRangeRoute(
  req: Request,
  res: Response
) {
  const log = logger.child({
    func: "getAppointmentsInDateRangeRoute - controller",
  });
  log.error("error getting an appointment", {});
  SuccessResponse(res, 200);
}

export async function createAppointmentRoute(req: Request, res: Response) {
  const log = logger.child({ func: "createAppointmentRoute - controller" });
  try {
    const {
      patientId,
      ownerId,
      diagnostic,
      employeeId,
      appointmentState,
      paymentMethod,
      reason,
      value,
      observation,
    } = req.body;
    let { date } = req.body;
    if (
      !patientId ||
      !ownerId ||
      !employeeId ||
      !appointmentState ||
      !paymentMethod ||
      !reason ||
      !date
    ) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      date = new Date(date);
      const id = await createAppointment({
        patientId,
        ownerId,
        diagnostic,
        employeeId,
        appointmentState,
        observation,
        paymentMethod,
        reason,
        value,
        date,
      });

      if (id) {
        if (id !== "already reserved") {
          SuccessResponse(res, { id });
        } else {
          const error = { message: "already reserved" };
          log.error("error creating an appointment", error);
          ErrorResponse(res, ErrorType.Forbidden, error);
        }
      } else {
        log.error("error creating an appointment", { data: req.body });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error creating an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateAppointmentStateRoute(req: Request, res: Response) {
  const log = logger.child({
    func: "updateAppointmentStateRoute - controller",
  });
  try {
    const { id } = req.params;
    const { appointmentState } = req.body;
    if (!id || !appointmentState) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const response = await updateAppointmentState(id, appointmentState);

      if (response) {
        SuccessResponse(res, true);
      } else {
        log.error("error creating an appointment", { id, appointmentState });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error updating appointment state",
          appId: id,
        });
      }
    }
  } catch (error) {
    log.error("error updating an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function finishAppointment(req: Request, res: Response) {
  const log = logger.child({ func: "finishAppointment - controller" });
  try {
    const { id } = req.params;
    const { appointmentState, diagnostic } = req.body;
    if (!id || !appointmentState || !diagnostic) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const response = await insertDiagnosticAndAppState({
        id,
        appointmentState,
        diagnostic,
      });

      if (response) {
        SuccessResponse(res, true);
      } else {
        log.error("error creating an appointment", {
          data: { id, appointmentState, diagnostic },
        });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error updating appointment state",
          appId: id,
        });
      }
    }
  } catch (error) {
    log.error("error updating an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateAppointmentRoute(req: Request, res: Response) {
  const log = logger.child({ func: "updateAppointmentRoute - controller" });
  try {
    const { id } = req.params;
    const {
      employeeId,
      appointmentState,
      paymentMethod,
      reason,
      value,
      observation,
    } = req.body;
    let { date } = req.body;

    if (
      !id ||
      !employeeId ||
      !appointmentState ||
      !paymentMethod ||
      !reason ||
      !date
    ) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      date = new Date(date);
      const updated = await updateAppointment({
        id,
        employeeId,
        appointmentState,
        paymentMethod,
        reason,
        value,
        observation,
        date,
      });
      if (updated) {
        SuccessResponse(res, true);
      } else {
        log.error("error updating an appointment", {
          data: { ...req.body, id },
        });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error updating appointment",
          appId: id,
        });
      }
    }
  } catch (error) {
    log.error("error updating an appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function deleteAppointmentRoute(req: Request, res: Response) {
  const log = logger.child({ func: "deleteAppointmentRoute - controller" });
  try {
    const { id } = req.params;
    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const deleted = await deleteAppointment(id);
      if (deleted) {
        SuccessResponse(res, deleted);
      } else {
        log.error("error deleting appointment", { id });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "error deleting appointment",
          appId: id,
        });
      }
    }
  } catch (error) {
    log.error("error deleting appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function isReservedRoute(req: Request, res: Response) {
  const log = logger.child({ func: "isReservedRoute - controller" });
  try {
    const { patientId, employeeId, timeDate } = req.params;
    if (!timeDate || (!patientId && !employeeId)) {
      ErrorResponse(res, ErrorType.BadRequest, { error: "missing property" });
    } else {
      const tratedTimeDate = new Date(timeDate);
      const reserved = await isReserved(tratedTimeDate, patientId, employeeId);
      SuccessResponse(res, { reserved });
    }
  } catch (error) {
    log.error("error getting reserved appointment", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

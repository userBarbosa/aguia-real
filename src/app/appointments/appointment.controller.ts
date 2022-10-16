import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';
import { RequestWithToken } from '../../utils/token/types';
import { createAppointment, getAppointmentById, getAllAppointments } from './appointment.model';

export async function getAppointmentByIdRoute(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const appointment = await getAppointmentById(id);
      
      if (appointment) {
        SuccessResponse(res, appointment)
      } else {
        ErrorResponse(res, ErrorType.NotFound, { msg: "Agendamento não encontrado" })
      }
    }
  } catch (error) {
    logger.error('Error getting an appointment', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function getAllAppointmentsRoute(req: Request, res: Response) {
  try {
    const limit = req.query ? Number(req.query.limit) : 50;
    const list = await getAllAppointments({}, limit);
    // if (list.length > 0) {
      SuccessResponse(res, list);
    // }
  } catch (error) {
    logger.error('Error getting appointment list', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function getNextAppointmentRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function getAppointmentsByFieldRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function getAppointmentsBySingleIdRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function getAppointmentsInDateRangeRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function createAppointmentRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function updateAppointmentStateRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function updateAppointmentObservationRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function deleteAppointmentRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function isReservedRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}
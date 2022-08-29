import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';
import { RequestWithToken } from '../../utils/token/types';
import { createAppointment } from './appointment.model';

export async function getAppointmentByIdRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}

export async function getAllAppointmentsRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
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
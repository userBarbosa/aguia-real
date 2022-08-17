import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';
import { RequestWithToken } from '../../utils/token/types';
import { getAppointmentById } from './appointment.model';

export async function getAppointmentByIdRoute(req: Request, res: Response) {}
export async function getAllAppointmentsRoute(req: Request, res: Response) {}
export async function createAppointmentRoute(req: Request, res: Response) {}
export async function updateAppointmentRoute(req: Request, res: Response) {}
export async function removeAppointmentRoute(req: Request, res: Response) {}
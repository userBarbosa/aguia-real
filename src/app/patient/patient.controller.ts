import { Request, Response } from 'express';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';

export async function getPatientByIdRoute(req: Request, res: Response) {
  SuccessResponse(res, 200);
}
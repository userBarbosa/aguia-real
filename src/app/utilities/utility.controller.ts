import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';

export async function healthCheck(req: Request, res: Response) {
  logger.info("health check")
  SuccessResponse(res, { status: "everything alright" })
}

export function translateData(data: string): number | string | boolean {
  if (data === "true" || data === "false") {
    return Boolean(data);
  } else if (!data.match(/\D/) && parseInt(data)) {
    return parseInt(data);
  } else {
    return data;
  }
}

export function removingNullValues(objectToClean: Record<string, any>) : Object {
  let cleanedObject: Record<string, any> = {};
  Object.keys(objectToClean).forEach(key => {
    if (objectToClean[key] !== null) {
      cleanedObject[key] = objectToClean[key];
    }
  })
  return cleanedObject;
}
import { Request } from 'express';
import { UserType } from '../../app/users/user.types';

export type TokenUserPayload = { id: string, name: string, email: string, type: UserType, emailConfirmed: Date | undefined }
export type RequestWithToken = Request & { user: TokenUserPayload }
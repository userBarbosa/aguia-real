import { Request, Response } from 'express';
import { MailingType, sendEmail } from '../../services/mailing';
import logger from '../../utils/logger';
import { ErrorResponse, ErrorType, SuccessResponse } from '../../utils/response';
import { RequestWithToken } from '../../utils/token/types';
import { createUser, getAllUsers, getUserById, removeUser, signinUser, updateUser, updateUserPassword, updateUserType, confirmUserEmail, getUserByEmail, getUserToken } from './user.model';

export async function getAllUsersRoute(req: Request, res: Response) {
  try {
    const userList = await getAllUsers()

    SuccessResponse(res, userList)
  } catch (error) {
    logger.error('Error getting all users', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function getUserByIdRoute(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const user = await getUserById(id)

      if (user) {
        SuccessResponse(res, user)
      } else {
        ErrorResponse(res, ErrorType.NotFound, { message: "Usuário não encontrado" })
      }

    }
  } catch (error) {
    logger.error('Error getting an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function signinUserRoute(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const user = await signinUser(email, password)

      if (user) {
        if (user.id) {
          SuccessResponse(res, { user })
        } else {
          ErrorResponse(res, ErrorType.Forbidden, { message: "Credenciais incorretas" })
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    logger.error('Error singing user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function createUserRoute(req: Request, res: Response) {
  try {
    const { name, email, password, type } = req.body

    if (!name || !email || !password || !type) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const id = await createUser({
        name,
        email,
        password,
        type
      })

      if (id) {
        if (id !== "existing") {
          SuccessResponse(res, { id })
        } else {
          const error = { user: id }
          logger.error('Error creating an user', error)
          ErrorResponse(res, ErrorType.Forbidden, error)
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    logger.error('Error creating an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function confirmAccountRoute(req: Request, res: Response) {
  const log = logger.child({ func: 'users.controller.confirmAccountRoute' })

  try {
    const { id } = (req as RequestWithToken).user

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const result = await confirmUserEmail({ id })

      if (result) {
        SuccessResponse(res, { message: "Conta confirmada com sucesso" })
      } else {
        log.error('Error on confirming an user email', {id})
        ErrorResponse(res, ErrorType.InternalServerError, {message: "Ocorreu um erro ao confirmar a conta"})
      }
    }
  } catch (error) {
    log.error('Error on creating an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function requestNewPasswordRoute(req: Request, res: Response) {
  const log = logger.child({ func: 'users.controller.requestNewPasswordRoute' })

  try {
    const { email } = req.body

    if (!email) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const user = await getUserByEmail(email)
      
      if (user) {
        const token = await getUserToken(user, 1000 * 60 * 60 * 3)

        await sendEmail(
          [user.email],
          'Redefinição de senha solicitada',
          MailingType.PASSWORD,
          { user, token }
        )

        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    log.error('Error on creating an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function resetPasswordRoute(req: Request, res: Response) {
  const log = logger.child({ func: 'users.controller.requestNewPasswordRoute' })

  try {
    const { id } = (req as RequestWithToken).user
    const { password } = req.body

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const ok = await updateUserPassword({ id, password })
      
      if (ok) {
        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    log.error('Error on creating an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function updateUserRoute(req: Request, res: Response) {
  try {
    const { user, body } = req as RequestWithToken
    const { name } = body

    if (!name) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const ok = await updateUser({ id: user.id, name })

      if (ok) {
        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError, { message: "Ocorreu um erro durante a atualização do usuário" })
      }
    }
  } catch (error) {
    logger.error('Error update an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function updateUserTypeRoute(req: Request, res: Response) {
  try {
    const { user, body } = req as RequestWithToken
    const { type } = body

    if (!type) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const ok = await updateUserType({ id: user.id, type })

      if (ok) {
        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    logger.error('Error update an user type', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function updateUserPasswordRoute(req: Request, res: Response) {
  try {
    const { user, body } = req as RequestWithToken
    const { password } = body

    if (!password) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const ok = await updateUserPassword({ id: user.id, password })

      if (ok) {
        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    logger.error('Error update an user password', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}

export async function removeUserRoute(req: Request, res: Response) {
  try {
    const { user } = req as RequestWithToken

    if (!user.id) {
      ErrorResponse(res, ErrorType.BadRequest)
    } else {
      const ok = await removeUser({ id: user.id })

      if (ok) {
        SuccessResponse(res, true)
      } else {
        ErrorResponse(res, ErrorType.InternalServerError)
      }
    }
  } catch (error) {
    logger.error('Error removing an user', error)
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error)
  }
}
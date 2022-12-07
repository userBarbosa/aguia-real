import { NextFunction, Request, Response } from "express";
import { MailingType, sendEmail } from "../../services/mailing";
import logger from "../../utils/logger";
import {
  ErrorResponse,
  ErrorType,
  SuccessResponse,
} from "../../utils/response";
import { RequestWithToken } from "../../utils/token/types";
import { translateData } from "../utilities/utility.controller";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUsersByField,
  removeUser,
  signinUser,
  updateUser,
  updateUserPassword,
  updateUserType,
  updateUserActiveState,
  confirmUserEmail,
  getUserByEmail,
  getUserToken,
} from "./user.model";
import { UserType } from "./user.types";

export async function getAllUsersRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getAllUsersRoute - controller" });
  try {
    const userList = await getAllUsers();

    SuccessResponse(res, userList);
  } catch (error) {
    log.error("error getting all users", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getUserByIdRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getUserByIdRoute - controller" });
  try {
    const { id } = req.params;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const user = await getUserById(id);

      if (user) {
        SuccessResponse(res, user);
      } else {
        log.error("error getting user", { id });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Usuário não encontrado",
        });
      }
    }
  } catch (error) {
    log.error("error getting an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getUserByEmailRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getUserByEmailRoute - controller" });
  try {
    const { email } = req.query;

    if (!email) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const user = await getUserByEmail(String(email));

      if (user) {
        SuccessResponse(res, user);
      } else {
        log.error("error getting user", { email });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Usuário não encontrado",
        });
      }
    }
  } catch (error) {
    log.error("error getting an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function getUsersByFieldRoute(req: Request, res: Response) {
  const log = logger.child({ func: "getUsersByFieldRoute - controller" });
  try {
    let { data, field } = req.query;

    if (!data || !field) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      field = String(field);
      data = String(data);

      const translatedData = translateData(data);

      const user = await getUsersByField(translatedData, field);

      if (user) {
        SuccessResponse(res, user);
      } else {
        log.error("error getting user", { field, data });
        ErrorResponse(res, ErrorType.NotFound, {
          message: "Usuário não encontrado",
        });
      }
    }
  } catch (error) {
    log.error("error getting an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function signinUserRoute(req: Request, res: Response) {
  const log = logger.child({ func: "signinUserRoute - controller" });
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const user = await signinUser(email, password);

      if (user) {
        if (user.id) {
          SuccessResponse(res, { user });
        } else {
          log.error("error signing in", { email });
          ErrorResponse(res, ErrorType.Forbidden, {
            message: "Credenciais incorretas",
          });
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error singing user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function createUserRoute(req: Request, res: Response) {
  const log = logger.child({ func: "createUserRoute - controller" });
  try {
    const { name, email, password, type, phoneNumber, documentNumber, medicalLicense, specialty, active, birthDate, observation } = req.body;

    if (!name || !email || !type) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const id = await createUser({
        name,
        email,
        password,
        type,
        phoneNumber,
        documentNumber,
        medicalLicense,
        specialty,
        active,
        birthDate,
        observation
      });

      if (id) {
        if (id !== "existing") {
          const token = await getUserToken(
            { id, name, email, type },
            1000 * 60 * 60 * 3
          );

          await sendEmail(
            [email],
            "Confirme seu e-mail - PetsHealth",
            MailingType.CONFIRM_EMAIL,
            {
              user: { name, email },
              token,
            }
          );
          
          SuccessResponse(res, { id });
        } else {
          const error = { user: id };
          log.error("error creating an user", error);
          ErrorResponse(res, ErrorType.Forbidden, error);
        }
      } else {
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error creating an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function confirmAccountRoute(req: Request, res: Response) {
  const log = logger.child({ func: "confirmAccountRoute - controller" });

  try {
    const { id } = (req as RequestWithToken).user;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const result = await confirmUserEmail(id);

      if (result) {
        SuccessResponse(res, { message: "Conta confirmada com sucesso" });
      } else {
        log.error("error confirming an user email", { id });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "Ocorreu um erro ao confirmar a conta",
        });
      }
    }
  } catch (error) {
    log.error("error confirming an user email", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function requestNewPasswordRoute(req: Request, res: Response) {
  const log = logger.child({ func: "requestNewPasswordRoute - controller" });

  try {
    const { email } = req.body;

    if (!email) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const user = await getUserByEmail(email);

      if (user) {
        const token = await getUserToken(user, 1000 * 60 * 60 * 3);

        await sendEmail(
          [user.email],
          "Redefinição de senha - Pets Health",
          MailingType.REQUEST_NEW_PASSWORD,
          { user, token }
        );

        SuccessResponse(res, true);
      } else {
        log.error("error requesting new password", { email });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error requesting new password", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function resetPasswordRoute(req: Request, res: Response) {
  const log = logger.child({ func: "resetPasswordRoute - controller" });

  try {
    const { id } = (req as RequestWithToken).user;
    const { password } = req.body;

    if (!id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await updateUserPassword(id, password);

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error reseting an user password", { id });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error reseting an user password", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateUserRoute(req: Request, res: Response) {
  const log = logger.child({ func: "updateUserRoute - controller" });

  try {
    const { user, body } = req as RequestWithToken;
    const { name, email, type, phoneNumber, documentNumber, medicalLicense, specialty, active, birthDate, observation } = body;

    if (!name) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await updateUser({ id: user.id, 
        name,
        email,
        type,
        phoneNumber,
        documentNumber,
        medicalLicense,
        specialty,
        active,
        birthDate,
        observation 
      });

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error reseting an user password", { user, name });
        ErrorResponse(res, ErrorType.InternalServerError, {
          message: "Ocorreu um erro durante a atualização do usuário",
        });
      }
    }
  } catch (error) {
    log.error("error update an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateUserTypeRoute(req: Request, res: Response) {
  const log = logger.child({ func: "updateUserTypeRoute - controller" });

  try {
    const { user, body } = req as RequestWithToken;
    const { type } = body;

    if (!type || !isUserType(type)) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await updateUserType(user.id, type);

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error updating user type", { id: user.id, type });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error update an user type", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateUserActiveStateRoute(req: Request, res: Response) {
  const log = logger.child({ func: "updateUserActiveStateRoute - controller" });

  try {
    const { user, body } = req as RequestWithToken;
    const { active } = body;

    if (!active) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await updateUserActiveState(user.id, active);

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error updating user type", { id: user.id, active });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error update an user active state", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function updateUserPasswordRoute(req: Request, res: Response) {
  const log = logger.child({ func: "updateUserPasswordRoute - controller" });

  try {
    const { user, body } = req as RequestWithToken;
    const { password } = body;

    if (!password) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await updateUserPassword(user.id, password);

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error updating an user password", { user });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error update an user password", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function removeUserRoute(req: Request, res: Response) {
  const log = logger.child({ func: "removeUserRoute - controller" });

  try {
    const { user } = req as RequestWithToken;

    if (!user.id) {
      ErrorResponse(res, ErrorType.BadRequest);
    } else {
      const ok = await removeUser(user.id);

      if (ok) {
        SuccessResponse(res, true);
      } else {
        log.error("error removing an user", { user });
        ErrorResponse(res, ErrorType.InternalServerError);
      }
    }
  } catch (error) {
    log.error("error removing an user", error);
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

function isUserType(type: string) {
  switch (type) {
    case UserType.ADMIN:
    case UserType.DOCTOR:
    case UserType.ASSISTANT:
      return true;
    default:
      return false;
  }
}

export async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> {
  const log = logger.child({ func: "isAdmin - controller" });

  try {
    const user = (req as RequestWithToken).user;

    if (user) {
      if (user.type === UserType.ADMIN) {
        return next();
      }
    }

    ErrorResponse(res, ErrorType.NotAuthorized);
  } catch (error) {
    log.error("error on checking if user is admin", { error });
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

export async function canUpdate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> {
  const log = logger.child({ func: "canUpdate - controller" });

  try {
    const user = (req as RequestWithToken).user;
    const { id } = req.params;

    if (user) {
      if (user.type === UserType.ADMIN || user.id === id) {
        return next();
      }
    }

    ErrorResponse(res, ErrorType.NotAuthorized);
  } catch (error) {
    log.error("error on checking if user can update", { error });
    ErrorResponse(res, ErrorType.InternalServerError, {}, error as Error);
  }
}

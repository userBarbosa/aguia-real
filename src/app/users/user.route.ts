import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  isAdmin,
  canUpdate,
  createUserRoute,
  getAllUsersRoute,
  getUserByIdRoute,
  removeUserRoute,
  signinUserRoute,
  updateUserPasswordRoute,
  updateUserRoute,
  updateUserTypeRoute,
  getUserByEmailRoute,
  getUsersByFieldRoute,
  confirmAccountRoute,
  requestNewPasswordRoute,
  resetPasswordRoute,
  updateUserActiveStateRoute,
} from "./user.controller";

const userRouter = Router();
const basePath = "/users";


userRouter.get(`${basePath}/confirmaccount`, validateTokenMiddleware, confirmAccountRoute);
userRouter.get(`${basePath}/email`, validateTokenMiddleware, getUserByEmailRoute);
userRouter.get(`${basePath}/field`, validateTokenMiddleware, getUsersByFieldRoute);
userRouter.get(`${basePath}/:id`, validateTokenMiddleware, getUserByIdRoute);
userRouter.get(`${basePath}/`, validateTokenMiddleware, getAllUsersRoute);

userRouter.post(`${basePath}/signup`, createUserRoute);
userRouter.post(`${basePath}/signin`, signinUserRoute);
userRouter.post(`${basePath}/requestnewpassword`, requestNewPasswordRoute);
userRouter.post(`${basePath}/resetpassword`, resetPasswordRoute);
// userRouter.post(`${basePath}/`, validateTokenMiddleware, createUserRoute);

userRouter.patch(`${basePath}/:id/type`, validateTokenMiddleware, isAdmin, updateUserTypeRoute);
userRouter.patch(`${basePath}/:id/active`, validateTokenMiddleware, isAdmin, updateUserActiveStateRoute);
userRouter.patch(`${basePath}/:id/password`, validateTokenMiddleware, canUpdate, updateUserPasswordRoute);
userRouter.patch(`${basePath}/:id`, validateTokenMiddleware, canUpdate, updateUserRoute);

userRouter.delete(`${basePath}/:id`, validateTokenMiddleware, canUpdate, removeUserRoute);

export default userRouter;
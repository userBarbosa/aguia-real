import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  getTutorByIdRoute,
  getAllTutorsRoute,
  getTutorsByFieldRoute,
  createTutorRoute,
  updateTutorRoute,
  deleteTutorRoute,
  deletePatientFromTutor,
  insertPatientFromTutor,
} from "./tutor.controller";

const tutorRouter = Router();
const basePath = "/tutor";

tutorRouter.get(`${basePath}/all`, validateTokenMiddleware, getAllTutorsRoute);
tutorRouter.get(
  `${basePath}/field`,
  validateTokenMiddleware,
  getTutorsByFieldRoute
);
tutorRouter.get(`${basePath}/:id`, validateTokenMiddleware, getTutorByIdRoute);

tutorRouter.post(`${basePath}/new`, validateTokenMiddleware, createTutorRoute);
tutorRouter.post(
  `${basePath}/:id/patients/:patient`,
  validateTokenMiddleware,
  insertPatientFromTutor
);

tutorRouter.put(`${basePath}/:id`, validateTokenMiddleware, updateTutorRoute);

tutorRouter.delete(
  `${basePath}/:id`,
  validateTokenMiddleware,
  deleteTutorRoute
);
tutorRouter.delete(
  `${basePath}/:id/patients/:patient`,
  validateTokenMiddleware,
  deletePatientFromTutor
);

export default tutorRouter;

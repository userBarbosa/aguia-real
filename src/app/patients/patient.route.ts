import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  getPatientByIdRoute,
  getAllPatientsRoute,
  getPatientsByFieldRoute,
  getPatientsByTutorRoute,
  createPatientRoute,
  updatePatientRoute,
  deletePatientRoute,
} from "./patient.controller";

const patientRouter = Router();
const basePath = "/patient";

patientRouter.get(
  `${basePath}/all`,
  validateTokenMiddleware,
  getAllPatientsRoute
);
patientRouter.get(
  `${basePath}/field`,
  validateTokenMiddleware,
  getPatientsByFieldRoute
);
patientRouter.get(
  `${basePath}/tutor/:tutor`,
  validateTokenMiddleware,
  getPatientsByTutorRoute
);
patientRouter.get(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getPatientByIdRoute
);

patientRouter.post(
  `${basePath}/new`,
  validateTokenMiddleware,
  createPatientRoute
);

patientRouter.put(
  `${basePath}/:id`,
  validateTokenMiddleware,
  updatePatientRoute
);

patientRouter.delete(
  `${basePath}/:id`,
  validateTokenMiddleware,
  deletePatientRoute
);

export default patientRouter;

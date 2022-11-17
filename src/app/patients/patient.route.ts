import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import { getPatientByIdRoute } from "./patient.controller";

const patientRouter = Router();
const basePath = "/patient";

patientRouter.get(
  `${basePath}/all`,
  validateTokenMiddleware,
  getPatientByIdRoute
);
patientRouter.get(
  `${basePath}/field`,
  validateTokenMiddleware,
  getPatientByIdRoute
);
patientRouter.get(
  `${basePath}/tutor/:tutor`,
  validateTokenMiddleware,
  getPatientByIdRoute
);
patientRouter.get(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getPatientByIdRoute
);

patientRouter.post(
  `${basePath}/new`,
  validateTokenMiddleware,
  getPatientByIdRoute
);

patientRouter.patch(
  `${basePath}/:id/observation`,
  validateTokenMiddleware,
  getPatientByIdRoute
);

patientRouter.delete(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getPatientByIdRoute
);

export default patientRouter;

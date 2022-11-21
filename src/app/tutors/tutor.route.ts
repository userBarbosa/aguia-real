import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import { getTutorByIdRoute } from "./tutor.controller";

const tutorRouter = Router();
const basePath = "/tutor";

tutorRouter.get(
  `${basePath}/all`,
  validateTokenMiddleware,
  getTutorByIdRoute
);
tutorRouter.get(
  `${basePath}/field`,
  validateTokenMiddleware,
  getTutorByIdRoute
);
tutorRouter.get(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getTutorByIdRoute
);

tutorRouter.post(
  `${basePath}/new`, 
  validateTokenMiddleware, 
  getTutorByIdRoute
);
tutorRouter.post(
  `${basePath}/:id/patients/:patient`,
  validateTokenMiddleware,
  getTutorByIdRoute
);

tutorRouter.patch(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getTutorByIdRoute
);

tutorRouter.delete(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getTutorByIdRoute
);
tutorRouter.delete(
  `${basePath}/:id/patients/:patient`,
  validateTokenMiddleware,
  getTutorByIdRoute
);

export default tutorRouter;

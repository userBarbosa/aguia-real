import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  getAppointmentByIdRoute,
  getAllAppointmentsRoute,
  getAppointmentsByFieldRoute,
  getAppointmentsByForeignIdRoute,
  getAppointmentsInDateRangeRoute,
  createAppointmentRoute,
  updateAppointmentStateRoute,
  finishAppointment,
  updateAppointmentRoute,
  deleteAppointmentRoute,
  isReservedRoute,
} from "./appointment.controller";

const appointmentRouter = Router();
const basePath = "/appointments";

appointmentRouter.get(
  `${basePath}/all`,
  validateTokenMiddleware,
  getAllAppointmentsRoute
);
appointmentRouter.get(
  `${basePath}/field`,
  validateTokenMiddleware,
  getAppointmentsByFieldRoute
);
appointmentRouter.get(
  `${basePath}/foreignid`,
  validateTokenMiddleware,
  getAppointmentsByForeignIdRoute
);
appointmentRouter.get(
  `${basePath}/daterange`,
  validateTokenMiddleware,
  getAppointmentsInDateRangeRoute
);
appointmentRouter.get(
  `${basePath}/isreserved`,
  validateTokenMiddleware,
  isReservedRoute
);
appointmentRouter.get(
  `${basePath}/:id`,
  validateTokenMiddleware,
  getAppointmentByIdRoute
);

appointmentRouter.post(
  `${basePath}/new`,
  validateTokenMiddleware,
  createAppointmentRoute
);

appointmentRouter.patch(
  `${basePath}/:id/state`,
  validateTokenMiddleware,
  updateAppointmentStateRoute
);
appointmentRouter.patch(
  `${basePath}/:id/observation`,
  validateTokenMiddleware,
  updateAppointmentRoute
);

appointmentRouter.put(
  `${basePath}/:id/finish`,
  validateTokenMiddleware,
  finishAppointment
);

appointmentRouter.put(
  `${basePath}/:id`,
  validateTokenMiddleware,
  updateAppointmentRoute
);

appointmentRouter.delete(
  `${basePath}/:id`,
  validateTokenMiddleware,
  deleteAppointmentRoute
);

export default appointmentRouter;

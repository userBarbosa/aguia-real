import {
  swaggerGetPetExample,
  swaggerUpdatePetExample,
  swaggerPetSchemaExample,
} from "./pets.documentation";
import { swaggerAddressSchemaExample } from "./users.documentation";
import { swaggerInsertAppointment, swaggerAppointmentSchema, swaggerDiagnosticSchema, swaggerMedicinePrescriptionSchema, swaggerAppStateEnum, swaggerErrorSchema } from "./appointment.documentation";

const documentation = {
  openapi: "3.0.0",
  info: {
    title: "PetsAnatomy",
    description: "",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://localhost:3001/",
      description: "developer server",
    },
    {
      url: "future url",
      description: "main server",
    },
  ],
  paths: {
    // "/pets": {
    //   "get": swaggerGetPetExample,
    //   "put": swaggerUpdatePetExample
    // },
    "/appointments/new": {
      post: swaggerInsertAppointment,
    },
  },
  definitions: {
    Appointment: swaggerAppointmentSchema,
    Diagnostic: swaggerDiagnosticSchema,
    MedicinePrescription: swaggerMedicinePrescriptionSchema,
    AppState: swaggerAppStateEnum,
    Errors: {
      NewAppointmentError: swaggerErrorSchema
    }
    // Pet: swaggerPetSchemaExample,
    // Address: swaggerAddressSchemaExample,
  },
};
export default documentation;

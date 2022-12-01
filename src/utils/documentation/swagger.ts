import {
  swaggerGetPetExample,
  swaggerUpdatePetExample,
  swaggerPetSchemaExample,
} from "./classes/pets.documentation";
import { swaggerAddressSchemaExample } from "./classes/users.documentation";
import {
  swaggerInsertAppointment,
  swaggerAppointmentSchema,
  swaggerDiagnosticSchema,
  swaggerMedicinePrescriptionSchema,
  swaggerAppStateEnum,
  swaggerErrorSchema,
} from "./classes/appointment.documentation";

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
      NewAppointmentError: swaggerErrorSchema,
    },
    // Pet: swaggerPetSchemaExample,
    // Address: swaggerAddressSchemaExample,
  },
};
export default documentation;


/* to be added
"/utilities/health-check": {
  "get": {
    "description": "",
    "parameters": [],
    "responses": {}
  }
},
"/utilities/health-check/auth": {
  "get": {
    "description": "",
    "parameters": [
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      }
    ],
    "responses": {}
  }
} */
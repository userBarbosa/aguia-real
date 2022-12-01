import {
  appointmentsSwaggerDocumentation,
  appointmentsSwaggerDefinitions,
} from "./classes/appointment.documentation";
import {
  utilitiesSwaggerDefinitions,
  utilitiesSwaggerDocumentation,
  utilitiesSecurityDefinition,
} from "./classes/utilities.documentation";

const documentation = {
  openapi: "3.0.0",
  info: {
    title: "PetsAnatomy",
    description: "",
    version: "0.0.1",
  },
  schemes: ["https"],
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
    ...appointmentsSwaggerDocumentation,
    ...utilitiesSwaggerDocumentation,
  },
  definitions: {
    ...appointmentsSwaggerDefinitions,
    ...utilitiesSwaggerDefinitions,
  },
  securityDefinitions: {
    ...utilitiesSecurityDefinition,
  },
};
export default documentation;

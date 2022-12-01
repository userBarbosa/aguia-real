import {
  appointmentsSwaggerDocumentation,
  appointmentsSwaggerDefinitions,
} from "./classes/appointment.documentation";
import {
  usersSwaggerDocumentation,
  usersSwaggerDefinitions,
} from "./classes/users.documentation";
import {
  patientsSwaggerDocumentation,
  patientsSwaggerDefinitions,
} from "./classes/pets.documentation";
import {
  tutorsSwaggerDocumentation,
  tutorsSwaggerDefinitions,
} from "./classes/tutor.documentation";
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
    ...usersSwaggerDocumentation,
    ...tutorsSwaggerDocumentation,
    ...patientsSwaggerDocumentation,
    ...appointmentsSwaggerDocumentation,
    ...utilitiesSwaggerDocumentation,
  },
  definitions: {
    ...usersSwaggerDefinitions,
    ...tutorsSwaggerDefinitions,
    ...patientsSwaggerDefinitions,
    ...appointmentsSwaggerDefinitions,
    ...utilitiesSwaggerDefinitions,
  },
  securityDefinitions: {
    ...utilitiesSecurityDefinition,
  },
};

export default documentation;

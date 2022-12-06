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
    title: "PetsHealth",
    description: "",
    version: "0.0.1",
    contact: "contato@petshealth.com.br",
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
  tags: [
    {
      name: "Users",
      description: "Usuarios",
    },
    {
      name: "Appointments",
      description: "Agendamentos",
    },
    {
      name: "Patients",
      description: "Pacientes / Pets",
    },
    {
      name: "Tutors",
      description: "Tutores / Clientes",
    },
    {
      name: "Utilities",
      description: "Utilidades",
    },
  ],
};

export default documentation;

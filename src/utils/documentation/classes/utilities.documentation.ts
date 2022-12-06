const healthCheck = {
  get: {
    tags: ["Utilities"],
    summary: "Health Check",
    operationId: "healthCheck",
    description: "Checks if the server is online",
    parameters: [],
    responses: {
      default: {
        description: "Default response.",
      },
    },
    security: [],
  },
};

const healthCheckAuth = {
  get: {
    tags: ["Utilities"],
    summary: "Health Check with Auth",
    operationId: "healthCheckAuth",
    description: "Checks if the server is online and the credentials are valid",
    parameters: [],
    responses: {
      default: {
        description: "Default response.",
      },
    },
    security: [
      {
        api_key: ["any"],
      },
    ],
  },
};

const swaggerErrorSchema = {
  description: "Error at appointment creation.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
        },
      },
    },
  },
};

export const utilitiesSwaggerDefinitions = {
  Errors: {
    NewAppointmentError: swaggerErrorSchema,
  },
};

export const utilitiesSecurityDefinition = {
  api_key: {
    type: "apiKey",
    name: "x-api-token",
    in: "header",
    description: "JWT authorization header using the Bearer scheme.",
  }
};

export const utilitiesSwaggerDocumentation = {
  "/utilities/healthcheck/auth": healthCheck,
  "/utilities/healthcheck": healthCheckAuth,
};


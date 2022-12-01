const getAllTutorsRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const getTutorsByFieldRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const getTutorByIdRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const createTutorRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const insertPatientFromTutor = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const updateTutorRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const deleteTutorRoute = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};
const deletePatientFromTutor = {
  tags: ["Tutors"],
  summary: "",
  operationId: "",
  description: "",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:tutors"],
    },
  ],
};

const swaggerAddressDefinition = {}

export const tutorsSwaggerDefinitions = {
  Address: swaggerAddressDefinition
};
export const tutorsSwaggerDocumentation = {
  "/tutor/all": { get: getAllTutorsRoute },
  "/tutor/field": { get: getTutorsByFieldRoute },
  "/tutor/:id": {
    get: getTutorByIdRoute,
    put: updateTutorRoute,
    delete: deleteTutorRoute,
  },
  "/tutor/new": { post: createTutorRoute },
  "/tutor/:id/patients/:patient": {
    post: insertPatientFromTutor,
    delete: deletePatientFromTutor,
  },
};

/* to be added

"/tutor/all": {
  "get": {
    "description": "",
    "parameters": [{
        "name": "req",
        "in": "query",
        "type": "string"
      }
    ],
    "responses": {}
  }
},
"/tutor/field": {
  "get": {
    "description": "",
    "parameters": [{
        "name": "data",
        "in": "query",
        "type": "string"
      },
      {
        "name": "field",
        "in": "query",
        "type": "string"
      }
    ],
    "responses": {}
  }
},
"/tutor/{id}": {
  "get": {
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      }
    ],
    "responses": {}
  },
  "put": {
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      },
      {
        "name": "body",
        "in": "body",
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "example": "any"
            },
            "documentNumber": {
              "example": "any"
            },
            "phoneNumber": {
              "example": "any"
            },
            "observation": {
              "example": "any"
            },
            "address": {
              "example": "any"
            }
          }
        }
      }
    ],
    "responses": {}
  },
  "delete": {
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      }
    ],
    "responses": {}
  }
},
"/tutor/new": {
  "post": {
    "description": "",
    "parameters": [{
        "name": "body",
        "in": "body",
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "example": "any"
            },
            "documentNumber": {
              "example": "any"
            },
            "phoneNumber": {
              "example": "any"
            },
            "observation": {
              "example": "any"
            },
            "address": {
              "example": "any"
            }
          }
        }
      }
    ],
    "responses": {}
  }
},
"/tutor/{id}/patients/{patient}": {
  "post": {
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "patient",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      }
    ],
    "responses": {}
  },
  "delete": {
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "patient",
        "in": "path",
        "required": true,
        "type": "string"
      },
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      }
    ],
    "responses": {}
  }
} */

const confirmAccountRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const getUserByEmailRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const getUsersByFieldRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const getUserByIdRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const getAllUsersRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const createUserRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const signinUserRoute = {
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["Users"],
  summary: "Login",
  operationId: "signin",
  description: "Login on application",
  parameters: [
    {
      in: "body",
      name: "body",
      description: "Sign in object",
      required: true,
      schema: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            description: "User email",
            type: "string",
          },
          password: {
            description: "User password",
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [],
};

const requestNewPasswordRoute = {
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["Users"],
  summary: "Request password redefinition email",
  operationId: "requestNewPassword",
  description: "Request the email for new password",
  parameters: [
    {
      in: "body",
      name: "body",
      description: "Sign in object",
      required: true,
      schema: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            description: "User email",
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:users"],
    },
  ],
};

const resetPasswordRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const updateUserTypeRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const updateUserActiveStateRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const updateUserPasswordRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const updateUserRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const removeUserRoute = {
  tags: ["Users"],
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
      api_key: ["read:users"],
    },
  ],
};

const swaggerSpecialtyEnum = {
  in: "query",
  type: "integer",
  enum: [1, 2, 4, 8, 16, 32, 64, 128, 256],
  description:
    "1: cat,\n2: dog,\n4: bird,\n8: fish,\n16: rodent,\n32: reptile,\n64: wild,\n128: farm,\n256: marine",
};

export const usersSwaggerDefinitions = {
  Specialty: swaggerSpecialtyEnum,
};

export const usersSwaggerDocumentation = {
  "/users/confirmaccount": { get: confirmAccountRoute },
  "/users/email": { get: getUserByEmailRoute },
  "/users/field": { get: getUsersByFieldRoute },
  "/users/:id": {
    get: getUserByIdRoute,
    patch: updateUserRoute,
    delete: removeUserRoute,
  },
  "/users/": { get: getAllUsersRoute },
  "/users/signup": { post: createUserRoute },
  "/users/signin": { post: signinUserRoute },
  "/users/requestnewpassword": { post: requestNewPasswordRoute },
  "/users/resetpassword": { post: resetPasswordRoute },
  "/users/:id/type": { patch: updateUserTypeRoute },
  "/users/:id/active": { patch: updateUserActiveStateRoute },
  "/users/:id/password": { patch: updateUserPasswordRoute },
};

// getUserByIdRoute
// getAllUsersRoute
// createUserRoute
// signinUserRoute
// createUserRoute
// updateUserTypeRoute
// updateUserPasswordRoute
// updateUserRoute
// removeUserRoute

/* to be added
"/users/confirmaccount": {
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
    },
    "/users/email": {
      "get": {
        "description": "",
        "parameters": [
          
          {
            "name": "email",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {}
      }
    },
    "/users/field": {
      "get": {
        "description": "",
        "parameters": [
          
          {
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
    "/users/{id}": {
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
      "patch": {
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
    "/users/": {
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
    },
    "/users/signup": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "example": "any"
                },
                "email": {
                  "example": "any"
                },
                "password": {
                  "example": "any"
                },
                "type": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/users/signin": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "any"
                },
                "password": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/users/requestnewpassword": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/users/resetpassword": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "password": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/users/{id}/type": {
      "patch": {
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
    "/users/{id}/active": {
      "patch": {
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
    "/users/{id}/password": {
      "patch": {
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
    }
*/

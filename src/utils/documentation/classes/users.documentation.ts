// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject

export const swaggerAddressSchemaExample = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}

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
            "name": "x-api-token",
            "in": "header",
            "type": "string"
          },
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
            "name": "x-api-token",
            "in": "header",
            "type": "string"
          },
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
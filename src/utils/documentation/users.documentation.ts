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
//https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject

const swaggerGetPetExample = {
  "tags": ["pets"],
  "description": "Returns pets based on ID",
  "summary": "Find pets by ID",
  "operationId": "getPetsById",
  "responses": {
    "200": {
      "description": "pet response",
      "content": {
        "*/*": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Pet"
            }
          }
        }
      }
    },
    "default": {
      "description": "error payload",
      "content": {
        "text/html": {
          "schema": {
            "$ref": "#/components/schemas/ErrorModel"
          }
        }
      }
    }
  },
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "ID of pet to use",
      "required": true,
      "schema": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "style": "simple"
    }
  ]
}

const swaggerUpdatePetExample = {
  "tags": [
    "pets"
  ],
  "summary": "Updates a pet in the store with form data",
  "operationId": "updatePetWithForm",
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "schema": {
        "type": "string"
      }
    }
  ],
  "requestBody": {
    "content": {
      "application/x-www-form-urlencoded": {
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "description": "Updated name of the pet",
              "type": "string"
            },
            "status": {
              "description": "Updated status of the pet",
              "type": "string"
            }
          },
          "required": ["status"]
        }
      }
    }
  },
  "responses": {
    "200": {
      "description": "Pet updated.",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    },
    "405": {
      "description": "Method Not Allowed",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}

const swaggerPetSchemaExample = {
  "type": "object",
  "required": [
    "name",
    "photoUrls"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "category": {
      "$ref": "#/definitions/Category"
    },
    "name": {
      "type": "string",
      "example": "doggie"
    },
    "photoUrls": {
      "type": "array",
      "xml": {
        "wrapped": true
      },
      "items": {
        "type": "string",
        "xml": {
          "name": "photoUrl"
        }
      }
    },
    "tags": {
      "type": "array",
      "xml": {
        "wrapped": true
      },
      "items": {
        "xml": {
          "name": "tag"
        },
        "$ref": "#/definitions/Tag"
      }
    },
    "status": {
      "type": "string",
      "description": "pet status in the store",
      "enum": [
        "available",
        "pending",
        "sold"
      ]
    }
  },
  "xml": {
    "name": "Pet"
  }
}

export { swaggerGetPetExample, swaggerUpdatePetExample, swaggerPetSchemaExample }
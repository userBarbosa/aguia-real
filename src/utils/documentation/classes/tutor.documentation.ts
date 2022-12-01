/* to be added

"/tutor/all": {
  "get": {
    "description": "",
    "parameters": [
      {
        "name": "x-api-token",
        "in": "header",
        "type": "string"
      },
      {
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
    "parameters": [
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
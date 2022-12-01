const swaggerInsertAppointment = {
  tags: ["Appointments"],
  summary: "New Appointment",
  operationId: "insertAppointment",
  description: "Insert an new appointment",
  parameters: [
    {
      name: "body",
      in: "body",
      schema: {
        $ref: "#/definitions/Appointment",
      },
    },
  ],
  responses: {
    "200": {
      description: "Appointment sucessfully created.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "ObjectId",
                description: "Created appointment ID",
              },
            },
          },
        },
      },
    },
    "403": {
      $ref: "#/definitions/Errors/NewAppointmentError",
    },
    "500": {
      $ref: "#/definitions/Errors/NewAppointmentError",
    },
  },
  security: [{ api_key: ["write:appointments"] }],
};

const swaggerGetAllAppointments = {
  tags: ["Appointments"],
  summary: "Get all appointments",
  operationId: "getAllAppointments",
  description: "Read all appointments",
  parameters: [],
  responses: {
    default: {
      description: "Default response.",
    },
  },
  security: [
    {
      api_key: ["read:appointments"],
    },
  ],
};

const swaggerAppointmentSchema = {
  type: "object",
  required: true,
  properties: {
    patientId: {
      description: "Patient's object id",
      format: "ObjectId",
      type: "string",
    },
    ownerId: {
      description: "Tutor's object id",
      format: "ObjectId",
      type: "string",
    },
    employeeId: {
      description: "Responsible employee's object id",
      format: "ObjectId",
      type: "string",
    },
    diagnostic: {
      $ref: "#/definitions/Diagnostic",
    },
    appointmentState: {
      description: "Appointment's status",
      type: "integer",
      $ref: "#/definitions/AppState",
    },
    paymentMethod: {
      description: "Appointment's payment method",
      type: "integer",
    },
    reason: {
      description: "Appointment's reason",
      type: "integer",
    },
    value: {
      description: "Appointment's value",
      format: "double",
      type: "number",
    },
    observation: {
      description: "Appointment's observation",
      required: false,
      type: "string",
    },
    date: {
      description: "Appointment's date",
      format: "date",
      type: "string",
    },
  },
};

const swaggerDiagnosticSchema = {
  type: "object",
  // required: [
  //   "exam",
  //   "result",
  //   "doctorSign",
  //   "exameFullfilled",
  //   "medicinePrescription",
  // ],
  properties: {
    result: {
      description: "Result of appointment",
      type: "string",
    },
    doctorSign: {
      description: "Doctor unique sign",
      type: "string",
    },
    examFullfilled: {
      description: "If the exam is requested or already fullfilled",
      type: "boolean",
    },
    exam: {
      description: "Doctor Requested exam",
      type: "string",
    },
    medicinePrescription: {
      $ref: "#/definitions/MedicinePrescription",
    },
  },
};

const swaggerMedicinePrescriptionSchema = {
  type: "array",
  description: "List of prescripted medicines",
  items: {
    type: "object",
    properties: {
      medicine: {
        description: "Medicine name",
        type: "string",
      },
      dose: {
        description: "How much the pet should take per hour",
        type: "string",
      },
      period: {
        description: "Period in days",
        type: "string",
      },
    },
  },
};

const swaggerAppStateEnum = {
  in: "query",
  type: "integer",
  enum: [1, 2, 4, 8, 16, 32, 64],
  description:
    "1: draft,\n2: registered,\n4: scheduled,\n8: closed,\n16: canceled,\n32: paid,\n64: deleted",
};

export const appointmentsSwaggerDefinitions = {
  Appointment: swaggerAppointmentSchema,
  Diagnostic: swaggerDiagnosticSchema,
  MedicinePrescription: swaggerMedicinePrescriptionSchema,
  AppState: swaggerAppStateEnum,
};

export const appointmentsSwaggerDocumentation = {
  "/appointments/all": {
    get: swaggerGetAllAppointments,
  },
  "/appointments/field": {
    get: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/foreignid": {
    get: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/daterange": {
    get: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/isreserved": {
    get: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/{id}": {
    get: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
    put: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
    delete: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/new": {
    post: swaggerInsertAppointment,
  },
  "/appointments/{id}/state": {
    patch: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/{id}/observation": {
    patch: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
  "/appointments/{id}/finish": {
    put: {
      tags: ["Appointments"],
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
          api_key: ["any:appointments"],
        },
      ],
    },
  },
};

/* 
to be added:
    "/appointments/field": {
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
    "/appointments/foreignid": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "x-api-token",
            "in": "header",
            "type": "string"
          },
          {
            "name": "id",
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
    "/appointments/daterange": {
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
    "/appointments/isreserved": {
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
    "/appointments/{id}": {
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
                "employeeId": {
                  "example": "any"
                },
                "appointmentState": {
                  "example": "any"
                },
                "paymentMethod": {
                  "example": "any"
                },
                "reason": {
                  "example": "any"
                },
                "value": {
                  "example": "any"
                },
                "observation": {
                  "example": "any"
                },
                "date": {
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
    "/appointments/new": {
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
                "patientId": {
                  "example": "any"
                },
                "ownerId": {
                  "example": "any"
                },
                "diagnostic": {
                  "example": "any"
                },
                "employeeId": {
                  "example": "any"
                },
                "appointmentState": {
                  "example": "any"
                },
                "paymentMethod": {
                  "example": "any"
                },
                "reason": {
                  "example": "any"
                },
                "value": {
                  "example": "any"
                },
                "observation": {
                  "example": "any"
                },
                "date": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/appointments/{id}/state": {
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
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "appointmentState": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/appointments/{id}/observation": {
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
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "employeeId": {
                  "example": "any"
                },
                "appointmentState": {
                  "example": "any"
                },
                "paymentMethod": {
                  "example": "any"
                },
                "reason": {
                  "example": "any"
                },
                "value": {
                  "example": "any"
                },
                "observation": {
                  "example": "any"
                },
                "date": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/appointments/{id}/finish": {
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
                "appointmentState": {
                  "example": "any"
                },
                "diagnostic": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    }
*/

export const swaggerInsertAppointment = {
  tags: ["Appointments"],
  summary: "New Appointment",
  operationId: "insertAppointment",
  description: "Insert an new appointment",
  parameters: [
    {
      name: "x-api-token",
      in: "header",
      type: "string",
    },
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
                description: "Created appointment ID"
              }
            }
          }
        },
      },
    },
    "403": {
      $ref: "#/definitions/Errors/NewAppointmentError"
    },
    "500": {
      $ref: "#/definitions/Errors/NewAppointmentError"
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT Authorization header using the Bearer scheme.",
    },
  },
  security: [],
};

export const swaggerAppointmentSchema = {
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

export const swaggerDiagnosticSchema = {
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

export const swaggerMedicinePrescriptionSchema = {
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

export const swaggerAppStateEnum = {
  in: "query",
  type: "integer",
  enum: [1, 2, 4, 8, 16, 32, 64],
  description:
    "1: draft,\n2: registered,\n4: scheduled,\n8: closed,\n16: canceled,\n32: paid,\n64: deleted",
};

export const swaggerErrorSchema = {
  description: "Error at appointment creation.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message"
          }
        }
      }
    },
  },
};
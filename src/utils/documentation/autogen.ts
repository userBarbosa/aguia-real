const swaggerAutogen = require('swagger-autogen')()

const doc = {
  "info": {
    "title": "PetsAnatomy",
    "description": "",
    "version": "0.0.1"
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['../../app/appointments/appointment.route', '../../app/users/user.route']

swaggerAutogen(outputFile, endpointsFiles, doc);
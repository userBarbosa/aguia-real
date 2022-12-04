const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "PetsAnatomy",
    description: "",
    version: "0.0.1",
  },
};

const outputFile = "./classes/swagger-output.json";
const endpointsFiles = [
  "../../app/appointments/appointment.route",
  "../../app/users/user.route",
  "../../app/patients/patient.route",
  "../../app/tutors/tutor.route",
  "../../app/utilities/utility.route",
];

swaggerAutogen(outputFile, endpointsFiles, doc);

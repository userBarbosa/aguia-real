import { swaggerGetPetExample, swaggerUpdatePetExample, swaggerPetSchemaExample } from './pets.documentation'
import { swaggerAddressSchemaExample } from './users.documentation'

const documentation = {
  "openapi": "3.0.0",
  "info": {
    "title": "PetsAnatomy",
    "description": "",
    "version": "0.0.1"
  },
  "servers": [
    {
      "url": "http://localhost:3001/",
      "description": "developer server",
    },
    {
      "url": "future url",
      "description": "main server",
    },
  ],
  "paths": {
    "/pets": {
      "get": swaggerGetPetExample,
      "put": swaggerUpdatePetExample
    }
  },
  "definitions": {
    "Pet": swaggerPetSchemaExample,
    "Address": swaggerAddressSchemaExample
  }
}
export default documentation
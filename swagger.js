import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MICROMITRA Job Portal API",
      version: "1.0.0",
      description:
        "API documentation for MICROMITRA - A comprehensive job portal application",
      contact: {
        name: "MICROMITRA Team",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};

export default swaggerJSDoc(options);

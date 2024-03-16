const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
// const YAML = require("yamljs");
// const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini urlShorter API",
      description:
        "API endpoints for a mini blog services documented on swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./src/config/*.yaml"],
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = { swaggerDocs };

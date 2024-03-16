const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerJsDocs = YAML.load(path.resolve("./src/docs/swagger.docs.yaml"));

function swaggerDocs(app) {
  // Swagger Page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
}

module.exports = { swaggerDocs };

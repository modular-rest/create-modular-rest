const path = require("path");
const { createRest } = require("@modular-rest/server");
const { permissionGroups } = require("./permissions");

// Load .env file
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

// Create the rest server
// The createRest function returns a promise
const app = createRest({
  port: 8080,
  modulesPath: path.join(__dirname, "modules"),
  staticPath: {
    rootPath: path.join(__dirname, "assets"),
    rootDir: path.join(__dirname, "public"),
  },
  mongo: {
    mongoBaseAddress: "mongodb://localhost:27017",
    dbPrefix: "mrest_",
  },
  onBeforeInit: (koaApp) => {
    // do something before init with the koa app
  },
  adminUser: {
    email: process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || "",
  },
  permissionGroups: permissionGroups,
  verificationCodeGeneratorMethod: function () {
    return "123456";
  },
});

import * as path from "path";
import { createRest } from "@modular-rest/server";
import { permissionGroups } from "./permissions";

// Load .env file
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

// Create the rest server
// The createRest function returns a promise
const app = createRest({
  port: 8080,
  modulesPath: path.join(__dirname, "..", "dist", "modules"),
  staticPath: {
    path: path.join(__dirname, "assets"),
    actualPath: path.join(__dirname, "public"),
  },
  mongo: {
    mongoBaseAddress: "mongodb://localhost:27017",
    dbPrefix: "mrest_",
  },
  onBeforeInit: (koaApp) => {
    // do something before init with the koa app
  },
  adminUser: {
    email: process.env.ADMIN_EMAIL || "admin@changeme.com",
    password: process.env.ADMIN_PASSWORD || "changeme123",
  },
  permissionGroups: permissionGroups,
  verificationCodeGeneratorMethod: function () {
    return "123456";
  },
});

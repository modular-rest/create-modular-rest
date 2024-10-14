#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { input, select } = require("@inquirer/prompts");

async function startInquirer() {
  const projectName =
    process.argv[2] ||
    (await input({
      message: "What is your project name?",
    }));

  const template = await select({
    message: "Which template would you like to use?",
    choices: [
      { name: "JavaScript", value: "js" },
      { name: "TypeScript", value: "ts" },
    ],
  });

  return { projectName, template };
}

function initialize({ projectName, template }) {
  // Create a project directory with the project name.
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  fs.mkdirSync(projectDir, {
    recursive: true,
  });

  // Copy the template directory to the project directory.
  const templateDir = path.resolve(__dirname, "..", "templates", template);
  fs.cpSync(templateDir, projectDir, {
    recursive: true,
  });

  // Rename files
  const renameFiles = ["env", "gitignore"];
  renameFiles.forEach((file) => {
    fs.renameSync(
      path.join(projectDir, file),
      path.join(projectDir, "." + file)
    );
  });

  const projectPackageJson = require(path.join(projectDir, "package.json"));

  // Update the project's package.json with the new project name
  projectPackageJson.name = projectName;
  projectPackageJson.version = "0.0.0";

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(projectPackageJson, null, 2)
  );

  return { projectName, projectDir };
}

startInquirer()
  .then(initialize)
  .then(({ projectName, projectDir }) => {
    console.log(`Success! Your new Modular Server is ready!`);
    console.log(`Created ${projectName} at ${projectDir}`);
  });

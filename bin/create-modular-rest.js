const fs = require('fs');
const path = require('path');

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, {
	recursive: true
});

// Copy the template directory to the project directory.
const templateDir = path.resolve(__dirname, '..');
fs.cpSync(templateDir, projectDir, {
	recursive: true
}, (err) => {});

// Remove bin dir from project
const binDir = path.resolve(projectDir, 'bin');
fs.rmdirSync(binDir, {
	recursive: true
});

// Rename files
const renameFiles = ['env'];
renameFiles.forEach((file) => {
	fs.renameSync(
		path.join(projectDir, file),
		path.join(projectDir, '.' + file)
	);
})

const projectPackageJson = require(path.join(projectDir, 'package.json'));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;
delete projectPackageJson.bin;

fs.writeFileSync(
	path.join(projectDir, 'package.json'),
	JSON.stringify(projectPackageJson, null, 2)
);

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);
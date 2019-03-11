(async () => {
  // const init = require('init-package-json');
  const path = require('path');
  const fs = require('fs-extra');
  const inquirer = require('inquirer');
  const editJsonFile = require('edit-json-file');

  const answers = await inquirer.prompt([
    {
      name: 'project_name',
      message: "What's the name of your new project?",
      validate: input =>
        input.length >= 3
          ? true
          : 'Please enter a string with 3 or more characters.',
    },
  ]);

  // a path to a promzard module.  In the event that this file is
  // not found, one will be provided for you.
  // const initFile = path.resolve(__dirname, '.npm-init.js');

  // const module_path = path.resolve(__dirname);

  // create a dir for the project with same project name
  const new_path = path.resolve(process.cwd(), answers.project_name);
  await fs.ensureDir(new_path);

  await fs.copy(path.resolve(__dirname, 'template'), new_path);

  const pkg = editJsonFile(`${new_path}/package.json`);
  pkg.set('name', answers.project_name);
  pkg.set('private', true);
  pkg.save();

  // process.chdir(new_path);

  // extra stuff that gets put into the PromZard module's context.
  // In npm, this is the resolved config object.  Exposed as 'config'
  // Optional.
  // const configData = { init: { license: 'MIT' } };

  // Any existing stuff from the package.json file is also exposed in the
  // PromZard module as the `package` object.  There will also be free
  // vars for:
  // * `filename` path to the package.json file
  // * `basename` the tip of the package dir
  // * `dirname` the parent of the package dir

  // init(process.cwd(), initFile, configData, function(er, data) {
  //   // the data's already been written to {dir}/package.json
  //   // now you can do stuff with it
  //   console.log(data);
  // });
  return;
})();

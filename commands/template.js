#!/usr/bin/env node
const pathCurrent = process.cwd();

const fs = require("fs");
const templates = {
  react: {
    input: `${__dirname}/../templates/Packages.js`,
    output: `${pathCurrent}/Packages.js`,
  },
};

renderFile = (input, output) => {
  const content = fs.readFileSync(input);
  fs.writeFileSync(output, content);
};

writeTemplate = () => {
  const argvs = process.argv;
  console.log(argvs[2]);
  console.log(templates);

  try {
    renderFile(templates[argvs[2]]["input"], templates[argvs[2]]["output"]);
    console.log("Component Packages create successfully");
  } catch (e) {
    console.log("Nền tảng chưa được hỗ trợ");
  }
};

writeTemplate();

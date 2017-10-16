const yargs = require('yargs');
const fs = require('fs');
const through2 = require('through2');
const pathModule = require('path');
const https = require('https');
const os = require('os');

const runningAsScript = !module.parent;

const actions = {
  inputOutput: (file) => { inputOutput(file); },
  transformFile: (file, output) => { transformFile(file, output); },
  transform: (file) => { transform(file); },
  cssBundle: (file, output, path) => { cssBundle(path); }
};

parseArguments = () => {
  return yargs.options({
    a: {
      alias: 'action',
      describe: 'Action to execute. Supported actions: "inputOutput, transformFile, transform, cssBundle"',
      string: true
    },
    f: {
      alias: 'file',
      describe: 'File to process (C:\MyDocs\in.csv)',
      string: true
    },
    p: {
      alias: 'path',
      describe: 'Path to folder with css files',
      string: true
    }
  }).demandOption(['action'], 'Please provide --action argument to work with this tool')
    .help()
    .alias('help', 'h')
    .argv;
};

if (runningAsScript) {
  let argv = parseArguments();
  if (argv.action in actions) {
    actions[argv.action](argv.file, argv.output, argv.path);
  }
  else {
    console.error("Action not supported.");
  }
}

// task #4 - use fs.createReadStream to pipe file to process.stdout
function inputOutput(filePath) {
  console.log('Starting action inputOutput..');
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error("Correct file path should be provided");
      return;
    }

    let reader = fs.createReadStream(filePath);
    reader.pipe(process.stdout);
  });
};

// task #6 & #7 - use through2 to convert data form csv file to json and output data to process.stdout and json file
function transformFile(filePath, output) {
  console.log('Starting action transformFile..');
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error("Correct file path should be provided");
      return;
    }

    let outputStream = fs.createWriteStream(filePath.slice(0, -4) + '.json');

    let reader = fs.createReadStream(filePath);
    let transformationStream = reader.pipe(through2(function (chunk, enc, callback) {
      this.push(csvToJson(chunk.toString()));
      callback();
    }));

    transformationStream.pipe(process.stdout);
    transformationStream.pipe(outputStream);
  });
};

// task #5 - use through2 to convert data from process.stdin to upper case data into process.stdout
function transform() {
  console.log('Starting action transform..');
  process.stdin.pipe(through2(function (chunk, enc, callback) {

    this.push(chunk.toString().toUpperCase());
    callback();
  })).pipe(process.stdout);
};

// task #8 - cssBundle
function cssBundle(path) {
  console.log('Starting action cssBundle..');
  const stylesLink = "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css";

  fs.readdir(path, (err, files) => {
    if (err) {
      console.error("Correct directory path should be provided");
      return;
    }

    files = files.filter(file => file.split('.').pop() === 'css');

    if (files.length === 0) {
      console.log('No css files found in the directory ' + path);
    }

    let reader;
    let outputStream = fs.createWriteStream(pathModule.join(path, 'bundle.css'));

    files.forEach(function (file) {
      reader = fs.createReadStream(pathModule.join(path, file));
      reader.pipe(prepareCssContent(file), { end: false }).pipe(outputStream);
    });

    https.get(stylesLink, (res) => {
      if (res.statusCode === 200) {
        res.pipe(prepareCssContent(stylesLink)).pipe(outputStream);
      }
    });
  });
};


// privates
const csvToJson = function (csvString) {
  // Split on row
  csvString = csvString.split("\n");

  // Get first row for column headers
  let headers = csvString.shift().split(",");

  let json = [];
  csvString.forEach(function (d) {
    // Loop through each row
    let obj = {};
    let row = d.split(",");
    for (var i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    // Add object to list
    json.push(obj);
  });

  return JSON.stringify(json);
};

const prepareCssContent = (source) => {
  return through2(function (chunk, enc, callback) {
    console.log(`Appending content from ${source}`);
    this.push(`${os.EOL}/*------------------Content from ${source}-----------*/ ${os.EOL}`);
    this.push(chunk);
    this.push(`${os.EOL}/*---------------------------------------------------*/ ${os.EOL}`);
    callback();
  })
};

module.exports = actions;
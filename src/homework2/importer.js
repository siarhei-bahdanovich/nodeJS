import * as fs from 'fs';
import * as path from 'path';

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

  return json;
};

class Importer {

  import(filePath) {
    return new Promise((reject, resolve) => {

      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        err ? reject(err) : resolve(csvToJson(data));
      });
    });
  };

  importSync(filePath) {
    let csv = fs.readFileSync(filePath, { encoding: 'utf-8' }, (err) => { console.error(err); });

    return csvToJson(csv);
  };
};

export default Importer;
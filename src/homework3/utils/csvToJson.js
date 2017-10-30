/**
 * 
 * @param {string} csvString - valid csv string that matches headers (1 time it will save headers)
 */
const convert = function (headers, csvString) {
  let json = [];
  csvString.forEach(function (d) {
    // Loop through each row
    let obj = {};
    let row = d.split(',');
    for (var i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    // Add object to list
    json.push(obj);
  });

  return JSON.stringify(json);
};

module.exports = { convert };
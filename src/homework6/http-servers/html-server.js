const http = require('http');
const fs = require('fs');
const through2 = require('through2');

http.createServer((req, res) => {
  const indexPath = './content/index.html';

  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let reader = fs.createReadStream(indexPath);
    reader.on('end', () => res.end);

    reader.pipe(through2(function (chunk, enc, callback) {
      let content = chunk.toString();
      content = content.replace('{message}', 'Hello world!');
      this.push(content);
      callback();
    })).pipe(res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not found.');
  }
}).listen(3000);;
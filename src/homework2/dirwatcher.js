import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';

class DirWatcher extends EventEmitter {

  watch(directoryPath, delay) {

    // init when running first time
    this.fileList = this.fileList || fs.readdirSync(directoryPath);

    let updatedFileList = fs.readdirSync(directoryPath);

    updatedFileList.forEach(file => {
      if (this.fileList.includes(file) === false) {
        this.emit('dirWatcher: changed', path.join(directoryPath, file));
      }
    });

    this.fileList = updatedFileList;

    setTimeout(() => {
      this.watch(directoryPath, delay);
    }, delay);
  };
};

export default DirWatcher;
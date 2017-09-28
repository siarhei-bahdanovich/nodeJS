import DirWatcher from './dirwatcher';
import Importer from './importer';

let dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 5000);

let importer = new Importer();

dirWatcher.on('dirWatcher: changed', (filePath) => {

  // sync import
  console.log('-------------------------------Sync import-------------------------------');
  let result = importer.importSync(filePath);
  console.log(result);

  // async import
  console.log('-------------------------------Async import-------------------------------');
  importer.import(filePath).then(
    (content) => { console.log(content) },
    (err) => { console.log(err) });
});



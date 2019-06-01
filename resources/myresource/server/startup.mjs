import fs from 'fs';
import path from 'path';

// Files to load from. The name of this resource and the 'server' directory.
// This will load all files inside of it.
const moduleName = `myresource`;
const modulePath = `./resources/${moduleName}/server`;

var filesToLoad = [];
var timeSinceLastFileAdded = 0;
var attemptingToLoad = "";

function RetrieveAllFiles(currentDirPath) {
    fs.readdir(currentDirPath, (err, files) => {
        if (err) throw new Error(err);

        // Read each file.
        files.forEach((name) => {
            var filePath = path.join(currentDirPath, name).replace(/\\/g, `/`);
            var stat = fs.statSync(filePath);
            if (stat.isFile() && filePath.includes('.mjs') && !filePath.includes('startup.mjs')) {
                var finalPath = filePath.replace(`resources/${moduleName}/server/`, `./`);
                filesToLoad.push(finalPath);
                timeSinceLastFileAdded = Date.now() + 2000;
            } else if (stat.isDirectory()) {
                RetrieveAllFiles(filePath);
            }
        });
    });
}

var loadFiles = setInterval(() => {
    console.log('Loading files please wait...');
    if (timeSinceLastFileAdded > Date.now()) {
        return;
    }

    clearInterval(loadFiles);

    for(var i = 0; i < filesToLoad.length; i++) {
        attemptingToLoad = filesToLoad[i];
        import(filesToLoad[i]).then(
            (res) => {
                res.Startup();
            },
            (err) => {
                console.error(err);
            });
    }
}, 500);

RetrieveAllFiles(modulePath);
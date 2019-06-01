import glob from 'glob';

const moduleName = `myresource`;
const modulePath = `./resources/${moduleName}/server`;
const exclusions = ['startup.mjs'];
const startTime = new Date().getTime();

var getDirectories = (src, callback) => {
    glob(src + '/**/*.mjs', callback);
};

getDirectories(`${modulePath}`, (err, files) => {
    var loadedFilesCount = 0;

    files.forEach((name) => {
        for(var i = 0; i < exclusions.length; i++) {
            if(!name.includes(exclusions[i])) 
                continue;
            return;
        }

        var fileToLoad = name.replace(`resources/${moduleName}/server/`, `./`);
        ImportFile(fileToLoad);
        loadedFilesCount += 1;
    });

    console.log('\x1b[32m', `==> Loaded ${loadedFilesCount} files in ${(new Date().getTime() - startTime) / 1000}s`, '\x1b[0m')
});

// ie. ./resources/myresource/test.mjs
function ImportFile(filePath) {
    import(filePath).then(
        (loadedModule) => {
            loadedModule.Startup();
        },
        (error) => {
            console.log(error);
        }
    );
}
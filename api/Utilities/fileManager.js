const fs = require('fs'),
path = require('path');

const Promise = require('bluebird'); 

const fsPromise = Promise.promisifyAll(fs); 

// function that creates direcoty with file name and puts the file in it. 
function putFileInDir(file) {
    let dirPath = `${file.path}_dir`;
    let newFullPath = path.join(dirPath, file.filename);
    return fsPromise.mkdirAsync(dirPath)
    .then(() => {
        return fsPromise.renameAsync(file.path, newFullPath)
    })
    .then(() => {
        file.path = newFullPath;
        return Promise.resolve(newFullPath);
    })
    .catch(err => {
        console.log(err); 
        return Promise.reject(err);
    })
}

// function that creates directory for frames in given path. 
function createFramesDir(dirPath) {
    let newDirPath = path.join(dirPath, 'frames');
    return fsPromise.mkdirAsync(newDirPath)
}

//function that remove given path
function removePath(path) {
    return fsPromise.unlinkAsync(path);
}

module.exports = {
    putFileInDir,
    createFramesDir,
    removePath
}
const ffmpegUtils = require('../Utilities/ffmpeg'),
    fileManager = require('../Utilities/fileManager');

// The process will be: 
// 1. set the fps to the given fps (prcess env).
// 2. devide the video into it's frames.  
function ffmpegProcess(file, fps) {
    let _newFilePath;
    console.log('start ffmpegProcess');
    console.log(`setting fps to ${fps} ...`);
    return ffmpegUtils.setFps(file, fps)
    .then((newFilePath) => {
        _newFilePath = newFilePath;
        console.log(`split into frames: ${newFilePath} ... `);
        return ffmpegUtils.divideIntoFrames(newFilePath);
    })
    .then(() => {
        console.log(`remove uncoded file ... `);
        return fileManager.removePath(file.path);
    })
    .then(() => {
        file.path = _newFilePath;
        console.log('done ffmpegProcess');
        return Promise.resolve(); 
    })
    .catch((err) => {
        console.log('error in ffmpegProcess: ' + err); 
        return Promise.reject(err);
    });
}

module.exports = {
    ffmpegProcess
};
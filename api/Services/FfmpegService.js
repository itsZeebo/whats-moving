const ffmpegUtils = require('../Utilities/ffmpeg');

// The process will be: 
// 1. set the fps to the given fps (prcess env).
// 2. devide the video into it's frames.  
function ffmpegProcess(filePath, fps) {
    console.log('start ffmpegProcess');
    console.log(`setting fps to ${fps} ...`);
    return ffmpegUtils.setFps(filePath, fps)
    .then(() => {
        console.log(`split into frames: ${filePath} ... `);
        return ffmpegUtils.devideIntoFrames(filePath);
    })
    .then(() => {
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
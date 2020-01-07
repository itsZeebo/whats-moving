const path = require('path');

const ffmpeg = require('fluent-ffmpeg');

// function that sets the fps of video to given fps. 
function setFps(filePath, fps) {
    // TODO: 
    return new Promise((resolve, reject) => {
        resolve();
    })
}

// function that devide video into it's frames - with wanted FPS. 
function devideIntoFrames(filePath) {
    return new Promise ((resolve, reject) => {
        ffmpeg()
        .input(`${filePath}`)
        .outputOptions([
            `-r 1/1` 
        ])
        .output(`${path.dirname(filePath)}/frames/%03d.jpg`)
        .on('start', (command) => {
            console.log(`ffmpeg started with the command: ${command}`);
        })
        .on('error', (err) => {
            console.log('error ffmpeg when try to split into frames');
            reject(err);
          })
        .on('end', () => {
            console.log('Finished splitting into frames');
            resolve();
        })
        .run()
    });
}

function getVideoDimensions(filePath) {
    return ffmpeg.ffprobe(filePath, (err, data) => {
        if (err) console.log(err);
        else return { height: data.height, width: data.width };
    });
}

module.exports = {
    setFps, 
    devideIntoFrames,
    getVideoDimensions
}
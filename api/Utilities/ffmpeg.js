const path = require('path');

const ffmpeg = require('fluent-ffmpeg');

// function that sets the fps of video to given fps. 
function setFps(file, fps) {
    let newFilePath = path.join(path.dirname(file.path), file.originalname);
    return new Promise((resolve, reject) => {
        ffmpeg()
        .input(file.path)
        .outputOptions([
            '-r',
            fps,
            '-f',
            'mp4',
            '-an',
            '-vcodec',
            'libx264',
            '-b:v',
            '2048k'
        ])
        .output(newFilePath)
        .on('start', (command) => {
            console.log(`ffmpeg started with the command: ${command}`);
        })
        .on('error', (err) => {
            console.log('error ffmpeg when try to change fps');
            reject(err);
          })
        .on('end', () => {
            console.log('fps changed');
            resolve(newFilePath);
        })
        .run()
    })
}

// function that devide video into it's frames - with wanted FPS. 
function divideIntoFrames(filePath) {
    return new Promise ((resolve, reject) => {
        ffmpeg()
        .input(filePath)
        .output(`${path.dirname(filePath)}/frames/%d.jpg`)
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
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, data) => {
            if (err) reject(err);
            else resolve({ height: data.streams[0].height, width: data.streams[0].width });
        });
    });
}

module.exports = {
    setFps, 
    divideIntoFrames,
    getVideoDimensions
}
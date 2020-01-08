const path = require('path'),
    spawn = require('child_process').spawn;

const _ = require('lodash');

// function that run the motion detection alog, and return promise.  
function motionDetection(videoId, videoPath) {
    let result = [
        {"start": 8, "end": 15},
        {"start": 30, "end": 50},
        {"start": 60, "end": 68},
    ]
    // return runAlgo(videoPath) TODO: open it. 
    return Promise.resolve(result)
    .then((result) => {
        return makePathToFramesArray(videoId, videoPath, result);
    });
}


// ~~~~~ helper functions: ~~~~~~~

// function that runs the motion detection algo, as child process. 
function runAlgo(filePath) {
    return new Promise((resolve, reject) => {
        let motionProcess = spawn(path.join(__dirname, '../Algorithms/MotionDetection.exe'), [filePath]);
        motionProcess.stdout
        .on('data', (data) => {
            resolve(data);
        })
        .on('error', (err) => {
            reject(err);
        });
    });
}

// function that gets the result from MotionDetection algo,
// exmple: 
// [
//     {"start": 357, "end": 361},
//     {"start": 371, "end": 414},
// ]
// and transforms it to object that contains the videoId and the frames path: 
// example output: 
// {
//     videoId: "someId",
//     frames: [
//         'path to frame',
//         'path to second frame'
//         ...etc
//     ]
// }  
function makePathToFramesArray(videoId, videoPath, motionDetectionResult) {
    let result = {
        videoId: videoId,
        frames: []
    };

    _.forEach(motionDetectionResult, (framesObject) => {
        let startFrame = framesObject.start,
        endFrame = framesObject.end;

        for (i=startFrame; i<=endFrame; i++) {
            let framePath = path.join(path.dirname(videoPath), 'frames', `${i}.jpg`);
            result.frames.push(framePath);
        }
    });

    return Promise.resolve(result);
}

module.exports = {
    motionDetection
}
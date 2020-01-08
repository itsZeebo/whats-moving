const path = require('path'),
    spawn = require('child_process').spawn;

// function that run the motion detection alog, and return promise.  
function motionDetection(filePath) {
    let result = [
        {"start": 357, "end": 361},
        {"start": 371, "end": 414},
        {"start": 552, "end": 617},
        {"start": 621, "end": 743},
        {"start": 838, "end": 856},
        {"start": 887, "end": 899},
        {"start": 1040, "end": 1135},
        {"start": 1227, "end": 1233},
        {"start": 1240, "end": 1277},
        {"start": 1280, "end": 1291},
        {"start": 1295, "end": 1296},
        {"start": 2599, "end": 2606},
        {"start": 2611, "end": 2615},
        {"start": 2629, "end": 2647},
        {"start": 2651, "end": 2655},
        {"start": 2664, "end": 2710}
    ]

    return runAlgo(filePath)
    .then((result) => {
        console.log(JSON.parse(result));
    })
    .catch((err) => {
        console.log(err);
    });
}


// ~~~~~ helper functions: ~~~~~~~


function runAlgo(filePath) {
    return new Promise((resolve, reject) => {
        let runCommand = `${(process.platform === 'linux' ? 'wine ': '')}${path.join(__dirname, '../Algorithms/MotionDetection.exe')}`;
        let motionProcess = spawn(runCommand, [filePath]);
        motionProcess.stdout
        .on('data', (data) => {
            resolve(data.toString());
        })
        .on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = {
    motionDetection
}
const ffmpeg = require("fluent-ffmpeg");

// function that run the objectDetection alog, and return promise.  
function objectDetection(file) {
    extractFramesFromVideo(file.path);
    return Promise.resolve();
}


function extractFramesFromVideo(videoFullPath) {
    ffmpeg(videoFullPath).outputOption(
        '-r', '2/1 ') // frames per second for output
        .output(`${videoFullPath}.%03d.bmp`)
        .on('end', function () {
            console.log('Finished processing');
        }).
        run();
}

module.exports = {
    objectDetection
}
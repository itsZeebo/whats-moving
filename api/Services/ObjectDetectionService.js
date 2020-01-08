const detecion = require('../../object-detection/index'),
    ffmpeg = require("../Utilities/ffmpeg");
// function that run the objectDetection alog, and return promise.  

function objectDetection(framesObject) {
    return ffmpeg.getVideoDimensions(framesObject.frames[0])
        .then(dimensions => {
            return detecion.findObjects(framesObject, dimensions.width, dimensions.height);
        });
}

module.exports = {
    objectDetection
}
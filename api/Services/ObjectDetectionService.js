let detecion = require('../../object-detection/index');
// function that run the objectDetection alog, and return promise.  

function objectDetection(framesObject) {
    return detecion.findObjects(framesObject);
}

module.exports = {
    objectDetection
}
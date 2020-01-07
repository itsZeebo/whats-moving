const MotionDetectionService = require('./MotionDetectionService').motionDetection,
    ObjectDetectionService = require('./ObjectDetectionService').objectDetection;


// The process includes: 
// 1. run motion detection algorithm.  
// 2. run object detection algorithm. 
function processFile(file) {
    console.log('start processFile method');
    console.log('run motion detection ... ');
    return MotionDetectionService()
    .then(() => {
        console.log('motion detection finished');
        console.log('run object detection ... ');
        return ObjectDetectionService();
    })
    .then(() => {
        console.log('object detection finished');
        return Promise.resolve();
    })
    .catch(err => {
        console.log('error in processFileService: ' + err);
        return Promise.reject(err);
    });
}

module.exports = {
    processFile
}
const path = require('path');

const FfmpegService = require('./FfmpegService').ffmpegProcess,
    MotionDetectionService = require('./MotionDetectionService').motionDetection,
    ObjectDetectionService = require('./ObjectDetectionService').objectDetection,
    Ffmpeg = require('../Utilities/ffmpeg'),
    ElasticProvider = require('../Utilities/ElasticsearchProvider'),
    fileManager = require('../Utilities/fileManager');

const fps = parseInt(process.env.FPS) || 15;     

// The process includes: 
// 1. run ffmpeg methods. 
// 2. run motion detection algorithm.  
// 3. run object detection algorithm. 
function processFile(file) {
    console.log('start processFile method');

    return Ffmpeg.getVideoDimensions(file.path)
    .then((data) => {
        console.log(`Video height and width are - ${data.height} X ${data.width}`);
        return ElasticProvider.AddVideo(file.filename, file.originalname, data.height, data.width);
    }) 
    .then(() => {
        console.log("Added video to elasticsearch");
        console.log(`run ffmpeg methods ...`); 
        return FfmpegService(file, fps)
    })
    .then(() => {
        console.log('ffmpeg methods finished');
        console.log('run motion detection ... ');
        return MotionDetectionService(file.filename, file.path)
    })
    .then((result) => {
        console.log('motion detection finished');
        console.log('run object detection ... ');
        return ObjectDetectionService(result);
    })
    .then(() => {
        console.log('object detection finished');
        return Promise.resolve();
    })
    .then(() => {
        let frameDirPath = path.join(path.dirname(file.path), 'frames');
        return fileManager.removeDir(frameDirPath);
    })
    .catch(err => {
        console.log('error in processFileService: ' + err);
        return Promise.reject(err);
    });
}

module.exports = {
    processFile
}
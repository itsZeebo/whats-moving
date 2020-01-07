const FfmpefService = require('./FfmpegService').ffmpegProcess,
    MotionDetectionService = require('./MotionDetectionService').motionDetection,
    ObjectDetectionService = require('./ObjectDetectionService').objectDetection,
    Ffmpeg = require('../Utilities/ffmpeg'),
    ElasticProvider = require('../Providers/ElasticsearchProvider');

const fps = parseInt(process.env.FPS) || 15;     

// The process includes: 
// 1. run ffmpeg methods. 
// 2. run motion detection algorithm.  
// 3. run object detection algorithm. 
function processFile(file) {
    console.log('start processFile method');
    
    const { height, width } = Ffmpeg.getVideoDimensions(file.path);
    await ElasticProvider.AddVideo(file.filename, file.originalname, height, width);

    console.log(`run ffmpeg methods ...`); 
    return FfmpefService(file.path, fps)
    .then(() => {
        console.log('ffmpeg methods finished')
        console.log('run motion detection ... ');
        return MotionDetectionService()
    })
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
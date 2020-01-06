const express = require('express');

const UploadFileService = require('../Services/UploadFileService'),
MotionDetectionService = require('../Services/MotionDetectionService').motionDetection,
ObjectDetectionService = require('../Services/ObjectDetectionService').objectDetection;

var router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.file) {
        return res.status(400).send('file was not sent in the request body'); 
    }
    
    let file = req.body.file; 
    // start upload process which includes: 
    // 1. upload the file to folder.
    // 2. run motion detection algorithm.  
    // 3. run object detection algorithm. 
    return UploadFileService.uploadFile(file)
    .then(() => {
        console.log('file was uploaded successfully');
        console.log('run motion detection ... ');
        return MotionDetectionService();
    })
    .then(() => {
        console.log('motion detection finished');
        console.log('run object detection ... ');
        return ObjectDetectionService();
    })
    .then(() => {
        console.log('object detection finished');
        console.log('upload process (and alogrithm) are done');
        return res.send('success');
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('internal server error');
    });
});

router.get('/test',(req, res) => {
 res.send('test succeed');
});

module.exports = router; 
const path = require('path');

const express = require('express'),
multer = require('multer');

const fileManager = require('../Utilities/fileManager');

const ProcessFileService = require('../Services/ProcessFileService');
const uploadDir = process.env.UPLOAD_DIR || "uploads/"

var router = express.Router();
var upload = multer({ dest: uploadDir });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('file was not sent in the request'); 
    }
    
    let file = req.file; 
    const fileName = file.originalname;

    console.log(`file ${fileName} was uploaded successfully to ${uploadDir}`);

    return fileManager.putFileInDir(file)
    .then((newPath) => {
        console.log(`video file moved to: ${newPath}`);
        return fileManager.createFramesDir(path.dirname(newPath));
    })
    .then(() => {
        console.log('frames dir created');
        return ProcessFileService.processFile(file);
    })
    .then(() => {
        console.log('upload & process (alogrithm) are done');
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
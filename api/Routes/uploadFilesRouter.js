const express = require('express'),
multer = require('multer');

const ProcessFileService = require('../Services/ProcessFileService');
const uploadPath = process.env.UPLOAD_PATH || "uploads/"

var router = express.Router();
var upload = multer({ dest: uploadPath });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('file was not sent in the request'); 
    }
    
    let file = req.file; 
    const fileName = file.originalname;

    console.log(`file ${fileName} was uploaded successfully to ${uploadPath}`);

    return ProcessFileService.processFile(file)
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
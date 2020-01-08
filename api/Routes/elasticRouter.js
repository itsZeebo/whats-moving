const express = require('express');

const ElasticService = require('../Services/ElasticService');

const router = express.Router();

router.get('/getAllVideos', (req, res) => {
    console.log('get all videos from elastic ... ');
    return ElasticService.getAllVideos()
    .then(videos => {
        console.log('found videos');
        res.send(videos); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    }); 
}); 

router.get('/getById/:id', (req, res) => {
    // TODO: check Id. 
    let videoId = req.params.id;
    console.log('get objects by VideoId ... ')
    return ElasticService.getObjectsByVideoId(videoId)
    .then((objects) => {
        console.log('got objects');
        res.send(objects); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('internal server error');
    });
});

router.post('/addObjectDetection', (req, res) => {
    // TODO: validations. 
    let detection = req.body.detection; 
    return ElasticService.addDetection(detection)
    .then(() => {
        res.send('success'); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).send('internal server error');
    })
});

module.exports = router;
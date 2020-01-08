const elasticProvider = require('../Utilities/ElasticsearchProvider');

function getAllVideos() {
    return elasticProvider.GetAllVideos();
}

function getObjectsByVideoId(videoId) {
    return elasticProvider.GetObjectsByVideoId(videoId);
}

function addVideoDetections(detection){
    return elasticProvider.AddObjectDetection(detection);
}


module.exports = {
    getAllVideos,
    getObjectsByVideoId,
    addVideoDetections
}
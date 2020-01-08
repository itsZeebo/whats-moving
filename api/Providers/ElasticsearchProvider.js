const Elasticsearch = require("@elastic/elasticsearch");

const ELASTICSEARCH_ADDRESS = "http://localhost:9200";
const VIDEOS_INDEX = "videos";
const DETECTIONS_INDEX = "video-detections";

let client;

function connect() {
    if (!client) {
        try {
            client = new Elasticsearch.Client({ node: ELASTICSEARCH_ADDRESS });
            console.log("Elasticsearch client connected!")
        } catch (ex) {
            console.log("Error while connecting to Elasticsearch: " + ex);
        }
    } else
        console.log("Client already connected");
}

function AddVideo(videoId, fileName, height, width) {
    return addResult = client.index({
        index: VIDEOS_INDEX,
        body: { id: videoId, fileName, height, width }
    });
}

function GetAllVideos() {
    return client.search({
        index: VIDEOS_INDEX,
        body: { query: { match_all: {} } }
    }).then(data => {
        return data.body.hits.hits.map(_ => _.source);
    });
}

function GetObjectsByVideoId(videoId) {
    return client.get({
        index: DETECTIONS_INDEX,
        id: videoId
    }).then(data => {
        return data._source;
    });
}

function AddObjectDetection(detection) {
    return client.index({ index: DETECTIONS_INDEX, body: detection });
}

module.exports = {
    connect,
    AddVideo,
    GetAllVideos,
    GetObjectsByVideoId,
    AddObjectDetection
};
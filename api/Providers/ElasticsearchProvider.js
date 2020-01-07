import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_ADDRESS = "http://localhost:9200";
const VIDEOS_INDEX = "videos";
const DETECTIONS_INDEX = "video-detections";

let client;

export function connect() {
    if (!client) {
        try {
            client = new Client({ node: ELASTICSEARCH_ADDRESS });
            console.log("Elasticsearch client connected!")
        } catch (ex) {
            console.log("Error while connecting to Elasticsearch: " + ex);
        }
    } else
        console.log("Client already connected");
}

export async function AddVideo(videoId, fileName, height, width) {
    const addResult = await client.index({
        index: VIDEOS_INDEX,
        body: { id: videoId, fileName, height, width }
    });

    return addResult;
}

export async function GetAllVideos() {
    const result = await client.search({
        index: VIDEOS_INDEX,
        body: { query: { match_all: {} } }
    });

    return result.body.hits.hits.map(_ => _.source);
}

export async function GetObjectsByVideoId(videoId) {
    const result = await client.get({
        index: DETECTIONS_INDEX,
        id: videoId
    });

    return result._source;
}

export async function AddObjectDetection(detection) {
    const addResult = await client.index({ index: DETECTIONS_INDEX, body: detection });
    return addResult;
}
require('dotenv').config();
//const tensorModel = process.env.TENSOR_MODEL == "coco-ssd" ? require('@tensorflow-models/coco-ssd') : require('@tensorflow-models/mobilenet');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const canvas = require('canvas');
const Promise = require('bluebird');
const path = require('path');

const ALPHA = Number(process.env.ALPHA || 0.5);
const VERSION = Number(process.env.VERSION) || 2;


function findObjects(framesUrlArray, width, height) {
  let numOfDetections = 0;
  console.log("Object detection process started")
  return cocoSsd.load() // { version: VERSION, alpha: ALPHA }
    .then(model => {
      console.log('TensorFlow Model loaded, starting detection operation');

      let readyFrames = []
      return Promise.each(framesUrlArray.frames, frame => {
        let frameObject = {};
        let imageData = canvas.createCanvas(width, height);
        let ctx = imageData.getContext('2d');
        let img = new canvas.Image;
        img.src = frame;
        ctx.drawImage(img, 0, 0, width, height);
        frameObject.frame = extractFrameName(frame);

        return model.detect(imageData)
          .then(pred => {
            pred.forEach(predObj => {
              predObj.bbox = { x: predObj.bbox[0], y: predObj.bbox[1], width: predObj.bbox[2], height: predObj.bbox[3] };
            });
            frameObject.predictions = pred;
            numOfDetections += pred.length;
            readyFrames.push(frameObject);
          })
          .catch(err => {
            console.log(`Error occured: ${err}`);
            reject(err);
          });
      })
        .then(() => {
          console.log(`Detection process done ,${numOfDetections} objects found`);

          return { id: framesUrlArray.videoId, frames: readyFrames };
        })
    })
    .catch(err => {
      console.log(`Error occured: ${err}`);
    });
}

function extractFrameName(fullpath) {
  return path.basename(fullpath, '.jpg');
}

let objects = {
  videoId: "1",
  frames: ['./004.jpg', './005.jpg', './006.jpg']
}
const WIDTH = 352;
const HEIGHT = 288;

findObjects(objects, WIDTH, HEIGHT).then(res => {
  console.log(res);
})
  .catch(err => {
    console.log(err);
  });



exports.findObjects = findObjects;

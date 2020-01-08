require('dotenv').config();
const tensorModel = process.env.TENSOR_MODEL == "coco-ssd" ? require('@tensorflow-models/coco-ssd') : require('@tensorflow-models/mobilenet');
const canvas = require('canvas');
const Promise = require('bluebird');
const path = require('path');

const ALPHA = Number(process.env.ALPHA || 0.5);
const VERSION = Number(process.env.VERSION) || 2;


function findObjects(framesUrlArray, width, height) {
  let img = new canvas.Image;
  let readyFrames = [];
  let imageData, ctx;
  let numOfDetections = 0;

  console.log("Object detection process started")
  return tensorModel.load({ version: VERSION, alpha: ALPHA })
    .then(model => {
      console.log('TensorFlow Model loaded, starting detection operation');

      return Promise.map(framesUrlArray, frame => {
        img.src = frame.fullpath;
        imageData = canvas.createCanvas(width, height);
        ctx = imageData.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        frame.fullpath = extractFrameName(frame.fullpath);

        return model.classify(imageData)
          .then(pred => {
            frame.pred = pred;
            numOfDetections += pred.length;
            readyFrames.push(frame);
          })
          .catch(err => {
            console.log(`Error occured: ${err}`);
            reject(err);
          });
      })
        .then(() => {
          console.log(`Detection process done ,${numOfDetections} objects found`);
          return readyFrames;
        })
    })
    .catch(err => {
      console.log(`Error occured: ${err}`);
    });
}

function extractFrameName(fullpath) {
  return path.basename(fullpath, '.jpg');
}

let objects = [
  { videoId: "1", fullpath: "./004.jpg", pred: "" },
  { videoId: "2", fullpath: "./005.jpg", pred: "" },
  { videoId: "3", fullpath: "./006.jpg", pred: "" }
];
const WIDTH = 352;
const HEIGHT = 288;

findObjects(objects, WIDTH, HEIGHT).then(res => {
  console.log(res);
})
  .catch(err => {
    console.log(err);
  });



exports.findObjects = findObjects;

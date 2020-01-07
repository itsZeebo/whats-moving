

//require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const canvas = require('canvas');
const Promise = require('bluebird');
const path = require('path');

function extractFrameName(fullpath){
  return path.basename(fullpath,'.jpg');
}

function findObjects(frameObj, width, height) {
  let img = new canvas.Image;
  return cocoSsd.load()
    .then(model => {
      let readyFrames = [];

      console.log('TensorFlow Model loaded');

      return Promise.map(frameObj, frame => {
        let imageData = canvas.createCanvas(width, height);
        let ctx = imageData.getContext('2d');
        
        img.src = frame.fullpath;
        frame.fullpath = extractFrameName(frame.fullpath);

        ctx.drawImage(img, 0, 0, width, height);
        return model.detect(imageData)
          .then(pred => {
            frame.pred = pred;
            readyFrames.push(frame);
          })
          .catch(err => {
            reject(err);
          });
      })
        .then(() => {
          return readyFrames;
        })
    })
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



module.exports.findObjects = findObjects;

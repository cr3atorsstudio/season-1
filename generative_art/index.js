const mergeImages = require('merge-images');
const fs = require('fs');
const { Canvas, Image } = require('canvas');

async function generatePinkyImage(hidari, migi) {

  const hidariParts = await imageParts(hidari)
  const migiParts = await imageParts(migi)

  mergeImages(['./images/base_image.png', ...hidariParts], {
    Canvas: Canvas,
    Image: Image
  })
  .then(
    b64 => {
    return new Buffer.from(b64.replace(/^data:image\/\w+;base64,/, ""),'base64');
    }
  ).then(
    decodedFile => {
      fs.writeFile('hidari.png', decodedFile, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('saved')
        }
      }
    )
  })
}

async function imageParts(word) {
  let wordArray = [];
  for (let i = 0; i < word.length; i+=2) {
    wordArray.push(`./images/${word.slice(i, i+2)}.png`);
  }
  return wordArray;
}

generatePinkyImage("000133", "302200")
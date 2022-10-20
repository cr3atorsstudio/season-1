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
            console.log('hidari saved')
        }
      }
    )
  })

  mergeImages(['./images/base_image.png', ...migiParts], {
    Canvas: Canvas,
    Image: Image
  })
  .then(
    b64 => {
    return new Buffer.from(b64.replace(/^data:image\/\w+;base64,/, ""),'base64');
    }
  ).then(
    decodedFile => {
      fs.writeFile('migi.png', decodedFile, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('migi saved')
        }
      }
    )
  })
}

async function imageParts(word) {
  let wordArray = word.split("").map(x => `images/${x}.png`)
  return wordArray
}

generatePinkyImage("000133", "302200")
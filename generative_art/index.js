const mergeImages = require('merge-images');
const fs = require('fs');
const { Canvas, Image } = require('canvas');

mergeImages(['./images/base_image.png', './images/0/00.png'], {
  Canvas: Canvas,
  Image: Image
})
  .then(
    b64 => {
     return new Buffer.from(b64.replace(/^data:image\/\w+;base64,/, ""),'base64');
    }
  ).then(
    decodedFile => {
      fs.writeFile('combined.png', decodedFile, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('saved')
        }
      }
    )
    })

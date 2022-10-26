const mergeImages = require("merge-images");
const fs = require("fs");
const { Canvas, Image } = require("canvas");

export const generatePinkyImage = async (hidari: string, migi: string) => {
  const hidariParts = await imageParts(hidari, "left");
  const migiParts = await imageParts(migi, "right");

  mergeImages(["./images/base_image.png", ...hidariParts, ...migiParts], {
    Canvas: Canvas,
    Image: Image,
  })
    .then((b64: string) => {
      //@ts-ignore
      return new Buffer.from(
        b64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    })
    .then((decodedFile: any) => {
      fs.writeFile(`../art${}.png`, decodedFile, (err: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log("saved");
        }
      });
    });
};

async function imageParts(word: string, side: string) {
  let wordArray = word.split("").map((x) => `images/${side}/${x}.png`);
  return wordArray;
}

// MEMO: sample
// generatePinkyImage("いか", "かし")

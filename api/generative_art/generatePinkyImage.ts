import fs from "fs";
import { Canvas, Image } from "canvas";
import mergeImages from "merge-images";

export const generatePinkyImage = async (
  hidari: string,
  migi: string,
  pinkyFileName: string
) => {
  const hidariParts = await imageParts(hidari, "left");
  const migiParts = await imageParts(migi, "right");

  await mergeImages(
    //TODO: Merge stuffs.
    //["./generative_art/images/base_image.png", ...hidariParts, ...migiParts],
    ["./generative_art/images/base_image.png"],
    {
      Canvas: Canvas,
      Image: Image,
    }
  )
    .then((b64: string) => {
      //@ts-ignore
      return new Buffer.from(
        b64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    })
    .then((decodedFile) => {
      fs.writeFile(`${pinkyFileName}.png`, decodedFile, (err: any) => {
        if (!err) {
          return pinkyFileName;
        } else {
          console.log(err);
        }
      });
    });
};

async function imageParts(word: string, side: string) {
  let wordArray = word
    .split("")
    .map((x) => `./generative_art/images/${side}/${x}.png`);
  return wordArray;
}

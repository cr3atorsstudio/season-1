import { Canvas, Image } from "canvas";
import dayjs from "dayjs";
import fs from "fs";
import mergeImages from "merge-images";
import { generatePinkyImage } from "./generative_art/generatePinkyImage";
import { genImages } from "./generative_art/test";

const imagesSaveDir = "./generative_art/dist";
const formatted = dayjs().format("YYYYMMDDHHmm");
const backgroundFileName = `./generative_art/dist/background_${formatted}`;
const pinkyFileName = `./generative_art/dist/pinky_${formatted}`;

if (!fs.existsSync(imagesSaveDir)) {
  fs.mkdirSync(imagesSaveDir);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const saveImage = async () => {
  await genImages(220, 25, backgroundFileName),
    console.log("generatedBackground");
  await generatePinkyImage("いか", "かし", pinkyFileName);
  console.log("generatedPinky");
  await delay(3000);
  console.log(backgroundFileName);
  console.log(pinkyFileName);
  await mergeImages(
    [
      `${backgroundFileName}.png`,
      { src: `${pinkyFileName}.png`, x: 100, y: 300 },
    ],
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
    .then((decodedFile: any) => {
      const fileName = `${imagesSaveDir}/shiritoriArt_${formatted}.png`;
      fs.writeFile(fileName, decodedFile, (err: any) => {
        if (err) {
          return fileName;
        } else {
          console.log("saved");
        }
      });
    });
  //TODO: Merge risacan's generative art
  //const readableStreamForFile = fs.createReadStream(`./dist/${fileName}.png`);
  //sendFileToIPFS(readableStreamForFile);
};

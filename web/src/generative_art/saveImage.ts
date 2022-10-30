import { Canvas, Image } from "canvas";
import dayjs from "dayjs";
import fs from "fs";
import mergeImages from "merge-images";
//import { uploadToS3 } from "utils/uploadToS3";
import { generatePinkyImage } from "./generatePinkyImage";
import { genImages } from "./test";
import { sendFileToIPFS } from "./UploadToPinata";

const imagesSaveDir = "./src/generative_art/dist";
const formatted = dayjs().format("YYYYMMDDHHmm");
const backgroundFileName = `./src/generative_art/dist/background_${formatted}`;
const pinkyFileName = `./src/generative_art/dist/pinky_${formatted}`;

if (!fs.existsSync(imagesSaveDir)) {
  fs.mkdirSync(imagesSaveDir);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function saveImage(): Promise<any> {
  await genImages(220, 25, backgroundFileName);
  console.log("generatedBackground");
  await generatePinkyImage(lastWord, currentWord, pinkyFileName);
  console.log("generatedPinky");
  const fileName = `shiritoriArt_${formatted}.png`;
  const filePath = `${imagesSaveDir}/${fileName}`;
  await delay(3000);
  await mergeImages(
    [
      `${backgroundFileName}.png`,
      { src: `${pinkyFileName}.png`, x: 0, y: 300 },
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
      fs.writeFile(filePath, decodedFile, (err: any) => {
        if (err) {
          return filePath;
        } else {
          console.log("saved");
        }
      });
    });
  //TODO: Merge risacan's generative art
  const readableStreamForFile = fs.createReadStream(filePath);
  const hash = await sendFileToIPFS(readableStreamForFile);
  console.log(hash);
  //uploadToS3(hash, 0);
}

saveImage();

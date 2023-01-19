import { Canvas, Image } from "canvas";
import dayjs from "dayjs";
import fs from "fs";
import mergeImages from "merge-images";
import { decode, encode } from "./encode";
import { generatePinkyImage } from "./generative_art/generatePinkyImage";
import { generateBackgroundImage } from "./generative_art/p5";
import { uploadMetadataToS3 } from "./generative_art/uploadMetadataToS3";
import { fetch } from "cross-fetch";
import { uploadImageToS3 } from "./generative_art/uploadImageToS3";

const MAX_LENGTH = 5;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const saveImage = async (
  lastWord: string,
  currentWord: string,
  currentWordNum: number,
  tokenId: number
) => {
  const formatted = dayjs().format("YYYYMMDDHHmm");
  const imagesSaveDir = "./generative_art/dist";
  const backgroundFileName = `./generative_art/dist/background_${formatted}`;
  const pinkyFileName = `./generative_art/dist/pinky_${formatted}`;
  const fileName = `${imagesSaveDir}/shiritoriArt_${formatted}`;
  const lastWordNumber = encode(lastWord, MAX_LENGTH).toString().slice(0, 2);
  const currentWordNumber = encode(currentWord, MAX_LENGTH)
    .toString()
    .slice(0, 2);

  await generateBackgroundImage(
    lastWordNumber,
    currentWordNumber,
    backgroundFileName
  );

  await generatePinkyImage(lastWord, currentWord, pinkyFileName);

  await delay(8000);
  const b64 = await mergeImages(
    [
      `${backgroundFileName}.png`,
      { src: `${pinkyFileName}.png`, x: 100, y: 300 },
    ],
    {
      Canvas: Canvas,
      Image: Image,
    }
  );
  //@ts-ignore
  const decodedFile = new Buffer.from(
    b64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  fs.writeFile(`${fileName}.png`, decodedFile, async (err: any) => {
    if (err) {
      return new Error(err);
    } else {
      const readableStreamForFile = fs.createReadStream(`${fileName}.png`);
      await uploadImageToS3(readableStreamForFile, tokenId);
      await uploadMetadataToS3(currentWordNum, tokenId, currentWord, lastWord);
    }
  });
  await delay(20000);
  return tokenId;
};

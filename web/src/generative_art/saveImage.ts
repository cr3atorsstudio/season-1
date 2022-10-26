import fs from "fs";
import { generatePinkyImage } from "./generatePinkyImage";
import { genImages } from "./test";

const imagesSaveDir = "./src/generativeArt/dist";

if (!fs.existsSync(imagesSaveDir)) {
  fs.mkdirSync(imagesSaveDir);
}

const fileName = await genImages(220, 25, imagesSaveDir);
const pinkyImage = await generatePinkyImage("いか", "かし");
console.log(fileName);
//TODO: Merge risacan's generative art
//const readableStreamForFile = fs.createReadStream(`./dist/${fileName}.png`);
//sendFileToIPFS(readableStreamForFile);

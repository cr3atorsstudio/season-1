import fs from "fs";
import { genImages } from "./test";
//import { sendFileToIPFS } from "./UploadToPinata";

const imagesSaveDir = "./src/generativeArt/dist";

if (!fs.existsSync(imagesSaveDir)) {
  fs.mkdirSync(imagesSaveDir);
}

const fileName = await genImages(220, 25, imagesSaveDir);
console.log(fileName);
//TODO: Merge risacan's generative art
//const readableStreamForFile = fs.createReadStream(`./dist/${fileName}.png`);
//sendFileToIPFS(readableStreamForFile);

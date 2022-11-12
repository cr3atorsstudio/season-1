import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

AWS.config.logger = console;

const bucketName = "shiriitori";

export const uploadToS3 = (
  currentWord: string,
  imagePath: string,
  id: number
) => {
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = new S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "ap-northeast-1",
  });
  const data = {
    name: "Shiritori Art App",
    description:
      "Shiritori Art App is an application to play Shiritori using Japanese words on the blockchain. Generative art based on Shiritori words is generated and distributed as NFT.",
    image: imagePath,
    word: currentWord,
  };
  const json = Buffer.from(JSON.stringify(data));
  const param: S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: `metadata/${id}.json`, // ファイル絶対パス
    Body: json, // ファイルの内容
    ACL: "public-read", // インターネットから誰でもダウンロードできるように
    ContentType: "text/plain",
  };
  bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Successfully uploaded file.", data);
    }
  });
};

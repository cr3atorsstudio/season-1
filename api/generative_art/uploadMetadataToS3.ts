import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

AWS.config.logger = console;

export const uploadMetadataToS3 = (
  currentWordNum: number,
  id: number,
  currentWord: string,
  lastWord: string
) => {
  const bucketName = process.env.BUCKET_NAME;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = new S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "ap-northeast-1",
  });
  const data = {
    name: `Shiritori NFT #${id}`,
    description:
      "Shiritori NFT is an application to play Shiritori using Japanese words on the blockchain. Generative art based on Shiritori words is generated and distributed as NFT.",
    image: `https://${process.env.BUCKET_NAME}.s3.us-east-1.amazonaws.com/v2/images/${id}.png`,
    word_number: currentWordNum,
    currentWord: currentWord,
    lastWord: lastWord,
  };
  const json = Buffer.from(JSON.stringify(data));
  if (bucketName) {
    const param: S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: `v2/metadata/${id}.json`,
      Body: json,
      ACL: "public-read",
      ContentType: "application/json",
    };
    bucket
      .upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Successfully uploaded file.", data);
        }
      })
      .promise();
  }
};

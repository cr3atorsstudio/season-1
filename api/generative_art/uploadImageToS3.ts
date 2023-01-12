import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

AWS.config.logger = console;

const bucketName = process.env.BUCKET_NAME;

export const uploadImageToS3 = (image: any, id: number) => {
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = new S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: "ap-northeast-1",
  });
  if (bucketName) {
    const param: S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: `images/${id}.png`,
      Body: image,
      ACL: "public-read",
      ContentType: "image/png",
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

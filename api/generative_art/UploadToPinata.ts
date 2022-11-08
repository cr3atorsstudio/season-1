import pinataSDK from "@pinata/sdk";

export const sendFileToIPFS = async (imageData: any) => {
  imageData;
  // Use the api keys by specifying your api key and api secret
  const pinata = pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_API_SECRET,
  });

  const options = {
    pinataMetadata: {
      name: "SHIRITORI_GENERATIVE_ART",
    },
  };
  pinata
    .pinFileToIPFS(imageData, options)
    .then((result: any) => {
      `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    })
    .catch((err: any) => {
      //handle error here
      console.log(err);
    });
};

import pinataSDK from "@pinata/sdk";

export const sendFileToIPFS = async (imageData: any, tokenId: string) => {
  imageData;
  // Use the api keys by specifying your api key and api secret
  const pinata = new pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_API_SECRET,
  });

  const options = {
    pinataMetadata: {
      name: `SHIRITORI_GENERATIVE_ART_${tokenId}`,
    },
  };
  const result = await pinata.pinFileToIPFS(imageData, options);
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
};

import pinataSDK from "@pinata/sdk";

export const sendFileToIPFS = async (imageData: any) => {
  imageData;
  // Use the api keys by specifying your api key and api secret
  const pinata = pinataSDK({
    pinataApiKey: "07f9b4928a2c266ea97e",
    pinataSecretApiKey:
      "127f74b54ca94d2b71c11e2bb4a728a775ba39e000f099fbc0cdcfd2be998206",
    //pinataApiKey: import.meta.env.VITE_APP_PINATA_API_KEY,
    //pinataSecretApiKey: import.meta.env.VITE_APP_PINATA_API_SECRET,
  });

  const options = {
    pinataMetadata: {
      name: "SHIRITORI_GENERATIVE_ART",
    },
  };
  pinata
    .pinFileToIPFS(imageData, options)
    .then((result: any) => {
      console.log(result);
      return result;
    })
    .catch((err: any) => {
      //handle error here
      console.log(err);
      throw Error(err);
    });
};

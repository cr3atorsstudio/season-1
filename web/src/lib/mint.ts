import { ethers } from "ethers";

// TODO: authenticationWordsを取得する関数の作成

export const mintNFT = async (
  shiritori: ethers.Contract,
  lastLastWordNum: number,
  lastWordNum: number,
  word: number
) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const transaction = await shiritori.mint(
        word,
        lastLastWordNum,
        lastWordNum,
        {
          gasLimit: 600000,
        }
      );

      return transaction;
    } else {
      console.log("wallet is not connected");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

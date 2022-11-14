import { ethers } from "ethers";

// TODO: authenticationWordsを取得する関数の作成

export const mintNFT = async (
  shiritori: ethers.Contract,
  authenticationWord: number,
  word: number
) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      await shiritori.mint(word, authenticationWord, {
        gasLimit: 300000,
      });

      return true;
    } else {
      console.log("wallet is not connected");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

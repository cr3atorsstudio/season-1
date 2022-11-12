import { ethers } from "ethers";
import { contractAddress } from "constants/contract";
import abi from "../utils/Shiritori.json";

// TODO: authenticationWordsを取得する関数の作成

const contractABI = abi.abi;

export const mintNFT = async (authenticationWord: number, word: number) => {
  console.log("mint!");
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const shiritori = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      shiritori.mint(word, authenticationWord);
    } else {
      console.log("wallet is not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

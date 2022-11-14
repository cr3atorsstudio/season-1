import { ethers } from "ethers";
import { contractAddress } from "constants/contract";
import abi from "../utils/Shiritori.json";

// TODO: authenticationWordsを取得する関数の作成

const contractABI = abi.abi;

export const mintNFT = async (authenticationWord: number, word: number) => {
  try {
    const { ethereum } = window;
    console.log(ethereum, ">>>");
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const shiritori = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await shiritori.mint(word, authenticationWord, {
        gasLimit: 300000,
      });

      console.log(txn, "done");

      return true;
    } else {
      console.log("wallet is not connected");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

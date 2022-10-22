import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";
import { contractAddress } from "constants/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../utils/Shiritori.json";

import useHandleAction from "./hooks";

const Play = () => {
  const {
    handleWordChange,
    handleOnClick,
    isValidJapanese,
    inputWord,
    hasWordError,
    wordErrorMessage,
  } = useHandleAction();
  const [wordNumber, setWordNumber] = useState(0)

  const contractABI = abi.abi;

  const getWordNumber = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const shiritori = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        const address = await provider.getCode(contractAddress)
        console.log(address)
        console.log("fetching shiritori contract");
        console.log(shiritori)
        const wordBigInt = await shiritori.lastWord();
        console.log(wordBigInt)
        setWordNumber(wordBigInt.toNumber())
      } else {
        console.log("wallet is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWordNumber()
  }, [])

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-20'>
          <p className='text-center md:text-xl'>現在の最後の単語は...</p>
          {/* TODO: 数値から単語に変換した文字に変更 */}
          <p className='font-nico text-[80px] md:text-[128px]'>{wordNumber}</p>
        </div>
        <img
          src='public/images/arrow.png'
          alt='arrow'
          className='h-20 md:h-auto'
        />
        <div className='flex flex-col items-center justify-center'>
          <WordInput onChangeAction={handleWordChange} />
          {hasWordError && <p className='text-red-500 text-center md:text-xl mt-5'>{wordErrorMessage}</p>}
          <Button text={"つなげる"} onClick={handleOnClick} />
        </div>
      </div>
    </>
  );
};

export default Play;

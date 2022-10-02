import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";

import useHandleAction from "./hooks";

const Play = () => {
  const {
    handleWordChange,
    handleOnClick,
    isValidJapanese,
    inputWord,
    wordErrorMessage,
  } = useHandleAction();

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-20'>
          <p className='text-center md:text-xl'>現在の最後の単語は...</p>
          {/* TODO: ここはコントラクトから最後の単語を取ってきて入れる */}
          <p className='font-nico text-[80px] md:text-[128px]'>りんご</p>
        </div>
        <img
          src='public/images/arrow.png'
          alt='arrow'
          className='h-20 md:h-auto'
        />
        <div className='flex flex-col items-center justify-center'>
          <WordInput onChangeAction={handleWordChange} />
          <Button text={"つなげる"} onClick={handleOnClick} />
          {wordErrorMessage}
        </div>
      </div>
    </>
  );
};

export default Play;

import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";
import useHandleAction from "./hooks";

const Play = () => {
  const {
    handleWordChange,
    handleOnClick,
    lastWord,
    hasWordError,
    wordErrorMessage,
  } = useHandleAction();

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-20'>
          <p className='text-center md:text-xl'>現在の最後の単語は...</p>
          <p className='font-nico text-[80px] md:text-[128px]'>{lastWord}</p>
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

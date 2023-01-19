import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";
import useHandleAction from "./hooks";
import { LoadingSpinner } from "components/Spinner";
import { Notification } from "components/Notification";
import { Player } from "@lottiefiles/react-lottie-player";
import parse from "html-react-parser";
import { Footer } from "components/Footer";

const Play = () => {
  const {
    handleWordChange,
    handleOnClick,
    handleOnClickNotification,
    lastWord,
    hasWordError,
    wordErrorMessage,
    isLoading,
    nextTokenId,
    process,
    isConnected,
  } = useHandleAction();

  const errorTexts = wordErrorMessage.split("\n").map((text, index) => {
    return (
      <div key={index}>
        {text}
        <br />
      </div>
    );
  });

  return (
    <>
      <Navbar />
      {isConnected ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mt-20">
            <p className="mb-10 text-center md:text-xl">
              {process.show && parse(process.message)}
            </p>
            <p className="mb-10 text-center md:text-xl">
              現在繋がっている単語数：{nextTokenId > 0 ? nextTokenId - 1 : 0}
              単語
            </p>
            <p className="text-center md:text-xl">現在の最後の単語は...</p>
            <p className="font-nico text-[80px] md:text-[128px]">{lastWord}</p>
          </div>
          <img src="/images/arrow.png" alt="arrow" className="h-20 md:h-auto" />
          <div className="flex flex-col items-center justify-center">
            {isLoading ? (
              <>
                <LoadingSpinner />
              </>
            ) : (
              <>
                <WordInput
                  onChangeAction={handleWordChange}
                  lastWord={lastWord}
                />
                {hasWordError && (
                  <div className="mt-5 text-left text-red-500 md:text-xl">
                    {errorTexts}
                  </div>
                )}
                <Button text={"つなげる"} onClick={handleOnClick} />
              </>
            )}
          </div>
          <a
            href="https://rarible.com/shiritorinft"
            target="_blank"
            className="mt-10 underline"
          >
            いままでに繋がったShiritori NFTをみる
          </a>

          {process.show && (
            <Notification
              process={process}
              onClickAction={handleOnClickNotification}
            />
          )}
        </div>
      ) : (
        <>
          <div className="mr-24 flex justify-end">
            <div className="w-10 md:h-[150px] md:w-[150px]">
              <Player
                src="https://assets7.lottiefiles.com/packages/lf20_0oummbbk.json"
                className="player"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="mt-20">
            <p className="mx-10 mt-10 mb-20 text-center text-[20px] font-bold md:text-[60px]">
              まずはあなたのWalletにつなげてみましょう！
            </p>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Play;

import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";
import useHandleAction from "./hooks";
import { LoadingSpinner } from "components/Spinner";
import { Notification } from "components/Notification";

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
      <div className="flex flex-col items-center justify-center">
        <div className="mt-20">
          {isConnected ? (
            <div>
              <p className="mb-10 text-center md:text-xl">
                  現在繋がっている単語数：{nextTokenId > 0 ? nextTokenId - 1 : 0}単語
              </p>
              <p className="text-center md:text-xl">現在の最後の単語は...</p>
              <p className="font-nico text-[80px] md:text-[128px]">{lastWord}</p>
            </div>
            ) : (
            <div>
              <p>
                まずはあなたのWalletにつなげてください！
              </p>
            </div>
            )}
        </div>
        <img
          src="public/images/arrow.png"
          alt="arrow"
          className="h-20 md:h-auto"
        />
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

        {process.show && (
          <Notification
            process={process}
            onClickAction={handleOnClickNotification}
          />
        )}
      </div>
    </>
  );
};

export default Play;

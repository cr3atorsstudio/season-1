import { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";
import { mintNFT } from "lib/mint";
import { encode, decode } from "constants/encodeDecode";
import { contractAddress } from "constants/contract";
import { ethers } from "ethers";
import abi from "../../utils/Shiritori.json";

const {
  setLastWord,
  setInputWord,
  verifyJapaneseWord,
  checkWordError,
  setWordErrorMessage,
  setLoading,
  setContract,
  setNextTokenId,
} = actions;

const maxLength = 5;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
    dispatch(checkWordError(false));
    dispatch(setWordErrorMessage(""));
    dispatch(setInputWord(input));
  };

  const handleOnClick = async () => {
    dispatch(setLoading(true));
    let lastCharacter: string = state.lastWord.slice(-1);
    let hiraganaInputWord: string = "";

    // 前の単語が特殊文字で終了する場合の最終文字の変形処理
    if (state.lastWord) {
      if (lastCharacter === "ー") {
        lastCharacter = state.lastWord.slice(0, -1).slice(-1);
      }
      switch (lastCharacter) {
        case "ぁ":
          lastCharacter = "あ";
          break;
        case "ぃ":
          lastCharacter = "い";
          break;
        case "ぅ":
          lastCharacter = "う";
          break;
        case "ぇ":
          lastCharacter = "え";
          break;
        case "ぉ":
          lastCharacter = "お";
          break;
        case "っ":
          lastCharacter = "つ";
          break;
        case "ゃ":
          lastCharacter = "や";
          break;
        case "ゅ":
          lastCharacter = "ゆ";
          break;
        case "ょ":
          lastCharacter = "よ";
          break;
        case "ゎ":
          lastCharacter = "わ";
          break;
        default:
      }
    }

    const changeToHiragana = (text: string) => {
      return new Promise<string>((resolve, reject) => {
        kuromoji
          .builder({ dicPath: "/dict" })
          .build((error: Error, tokenizer: any) => {
            if (error) {
              reject(error);
              return;
            } else {
              const tokens: any[] = tokenizer.tokenize(text);
              console.log(tokens);
              if (tokens.length === 0 || tokens.length > 1) {
                dispatch(checkWordError(true));
                dispatch(setLoading(false));
                dispatch(
                  setWordErrorMessage(
                    "単語が認識できませんでした。以下のことを試してください。\n-　ひらがなとカタカナを入れ替える（×: ごりら、◯: ゴリラ）\n-　複数単語の場合は一単語にする（×: ごまだんご、◯: ごま）\n-　別の単語を入力する"
                  )
                );
                return;
              }
              if (tokens[0].word_type === "UNKNOWN") {
                dispatch(checkWordError(true));
                dispatch(setLoading(false));
                dispatch(
                  setWordErrorMessage(
                    "単語が認識できませんでした。以下のことを試してください。\n-　ひらがなとカタカナを入れ替える（×: ごりら、◯: ゴリラ）\n-　複数単語の場合は一単語にする（×: ごまだんご、◯: ごま）\n-　別の単語を入力する"
                  )
                );
                return;
              }
              if (!tokens[0].reading) {
                dispatch(checkWordError(true));
                dispatch(setLoading(false));
                dispatch(
                  setWordErrorMessage(
                    "単語が認識できませんでした。以下のことを試してください。\n-　ひらがなとカタカナを入れ替える（×: ごりら、◯: ゴリラ）\n-　複数単語の場合は一単語にする（×: ごまだんご、◯: ごま）\n-　別の単語を入力する"
                  )
                );
                return;
              }
              let reading: string = tokens[0].reading;
              const hiragana: string = reading.replace(
                /[\u30a1-\u30f6]/g,
                function (match: string) {
                  const chr = match.charCodeAt(0) - 0x60;
                  return String.fromCharCode(chr);
                }
              );
              resolve(hiragana);
            }
          });
      });
    };

    // 入力が無い場合のエラー
    if (!state.inputWord) {
      dispatch(checkWordError(true));
      dispatch(setWordErrorMessage("単語を入力してください。"));
    }
    // 前の単語の最終語句と続いているか確認し、繋がっていればstateをtrueに変更する
    if (state.inputWord) {
      changeToHiragana(state.inputWord)
        .then((data: string): void => {
          console.log("changeToHiragana", data);
          hiraganaInputWord = data;
        })
        .then(async (): Promise<void> => {
          if (hiraganaInputWord.length > 5) {
            dispatch(checkWordError(true));
            dispatch(setWordErrorMessage("6文字以上の単語は入力できません。"));
            dispatch(setLoading(false));
            return;
          }
          if (hiraganaInputWord.slice(-1) === "ん") {
            dispatch(checkWordError(true));
            dispatch(
              setWordErrorMessage("最後が「ん」で終わる単語は入力できません。")
            );
            dispatch(setLoading(false));
            return;
          }
          // 成功の場合ここにくる
          if (lastCharacter === hiraganaInputWord.slice(0, 1)) {
            console.log("hiraganaInputWord", hiraganaInputWord);

            dispatch(verifyJapaneseWord(true));
            console.log("hiraganaInputWord", hiraganaInputWord);
            const wordNum = encode(hiraganaInputWord, maxLength);
            console.log("decoded", decode(wordNum, maxLength));

            console.log("the input word can follow the previous word!");

            await mint(hiraganaInputWord, wordNum);
          }
          console.log("lastCharactoer", lastCharacter);
          if (lastCharacter !== hiraganaInputWord.slice(0, 1)) {
            dispatch(checkWordError(true));
            dispatch(setWordErrorMessage("前の単語につながりません。"));
            dispatch(setLoading(false));
          }
        });
    }
  };

  const contractABI = abi.abi;

  const getLastWord = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const shiritori = state.contract
          ? state.contract
          : new ethers.Contract(contractAddress, contractABI, signer);

        const wordBigInt = await shiritori.lastWord();
        const lastWordNum: number = wordBigInt.toNumber();
        const lastWord: string = decode(lastWordNum, maxLength);
        console.log("lastword", lastWord);

        dispatch(setLastWord(lastWord));
      } else {
        console.log("wallet is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTokenId = async (): Promise<number> => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const shiritori = state.contract
        ? state.contract
        : new ethers.Contract(contractAddress, contractABI, signer);

      console.log("fetching shiritori contract");
      const tokenId = await shiritori.nextTokenId();
      const id = tokenId.toNumber();
      dispatch(setNextTokenId(id));
      return id;
    } else {
      throw new Error("wallet is not connected");
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();
      const shiritori = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      dispatch(setContract(shiritori));
    }
  }, []);

  useEffect(() => {
    const onMintComplete = (nextTokenId: number) => {
      getLastWord();
      dispatch(setNextTokenId(nextTokenId));
      dispatch(setLoading(false));
    };

    if (state.contract) {
      state.contract.on("NFTMinted", onMintComplete);
    }

    return () => {
      if (state.contract) {
        state.contract.off("NFTMinted", onMintComplete);
      }
    };
  }, [state.contract]);

  useEffect(() => {
    getLastWord();
    getTokenId();
  }, [state.nextTokenId]);

  const mint = async (currentWord: string, currentWordNum: number) => {
    const id = await getTokenId();
    const body = {
      lastWord: state.lastWord,
      currentWord: currentWord,
      currentWordNum: currentWordNum,
      tokenId: id,
    };
    const response = await window.fetch(
      `${import.meta.env.VITE_API_URL}/generate`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );

    const { word: lastLastWord, errors } = await response.json();
    if (!response.ok) {
      const error = new Error(
        errors?.map((e: any) => e.message).join("\n") ?? "unknown"
      );
      dispatch(setLoading(false));
      return Promise.reject(error);
    }

    if (lastLastWord !== undefined && currentWordNum && state.contract) {
      const isMinted = await mintNFT(
        state.contract,
        lastLastWord,
        currentWordNum
      );

      if (!isMinted) {
        dispatch(setLoading(false));
      }
    }
  };

  return {
    ...state,
    handleWordChange: handleWordChange,
    handleOnClick: handleOnClick,
  };
};

export default useHandleAction;

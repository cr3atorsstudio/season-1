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
} = actions;

const maxLength = 5;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
    dispatch(checkWordError(false));
    dispatch(setWordErrorMessage(""));
    dispatch(setInputWord(input));
  };

  const handleOnClick = () => {
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
      return new Promise<string> ((resolve, reject) => {
        kuromoji.builder({ dicPath: "/dict" }).build((error: Error, tokenizer: any) => {
          if(error){
            reject(error);
            return;
          } else {
            const tokens: any[] = tokenizer.tokenize(text);
            console.log(tokens);
            if (tokens.length === 0 || tokens.length > 1) {
              dispatch(checkWordError(true));
              dispatch(setWordErrorMessage("一単語だけ入力してください。"));
              return;
            }
            if (tokens[0].word_type === 'UNKNOWN') {
              dispatch(checkWordError(true));
              dispatch(setWordErrorMessage("実際に存在する単語を入力してください。"));
              return;
            }
            if (!tokens[0].reading) {
              dispatch(checkWordError(true));
              dispatch(setWordErrorMessage("認識できませんでした。別の単語を入力してください。"));
              return;
            }
            let reading: string = tokens[0].reading;
            const hiragana: string = reading.replace(/[\u30a1-\u30f6]/g, function(match: string) {
              const chr = match.charCodeAt(0) - 0x60;
              return String.fromCharCode(chr);
            });
            resolve(hiragana);
          }
        })
      })
    }

    // 入力が無い場合のエラー
    if(!state.inputWord) {
      dispatch(checkWordError(true));
      dispatch(setWordErrorMessage("単語を入力してください。"));
    }

    // 前の単語の最終語句と続いているか確認し、繋がっていればstateをtrueに変更する
    if(state.inputWord) {
      changeToHiragana(state.inputWord)
        .then((data: string): void => {
          console.log(data);
          hiraganaInputWord = data;
        })
        .then((): void => {
          if (hiraganaInputWord.length > 5) {
            dispatch(checkWordError(true));
            dispatch(setWordErrorMessage("6文字以上の単語は入力できません。"));
            return;
          }
          if (hiraganaInputWord.slice(-1) === "ん") {
            dispatch(checkWordError(true));
            dispatch(setWordErrorMessage("最後が「ん」で終わる単語は入力できません。"));
            return;
          }
          if (lastCharacter === hiraganaInputWord.slice(0, 1)) {
            dispatch(verifyJapaneseWord(true));
            console.log("the input word can follow the previous word!");
          }
          if (lastCharacter !== hiraganaInputWord.slice(0, 1)) {
            dispatch(checkWordError(true));
            dispatch(setWordErrorMessage("前の単語につながりません。"));
          }
        });
    }
  };

  /* ------- Test code -------- */

  const test = (function() {
    let counter = 0;

    return (word: string) => {
      console.log(`\n======== Test ${counter} ========\n`);
      console.log(`Original word = '${word}'`);

      const enc = encode(word, maxLength);
      console.log(`Encoded code  = ${enc}`);

      const dec = decode(enc, maxLength);
      console.log(`Decoded word  = '${dec}'`);

      counter++;
    }
  })();

  test("りんご");
  test("おかき");
  test("くりえいと");
  test("じゃんぷ");
  test("なが〜〜〜〜い");

  // 現状の最後の単語をfetchするfunction
  // & 現状の最後の単語の数値から単語に変換する
  // & 現状の最後の単語をstate(lastWord)に格納する
  const contractABI = abi.abi;

  const getLastWord = async () => {
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
        console.log("fetching shiritori contract");
        // const wordBigInt = await shiritori.lastWord();
        // const lastWordNum: number = wordBigInt.toNumber();
        const lastWord: string = decode(661299, maxLength);
        dispatch(setLastWord(lastWord));
      } else {
        console.log("wallet is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLastWord();
  }, []);

  useEffect(() => {
    // useEffect内に入れない方が良い
    const word = 0;
    if (word) mintNFT(word);
    // TODO: add some dependencies
  }, []);

  // TODO: 入力した単語をsetするfunction

  return {
    ...state,
    // getLastWord: getLastWord,
    handleWordChange: handleWordChange,
    handleOnClick: handleOnClick,
  };
};

export default useHandleAction;

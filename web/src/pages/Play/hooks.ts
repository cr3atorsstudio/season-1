import { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";

const {
  setLastWord,
  setInputWord,
  verifyJapaneseWord,
  setError,
  checkWordError,
  setWordErrorMessage,
} = actions;

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

  useEffect(() => {
    // TODO: 現状の最後の単語をfetchするfunctionを入れる
  });

  // TODO: 入力した単語をsetするfunction
  // TODO: スマコンに送る auth word を定義

  return {
    ...state,
    handleWordChange: handleWordChange,
    handleOnClick: handleOnClick,
  };
};

export default useHandleAction;

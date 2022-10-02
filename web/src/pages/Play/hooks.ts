import { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";

const { setInputWord, verifyJapaneseWord } = actions;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
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

    if (state.inputWord) {
      // kuromojiを使って入力単語をひらがなに変換する処理
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
                  console.log("Please input one word.");
                  return;
                }
                if (tokens[0].word_type === "UNKNOWN") {
                  console.log("Please input KNOWN word.");
                  return;
                }
                if (!tokens[0].reading) {
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

      // 前の単語の最終語句と続いているか確認し、繋がっていればstateをtrueに変更する
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
            console.log("the input word cannot follow the previous word!");
          }
        });
    }
  };

  useEffect(() => {
    // TODO: 現状の最後の単語をfetchするfunctionを入れる
  });

  // TODO: 入力した単語をsetするfunction

  return {
    ...state,
    handleWordChange: handleWordChange,
    handleOnClick: handleOnClick,
  };
};

export default useHandleAction;

import { useEffect, useReducer, useState } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";

const { setLastWord, setInputWord, verifyJapaneseWord, setError } = actions;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
    dispatch(setInputWord(input));
  };

  const handleOnClick = () => {
    let lastLetter: string = state.lastWord.slice(-1);
    let hiraganaInputWord: string = "";

    // 前の単語が特殊文字で終了する場合の最終文字の変形処理
    if (state.lastWord) {
      
      if (lastLetter === 'ー') {
        lastLetter = state.lastWord.slice(0, -1).slice(-1);
      }
      switch(lastLetter) {
        case 'ぁ':
            lastLetter = 'あ';
            break;
        case 'ぃ':
            lastLetter = 'い';
            break;
        case 'ぅ':
            lastLetter = 'う';
            break;
        case 'ぇ':
            lastLetter = 'え';
            break;
        case 'ぉ':
            lastLetter = 'お';
            break;
        case 'っ':
            lastLetter = 'つ';
            break;
        case 'ゃ':
            lastLetter = 'や';
            break;
        case 'ゅ':
            lastLetter = 'ゆ';
            break;
        case 'ょ':
            lastLetter = 'よ';
            break;
        case 'ゎ':
            lastLetter = 'わ';
            break;
        default:
      }
    }

    if(state.inputWord){
      // kuromojiを使って入力単語をひらがなに変換する処理
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
                console.log("Please input one word.");
                return;
              }
              if (tokens[0].word_type === 'UNKNOWN') {
                console.log("Please input KNOWN word.");
                return;
              }
              if (!tokens[0].reading) {
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
      
      // 前の単語の最終語句と続いているか確認し、繋がっていればstateをtrueに変更する
      changeToHiragana(state.inputWord)
      .then((data: string): void => {
        console.log(data);
        hiraganaInputWord = data;
      })
      .then((): void => {
        if (lastLetter === hiraganaInputWord.slice(0, 1)) {
          dispatch(verifyJapaneseWord(true));
          console.log("the input word is continued!");
        };
        console.log("the input word is not continued!")
      })
    }
  }
  
  useEffect(() => {
    // TODO: 現状の最後の単語をfetchするfunctionを入れる
  });

  // TODO: 入力した単語をsetするfunction

  return {
    ...state,
    handleWordChange: handleWordChange,
    handleOnClick: handleOnClick
  };
};

export default useHandleAction;

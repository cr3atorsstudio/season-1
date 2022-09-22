import { useEffect, useReducer, useState } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";

const { setLastWord, setInputWord, verifyJapaneseWord, setError } = actions;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hiraganaInputWord, setHiraganaInputWord] = useState("");

  const handleWordChange = (input: string) => {
    dispatch(setInputWord(input));
  };

  const handleOnClick = () => {

    // 前の単語が特殊文字で終了する場合の最終文字の変形処理
    if (state.lastWord) {
      let lastLetter: string = state.lastWord.slice(-1);
      
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
              if (tokens.length === 0 || tokens.length > 1 || tokens[0].word_type === 'UNKNOWN') {
                return;
              }
              if (!tokens[0].reading) {
                return;
              }
              let reading: string = tokens[0].reading;
              dispatch(verifyJapaneseWord(true));
              const hiragana: string = reading.replace(/[\u30a1-\u30f6]/g, function(match: string) {
                const chr = match.charCodeAt(0) - 0x60;
                return String.fromCharCode(chr);
              });
              resolve(hiragana);
            }
          })
        })
      }

      changeToHiragana(state.inputWord)
        .then((data: string): void => {
          setHiraganaInputWord(data); 
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

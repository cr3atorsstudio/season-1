import React from "react";
import { PlayContext } from "../pages/Play/Play";
import { actions } from "reducers/play";
import kuromoji from "kuromoji";

const { setLastWord, setInputWord, verifyJapaneseWord, setError, checkWordError, setWordErrorMessage } = actions;

export const Button = () => {
  const { state, dispatch } = React.useContext(PlayContext);
  console.log(state.hasWordError);

  const handleOnClick = () => {
    let lastCharacter: string = state.lastWord.slice(-1);
    let hiraganaInputWord: string = "";

    // 前の単語が特殊文字で終了する場合の最終文字の変形処理
    if (state.lastWord) {
      
      if (lastCharacter === 'ー') {
        lastCharacter = state.lastWord.slice(0, -1).slice(-1);
      }
      switch(lastCharacter) {
        case 'ぁ':
            lastCharacter = 'あ';
            break;
        case 'ぃ':
            lastCharacter = 'い';
            break;
        case 'ぅ':
            lastCharacter = 'う';
            break;
        case 'ぇ':
            lastCharacter = 'え';
            break;
        case 'ぉ':
            lastCharacter = 'お';
            break;
        case 'っ':
            lastCharacter = 'つ';
            break;
        case 'ゃ':
            lastCharacter = 'や';
            break;
        case 'ゅ':
            lastCharacter = 'ゆ';
            break;
        case 'ょ':
            lastCharacter = 'よ';
            break;
        case 'ゎ':
            lastCharacter = 'わ';
            break;
        default:
      }
    }

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
              dispatch(checkWordError(true));
              dispatch(setWordErrorMessage("一単語だけ入力してください。"));
              console.log("呼ばれたよ");
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

    if(state.inputWord){
      // 前の単語の最終語句と続いているか確認し、繋がっていればstateをtrueに変更する
      console.log(state.inputWord);
      changeToHiragana(state.inputWord)
      .then((data: string): void => {
        console.log(data);
        hiraganaInputWord = data;
      })
      .then((): void => {
        if (lastCharacter === hiraganaInputWord.slice(0, 1)) {
          dispatch(verifyJapaneseWord(true));
          console.log("the input word can follow the previous word!");
        };
        if (lastCharacter !== hiraganaInputWord.slice(0, 1)) {
          dispatch(checkWordError(true));
          dispatch(setWordErrorMessage("前の単語につながりません。"));
        };
      })
    }
  }

  return (
    <button
      className='mt-20 w-48 rounded-full border-2 border-accent bg-transparent py-4 px-6 font-bold text-white hover:bg-accent md:w-60'
      onClick={handleOnClick}
    >
      <span className='font-nico text-3xl'>{"つなげる"}</span>
    </button>
  );
};

import { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "reducers/play";
import kuromoji from "kuromoji";

const { setLastWord, setInputWord, verifyJapaneseWord, setError } = actions;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
    dispatch(setInputWord(input));
  };

  const handleOnClick = () => {
    if (state.inputWord, state.lastWord) {
      let lastLetter = state.lastWord.slice(-1);
      
      // 前の単語が特殊文字で終了する場合の最終文字の変形処理
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

      // kuromojiを使って入力単語をひらがなに直す処理
      kuromoji.builder({ dicPath: "/dict" }).build((err: any, tokenizer: any) => {
        if(err){
          console.log(err);
        } else {
          const tokens = tokenizer.tokenize(state.inputWord);
          console.log(tokens);
          if (tokens.length === 0 || tokens[0]['word_type'] === 'UNKNOWN') {
            return;
          }
          if (tokens.length === 1 && tokens[0].word_type === "KNOWN") {
            dispatch(verifyJapaneseWord(true));
          }
        }
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

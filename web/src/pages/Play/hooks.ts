import { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "reducers/play";

const { setLastWord, setInputWord, verifyJapaneseWord, setError } = actions;

const useHandleAction = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWordChange = (input: string) => {
    dispatch(setInputWord(input));
  };

  const handleOnClick = () => {
    if (state.inputWord) {
      // TODO: kuromoji使ってvalidな単語かどうかの判定するfunction
    console.log("validate the input", state.inputWord)
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

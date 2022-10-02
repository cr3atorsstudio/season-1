import React from "react";
import { PlayContext } from "../pages/Play/Play";
import { actions } from "reducers/play";

const { setLastWord, setInputWord, verifyJapaneseWord, setError, checkWordError, setWordErrorMessage } = actions;

export const WordInput = () => {
  const { state, dispatch } = React.useContext(PlayContext);

  const handleWordChange = (input: string) => {
    dispatch(setInputWord(input));
  };

  return (
    <div className='mt-5'>
      <input
        onChange={e => handleWordChange(e.currentTarget.value)}
        type='text'
        className='h-20 w-80 border-b-2 border-transparent border-b-accent bg-transparent px-4 font-nico text-xl focus:border-accent focus:ring-0 md:w-96'
        placeholder='「ご」につづく単語を入れよう!'
      />
    </div>
  );
};

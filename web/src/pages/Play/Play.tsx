import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { WordInput } from "components/WordInput";
import { State, Actions, initialState, reducer } from "reducers/play";
import React, { useReducer, createContext } from "react";

export const PlayContext = createContext({} as {
  state: State;
  dispatch: React.Dispatch<Actions>;
})

const Play = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-20'>
          <p className='text-center md:text-xl'>現在の最後の単語は...</p>
          {/* TODO: ここはコントラクトから最後の単語を取ってきて入れる */}
          <p className='font-nico text-[80px] md:text-[128px]'>りんご</p>
        </div>
        <img
          src='public/images/arrow.png'
          alt='arrow'
          className='h-20 md:h-auto'
        />
        <div className='flex flex-col items-center justify-center'>
          <PlayContext.Provider value={{ state, dispatch }}>
            <WordInput />
            {state.hasWordError && <p className='text-red-500 text-center md:text-xl mt-5'>{state.wordErrorMessage}</p>}
            <Button />
          </PlayContext.Provider>
        </div>
      </div>
    </>
  );
};

export default Play;

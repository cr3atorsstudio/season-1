const SET_LAST_WORD = "SET_LAST_WORD" as const;
const SET_INPUT_WORD = "SET_INPUT_WORD" as const;
const VERIFY_JAPANESE_WORD = "VERIFY_JAPANESE_WORD" as const;
const SET_ERROR = "SET_ERROR" as const;

const setLastWord = (word: string) => {
  return { type: SET_LAST_WORD, word: word };
};

const setInputWord = (inputWord: string) => {
  return { type: SET_INPUT_WORD, inputWord: inputWord };
};

const verifyJapaneseWord = (isValidJapanese: boolean) => {
  return { type: VERIFY_JAPANESE_WORD, isValidJapanese: isValidJapanese };
};

const setError = (error?: Error) => {
  return { type: SET_ERROR, error: error };
};

export const actions = {
  setLastWord,
  setInputWord,
  verifyJapaneseWord,
  setError,
};

export type Actions =
  | ReturnType<typeof setLastWord>
  | ReturnType<typeof setInputWord>
  | ReturnType<typeof verifyJapaneseWord>
  | ReturnType<typeof setError>;

export type State = {
  lastWord: string;
  inputWord: string;
  isValidJapanese: boolean;
  error?: Error;
};

export const initialState: State = {
  lastWord: "",
  inputWord: "",
  isValidJapanese: false,
  error: undefined,
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case SET_LAST_WORD:
      return {
        ...state,
        lastWord: action.word,
      };
    case SET_INPUT_WORD:
      return {
        ...state,
        inputWord: action.inputWord,
      };
    case VERIFY_JAPANESE_WORD:
      return {
        ...state,
        isValidJapanese: action.isValidJapanese,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

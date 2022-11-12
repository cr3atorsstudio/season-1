const SET_LAST_WORD = "SET_LAST_WORD" as const;
const SET_INPUT_WORD = "SET_INPUT_WORD" as const;
const VERIFY_JAPANESE_WORD = "VERIFY_JAPANESE_WORD" as const;
const SET_ERROR = "SET_ERROR" as const;
const CHECK_WORD_ERROR = "CHECK_WORD_ERROR" as const;
const SET_WORD_ERROR_MESSAGE = "SET_WORD_ERROR_MESSAGE" as const;
const SET_CURRENT_WORD = "SET_CURRENT_WORD" as const;
const SET_CURRENT_WORD_NUM = "SET_CURRENT_WORD_NUM" as const;

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

const checkWordError = (hasWordError: boolean) => {
  return { type: CHECK_WORD_ERROR, hasWordError: hasWordError };
};

const setWordErrorMessage = (wordErrorMessage: string) => {
  return { type: SET_WORD_ERROR_MESSAGE, wordErrorMessage: wordErrorMessage };
};

const setCurrentWord = (currentWord: string) => {
  return { type: SET_CURRENT_WORD, currentWord: currentWord };
};

const setCurrentWordNum = (currentWordNum: number) => {
  return { type: SET_CURRENT_WORD_NUM, currentWordNum: currentWordNum };
};

export const actions = {
  setLastWord,
  setInputWord,
  verifyJapaneseWord,
  setError,
  checkWordError,
  setWordErrorMessage,
  setCurrentWord,
  setCurrentWordNum,
};

export type Actions =
  | ReturnType<typeof setLastWord>
  | ReturnType<typeof setInputWord>
  | ReturnType<typeof verifyJapaneseWord>
  | ReturnType<typeof setError>
  | ReturnType<typeof checkWordError>
  | ReturnType<typeof setWordErrorMessage>
  | ReturnType<typeof setCurrentWord>
  | ReturnType<typeof setCurrentWordNum>;

export type State = {
  lastWord: string;
  inputWord: string;
  isValidJapanese: boolean;
  error?: Error;
  hasWordError: boolean;
  wordErrorMessage: string;
  currentWord: string;
  currentWordNum: number;
};

export const initialState: State = {
  lastWord: "",
  inputWord: "",
  isValidJapanese: false,
  error: undefined,
  hasWordError: false,
  wordErrorMessage: "",
  currentWord: "",
  currentWordNum: 0,
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
    case CHECK_WORD_ERROR:
      return {
        ...state,
        hasWordError: action.hasWordError,
      };
    case SET_WORD_ERROR_MESSAGE:
      return {
        ...state,
        wordErrorMessage: action.wordErrorMessage,
      };
    case SET_CURRENT_WORD:
      return {
        ...state,
        currentWord: action.currentWord,
      };
    case SET_CURRENT_WORD_NUM:
      return {
        ...state,
        currentWordNum: action.currentWordNum,
      };
    default:
      return state;
  }
};

const bitSize = 7;
const maxLength = 5;
const hiraganaList = [
  "",
  ..."あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
    ""
  ),
  ..."がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃゅょー".split(
    ""
  ),
];

const mask = (function calculateMask() {
  let mask = 0;

  for (let i = 0; i < bitSize; i++) {
    mask |= 1 << i;
  }

  return mask;
})();

export const encode = (word: string) => {
  // Validate word length. Exception would be better.
  if (word.length > maxLength) {
    return -1;
  }

  let encoded = 0;

  word.split("").forEach((c) => {
    encoded <<= bitSize;
    const hiraganaIdx = hiraganaList.indexOf(c);
    encoded |= hiraganaIdx;
  });

  return encoded;
};

const decode = (encoded: number) => {
  if (encoded === -1) {
    return "";
  }

  let word = "";

  for (let i = 0; i < maxLength; i++) {
    const hiraganaIdx = encoded & mask;
    encoded = encoded >>> bitSize;
    word = hiraganaList[hiraganaIdx] + word;
  }

  return word;
};

const hiraganaList = [
  "",
  ..."あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(""),
  ..."がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃゅょー".split(""),
] as const;

const bitSize = 7;

const mask = (function calculateMask() {
  let mask = 0;

  for (let i = 0; i < bitSize; i++) {
    mask |= 1 << i;
  }

  return mask;
})();

export const encode = (word: string, maxLength: number) => {
  // Validate word length. Exception would be better.
  if (word.length > maxLength) { return -1; }

  let encoded = 0;

  word.split("").forEach((c) => {
    encoded <<= bitSize;
    const hiraganaIdx = hiraganaList.indexOf(c);
    encoded |= hiraganaIdx
  })

  return encoded;
};

export const decode = (encoded: number, maxLength: number) => {
  if (encoded === -1) { return ""; }

  let word = "";

  for (let i = 0; i < maxLength; i++) {
    const hiraganaIdx = encoded & mask;
    encoded = encoded >>> bitSize;
    word = hiraganaList[hiraganaIdx] + word;
  }

  return word;
}

/* ------- Test code -------- */

// const test = (function() {
//   let counter = 0;

//   return (word: string) => {
//     console.log(`\n======== Test ${counter} ========\n`);
//     console.log(`Original word = '${word}'`);

//     const enc = encode(word, maxLength);
//     console.log(`Encoded code  = ${enc}`);

//     const dec = decode(enc, maxLength);
//     console.log(`Decoded word  = '${dec}'`);

//     counter++;
//   }
// })();

// test("ごりら");
// test("おかき");
// test("くりえいと");
// test("じゃんぷ");
// test("なが〜〜〜〜い");
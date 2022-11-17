export const useTransformSpecialCharacter = (lastWord: string): string => {
  let lastCharacter = lastWord.slice(-1);
  if (lastCharacter === "ー") {
    lastCharacter = lastWord.slice(0, -1).slice(-1);
  } else {
    switch (lastCharacter) {
      case "ぁ":
        lastCharacter = "あ";
        break;
      case "ぃ":
        lastCharacter = "い";
        break;
      case "ぅ":
        lastCharacter = "う";
        break;
      case "ぇ":
        lastCharacter = "え";
        break;
      case "ぉ":
        lastCharacter = "お";
        break;
      case "っ":
        lastCharacter = "つ";
        break;
      case "ゃ":
        lastCharacter = "や";
        break;
      case "ゅ":
        lastCharacter = "ゆ";
        break;
      case "ょ":
        lastCharacter = "よ";
        break;
      case "ゎ":
        lastCharacter = "わ";
        break;
      default:
        lastCharacter = lastWord.slice(-1);
    }
  }

  return lastCharacter;
};

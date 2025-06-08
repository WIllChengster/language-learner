import pinyinDictionary from "./translations/hanzi-pinyin-table.json";

export const findPinyinByHanzi = (hanziCharacter: string) => {
  const pinyin =
    pinyinDictionary[hanziCharacter as keyof typeof pinyinDictionary];

  if (!pinyin) {
    console.warn(`No pinyin found for character: ${hanziCharacter}`);
    return hanziCharacter; // Return the character itself if no pinyin is found
  }

  return pinyin[0] ?? hanziCharacter;
};

export const findSubtitleByTime = (
  translation: { segments: { start: number; end: number; text: string }[] },
  timestamp: number
): string => {
  const { segments } = translation;
  for (const segment of segments) {
    if (segment.start <= timestamp && segment.end >= timestamp) {
      return segment.text;
    }
  }
  return "";
};

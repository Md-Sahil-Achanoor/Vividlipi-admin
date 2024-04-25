export const toCapitalize = (value: string): string => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};

export const toCamelCase = (value: string): string => {
  return value?.charAt(0)?.toLowerCase() + value?.slice(1);
};

export const getName = (name: string): string =>
  toCamelCase(name?.split(" ").join(""));

export const fixPhoneNumber = (number: string): string => {
  return number?.startsWith("0") ? number : `(+880) ${number}`;
};

export const removeEmpty = (arr: string[] = []) => {
  return arr.filter((el) => el);
};

export const stringToArray = (text: string, splitText: string = " ") => {
  return removeEmpty(text.split(splitText));
};

export const isVideo = (url: string) => {
  const videoExtensions = ["mp4", "webm", "ogg"];
  const ext = url.split(".").pop();
  return videoExtensions.includes(ext || "");
};

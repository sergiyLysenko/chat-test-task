export const htmlDecode = (str: string) => {
  return str.replace(/&#(\d+);/g, function (_, dec) {
    return String.fromCharCode(dec);
  });
};

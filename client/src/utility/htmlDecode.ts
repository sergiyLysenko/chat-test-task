export const htmlDecode = (str: string) => {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

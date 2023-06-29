export function replaceSpecialCharactersIfExist(
  text: string,
  specialCharacters: RegExp = /[`!&()':|<]/g,
): string {
  if (specialCharacters.test(text)) {
    return text.replace(specialCharacters, '');
  }
  return text;
}

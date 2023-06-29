export function searchFullText(
  column: string,
  alias: string,
  isSetParameter: boolean = false,
): string {
  const delimiter = isSetParameter ? '' : ':';
  return `(to_tsvector('simple', coalesce(${column}, '')) @@ to_tsquery('simple', ${delimiter}${alias}))`;
}

export function convertStringFullTextSearch(keyWord: string): string {
  return keyWord
    .split(' ')
    .filter((el) => el)
    .map((item) => `${item}:*`)
    .join(' & ');
}

import { hasValueAndNotEmptyString } from "./object-utils";
import { Maybe } from "./type-utils";

export const occurrences = (text: string, search: string, allowOverlapping = false) => {
  text += "";
  search += "";
  if (search.length <= 0) return text.length + 1;

  let n = 0;
  let pos = 0;
  const step = allowOverlapping ? 1 : search.length;

  while (pos >= 0) {
    pos = text.indexOf(search, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    }
  }
  return n;
};

export const emptyStringToNull = (value: Maybe<string>) => (hasValueAndNotEmptyString(value) ? value : null);

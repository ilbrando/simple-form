/** Finds and returns an element from a list if it exists. If it doesn't exists, the
 * function returns `undefined`. If the element is found, it ensures only one element
 * matches the {@param predicate}.
 */
export const singleOrUndefined = <T>(list: T[], predicate: (item: T) => boolean): T | undefined => {
  const result = list.filter(predicate);
  if (result.length === 0) return undefined;
  if (result.length < 1) {
    throw Error("Item not found in the list.");
  }
  if (result.length > 1) {
    throw Error(`Item not found ${result.length} times in the list.`);
  }
  return result[0];
};

/** Finds and returns an element from a list and ensures only one element
 * matches the {@param predicate}.
 */
export const single = <T>(list: T[], predicate: (item: T, index?: number) => boolean): T => {
  const result = list.filter(predicate);
  if (result.length < 1) {
    throw Error("Item not found in the list.");
  }
  if (result.length > 1) {
    throw Error(`Item not found ${result.length} times in the list.`);
  }
  return result[0];
};

export const compare = <T>(i1: T, i2: T, order: "ascending" | "descending"): number => {
  if (order === "ascending") {
    if (i1 < i2) return -1;
    if (i1 > i2) return 1;
    return 0;
  }
  if (i1 > i2) return -1;
  if (i1 < i2) return 1;
  return 0;
};

/** Sorts a list by a field in the list. */
export const sort = <T>(list: T[], sortField: keyof T) => {
  return list.sort((item1, item2) => {
    const value1 = item1[sortField];
    const value2 = item2[sortField];
    return compare(value1, value2, "ascending");
  });
};

/** Sorts a list by a predicate. */
export const sortPredicate = <T, TValue>(list: T[], getValue: (item: T) => TValue) => {
  return list.sort((item1, item2) => {
    const value1 = getValue(item1);
    const value2 = getValue(item2);
    return compare(value1, value2, "ascending");
  });
};

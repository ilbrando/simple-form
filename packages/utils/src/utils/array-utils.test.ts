import { describe, expect, test } from "vitest";

import { compare, single, singleOrUndefined, sort, sortPredicate } from "./array-utils";

const list = [1, 2, 3];

type ListObject = {
  id: number;
  b: string;
};
const listObjects: ListObject[] = [
  { id: 1, b: "xyz" },
  { id: 2, b: "abc" }
];

describe("array-utils", () => {
  test.each`
    list    | predicate                 | expected     | description
    ${list} | ${(x: number) => x === 1} | ${1}         | ${"x => x === 1"}
    ${list} | ${(x: number) => x === 2} | ${2}         | ${"x => x === 2"}
    ${list} | ${(x: number) => x === 3} | ${3}         | ${"x => x === 3"}
    ${list} | ${(x: number) => x === 4} | ${undefined} | ${"x => x === 4 (returns undefined)"}
  `("singleOrUndefined: $description ", ({ list, predicate, expected }) => {
    // Act
    const actual = singleOrUndefined(list, predicate);

    // Assert
    expect(actual).toEqual(expected);
  });

  describe("single", () => {
    test("returns found value", () => {
      // Act
      const expected = 2;
      const actual = singleOrUndefined(list, x => x === expected);

      // Assert
      expect(actual).toEqual(expected);
    });

    test("throws for not found value", () => {
      // Act / Assert
      const expected = 5;
      expect(() => single(list, x => x === expected)).toThrowError();
    });
  });

  describe("compare", () => {
    const ascending = "ascending";
    const descending = "descending";

    test.each`
      value1   | value2   | order         | expected
      ${1}     | ${1}     | ${ascending}  | ${0}
      ${1}     | ${1}     | ${descending} | ${0}
      ${1}     | ${2}     | ${ascending}  | ${-1}
      ${1}     | ${2}     | ${descending} | ${+1}
      ${"abc"} | ${"xyz"} | ${ascending}  | ${-1}
      ${"xyz"} | ${"abc"} | ${ascending}  | ${+1}
    `("compare($value1, $value2, $order) => $expected", ({ value1, value2, order, expected }) => {
      // Act
      const actual = compare(value1, value2, order);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe("sort", () => {
    test.each`
      field   | expected
      ${"id"} | ${[1, 2]}
      ${"b"}  | ${[2, 1]}
    `("sort($field) => $expected", ({ field, expected }) => {
      // Act
      const actual = sort(listObjects, field);

      // Assert
      expect(actual.map(x => x.id)).toEqual(expected);
    });
  });

  describe("sortPredicate", () => {
    test.each`
      predicate                  | expected  | description
      ${(x: ListObject) => x.id} | ${[1, 2]} | ${"x => x.id"}
      ${(x: ListObject) => x.b}  | ${[2, 1]} | ${"x => x.b"}
    `("sort($description) => $expected", ({ predicate, expected }) => {
      // Act
      const actual = sortPredicate(listObjects, predicate);

      // Assert
      expect(actual.map(x => x.id)).toEqual(expected);
    });
  });
});

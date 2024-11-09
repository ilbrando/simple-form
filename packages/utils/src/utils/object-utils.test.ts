import { describe, expect, test } from "vitest";

import { ensureValue, hasValue, hasValueAndNotEmptyString, isEqual, isNumber, isObject, isString, removeNullProps, undefinedToNull } from "./object-utils";

describe("object-utils", () => {
  test.each`
    value        | expected
    ${1}         | ${true}
    ${"abc"}     | ${true}
    ${{ a: 42 }} | ${true}
    ${null}      | ${false}
    ${undefined} | ${false}
  `("hasValue($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = hasValue(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value        | expected
    ${"abc"}     | ${true}
    ${""}        | ${true}
    ${1}         | ${false}
    ${{ a: 42 }} | ${false}
    ${null}      | ${false}
    ${undefined} | ${false}
  `("isString($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = isString(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value        | expected
    ${1}         | ${true}
    ${"abc"}     | ${false}
    ${{ a: 42 }} | ${false}
    ${null}      | ${false}
    ${undefined} | ${false}
  `("isNumber($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = isNumber(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value        | expected
    ${{ a: 42 }} | ${true}
    ${1}         | ${false}
    ${"abc"}     | ${false}
    ${null}      | ${false}
    ${undefined} | ${false}
  `("isObject($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = isObject(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value        | expected
    ${"abc"}     | ${true}
    ${""}        | ${false}
    ${1}         | ${false}
    ${{ a: 42 }} | ${false}
    ${null}      | ${false}
    ${undefined} | ${false}
  `("hasValueAndNotEmptyString($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = hasValueAndNotEmptyString(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  describe("ensureValue", () => {
    test("returns value", () => {
      // Act
      const expected = 2;
      const actual = ensureValue(expected);

      // Assert
      expect(actual).toEqual(expected);
    });

    test.each`
      value
      ${null}
      ${undefined}
    `("ensureValue($value) throws", ({ value }) => {
      expect(() => ensureValue(value)).toThrowError();
    });
  });

  test.each`
    value1                              | value2                              | expected
    ${"abc"}                            | ${"abc"}                            | ${true}
    ${"abc"}                            | ${"xyz"}                            | ${false}
    ${1}                                | ${1}                                | ${true}
    ${1}                                | ${2}                                | ${false}
    ${new Date(2024, 0, 1, 0, 0, 0, 0)} | ${new Date(2024, 0, 1, 0, 0, 0, 0)} | ${true}
    ${new Date(2024, 0, 1, 0, 0, 0, 0)} | ${new Date(2024, 0, 1, 0, 0, 0, 1)} | ${false}
    ${{ a: 42 }}                        | ${{ a: 42 }}                        | ${true}
    ${{ a: 42 }}                        | ${{ a: 43 }}                        | ${false}
    ${{ a: { b: 42 } }}                 | ${{ a: { b: 42 } }}                 | ${true}
    ${{ a: { b: 42 } }}                 | ${{ a: { b: 43 } }}                 | ${false}
    ${null}                             | ${null}                             | ${true}
    ${undefined}                        | ${undefined}                        | ${true}
    ${null}                             | ${undefined}                        | ${false}
  `("isEqual($value1, $value2) => $expected", ({ value1, value2, expected }) => {
    // Act
    const actual = isEqual(value1, value2);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value                      | expected
    ${{ a: 42 }}               | ${{ a: 42 }}
    ${{ a: 42, b: null }}      | ${{ a: 42 }}
    ${{ a: 42, b: undefined }} | ${{ a: 42 }}
  `("removeNullProps($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = removeNullProps(value);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value                      | expected
    ${{ a: 42 }}               | ${{ a: 42 }}
    ${{ a: 42, b: null }}      | ${{ a: 42, b: null }}
    ${{ a: 42, b: undefined }} | ${{ a: 42, b: null }}
  `("undefinedToNull($value) => $expected", ({ value, expected }) => {
    // Act
    const actual = undefinedToNull(value);

    // Assert
    expect(actual).toEqual(expected);
  });
});

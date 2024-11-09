import { describe, expect, test } from "vitest";

import { emptyStringToNull, occurrences } from "./text-utils";
import { Maybe } from "./type-utils";

describe("text-utils", () => {
  test.each`
    text      | search  | allowOverlapping | expected
    ${"abc"}  | ${"a"}  | ${false}         | ${1}
    ${"abc"}  | ${"b"}  | ${false}         | ${1}
    ${"abc"}  | ${"c"}  | ${false}         | ${1}
    ${"abc"}  | ${"d"}  | ${false}         | ${0}
    ${"abc"}  | ${"ab"} | ${false}         | ${1}
    ${"abba"} | ${"a"}  | ${false}         | ${2}
    ${"aaaa"} | ${"aa"} | ${false}         | ${2}
    ${"aaaa"} | ${"aa"} | ${true}          | ${3}
  `("occurrences: ($text, $search) => $expected", ({ text, search, allowOverlapping, expected }: { text: string; search: string; allowOverlapping: boolean; expected: ReturnType<typeof occurrences> }) => {
    // Act
    const actual = occurrences(text, search, allowOverlapping);

    // Assert
    expect(actual).toEqual(expected);
  });

  test.each`
    value        | expected
    ${"abc"}     | ${"abc"}
    ${""}        | ${null}
    ${null}      | ${null}
    ${undefined} | ${null}
  `("emptyStringToNull: ($value) => $expected", ({ value, expected }: { value: Maybe<string>; expected: ReturnType<typeof emptyStringToNull> }) => {
    // Act
    const actual = emptyStringToNull(value);

    // Assert
    expect(actual).toEqual(expected);
  });
});

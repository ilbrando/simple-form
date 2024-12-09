import { describe, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { useArrayValidationRules } from "./array";
import { assertValidationResult } from "./validation-test-utils";

const genericErrorMessage = "##ERROR##";

describe("array", () => {
  test.each`
    data      | count | expected
    ${[1, 2]} | ${1}  | ${genericErrorMessage}
    ${[1, 2]} | ${3}  | ${genericErrorMessage}
    ${[1, 2]} | ${2}  | ${undefined}
    ${[]}     | ${0}  | ${undefined}
  `("count($data, $count) => $expected", ({ data, count, expected }) => {
    // Arrange
    const { result } = renderHook(() => useArrayValidationRules());

    // Act
    const actual = result.current.count(count)(data);

    // Assert
    assertValidationResult(expected, actual);
  });

  test.each`
    data      | count | expected
    ${[1, 2]} | ${1}  | ${genericErrorMessage}
    ${[1, 2]} | ${3}  | ${undefined}
    ${[1, 2]} | ${2}  | ${undefined}
    ${[]}     | ${0}  | ${undefined}
  `("maxCount($data, $count) => $expected", ({ data, count, expected }) => {
    // Arrange
    const { result } = renderHook(() => useArrayValidationRules());

    // Act
    const actual = result.current.maxCount(count)(data);

    // Assert
    assertValidationResult(expected, actual);
  });

  test.each`
    data      | count | expected
    ${[1, 2]} | ${1}  | ${undefined}
    ${[1, 2]} | ${3}  | ${genericErrorMessage}
    ${[1, 2]} | ${2}  | ${undefined}
    ${[]}     | ${0}  | ${undefined}
  `("minCount($data, $count) => $expected", ({ data, count, expected }) => {
    // Arrange
    const { result } = renderHook(() => useArrayValidationRules());

    // Act
    const actual = result.current.minCount(count)(data);

    // Assert
    assertValidationResult(expected, actual);
  });
});

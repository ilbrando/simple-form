import { describe, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { useEmailValidationRules } from "./email";
import { assertValidationResult, genericErrorMessage } from "./validation-test-utils";

describe("email", () => {
  test.each`
    value            | expected
    ${"foo@bar.baz"} | ${undefined}
    ${"f44@b44.baz"} | ${undefined}
    ${"foo"}         | ${genericErrorMessage}
    ${"f00@bar.b44"} | ${genericErrorMessage}
    ${""}            | ${genericErrorMessage}
  `("email($value) => $expected", ({ value, expected }) => {
    // Arrange
    const { result } = renderHook(() => useEmailValidationRules());

    // Act
    const actual = result.current.email()(value);

    // Assert
    assertValidationResult(expected, actual);
  });
});

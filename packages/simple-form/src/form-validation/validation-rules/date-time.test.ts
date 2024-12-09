import { describe, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { useDateTimeValidationRules } from "./date-time";
import { assertValidationResult, genericErrorMessage } from "./validation-test-utils";

describe("date-time", () => {
  test.each`
    value                            | expected
    ${new Date(2024, 11, 24, 1, 0)}  | ${undefined}
    ${new Date(2024, 11, 24, 1, 30)} | ${genericErrorMessage}
  `("timeWholeHour($value) => $expected", ({ value, expected }) => {
    // Arrange
    const { result } = renderHook(() => useDateTimeValidationRules());

    // Act
    const actual = result.current.timeWholeHour()(value);

    // Assert
    assertValidationResult(expected, actual);
  });

  test.each`
    value                            | parameter | expected
    ${new Date(2024, 11, 24, 1, 0)}  | ${15}     | ${undefined}
    ${new Date(2024, 11, 24, 1, 15)} | ${15}     | ${undefined}
    ${new Date(2024, 11, 24, 1, 30)} | ${15}     | ${undefined}
    ${new Date(2024, 11, 24, 1, 45)} | ${15}     | ${undefined}
    ${new Date(2024, 11, 24, 1, 16)} | ${15}     | ${genericErrorMessage}
  `("timeWholeHour($value) => $expected", ({ value, parameter, expected }) => {
    // Arrange
    const { result } = renderHook(() => useDateTimeValidationRules());

    // Act
    const actual = result.current.timeWholeMinute(parameter)(value);

    // Assert
    assertValidationResult(expected, actual);
  });

  test.each`
    value                     | parameter                 | expected
    ${new Date(2024, 11, 24)} | ${new Date(2024, 11, 24)} | ${undefined}
    ${new Date(2024, 11, 24)} | ${new Date(2024, 11, 25)} | ${genericErrorMessage}
  `("minDate($value) => $expected", ({ value, parameter, expected }) => {
    // Arrange
    const { result } = renderHook(() => useDateTimeValidationRules());

    // Act
    const actual = result.current.minDate(parameter)(value);

    // Assert
    assertValidationResult(expected, actual);
  });

  test.each`
    value                     | parameter                 | expected
    ${new Date(2024, 11, 24)} | ${new Date(2024, 11, 24)} | ${undefined}
    ${new Date(2024, 11, 24)} | ${new Date(2024, 11, 23)} | ${genericErrorMessage}
  `("maxDate($value) => $expected", ({ value, parameter, expected }) => {
    // Arrange
    const { result } = renderHook(() => useDateTimeValidationRules());

    // Act
    const actual = result.current.maxDate(parameter)(value);

    // Assert
    assertValidationResult(expected, actual);
  });
});

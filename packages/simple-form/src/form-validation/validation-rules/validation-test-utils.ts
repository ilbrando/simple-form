import { expect } from "vitest";
import { hasValue } from "@ilbrando/utils";

export const genericErrorMessage = "##ERROR##";

export const assertValidationResult = (expected: string | undefined, actual: string | undefined) => {
  if (hasValue(expected)) {
    if (expected === genericErrorMessage) {
      expect(actual).not.toBeUndefined();
      expect(actual!.length).toBeGreaterThan(1);
    } else {
      expect(actual).toBe(expected);
    }
  } else {
    expect(actual).toBeUndefined();
  }
};

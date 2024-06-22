import { useLocalization } from "src/localization";

import { Validator } from "../validation-types";

export const useArrayValidationRules = () => {
  const { texts } = useLocalization();

  return {
    minCount:
      (minValue: number, errorMessage?: string): Validator<unknown[]> =>
      value =>
        Array.isArray(value) && value.length < minValue ? errorMessage ?? texts.minCount(minValue) : undefined,

    maxCount:
      (maxValue: number, errorMessage?: string): Validator<unknown[]> =>
      value =>
        Array.isArray(value) && value.length > maxValue ? errorMessage ?? texts.maxCount(maxValue) : undefined,

    count:
      (arrayCount: number, errorMessage?: string): Validator<unknown[]> =>
      value =>
        Array.isArray(value) && value.length !== arrayCount ? errorMessage ?? texts.count(arrayCount) : undefined
  };
};

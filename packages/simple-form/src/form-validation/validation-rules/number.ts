import { hasValue } from "@ilbrando/utils";

import { Validator } from "../validation-types";

import { useLocalization } from "src/localization";

export const useNumberValidationRules = () => {
  const { texts } = useLocalization();

  return {
    min:
      (minValue: number, errorMessage?: string): Validator<number> =>
      value =>
        hasValue(value) && value < minValue ? errorMessage ?? texts.min(minValue) : undefined,

    max:
      (maxValue: number, errorMessage?: string): Validator<number> =>
      value =>
        hasValue(value) && value > maxValue ? errorMessage ?? texts.max(maxValue) : undefined,

    dividableBy:
      (dividable: number, errorMessage?: string): Validator<number> =>
      value =>
        hasValue(value) && value % dividable !== 0 ? errorMessage ?? texts.dividableBy(dividable) : undefined
  };
};

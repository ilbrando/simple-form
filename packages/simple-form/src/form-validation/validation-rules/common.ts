import { hasValue, Maybe } from "@ilbrando/utils";

import { useLocalization } from "src/localization";

import { Validator } from "../validation-types";

export const useCommonValidationRules = () => {
  const { texts } = useLocalization();

  const alwaysValid: Validator<unknown> = (_: unknown) => undefined;

  const required = <T>(errorMessage?: string): Validator<T> =>
    // Must be written like this because the name of the function returned must start with "required".
    function required(value) {
      return hasValue(value) ? undefined : errorMessage ?? texts.required;
    };

  return {
    alwaysValid,
    required,

    equal:
      <T>(compareValue: Maybe<T>, errorMessage?: string): Validator<T> =>
      value =>
        hasValue(value) && hasValue(compareValue) && value !== compareValue ? errorMessage ?? texts.equal(compareValue) : undefined,

    notEqual:
      <T>(compareValue: Maybe<T>, errorMessage?: string): Validator<T> =>
      value =>
        hasValue(value) && hasValue(compareValue) && value === compareValue ? errorMessage ?? texts.notEqual(compareValue) : undefined,

    greaterThan:
      <T>(compareValue: Maybe<T>, errorMessage?: string): Validator<T> =>
      value =>
        hasValue(value) && hasValue(compareValue) && value <= compareValue ? errorMessage ?? texts.greaterThan(compareValue) : undefined,

    lessThan:
      <T>(compareValue: Maybe<T>, errorMessage?: string): Validator<T> =>
      value =>
        hasValue(value) && hasValue(compareValue) && value >= compareValue ? errorMessage ?? texts.lessThan(compareValue) : undefined
  };
};

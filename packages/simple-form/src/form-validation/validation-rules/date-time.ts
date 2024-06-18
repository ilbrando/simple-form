import { hasValue } from "@ilbrando/utils";

import { Validator } from "../validation-types";

import { useLocalization } from "src/localization";

export const useDateTimeValidationRules = () => {
  const { texts } = useLocalization();

  return {
    timeWholeHour:
      (errorMessage?: string): Validator<Date> =>
      value =>
        hasValue(value) && value.getMinutes() !== 0 ? errorMessage ?? texts.timeWholeHour : undefined,

    timeWholeMinute:
      (minute: number, errorMessage?: string): Validator<Date> =>
      value =>
        hasValue(value) && value.getMinutes() % minute !== 0 ? errorMessage ?? texts.timeWholeMinute(minute) : undefined,

    minDate:
      (min: Date, errorMessage?: string): Validator<Date> =>
      value =>
        hasValue(value) && value < min ? errorMessage ?? texts.minDate(min) : undefined,

    maxDate:
      (max: Date, errorMessage?: string): Validator<Date> =>
      value =>
        hasValue(value) && value > max ? errorMessage ?? texts.maxDate(max) : undefined
  };
};

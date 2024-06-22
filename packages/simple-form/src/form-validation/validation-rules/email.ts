import { hasValue } from "@ilbrando/utils";

import { useLocalization } from "src/localization";

import { Validator } from "../validation-types";

const mailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const useEmailValidationRules = () => {
  const { texts } = useLocalization();

  return {
    email:
      (errorMessage?: string): Validator<string> =>
      value =>
        hasValue(value) && !mailRegEx.test(value) ? errorMessage ?? texts.email : undefined
  };
};

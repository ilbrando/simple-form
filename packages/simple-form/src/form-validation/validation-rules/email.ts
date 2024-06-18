import { hasValue } from "@ilbrando/utils";

import { Validator } from "../validation-types";

import { useLocalization } from "src/localization";

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

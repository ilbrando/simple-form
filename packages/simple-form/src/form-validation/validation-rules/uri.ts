import { hasValue } from "@ilbrando/utils";

import { Validator } from "../validation-types";

import { useLocalization } from "src/localization";

const uriRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'(\\)\\*\\+,;=.]+$/;

export const useUriValidationRules = () => {
  const { texts } = useLocalization();

  return {
    uri:
      (errorMessage?: string): Validator<string> =>
      value =>
        hasValue(value) && !uriRegEx.test(value) ? errorMessage ?? texts.uri : undefined
  };
};

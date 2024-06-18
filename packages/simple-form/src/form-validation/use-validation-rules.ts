import { useArrayValidationRules, useCommonValidationRules, useDateTimeValidationRules, useEmailValidationRules, useNumberValidationRules, useTextValidationRules, useUriValidationRules } from "./validation-rules";

export const useValidationRules = () => {
  const arrayValidationRules = useArrayValidationRules();
  const commonValidationRules = useCommonValidationRules();
  const dateTimeValidationRules = useDateTimeValidationRules();
  const emailValidationRules = useEmailValidationRules();
  const numberValidationRules = useNumberValidationRules();
  const textValidationRules = useTextValidationRules();
  const uriValidationRules = useUriValidationRules();

  return {
    ...arrayValidationRules,
    ...commonValidationRules,
    ...dateTimeValidationRules,
    ...emailValidationRules,
    ...numberValidationRules,
    ...textValidationRules,
    ...uriValidationRules
  };
};

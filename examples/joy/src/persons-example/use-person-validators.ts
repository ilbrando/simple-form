import { FormManager, useValidationRules, Validator } from "@ilbrando/simple-form";
import { hasValue } from "@ilbrando/utils";

import { Person, PersonFormFields } from "./types";

type PersonValidators = {
  [P in keyof PersonFormFields]: Validator<PersonFormFields[P]>[];
};

/**
 * You can apply the validators in the `useFormDefinition` call, but if you want to
 * share them between forms, you can create your own hook like this.
 */
export const usePersonValidators = (initial?: Person) => {
  const { required, maxLength, min, max, alwaysValid } = useValidationRules();

  /** The `alwaysValid` validator can make it easier to construct conditional arrays of validators */
  const getJobTitleValidators = (age: FormManager<PersonFormFields>["values"]["age"]) => [hasValue(age) && age >= 18 ? required() : alwaysValid, maxLength(50)];

  const validators: PersonValidators = {
    id: [required(), maxLength(20)],
    name: [required(), maxLength(50)],
    age: [required(), min(3, "No toddlers"), max(125, "Really! That old?")],
    jobTitle: getJobTitleValidators(initial?.age ?? null),
    workingHours: []
  };

  return { validators, getJobTitleValidators };
};

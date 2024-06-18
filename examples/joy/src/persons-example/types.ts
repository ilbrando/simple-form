import { FormRangeSliderValue } from "@ilbrando/simple-form-joy";
import { OmitSafe, RemoveOptional } from "@ilbrando/utils";

/** This is the type used against the backend. */
export type Person = {
  id: string;
  name: string;
  age: number;
  jobTitle: string;
  workingHours?: { fromHour: number; toHour: number };
};

/** `Person` with no optional fields. This type can be used as form fields with `useFormDefinition`. */
export type PersonFormFields = RemoveOptional<OmitSafe<Person, "workingHours">> & {
  workingHours: FormRangeSliderValue;
};

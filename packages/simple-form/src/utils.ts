import { hasValue, isEqual, MakeNullable } from "@ilbrando/utils";

import { FormFieldState, FormState } from "./form-types";
import { Validator } from "./form-validation";

const validateFieldValue = <TFieldValue>(value: TFieldValue | null, validators?: Validator<TFieldValue>[]) => {
  let errorMessage: string | undefined = undefined;
  if (hasValue(validators)) {
    for (let index = 0; index < validators.length && !hasValue(errorMessage); index++) {
      errorMessage = validators[index](value);
    }
  }
  return errorMessage;
};

const validateField = <TFields, TFieldName extends keyof TFields, TFieldValue extends FormState<TFields>[TFieldName]["value"]>(
  prev: FormState<TFields>,
  fieldName: TFieldName,
  value: TFieldValue,
  componentError?: string
) => {
  const isDisabled = prev[fieldName].isDisabled;
  const validators = prev[fieldName].validators;
  return isDisabled ? undefined : componentError ?? validateFieldValue(value, validators);
};

export const validateAllFieldsAndUpdateState = <TFields>(formState: FormState<TFields>, fieldNames: (keyof TFields)[]) => {
  fieldNames.forEach(fieldName => {
    const componentErrorMessage = formState[fieldName].componentErrorMessage;
    const errorMessage = validateField(formState, fieldName, formState[fieldName].value, componentErrorMessage);
    formState[fieldName].errorMessage = errorMessage;
  });
};

export const touchAllFieldsAndUpdateState = <TFields>(formState: FormState<TFields>, fieldNames: (keyof TFields)[]) => {
  fieldNames.forEach(fieldName => {
    formState[fieldName].isTouched = true;
  });
};

export const getHasErrors = <TFields>(formState: FormState<TFields>, fieldNames: (keyof TFields)[]) => {
  return fieldNames.some(fieldName => {
    const fieldState = formState[fieldName];
    if (fieldState.isDisabled) return false;
    return hasValue(fieldState.errorMessage);
  });
};

export const setFieldState = <TFields, TFieldName extends keyof TFields, TFieldValue extends TFields[TFieldName]>(
  formState: FormState<TFields>,
  fieldName: TFieldName,
  fieldState: Partial<FormFieldState<TFieldValue>>
) => {
  return {
    ...formState,
    [fieldName]: {
      ...formState[fieldName],
      ...fieldState
    }
  };
};

const getFieldValue = <TFields, TFieldName extends keyof TFields>(fieldFormState: FormState<TFields>[TFieldName]) => (hasValue(fieldFormState.errorMessage) ? null : fieldFormState.value);

export const getFieldValues = <TFields>(formState: FormState<TFields>, fieldNames: (keyof TFields)[]): MakeNullable<TFields> => {
  const values = {} as MakeNullable<TFields>;

  fieldNames.forEach(fieldName => {
    if (formState[fieldName].isDisabled) return;
    const fieldValue = getFieldValue(formState[fieldName]);
    values[fieldName] = fieldValue;
  });

  return values;
};

export const getModifiedFieldValues = <TFields, T extends MakeNullable<TFields>>(initialFieldValues: T, fieldValues: T) => {
  const initialFieldValueEntries = new Map(Object.entries(initialFieldValues));
  const fieldValueEntries = Object.entries(fieldValues);
  return Object.fromEntries(
    fieldValueEntries.filter(([key, value]) => {
      const initialValue = initialFieldValueEntries.get(key);
      return !isEqual(value, initialValue);
    })
  ) as Partial<T>;
};

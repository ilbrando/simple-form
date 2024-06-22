import { FormFieldState } from "./form-types";
import { hasRequiredValidator } from "./form-validation";
import { FormManager } from "./get-form-manager";

/** Returns an object to use in an editor component. */
export const getEditor = function <TFields, TFieldValue>(formManager: FormManager<TFields>, fieldName: keyof TFields, isDisabled?: boolean) {
  const fieldState = formManager.formState[fieldName] as FormFieldState<TFieldValue>;

  const setFieldValue = (value: TFieldValue | null, componentErrorMessage?: string) => formManager.setValue(fieldName, value as TFields[keyof TFields] | null, componentErrorMessage);

  return {
    value: fieldState.value,
    isSubmitting: formManager.isSubmitting,
    isRequired: hasRequiredValidator(fieldState.validators),
    isDisabled: (isDisabled ?? false) || fieldState.isDisabled || formManager.isSubmitting,
    errorMessage: fieldState.isTouched ? fieldState.errorMessage : undefined,
    setFieldValue
  };
};

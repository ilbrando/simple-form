import { Validator } from "./form-validation";

export type FormFieldState<T> = {
  value: T | null;
  validators: Validator<T>[];
  /**
   * Has a value if a validator for the field has reported an error.
   * Components should display this as the validation error message.
   */
  errorMessage?: string;
  /** A component can set this property when the value in the component is invalid (like an incomple date in a date text field).
   * This error takes precedence over the normal validation logic if it is defined and can only be cleared by the component
   * itself in an onChange event.
   */
  componentErrorMessage?: string;
  /**
   * Components should set this to true when the user has interacted with the component.
   */
  isTouched: boolean;
  /** If true this field is excluded from validation.
   * This should only be used when fields are rendered conditionally. If the field
   * is not rendered you must set disabled to true so it doesn't get validated and
   * prevents submission.
   */
  isDisabled: boolean;
};

export type FormState<TFields> = {
  [P in keyof TFields]: FormFieldState<TFields[P]>;
};

export type UseFormOptionsField<TFields, P extends keyof TFields> = {
  initialValue?: FormState<TFields>[P]["value"];
  initialIsDisabled?: FormState<TFields>[P]["isDisabled"];
  validators?: FormState<TFields>[P]["validators"];
};

export type UseFormOptions<TFields> = {
  fields: {
    [P in keyof TFields]: UseFormOptionsField<TFields, P>;
  };
  /** These dependencies triggers a complete recreation of the form state. */
  reCreateDependencies?: unknown[];
};

export type UseFormOptionsArray<TFields> = UseFormOptions<TFields> & {
  itemsCount: number;
  overrides?: {
    index: number;
    fields: {
      [P in keyof TFields]?: UseFormOptionsField<TFields, P>;
    };
  }[];
};

export type OnChangeEvent<TFields, TFieldName extends keyof TFields> = (value: FormState<TFields>[TFieldName]["value"]) => void;

export type OnChangeEvents<TFields> = {
  [P in keyof TFields]?: OnChangeEvent<TFields, P>;
};

export type FormSubmitting = {
  submitting: boolean;
  submitError?: string;
};

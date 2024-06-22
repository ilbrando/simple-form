import { FormManager } from "@ilbrando/simple-form";
import { PropKeysOf } from "@ilbrando/utils";

export type FormFieldBaseSharedProps = {
  /** Set this to true if you want to reserve space for validation messages
   * and not have the form fields change position when messages are shown/hidden.
   * You can set this value globally in the `theme.simpleForm` and use this
   * prop if you want to override the value on each instance.
   */
  reserveSpaceForValidationMessage?: boolean;
};

export type FormFieldBaseProps<TFields, TFormValue, TFieldName extends PropKeysOf<TFields, TFormValue>> = FormFieldBaseSharedProps & {
  formManager: FormManager<TFields>;
  fieldName: TFieldName;
};

export type FormFieldBaseArrayProps<TFields, TFormValue, TFieldName extends PropKeysOf<TFields, TFormValue[]>> = FormFieldBaseSharedProps & {
  formManager: FormManager<TFields>;
  fieldName: TFieldName;
};

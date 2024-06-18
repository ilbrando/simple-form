import { useCallback } from "react";
import { getEditor, useLocalization } from "@ilbrando/simple-form";
import { hasValue, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps, PickerValidDate } from "@mui/x-date-pickers";

import { FormFieldBaseProps } from "../types";

type FormValue = PickerValidDate;

export type FormDatePickerProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<DatePickerProps<FormValue>, "value" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName> & {
    textFieldProps?: OmitSafe<TextFieldProps, "value" | "onChange" | "error" | "helperText">;
  };

type DatePickerTextFieldProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = Pick<FormDatePickerProps<TFields, TFieldName>, "textFieldProps" | "reserveSpaceForValidationMessage"> & {
  editor: ReturnType<typeof getEditor<TFields, FormValue>>;
};

const DatePickerTextField = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: DatePickerTextFieldProps<TFields, TFieldName>) {
  const { textFieldProps, editor, reserveSpaceForValidationMessage } = props;

  // The order for the TextField props is significant
  return <TextField {...textFieldProps} error={hasValue(editor.errorMessage)} helperText={editor.errorMessage ?? (reserveSpaceForValidationMessage ? " " : undefined)} required={editor.isRequired} />;
};

export const FormDatePicker = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormDatePickerProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, textFieldProps, reserveSpaceForValidationMessage, ...rest } = props;

  const { texts } = useLocalization();

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  const getComponentError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      if (!hasValue(value)) return undefined;
      if (isNaN(value)) return texts.invalidValue;
      return value instanceof Date ? undefined : texts.invalidValue;
    },
    [texts.invalidValue]
  );

  return (
    <DatePicker
      value={editor.value}
      onChange={e => editor.setFieldValue(e, getComponentError(e))}
      disabled={editor.isDisabled}
      slots={{ textField: DatePickerTextField }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slotProps={{ textField: { textFieldProps, editor, reserveSpaceForValidationMessage } as any }}
      {...rest}
    />
  );
};

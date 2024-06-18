import { useCallback } from "react";
import { getEditor, useLocalization } from "@ilbrando/simple-form";
import { hasValue, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker, DateTimePickerProps, PickerValidDate } from "@mui/x-date-pickers";

import { useMuiFormUtils } from "src/utils";

import { FormFieldBaseProps } from "../types";

type FormValue = PickerValidDate;

export type FormDateTimePickerProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<DateTimePickerProps<FormValue>, "value" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName> & {
    textFieldProps?: OmitSafe<TextFieldProps, "value" | "onChange" | "error" | "helperText">;
  };

type DatePickerTextFieldProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = Pick<FormDateTimePickerProps<TFields, TFieldName>, "textFieldProps" | "reserveSpaceForValidationMessage"> & {
  editor: ReturnType<typeof getEditor<TFields, FormValue>>;
};

const DateTimePickerTextField = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: DatePickerTextFieldProps<TFields, TFieldName>) {
  const { textFieldProps, editor, reserveSpaceForValidationMessage } = props;

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

  // The order for the TextField props is significant
  return <TextField {...textFieldProps} error={hasValue(editor.errorMessage)} helperText={editor.errorMessage ?? (effectiveReserveSpaceForValidationMessage ? " " : undefined)} required={editor.isRequired} />;
};

export const FormDateTimePicker = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormDateTimePickerProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, textFieldProps, reserveSpaceForValidationMessage, ...rest } = props;

  const { texts } = useLocalization();

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

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
    <DateTimePicker
      value={editor.value}
      onChange={e => editor.setFieldValue(e, getComponentError(e))}
      disabled={editor.isDisabled}
      slots={{ textField: DateTimePickerTextField }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slotProps={{ textField: { textFieldProps, editor, reserveSpaceForValidationMessage } as any }}
      {...rest}
    />
  );
};

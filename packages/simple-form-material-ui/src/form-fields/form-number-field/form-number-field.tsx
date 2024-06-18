import { useEffect, useState } from "react";
import { getEditor, useLocalization } from "@ilbrando/simple-form";
import { hasValue, hasValueAndNotEmptyString, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { TextField, TextFieldProps } from "@mui/material";

import { useMuiFormUtils } from "src/utils";

import { FormFieldBaseProps } from "../types";

type FormValue = number;

type FormNumberFieldProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<TextFieldProps, "value" | "error" | "required" | "helperText" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName>;

const isValidValue = (value: string) => /^[-]?(\d+)$/.test(value);

export const FormNumberField = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormNumberFieldProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, reserveSpaceForValidationMessage, ...rest } = props;

  const { texts } = useLocalization();

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  const [textBoxValue, setTextBoxValue] = useState<string>(hasValue(editor.value) ? editor.value.toString() : "");

  useEffect(() => {
    setTextBoxValue(hasValue(editor.value) ? editor.value.toString() : "");
  }, [editor.value]);

  return (
    <TextField
      value={textBoxValue}
      helperText={editor.errorMessage ?? (effectiveReserveSpaceForValidationMessage ? " " : undefined)}
      error={hasValue(editor.errorMessage)}
      onChange={e => {
        if (!hasValueAndNotEmptyString(e.target.value)) {
          setTextBoxValue("");
          editor.setFieldValue(null);
          return;
        }
        if (isValidValue(e.target.value)) {
          const parsedValue = parseInt(e.target.value);
          setTextBoxValue(e.target.value);
          editor.setFieldValue(parsedValue);
          return;
        }
        setTextBoxValue(e.target.value);
        editor.setFieldValue(editor.value, texts.invalidValue);
      }}
      required={editor.isRequired}
      disabled={editor.isDisabled}
      {...rest}
    />
  );
};

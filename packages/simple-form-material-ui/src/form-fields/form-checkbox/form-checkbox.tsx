import { getEditor } from "@ilbrando/simple-form";
import { hasValue, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from "@mui/material";

import { useMuiFormUtils } from "src/utils";

import { FormFieldBaseProps } from "../types";

type FormValue = boolean;

export type FormCheckboxProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<CheckboxProps, "checked" | "value" | "required" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName> & {
    label?: string;
  };

export const FormCheckbox = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormCheckboxProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, label, reserveSpaceForValidationMessage, ...rest } = props;

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  return (
    <FormControl error={hasValue(editor.errorMessage)} disabled={editor.isDisabled} required={editor.isRequired}>
      <FormControlLabel
        label={`${label}${editor.isRequired ? " *" : ""}`}
        labelPlacement="end"
        control={<Checkbox checked={editor.value ?? false} onChange={e => editor.setFieldValue(e.target.checked)} disabled={editor.isDisabled} {...rest} />}
      />
      <FormHelperText>{editor.errorMessage ?? (effectiveReserveSpaceForValidationMessage ? " " : null)}</FormHelperText>
    </FormControl>
  );
};

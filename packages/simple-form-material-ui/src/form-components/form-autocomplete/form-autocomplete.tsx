import { useMemo } from "react";
import { getEditor } from "@ilbrando/simple-form";
import { hasValue, OmitSafe, PropKeysOf, single } from "@ilbrando/utils";
import { Autocomplete, AutocompleteProps, Box, TextField } from "@mui/material";

import { useMuiFormUtils } from "src/utils";

import { FormFieldBaseProps } from "../types";

import { AutocompleteOption } from "./form-autocomplete-types";

type FormValue = string | number;

export type FormAutocompleteProps<TFields, TFormValue extends FormValue, TFieldName extends PropKeysOf<TFields, TFormValue>> = OmitSafe<
  AutocompleteProps<TFormValue, undefined, undefined, undefined>,
  "value" | "onChange" | "options" | "renderOption" | "renderInput" | "multiple"
> &
  FormFieldBaseProps<TFields, TFormValue, TFieldName> & {
    label?: string;
    placeholder?: string;
    options: AutocompleteOption<TFormValue>[];
  };

export const FormAutocomplete = function <TFields, TFormValue extends FormValue, TFieldName extends PropKeysOf<TFields, TFormValue>>(props: FormAutocompleteProps<TFields, TFormValue, TFieldName>) {
  const { formManager, fieldName, disabled, options, label, placeholder, reserveSpaceForValidationMessage, ...rest } = props;

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

  const editor = getEditor<TFields, TFormValue>(formManager, fieldName, disabled);

  const optionValues = useMemo(() => options.map(x => x.value), [options]);

  return (
    <Autocomplete
      value={editor.value}
      options={optionValues}
      onChange={(_, v, reason) => {
        switch (reason) {
          case "clear":
            editor.setFieldValue(null);
            break;
          case "selectOption":
            editor.setFieldValue(v);
            break;
          case "removeOption":
            editor.setFieldValue(v);
            break;
        }
      }}
      disabled={editor.isDisabled}
      getOptionLabel={option => single(options, x => x.value === option).label}
      renderOption={(rp, option) => (
        <Box component="li" {...rp}>
          {single(options, x => x.value === option).label}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          error={hasValue(editor.errorMessage)}
          helperText={editor.errorMessage ?? (effectiveReserveSpaceForValidationMessage ? " " : undefined)}
          disabled={editor.isDisabled}
          required={editor.isRequired}
          label={label}
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
        />
      )}
      {...rest}
    />
  );
};

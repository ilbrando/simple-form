import { useMemo } from "react";
import { getEditor } from "@ilbrando/simple-form";
import { OmitSafe, PropKeysOf, single } from "@ilbrando/utils";
import { Autocomplete, AutocompleteProps } from "@mui/joy";

import { FormControlWrapper } from "src/components";

import { FormFieldBaseProps } from "../types";

import { AutocompleteOption } from "./form-autocomplete-types";

type FormValue = string | number;

export type FormAutocompleteProps<TFields, TFormValue extends FormValue, TFieldName extends PropKeysOf<TFields, TFormValue>> = OmitSafe<
  AutocompleteProps<TFormValue, undefined, undefined, undefined>,
  "value" | "onChange" | "options" | "renderOption" | "multiple"
> &
  FormFieldBaseProps<TFields, TFormValue, TFieldName> & {
    options: AutocompleteOption<TFormValue>[];
  };

export const FormAutocomplete = function <TFields, TFormValue extends FormValue, TFieldName extends PropKeysOf<TFields, TFormValue>>(props: FormAutocompleteProps<TFields, TFormValue, TFieldName>) {
  const { formManager, fieldName, disabled, options, label, size, reserveSpaceForValidationMessage, ...rest } = props;

  const editor = getEditor<TFields, TFormValue>(formManager, fieldName, disabled);

  const optionValues = useMemo(() => options.map(x => x.value), [options]);

  return (
    <FormControlWrapper label={label} size={size} errorMessage={editor.errorMessage} reserveSpaceForValidationMessage={reserveSpaceForValidationMessage} isRequired={editor.isRequired} isDisabled={editor.isDisabled}>
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
            default:
          }
        }}
        getOptionLabel={option => single(options, x => x.value === option).label}
        {...rest}
      />
    </FormControlWrapper>
  );
};

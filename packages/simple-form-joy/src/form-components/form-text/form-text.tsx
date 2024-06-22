import { getEditor } from "@ilbrando/simple-form";
import { assertNever, hasValue, hasValueAndNotEmptyString, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { Input, InputProps } from "@mui/joy";

import { FormControlWrapper } from "src/components";

import { FormFieldBaseProps } from "../types";

type FormValue = string;

export type FormTextProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<InputProps, "value" | "error" | "required" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName> & {
    textTransform?: "lower-case" | "upper-case";
  };

export const FormText = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormTextProps<TFields, TFieldName>) {
  const { formManager, fieldName, textTransform, disabled, label, size, reserveSpaceForValidationMessage, ...rest } = props;

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  const parseValue = (value: string) => {
    if (!hasValueAndNotEmptyString(value)) return null;
    if (!hasValue(textTransform)) return value;
    switch (textTransform) {
      case "lower-case":
        return value.toLocaleLowerCase();
      case "upper-case":
        return value.toLocaleUpperCase();
      default:
        assertNever(textTransform);
    }
  };

  return (
    <FormControlWrapper label={label} size={size} errorMessage={editor.errorMessage} reserveSpaceForValidationMessage={reserveSpaceForValidationMessage} isRequired={editor.isRequired} isDisabled={editor.isDisabled}>
      <Input value={editor.value ?? ""} onChange={e => editor.setFieldValue(parseValue(e.target.value))} {...rest} />
    </FormControlWrapper>
  );
};

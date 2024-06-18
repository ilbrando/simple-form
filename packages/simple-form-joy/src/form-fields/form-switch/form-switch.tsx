import { getEditor } from "@ilbrando/simple-form";
import { OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { Switch, SwitchProps, Typography } from "@mui/joy";

import { FormControlWrapper } from "src/components";

import { FormFieldBaseProps } from "../types";

type FormValue = boolean;

export type FormSwitchProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<SwitchProps, "checked" | "required" | "onChange"> &
  FormFieldBaseProps<TFields, FormValue, TFieldName> & {
    label?: string;
    labelPlacement?: "start" | "end";
  };

export const FormSwitch = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormSwitchProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, label, labelPlacement = "end", size, reserveSpaceForValidationMessage, sx, ...rest } = props;

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  const Editor = (
    <Switch checked={editor.value ?? false} onChange={e => editor.setFieldValue(e.target.checked)} sx={{ ...sx, ml: labelPlacement === "start" ? 1 : undefined, mr: labelPlacement === "end" ? 1 : undefined }} {...rest} />
  );

  return (
    <FormControlWrapper size={size} errorMessage={editor.errorMessage} reserveSpaceForValidationMessage={reserveSpaceForValidationMessage} isRequired={editor.isRequired} isDisabled={editor.isDisabled}>
      <Typography component="label" startDecorator={labelPlacement === "end" && Editor} endDecorator={labelPlacement === "start" && Editor}>
        {label}
      </Typography>
    </FormControlWrapper>
  );
};

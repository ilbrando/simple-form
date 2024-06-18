import { getEditor } from "@ilbrando/simple-form";
import { hasValue, OmitSafe, PropKeysOf } from "@ilbrando/utils";
import { FormControl, FormHelperText, InputLabel, Slider, SliderProps } from "@mui/material";

import { useMuiFormUtils } from "src/utils";

import { FormFieldBaseProps } from "../types";

export type FormRangeSliderValue = {
  from: number;
  to: number;
};

type FormRangeSliderFieldProps<TFields, TFieldName extends PropKeysOf<TFields, FormRangeSliderValue>> = OmitSafe<SliderProps, "value" | "onChange"> &
  FormFieldBaseProps<TFields, FormRangeSliderValue, TFieldName> & {
    label?: string;
  };

export const FormRangeSliderField = function <TFields, TFieldName extends PropKeysOf<TFields, FormRangeSliderValue>>(props: FormRangeSliderFieldProps<TFields, TFieldName>) {
  const { formManager, fieldName, label, disabled, reserveSpaceForValidationMessage, ...rest } = props;

  const { effectiveReserveSpaceForValidationMessage } = useMuiFormUtils(reserveSpaceForValidationMessage);

  const editor = getEditor<TFields, FormRangeSliderValue>(formManager, fieldName, disabled);

  const handleOnChange = (_: unknown, v: number | number[]) => {
    if (!Array.isArray(v)) throw Error("FormRangeSlider value should be an array of two numbers.");
    if (v.length !== 2) throw Error("FormRangeSlider value should be an array of two numbers.");

    const [from, to] = v;
    const newValue: FormRangeSliderValue = { from, to };

    editor.setFieldValue(newValue);
  };

  return (
    <FormControl error={hasValue(editor.errorMessage)} disabled={editor.isDisabled} required={editor.isRequired} fullWidth>
      {hasValue(label) && <InputLabel>{label}</InputLabel>}
      <Slider value={hasValue(editor.value) ? [editor.value.from, editor.value.to] : [0, 0]} onChange={handleOnChange} disabled={editor.isDisabled} {...rest} />
      <FormHelperText>{editor.errorMessage ?? (effectiveReserveSpaceForValidationMessage ? " " : null)}</FormHelperText>
    </FormControl>
  );
};

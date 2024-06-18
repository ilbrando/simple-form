import { FormManager, getEditor } from "@ilbrando/simple-form";
import { OmitSafe, PropKeysOf, hasValue, hasValueAndNotEmptyString } from "@ilbrando/utils";
import { DetailedHTMLProps, useEffect, useState } from "react";

type FormValue = number;

type FormNumberInputProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value" | "onChange"> & {
  formManager: FormManager<TFields>;
  fieldName: TFieldName;
  label?: string;
};

const isValidValue = (value: string) => /^[-]?(\d+)$/.test(value);

export const FormNumberInput = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormNumberInputProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, label, ...rest } = props;

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  const [textBoxValue, setTextBoxValue] = useState<string>(hasValue(editor.value) ? editor.value.toString() : "");

  useEffect(() => {
    setTextBoxValue(hasValue(editor.value) ? editor.value.toString() : "");
  }, [editor.value]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {hasValue(label) && (
        <label>
          {label}
          {editor.isRequired && "*"}
        </label>
      )}
      <input
        value={textBoxValue}
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
          editor.setFieldValue(editor.value, "Invalid value.");
        }}
        disabled={editor.isDisabled}
        {...rest}
      />
      {hasValue(editor.errorMessage) && <div style={{ color: "red" }}>{editor.errorMessage}</div>}
    </div>
  );
};

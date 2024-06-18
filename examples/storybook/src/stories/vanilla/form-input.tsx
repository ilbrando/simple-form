import { FormManager, getEditor } from "@ilbrando/simple-form";
import { OmitSafe, PropKeysOf, emptyStringToNull, hasValue } from "@ilbrando/utils";
import { DetailedHTMLProps } from "react";

type FormValue = string;

type FormInputProps<TFields, TFieldName extends PropKeysOf<TFields, FormValue>> = OmitSafe<DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value" | "onChange"> & {
  formManager: FormManager<TFields>;
  fieldName: TFieldName;
  label?: string;
};

export const FormInput = function <TFields, TFieldName extends PropKeysOf<TFields, FormValue>>(props: FormInputProps<TFields, TFieldName>) {
  const { formManager, fieldName, disabled, label, ...rest } = props;

  const editor = getEditor<TFields, FormValue>(formManager, fieldName, disabled);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {hasValue(label) && (
        <label>
          {label}
          {editor.isRequired && "*"}
        </label>
      )}
      <input value={editor.value ?? ""} onChange={e => editor.setFieldValue(emptyStringToNull(e.target.value))} disabled={editor.isDisabled} {...rest} />
      {hasValue(editor.errorMessage) && <div style={{ color: "red" }}>{editor.errorMessage}</div>}
    </div>
  );
};

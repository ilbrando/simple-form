import { DeepPartial, OmitSafe } from "@ilbrando/utils";

import { FormRadioGroup, FormRadioGroupProps } from "../form-radio-group";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

import { options } from "./test-data";

type FormRadioGroupTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: DeepPartial<UseTestFormOptions>;
  isSubmitting?: boolean;
  formRadioGroupProps?: OmitSafe<FormRadioGroupProps<TestFormFields, string, "stringField">, "formManager" | "fieldName" | "options">;
};

export const FormRadioGroupTestComponent = (props: FormRadioGroupTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formRadioGroupProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormRadioGroup formManager={fm} fieldName="stringField" options={options} {...formRadioGroupProps} />
    </TestWrapper>
  );
};

import { OmitSafe } from "@ilbrando/utils";

import { FormNumber, FormNumberProps } from "../form-number";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type FormNumberTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: UseTestFormOptions;
  isSubmitting?: boolean;
  formNumberProps?: OmitSafe<FormNumberProps<TestFormFields, "numberField">, "formManager" | "fieldName">;
};

export const FormNumberTestComponent = (props: FormNumberTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formNumberProps: formTextProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormNumber formManager={fm} fieldName="numberField" {...formTextProps} />
    </TestWrapper>
  );
};

import { DeepPartial, OmitSafe } from "@ilbrando/utils";

import { FormCheckbox, FormCheckboxProps } from "../form-checkbox";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type FormCheckboxTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: DeepPartial<UseTestFormOptions>;
  isSubmitting?: boolean;
  formCheckboxProps?: OmitSafe<FormCheckboxProps<TestFormFields, "booleanField">, "formManager" | "fieldName">;
};

export const FormCheckboxTestComponent = (props: FormCheckboxTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formCheckboxProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormCheckbox formManager={fm} fieldName="booleanField" {...formCheckboxProps} />
    </TestWrapper>
  );
};
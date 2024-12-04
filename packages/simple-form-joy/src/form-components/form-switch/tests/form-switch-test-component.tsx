import { DeepPartial, OmitSafe } from "@ilbrando/utils";

import { FormSwitch, FormSwitchProps } from "../form-switch";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type FormSwitchTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: DeepPartial<UseTestFormOptions>;
  isSubmitting?: boolean;
  formCheckboxProps?: OmitSafe<FormSwitchProps<TestFormFields, "booleanField">, "formManager" | "fieldName">;
};

export const FormSwitchTestComponent = (props: FormSwitchTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formCheckboxProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormSwitch formManager={fm} fieldName="booleanField" {...formCheckboxProps} />
    </TestWrapper>
  );
};

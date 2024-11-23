import { OmitSafe } from "@ilbrando/utils";

import { FormText, FormTextProps } from "../form-text";
import { TestForm, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type TestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: Partial<UseTestFormOptions>;
  formTextProps?: OmitSafe<FormTextProps<TestForm, "name">, "formManager" | "fieldName">;
};

export const FormTextTestComponent = (props: TestComponentProps) => {
  const { onChange, formOptions, formTextProps } = props;

  const { fm } = useTestForm(formOptions);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" {...formTextProps} />
    </TestWrapper>
  );
};

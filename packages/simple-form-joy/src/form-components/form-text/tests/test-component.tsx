import { FormText, FormTextProps } from "../form-text";
import { TestForm, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type TestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> &
  Pick<FormTextProps<TestForm, "name">, "textTransform" | "label"> & {
    formOptions?: Partial<UseTestFormOptions>;
  };

export const TestComponent = (props: TestComponentProps) => {
  const { onChange, formOptions, ...rest } = props;

  const { fm } = useTestForm(formOptions);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" {...rest} />
    </TestWrapper>
  );
};

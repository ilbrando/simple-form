import { FormText } from "../form-text";
import { useTestForm } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type TestComponentProps = Pick<ReturnType<typeof useTestForm>["fm"], "onChange">;

export const TestComponent = (props: TestComponentProps) => {
  const { onChange } = props;

  const { fm } = useTestForm(false);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" />
    </TestWrapper>
  );
};

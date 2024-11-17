import { FormText } from "../form-text";
import { useTestForm } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type TestComponentProps = {
  valueChange: ReturnType<typeof useTestForm>["fm"]["onChange"]["name"];
};
export const TestComponent = (props: TestComponentProps) => {
  const { valueChange } = props;
  const { fm } = useTestForm(false);
  fm.onChange.name = valueChange;

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" />
    </TestWrapper>
  );
};

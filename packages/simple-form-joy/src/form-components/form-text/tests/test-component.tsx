import { FormText } from "../form-text";
import { useTestForm } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

export const TestComponent = () => {
  const { fm } = useTestForm(false);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" />
    </TestWrapper>
  );
};

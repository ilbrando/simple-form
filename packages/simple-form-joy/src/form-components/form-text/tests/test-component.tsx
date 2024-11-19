import { MakeOptional } from "@ilbrando/utils";

import { FormText, FormTextProps } from "../form-text";
import { TestForm, useTestForm } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type TestComponentProps = MakeOptional<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & Pick<FormTextProps<TestForm, "name">, "textTransform" | "label">;

export const TestComponent = (props: TestComponentProps) => {
  const { onChange, ...rest } = props;

  const { fm } = useTestForm(false);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" {...rest} />
    </TestWrapper>
  );
};

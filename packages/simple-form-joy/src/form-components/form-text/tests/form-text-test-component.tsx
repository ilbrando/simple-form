import { OmitSafe } from "@ilbrando/utils";

import { FormText, FormTextProps } from "../form-text";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/form-utils";
import { TestWrapper } from "../../../test-components/test-wrapper";

type FormTextTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: UseTestFormOptions;
  isSubmitting?: boolean;
  formTextProps?: OmitSafe<FormTextProps<TestFormFields, "name">, "formManager" | "fieldName">;
};

export const FormTextTestComponent = (props: FormTextTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formTextProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormText formManager={fm} fieldName="name" {...formTextProps} />
    </TestWrapper>
  );
};

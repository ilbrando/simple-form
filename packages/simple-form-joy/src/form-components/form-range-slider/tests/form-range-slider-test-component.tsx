import { DeepPartial, OmitSafe } from "@ilbrando/utils";

import { FormRangeSlider, FormRangeSliderProps } from "../form-range-slider";
import { TestWrapper } from "../../../test-components/test-wrapper";
import { TestFormFields, useTestForm, UseTestFormOptions } from "../../../test-components/use-test-form";

type FormRangeSliderTestComponentProps = Partial<Pick<ReturnType<typeof useTestForm>["fm"], "onChange">> & {
  formOptions?: DeepPartial<UseTestFormOptions>;
  isSubmitting?: boolean;
  formRangeSliderProps?: OmitSafe<FormRangeSliderProps<TestFormFields, "rangeField">, "formManager" | "fieldName">;
};

export const FormRangeSliderTestComponent = (props: FormRangeSliderTestComponentProps) => {
  const { onChange, formOptions, isSubmitting, formRangeSliderProps } = props;

  const { fm } = useTestForm(formOptions, isSubmitting);

  Object.assign(fm.onChange, onChange);

  return (
    <TestWrapper>
      <FormRangeSlider formManager={fm} fieldName="rangeField" {...formRangeSliderProps} />
    </TestWrapper>
  );
};

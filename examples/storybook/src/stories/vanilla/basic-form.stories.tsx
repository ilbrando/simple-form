import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormInput } from "./form-input";
import { FormNumberInput } from "./form-number-input";

type FormFields = {
  name: string;
  age: number;
};

const FormStory = () => {
  const { required } = useValidationRules();
  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required()]
      },
      age: {}
    }
  });

  const fm = getFormManager(fd, false);

  return (
    <>
      <FormInput formManager={fm} fieldName="name" label="Name" />
      <FormNumberInput formManager={fm} fieldName="age" label="Age" />
    </>
  );
};

const meta = {
  title: "Vanilla/Basic Form",
  component: FormStory
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {};

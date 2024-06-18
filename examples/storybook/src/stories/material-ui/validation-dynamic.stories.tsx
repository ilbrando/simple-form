import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumberField, FormTextField } from "@ilbrando/simple-form-material-ui";
import { Box } from "@mui/material";
import { hasValue } from "@ilbrando/utils";

type FormFields = {
  name: string;
  age: number;
  jobTitle: string;
};

const FormStory = () => {
  const { required, maxLength } = useValidationRules();

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required(), maxLength(20)]
      },
      age: {
        validators: [required()]
      },
      jobTitle: {}
    }
  });

  const fm = getFormManager(fd, false);

  fm.onChange.age = value => {
    fm.setValidators("jobTitle", hasValue(value) && value >= 18 ? [required("Job title is required for adults.")] : []);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormTextField formManager={fm} fieldName="name" label="Name" />
      <FormNumberField formManager={fm} fieldName="age" label="Age" />
      <FormTextField formManager={fm} fieldName="jobTitle" label="Job title" />
    </Box>
  );
};

const meta = {
  title: "Material UI/Validation Dynamic",
  component: FormStory
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidationDynamic: Story = {};

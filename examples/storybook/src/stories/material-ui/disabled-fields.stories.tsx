import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumber, FormText } from "@ilbrando/simple-form-material-ui";
import { Box, Button } from "@mui/material";
import { MakeNullable, hasValue } from "@ilbrando/utils";
import { useState } from "react";

type FormFields = {
  name: string;
  age: number;
  jobTitle: string;
};

const FormStory = ({ onSubmit }: { onSubmit?: (values: Partial<MakeNullable<FormFields>>) => void }) => {
  const { required, maxLength } = useValidationRules();

  const [isSubmitting, setIsSubmitting] = useState(false); // story book simulate submitting

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required(), maxLength(20)]
      },
      age: {
        validators: [required()]
      },
      jobTitle: {
        initialIsDisabled: true
      }
    }
  });

  const fm = getFormManager(fd, false);

  fm.onChange.age = value => {
    fm.setIsDisabled("jobTitle", !hasValue(value) || value < 18);
  };

  const handleSubmit = async () => {
    if (fm.validateForm()) {
      onSubmit?.(fm.values);
      // simulate calling backend
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormText formManager={fm} fieldName="name" label="Name" />
      <FormNumber formManager={fm} fieldName="age" label="Age" />
      <FormText formManager={fm} fieldName="jobTitle" label="Job title" />
      <Button disabled={isSubmitting} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

const meta = {
  title: "Material UI/Disabled Fields",
  component: FormStory,
  args: {
    onSubmit: fn()
  }
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisabledFields: Story = {};

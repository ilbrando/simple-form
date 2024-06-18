import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumberField, FormTextField } from "@ilbrando/simple-form-joy";
import { Box, Button } from "@mui/joy";

type FormFields = {
  name: string;
  age: number;
};

const PersonForm = () => {
  const { required, maxLength, min } = useValidationRules();

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required(), maxLength(20)]
      },
      age: {
        validators: [required(), min(3)]
      }
    }
  });

  const fm = getFormManager(fd, false);

  const handleSubmit = () => {
    if (fm.validateForm()) {
      // perform submit action
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <FormTextField formManager={fm} fieldName="name" label="Name" />
      <FormNumberField formManager={fm} fieldName="age" label="Age" />
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
};

const meta = {
  title: "Joy/Validators",
  component: PersonForm
} satisfies Meta<typeof PersonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Validators: Story = {};

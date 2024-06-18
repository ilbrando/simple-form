import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager } from "@ilbrando/simple-form";
import { FormNumberField, FormTextField } from "@ilbrando/simple-form-material-ui";
import { Box } from "@mui/material";

type FormFields = {
  name: string;
  age: number;
};

const FormStory = () => {
  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {},
      age: {}
    }
  });

  const fm = getFormManager(fd, false);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormTextField formManager={fm} fieldName="name" label="Name" />
      <FormNumberField formManager={fm} fieldName="age" label="Age" />
    </Box>
  );
};

const meta = {
  title: "Material UI/Basic Form",
  component: FormStory
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, Validator } from "@ilbrando/simple-form";
import { FormNumber, FormText } from "@ilbrando/simple-form-material-ui";
import { Box } from "@mui/material";
import { hasValue } from "@ilbrando/utils";

type FormFields = {
  name: string;
  age: number;
};

const myCustomValidator: Validator<number> = value => (hasValue(value) && value !== 42 ? "Read hitchhikers guide!" : undefined);

const FormStory = () => {
  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {},
      age: {
        validators: [myCustomValidator]
      }
    }
  });

  const fm = getFormManager(fd, false);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormText formManager={fm} fieldName="name" label="Name" />
      <FormNumber formManager={fm} fieldName="age" label="Age" placeholder="Only 42 is allowed" />
    </Box>
  );
};

const meta = {
  title: "Material UI/Validation Custom",
  component: FormStory
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidationCustom: Story = {};

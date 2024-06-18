import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumberField, FormTextField } from "@ilbrando/simple-form-material-ui";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";

type FormFields = {
  name: string;
  age: number;
  age2: number;
  age3: number;
};

const FormStory = () => {
  const { required, maxLength, min } = useValidationRules();

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required(), maxLength(20)]
      },
      age: {
        validators: [required(), min(3)]
      },
      age2: {
        validators: [required(), min(3)]
      },
      age3: {
        validators: [required(), min(3)]
      }
    }
  });

  const fm = getFormManager(fd, false);

  const handleSubmit = async () => {
    if (fm.validateForm()) {
      // submit data here
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormTextField formManager={fm} fieldName="name" label="Name" />
      <FormNumberField formManager={fm} fieldName="age" label="Age" />
      <FormNumberField formManager={fm} fieldName="age2" label="Disable space for this instance" reserveSpaceForValidationMessage={false} />
      <FormNumberField formManager={fm} fieldName="age3" label="Age" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

const meta = {
  title: "Material UI/Validation Reserve Space",
  component: FormStory,
  decorators: Story => {
    const theme = createTheme({
      simpleForm: {
        reserveSpaceForValidationMessage: true
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    );
  }
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidationReserveSpace: Story = {};

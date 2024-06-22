import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules, LocalizationProvider } from "@ilbrando/simple-form";
import { FormNumber, FormText } from "@ilbrando/simple-form-material-ui";
import { Box, Button } from "@mui/material";
import { isNumber } from "@ilbrando/utils";

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
      <FormText formManager={fm} fieldName="name" label="Name" />
      <FormNumber formManager={fm} fieldName="age" label="Age" />
      <FormNumber formManager={fm} fieldName="age2" label="Disable space for this instance" reserveSpaceForValidationMessage={false} />
      <FormNumber formManager={fm} fieldName="age3" label="Age" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

const meta = {
  title: "Material UI/Localization",
  component: FormStory,
  decorators: Story => {
    return (
      <LocalizationProvider
        value={{
          locale: "daDK",
          format: value => {
            if (value instanceof Date) return value.toISOString();
            if (isNumber(value)) return `Number: ${value}`;
            return value.toString();
          },
          overrides: () => ({ required: "Come on, we really want a value here." })
        }}
      >
        <Story />
      </LocalizationProvider>
    );
  }
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Localization: Story = {};

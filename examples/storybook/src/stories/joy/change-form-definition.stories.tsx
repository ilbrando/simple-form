import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumberField, FormTextField } from "@ilbrando/simple-form-joy";
import { Box, Button } from "@mui/joy";
import { FormCheckbox } from "@ilbrando/simple-form-material-ui";

type FormFields = {
  name: string;
  age: number;
  isEmployed: boolean;
  companyName: string;
  jobTitle: string;
};

type Props = {
  ageRequired: boolean;
};

const PersonForm = (props: Props) => {
  const { required, min, maxLength, alwaysValid } = useValidationRules();

  const { ageRequired } = props;

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required()]
      },
      age: {
        validators: [ageRequired ? required() : alwaysValid, min(3)]
      },
      isEmployed: {
        initialValue: true
      },
      companyName: {
        validators: [required(), maxLength(50)]
      },
      jobTitle: {
        validators: [required(), maxLength(50)]
      }
    }
  });

  const fm = getFormManager(fd, false);

  fm.onChange.isEmployed = value => {
    const isRequired = value ?? false; // Null is considered the same as false.
    fm.setValidators("companyName", isRequired ? [required()] : []);
    fm.setValidators("jobTitle", isRequired ? [required()] : []);
    fm.setIsDisabled("companyName", !isRequired);
    fm.setIsDisabled("jobTitle", !isRequired);
  };

  const handleSubmit = () => {
    if (fm.validateForm()) {
      // perform submit action
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <FormTextField formManager={fm} fieldName="name" label="Name" />
      <FormNumberField formManager={fm} fieldName="age" label="Age" />
      <FormCheckbox formManager={fm} fieldName="isEmployed" label="Is employed" />
      <FormTextField formManager={fm} fieldName="companyName" label="Company name" />
      <FormTextField formManager={fm} fieldName="jobTitle" label="Job title" />
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
};

const meta = {
  title: "Joy/Change Form Definition",
  component: PersonForm,
  args: {
    ageRequired: true
  }
} satisfies Meta<typeof PersonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChangeFormDefinition: Story = {};

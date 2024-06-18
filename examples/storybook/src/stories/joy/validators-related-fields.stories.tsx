import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { FormNumberField } from "@ilbrando/simple-form-joy";
import { Box, Button } from "@mui/joy";
import { hasValue } from "@ilbrando/utils";

type FormFields = {
  fromHours: number;
  toHours: number;
};

const PersonForm = () => {
  const { required, min, max, alwaysValid } = useValidationRules();

  const defaultValidators = [required(), min(5), max(23)];

  const fd = useFormDefinition<FormFields>({
    fields: {
      fromHours: {
        validators: defaultValidators
      },
      toHours: {
        validators: defaultValidators
      }
    }
  });

  const fm = getFormManager(fd, false);

  fm.onChange.fromHours = value => {
    fm.setValidators("toHours", [...defaultValidators, hasValue(value) ? min(value + 1, "To hours must be greater than From hours.") : alwaysValid]);
  };

  fm.onChange.toHours = value => {
    fm.setValidators("fromHours", [...defaultValidators, hasValue(value) ? max(value - 1, "From hours must be less than To hours.") : alwaysValid]);
  };

  const handleSubmit = () => {
    if (fm.validateForm()) {
      // perform submit action
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <FormNumberField formManager={fm} fieldName="fromHours" label="From hours" />
      <FormNumberField formManager={fm} fieldName="toHours" label="To hours" />
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
};

const meta = {
  title: "Joy/Validators Related Fields",
  component: PersonForm
} satisfies Meta<typeof PersonForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidatorsRelatedFields: Story = {};

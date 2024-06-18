import type { Meta, StoryObj } from "@storybook/react";
import { useFormDefinition, getFormManager, useValidationRules } from "@ilbrando/simple-form";
import { AutocompleteOption, FormAutocompleteField, FormAutocompleteMultipleField, FormCheckbox, FormNumberField, FormRadioGroup, FormSwitch, FormTextField, RadioGroupOption } from "@ilbrando/simple-form-joy";
import { Box, Button } from "@mui/joy";

type FormFields = {
  name: string;
  age: number;
  favoriteMovie: string;
  movies: string[];
  isMovieFan: boolean;
  termsAccepted: boolean;
  favoriteMovie2: string;
};

const options: AutocompleteOption<string>[] = [
  { value: "1", label: "Pulp Fiction" },
  { value: "2", label: "Casablanca" }
];

const options2: RadioGroupOption<string>[] = [
  { value: "1", label: "Pulp Fiction" },
  { value: "2", label: "Casablanca" }
];

const FormStory = ({ disabled, size }: { disabled: boolean; size: "sm" | "md" | "lg" }) => {
  const { required, min, equal } = useValidationRules();

  const fd = useFormDefinition<FormFields>({
    fields: {
      name: {
        validators: [required()]
      },
      age: {
        validators: [required(), min(3)]
      },
      favoriteMovie: {},
      movies: {},
      isMovieFan: {},
      favoriteMovie2: {},
      termsAccepted: {
        validators: [required("Please accept our terms."), equal(true, "Please accept our terms.")]
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
      <FormTextField formManager={fm} fieldName="name" label="Name" disabled={disabled} size={size} />
      <FormNumberField formManager={fm} fieldName="age" label="Age" disabled={disabled} size={size} />
      <FormAutocompleteField formManager={fm} fieldName="favoriteMovie" label="Favorite movie" options={options} disabled={disabled} size={size} />
      <FormAutocompleteMultipleField formManager={fm} fieldName="movies" label="Movies" options={options} disabled={disabled} size={size} />
      <FormSwitch formManager={fm} fieldName="isMovieFan" label="Is movie fan" disabled={disabled} size={size} />
      <FormSwitch formManager={fm} fieldName="isMovieFan" label="Is movie fan" labelPlacement="start" disabled={disabled} size={size} />
      <FormRadioGroup formManager={fm} fieldName="favoriteMovie2" label="Favorite movie 2" options={options2} disabled={disabled} size={size} />
      <FormCheckbox formManager={fm} fieldName="termsAccepted" label="Terms accepted" disabled={disabled} size={size} />
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </Box>
  );
};

const meta = {
  title: "Joy/Basic Form",
  component: FormStory,
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"]
    }
  },
  args: {
    disabled: false,
    size: "md"
  }
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {};

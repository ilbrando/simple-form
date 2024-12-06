import { expect, test } from "@playwright/experimental-ct-react";

import { FormAutocompleteMultipleTestComponent } from "./form-autocomplete-multiple-test-component";
import { options } from "./test-data";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let stringArrayValue: string[] | null = null;
  const optionsIndex = 1;
  const expected = [options[optionsIndex].value];

  // Act
  const component = await mount(
    <FormAutocompleteMultipleTestComponent
      onChange={{
        stringArrayField: v => {
          stringArrayValue = v;
        }
      }}
    />
  );

  const combobox = component.getByRole("combobox");
  await combobox.focus();
  await component.page().keyboard.press("ArrowDown");
  await component.page().keyboard.press("ArrowDown");
  await component.page().keyboard.press("ArrowDown");
  await component.page().keyboard.press("Enter");

  // Assert
  expect(stringArrayValue).toEqual(expected);
});

test("renders label", async ({ mount }) => {
  // Arrange
  const expected = "Label here";

  // Act
  const component = await mount(<FormAutocompleteMultipleTestComponent formAutocompleteProps={{ label: expected }} />);

  // Assert
  await expect(component).toContainText(expected);
});

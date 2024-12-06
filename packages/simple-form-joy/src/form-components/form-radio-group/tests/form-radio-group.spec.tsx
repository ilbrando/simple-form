import { expect, test } from "@playwright/experimental-ct-react";

import { FormRadioGroupTestComponent } from "./form-radio-group-test-component";
import { options } from "./test-data";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let stringValue: string | null = null;
  const optionsIndex = 1;
  const expected = options[optionsIndex].value;

  // Act
  const component = await mount(
    <FormRadioGroupTestComponent
      onChange={{
        stringField: v => {
          stringValue = v;
        }
      }}
    />
  );

  const radiogroup = component.getByRole("radiogroup");
  const item = radiogroup.getByLabel(options[optionsIndex].label);
  await item.click();

  // Assert
  expect(stringValue).toBe(expected);
});

test("renders label", async ({ mount }) => {
  // Arrange
  const expected = "Label here";

  // Act
  const component = await mount(<FormRadioGroupTestComponent formRadioGroupProps={{ label: expected }} />);

  // Assert
  await expect(component).toContainText(expected);
});

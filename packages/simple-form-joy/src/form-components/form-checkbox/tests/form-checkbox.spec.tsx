import { expect, test } from "@playwright/experimental-ct-react";

import { FormCheckboxTestComponent } from "./form-checkbox-test-component";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let booleanValue: boolean | null = null;
  const expected = true;

  // Act
  const component = await mount(
    <FormCheckboxTestComponent
      onChange={{
        booleanField: v => {
          booleanValue = v;
        }
      }}
    />
  );

  const checkbox = component.getByRole("checkbox");
  await checkbox.click();

  // Assert
  expect(booleanValue).toBe(expected);
});

test("renders label", async ({ mount }) => {
  // Arrange
  const expected = "Label here";

  // Act
  const component = await mount(<FormCheckboxTestComponent formCheckboxProps={{ label: expected }} />);

  // Assert
  await expect(component).toContainText(expected);
});

test.skip("renders error message", async ({ mount }) => {
  // Arrange
  const expected = "Error message";
  const alwaysErrorValidator = () => expected;

  // Act
  const component = await mount(<FormCheckboxTestComponent formOptions={{ fields: { booleanField: { validators: [alwaysErrorValidator] } } }} />);

  // touch text box
  const textBox = component.getByRole("textbox");
  await textBox.fill("not expected");

  // Assert
  await expect(component).toContainText(expected);
});

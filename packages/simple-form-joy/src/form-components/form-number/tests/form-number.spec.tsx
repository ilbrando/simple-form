import { expect, test } from "@playwright/experimental-ct-react";

import { FormNumberTestComponent } from "./form-number-test-component";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let ageValue: number | null = null;
  const expected = 123;

  // Act
  const component = await mount(
    <FormNumberTestComponent
      onChange={{
        numberField: v => {
          ageValue = v;
        }
      }}
    />
  );

  const textBox = component.getByRole("textbox");
  await textBox.fill(expected.toString());

  // Assert
  expect(ageValue).toBe(expected);
});

test("renders label", async ({ mount }) => {
  // Arrange
  const expected = "Label here";

  // Act
  const component = await mount(<FormNumberTestComponent formNumberProps={{ label: expected }} />);

  // Assert
  await expect(component).toContainText(expected);
});

test("renders invalid value message", async ({ mount }) => {
  // Arrange
  const expected = "Invalid value";

  // Act
  const component = await mount(<FormNumberTestComponent />);

  const textBox = component.getByRole("textbox");
  await textBox.fill("not a number");

  // Assert
  await expect(component).toContainText(expected);
});

test.skip("renders error message", async ({ mount }) => {
  // Arrange
  const expected = "Error message";
  const alwaysErrorValidator = () => expected;

  // Act
  const component = await mount(<FormNumberTestComponent formOptions={{ fields: { stringField: { validators: [alwaysErrorValidator] }, numberField: {} } }} />);

  // touch text box
  const textBox = component.getByRole("textbox");
  await textBox.fill("not expected");

  // Assert
  await expect(component).toContainText(expected);
});

import { expect, test } from "@playwright/experimental-ct-react";

import { TestComponent } from "./test-component";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let nameValue: string | null = null;
  const expected = "abc";

  // Act
  const component = await mount(
    <TestComponent
      valueChange={v => {
        nameValue = v;
      }}
    />
  );

  const textBox = component.getByRole("textbox");
  await textBox.fill(expected);

  // Assert
  expect(nameValue).toBe(expected);
});

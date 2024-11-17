import { expect, test } from "@playwright/experimental-ct-react";

import { TestComponent } from "./test-component";

test("updates form state when receiving input", async ({ mount }) => {
  let nameValue: string | null = null;

  // Act
  const component = await mount(<TestComponent />);

  const textBox = component.getByRole("textbox");
  await textBox.fill("abc");

  // Assert
  expect(nameValue).toBe(null);
});

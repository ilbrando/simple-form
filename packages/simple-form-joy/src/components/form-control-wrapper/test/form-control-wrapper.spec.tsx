import { expect, test } from "@playwright/experimental-ct-react";

import { TestWrapper } from "src/test-components/test-wrapper";

import { FormControlWrapper } from "../form-control-wrapper";

test.describe("form-control-wrapper", () => {
  test("renders content", async ({ mount }) => {
    // Arrange
    const expectedValue = "CONTENT";

    // Act
    const component = await mount(
      <TestWrapper>
        <FormControlWrapper isRequired={false} isDisabled={false}>
          {expectedValue}
        </FormControlWrapper>
      </TestWrapper>
    );

    // Assert
    await expect(component).toContainText(expectedValue);
  });

  test("renders label", async ({ mount }) => {
    // Arrange
    const expectedValue = "LABEL";

    // Act
    const component = await mount(
      <TestWrapper>
        <FormControlWrapper isRequired={false} isDisabled={false} label={expectedValue}>
          CONTENT
        </FormControlWrapper>
      </TestWrapper>
    );

    // Assert
    await expect(component).toContainText(expectedValue);
  });

  test("renders error message", async ({ mount }) => {
    // Arrange
    const expectedValue = "ERROR MESSAGE";

    // Act
    const component = await mount(
      <TestWrapper>
        <FormControlWrapper isRequired={false} isDisabled={false} errorMessage={expectedValue}>
          CONTENT
        </FormControlWrapper>
      </TestWrapper>
    );

    // Assert
    await expect(component).toContainText(expectedValue);
  });
});

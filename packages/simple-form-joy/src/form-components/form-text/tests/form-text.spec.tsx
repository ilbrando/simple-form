import { expect, test } from "@playwright/experimental-ct-react";

import { FormTextTestComponent } from "./form-text-test-component";

test("updates form state when receiving input", async ({ mount }) => {
  // Arrange
  let nameValue: string | null = null;
  const expected = "abc";

  // Act
  const component = await mount(
    <FormTextTestComponent
      onChange={{
        name: v => {
          nameValue = v;
        }
      }}
    />
  );

  const textBox = component.getByRole("textbox");
  await textBox.fill(expected);

  // Assert
  expect(nameValue).toBe(expected);
});

test("performs text transform lower case", async ({ mount }) => {
  // Arrange
  let nameValue: string | null = null;
  const entered = "aBc";
  const expected = entered.toLowerCase();

  // Act
  const component = await mount(
    <FormTextTestComponent
      onChange={{
        name: v => {
          nameValue = v;
        }
      }}
      formTextProps={{ textTransform: "lower-case" }}
    />
  );

  const textBox = component.getByRole("textbox");
  await textBox.fill(entered);

  // Assert
  expect(nameValue).toBe(expected);
});

// test("performs text transform upper case", async ({ mount }) => {
//   // Arrange
//   let nameValue: string | null = null;
//   const entered = "aBc";
//   const expected = entered.toUpperCase();

//   // Act
//   const component = await mount(
//     <TestComponent
//       onChange={{
//         name: v => {
//           nameValue = v;
//         }
//       }}
//     >
//       {fm => <FormText formManager={fm} fieldName="name" textTransform="upper-case" />}
//     </TestComponent>
//   );

//   const textBox = component.getByRole("textbox");
//   await textBox.fill(entered);

//   // Assert
//   expect(nameValue).toBe(expected);
// });

// test("renders label", async ({ mount }) => {
//   // Arrange
//   const expected = "Label here";

//   // Act
//   const component = await mount(<TestComponent>{fm => <FormText formManager={fm} fieldName="name" label={expected} />}</TestComponent>);

//   // Assert
//   await expect(component).toContainText(expected);
// });

// test("renders error message", async ({ mount }) => {
//   // Arrange
//   const expected = "Error message";

//   // Act
//   const component = await mount(<TestComponent formOptions={{ fields: { name: { validators: [() => expected] }, age: {}, jobTitle: {} } }}>{fm => <FormText formManager={fm} fieldName="name" />}</TestComponent>);

//   // touch text box
//   const textBox = component.getByRole("textbox");
//   await textBox.fill("not expected");

//   // Assert
//   await expect(component).toContainText(expected);
// });

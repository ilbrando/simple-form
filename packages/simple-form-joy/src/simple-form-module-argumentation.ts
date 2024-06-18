declare module "@mui/joy/styles" {
  // eslint-disable-next-line @ilbrando/prefer-type
  interface Theme {
    simpleForm?: {
      reserveSpaceForValidationMessage?: boolean;
    };
  }

  // eslint-disable-next-line @ilbrando/prefer-type
  interface CssVarsThemeOptions {
    simpleForm?: {
      reserveSpaceForValidationMessage?: boolean;
    };
  }
}

/** Import this to enable module augmentation. */
export const moduleAugmentation = "import this to get module augmentation";

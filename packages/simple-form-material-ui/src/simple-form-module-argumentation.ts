declare module "@mui/material/styles" {
  // eslint-disable-next-line @ilbrando/prefer-type
  interface Theme {
    simpleForm?: {
      reserveSpaceForValidationMessage?: boolean;
    };
  }

  // eslint-disable-next-line @ilbrando/prefer-type
  interface ThemeOptions {
    simpleForm?: {
      reserveSpaceForValidationMessage?: boolean;
    };
  }
}

/** Import this to enable module augmentation. */
export const moduleAugmentation = "import this to get module augmentation";

import { ReactNode } from "react";
import { Box, CssBaseline, extendTheme, ThemeProvider } from "@mui/joy";

import { moduleAugmentation as _ } from "../simple-form-module-argumentation";

const theme = extendTheme({
  simpleForm: {
    reserveSpaceForValidationMessage: true
  }
});

export const TestWrapper = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box height="100%" maxWidth="1024px" p={4}>
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
};

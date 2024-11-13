import { ReactNode } from "react";
import { moduleAugmentation as _ } from "@ilbrando/simple-form-joy";
import { Box, CssBaseline, extendTheme, ThemeProvider } from "@mui/joy";

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

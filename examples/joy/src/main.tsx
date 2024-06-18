import React from "react";
import ReactDOM from "react-dom/client";
import { moduleAugmentation as _ } from "@ilbrando/simple-form-joy";
import { Box, CssBaseline, extendTheme, ThemeProvider } from "@mui/joy";

import { Persons } from "./persons-example/persons";

const theme = extendTheme({
  simpleForm: {
    reserveSpaceForValidationMessage: true
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Box height="100%" maxWidth="1024px" p={4}>
        <Persons />
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);

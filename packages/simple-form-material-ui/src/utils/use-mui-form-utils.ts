import { useTheme } from "@mui/material";

export const useMuiFormUtils = (reserveSpaceForValidationMessage?: boolean) => {
  const theme = useTheme();

  const effectiveReserveSpaceForValidationMessage = reserveSpaceForValidationMessage ?? theme.simpleForm?.reserveSpaceForValidationMessage ?? false;

  return { effectiveReserveSpaceForValidationMessage };
};

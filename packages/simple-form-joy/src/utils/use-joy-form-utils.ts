import { useTheme } from "@mui/joy";

export const useJoyFormUtils = (reserveSpaceForValidationMessage?: boolean) => {
  const theme = useTheme();

  const effectiveReserveSpaceForValidationMessage = reserveSpaceForValidationMessage ?? theme.simpleForm?.reserveSpaceForValidationMessage ?? false;

  return { effectiveReserveSpaceForValidationMessage };
};

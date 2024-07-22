import { ReactNode } from "react";
import { hasValue } from "@ilbrando/utils";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";

import { useJoyFormUtils } from "src/utils";
import { FormFieldBaseSharedProps } from "src/form-components/types";

export type FormControlWrapperProps = FormFieldBaseSharedProps & {
  isRequired: boolean;
  isDisabled: boolean;
  errorMessage?: string;
  children: ReactNode;
};

export const FormControlWrapper = (props: FormControlWrapperProps) => {
  const { isRequired, isDisabled, size, label, errorMessage, reserveSpaceForValidationMessage, sxFormControl, children } = props;

  const { effectiveReserveSpaceForValidationMessage } = useJoyFormUtils(reserveSpaceForValidationMessage);

  const showErrorMessage = hasValue(errorMessage) || effectiveReserveSpaceForValidationMessage;

  return (
    <FormControl size={size} error={hasValue(errorMessage)} required={isRequired} disabled={isDisabled} sx={sxFormControl}>
      {hasValue(label) && <FormLabel>{label}</FormLabel>}
      {children}
      {showErrorMessage && <FormHelperText>{errorMessage ?? (effectiveReserveSpaceForValidationMessage ? <>{"\u00A0"}</> : null)}</FormHelperText>}
    </FormControl>
  );
};

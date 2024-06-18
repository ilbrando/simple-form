import { hasValue } from "@ilbrando/utils";
import { Alert, Box } from "@mui/joy";

export const FormSubmitError = ({ errorMessage }: { errorMessage: string | undefined }) => {
  if (!hasValue(errorMessage)) return null;
  return (
    <Box mb={1}>
      <Alert color="danger">{errorMessage}</Alert>
    </Box>
  );
};

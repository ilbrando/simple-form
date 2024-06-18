import { hasValue, OmitSafe } from "@ilbrando/utils";
import { Button, ButtonProps } from "@mui/joy";
import CancelIcon from "@mui/icons-material/Cancel";

export const OkButton = ({ children, ...rest }: OmitSafe<ButtonProps, "color" | "variant">) => {
  return (
    <Button color="primary" {...rest}>
      {hasValue(children) ? children : "OK"}
    </Button>
  );
};

export const CancelButton = ({ children, ...rest }: OmitSafe<ButtonProps, "startDecorator">) => {
  return (
    <Button variant="soft" startDecorator={<CancelIcon />} {...rest}>
      {hasValue(children) ? children : "Cancel"}
    </Button>
  );
};

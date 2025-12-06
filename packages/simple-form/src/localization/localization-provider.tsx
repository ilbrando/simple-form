import { LocalizationProviderProps } from "./localization-types";
import { LocalizationContext } from "./use-localization";

export const LocalizationProvider = (props: LocalizationProviderProps) => {
  const { value, children } = props;

  return <LocalizationContext value={value}>{children}</LocalizationContext>;
};

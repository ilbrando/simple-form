import { LocalizationProviderProps } from "./localization-types";
import { localizationContext } from "./use-localization";

export const LocalizationProvider = (props: LocalizationProviderProps) => {
  const { value, children } = props;

  return <localizationContext.Provider value={value}>{children}</localizationContext.Provider>;
};

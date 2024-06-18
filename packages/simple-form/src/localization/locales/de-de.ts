import { Formatter, LocalizationTexts } from "../localization-types";

export const deDE = (format: Formatter): Partial<LocalizationTexts> => ({
  invalidValue: "Ungültiger Wert.",
  minCount: (minValue: number) => `Muss mindestens ${format(minValue)} Elemente enthalten.`
});

import { Maybe } from "@ilbrando/utils";

import { Formatter, LocalizationTexts } from "../localization-types";

export const daDK = (format: Formatter): Partial<LocalizationTexts> => ({
  invalidValue: "Ugyldig værdi.",
  minCount: minValue => `Skal indeholde mindst ${format(minValue)} elementer.`,
  maxCount: maxValue => `Må højest indeholde ${format(maxValue)} elementer.`,
  count: (arrayCount: number) => `Skal indeholde præcis ${format(arrayCount)} elementer.`,
  required: "Skal angives.",
  equal: <T>(compareValue: Maybe<T>) => `Skal være lig ${format(compareValue)}.`,
  notEqual: <T>(compareValue: Maybe<T>) => `Skal være forskellig fra ${format(compareValue)}.`,
  greaterThan: <T>(compareValue: Maybe<T>) => `Skal være større end ${format(compareValue)}.`,
  lessThan: <T>(compareValue: Maybe<T>) => `Skal være mindre end ${format(compareValue)}.`,
  timeWholeHour: "Klokkeslet skal være hele time (minutter lig 00).",
  timeWholeMinute: (minute: number) => `Klokkeslet skal være hvert ${format(minute)}. minut.`,
  minDate: (minValue: Date) => `Skal være større end eller lig med ${format(minValue)}.`,
  maxDate: (maxValue: Date) => `Skal være mindre end eller lig med ${format(maxValue)}.`,
  email: "Ugyldig mail adresse.",
  min: (minValue: number) => `Skal være mindst ${format(minValue)}.`,
  max: (maxValue: number) => `Må højst være ${format(maxValue)}.`,
  dividableBy: (dividable: number) => `Værdien skal være delelig med ${format(dividable)}.`,
  minLength: (minValue: number) => `Skal være længere end eller lig med ${format(minValue)} tegn.`,
  maxLength: (maxValue: number) => `Skal være kortere end eller lig med ${format(maxValue)} tegn.`,
  length: (stringLength: number) => `Skal være præcis ${format(stringLength)} tegn.`,
  uri: "Adressen er ikke lovlig."
});

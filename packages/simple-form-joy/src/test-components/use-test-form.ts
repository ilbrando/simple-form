import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";
import { deepMerge, DeepPartial } from "@ilbrando/utils";

export type TestFormFields = {
  stringField: string;
  numberField: number;
  booleanField: boolean;
  rangeField: { from: number; to: number };
};

export const alwaysErrorValidatorMessage = "Always error";

const alwaysErrorValidator = () => alwaysErrorValidatorMessage;

type TestFormFieldsDefinitions = Parameters<typeof useFormDefinition<TestFormFields>>[0]["fields"];

export type UseTestFormOptions = {
  [P in keyof TestFormFieldsDefinitions]: Pick<TestFormFieldsDefinitions[P], "initialValue" | "initialIsDisabled"> & { useAlwaysErrorValidator?: boolean };
};

export const useTestForm = (options?: DeepPartial<UseTestFormOptions>, isSubmitting: boolean = false) => {
  const defaultOptions: UseTestFormOptions = {
    stringField: {},
    numberField: {},
    booleanField: {},
    rangeField: {}
  };

  const effectiveOptions = deepMerge<UseTestFormOptions>(defaultOptions, options ?? {});

  const fd = useFormDefinition<TestFormFields>({
    fields: {
      stringField: {
        initialValue: effectiveOptions.stringField.initialValue,
        initialIsDisabled: effectiveOptions.stringField.initialIsDisabled,
        validators: effectiveOptions.stringField.useAlwaysErrorValidator ?? false ? [alwaysErrorValidator] : []
      },
      numberField: {
        initialValue: effectiveOptions.numberField.initialValue,
        initialIsDisabled: effectiveOptions.numberField.initialIsDisabled,
        validators: effectiveOptions.numberField.useAlwaysErrorValidator ?? false ? [alwaysErrorValidator] : []
      },
      booleanField: {
        initialValue: effectiveOptions.booleanField.initialValue,
        initialIsDisabled: effectiveOptions.booleanField.initialIsDisabled,
        validators: effectiveOptions.booleanField.useAlwaysErrorValidator ?? false ? [alwaysErrorValidator] : []
      },
      rangeField: {
        initialValue: effectiveOptions.rangeField.initialValue,
        initialIsDisabled: effectiveOptions.rangeField.initialIsDisabled,
        validators: effectiveOptions.rangeField.useAlwaysErrorValidator ?? false ? [alwaysErrorValidator] : []
      }
    }
  });

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

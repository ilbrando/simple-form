import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";
import { deepMerge, DeepPartial } from "@ilbrando/utils";

export type TestFormFields = {
  stringField: string;
  numberField: number;
  booleanField: boolean;
};

export type UseTestFormOptions = Parameters<typeof useFormDefinition<TestFormFields>>[0];

export const useTestForm = (options?: DeepPartial<UseTestFormOptions>, isSubmitting: boolean = false) => {
  const defaultOptions: UseTestFormOptions = {
    fields: {
      stringField: {},
      numberField: {},
      booleanField: {}
    }
  };

  const effectiveOptions = deepMerge<UseTestFormOptions>(defaultOptions, options ?? {});

  const fd = useFormDefinition<TestFormFields>(effectiveOptions);

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

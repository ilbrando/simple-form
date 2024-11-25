import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";

export type TestFormFields = {
  stringField: string;
  numberField: number;
};

export type UseTestFormOptions = Parameters<typeof useFormDefinition<TestFormFields>>[0];

export const useTestForm = (options?: UseTestFormOptions, isSubmitting: boolean = false) => {
  const effectiveOptions: UseTestFormOptions = options ?? {
    fields: {
      stringField: {},
      numberField: {}
    }
  };

  const fd = useFormDefinition<TestFormFields>(effectiveOptions);

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

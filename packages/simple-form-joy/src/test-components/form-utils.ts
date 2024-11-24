import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";

export type TestFormFields = {
  name: string;
  age: number;
};

export type UseTestFormOptions = Parameters<typeof useFormDefinition<TestFormFields>>[0];

export const useTestForm = (options?: UseTestFormOptions, isSubmitting: boolean = false) => {
  const effectiveOptions: UseTestFormOptions = options ?? {
    fields: {
      name: {},
      age: {}
    }
  };

  const fd = useFormDefinition<TestFormFields>(effectiveOptions);

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

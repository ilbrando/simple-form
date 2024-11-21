import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";

export type TestForm = {
  name: string;
  age: number;
  jobTitle: string;
};

export type UseTestFormOptions = Parameters<typeof useFormDefinition<TestForm>>[0] & {
  isSubmitting: boolean;
};

export const useTestForm = (options?: Partial<UseTestFormOptions>) => {
  const effectiveOptions: UseTestFormOptions = {
    fields: {
      name: {},
      age: {},
      jobTitle: {}
    },
    isSubmitting: false
  };

  Object.assign(effectiveOptions, options);

  const { isSubmitting, ...rest } = effectiveOptions;

  const fd = useFormDefinition<TestForm>(rest);

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

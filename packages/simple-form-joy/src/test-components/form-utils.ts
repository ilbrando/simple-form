import { getFormManager, useFormDefinition } from "@ilbrando/simple-form";

export type TestForm = {
  name: string;
  age: number;
  jobTitle: string;
};

export const useTestForm = (isSubmitting: boolean) => {
  const fd = useFormDefinition<TestForm>({
    fields: {
      name: {},
      age: {},
      jobTitle: {}
    }
  });

  const fm = getFormManager(fd, isSubmitting);

  return {
    fd,
    fm
  };
};

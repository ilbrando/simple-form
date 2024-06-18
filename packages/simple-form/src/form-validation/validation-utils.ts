import { hasValue } from "@ilbrando/utils";

import { Validator } from "./validation-types";

export const hasRequiredValidator = <T>(validators: Validator<T>[] | undefined) => hasValue(validators?.find(x => x.name.startsWith("required")));

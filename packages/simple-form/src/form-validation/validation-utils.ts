import { hasValue } from "@ilbrando/utils";

import { isRequiredPropertyName } from "./validation-rules";
import { Validator } from "./validation-types";

export const hasRequiredValidator = <T>(validators: Validator<T>[] | undefined) => hasValue(validators?.find(x => x[isRequiredPropertyName] ?? false));

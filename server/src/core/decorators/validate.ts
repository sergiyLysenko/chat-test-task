import { InjectionToken } from "tsyringe";

export const VALIDATE_METADATA_KEY = Symbol("required");

export function Validate(classType: InjectionToken) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    Reflect.defineMetadata(
      VALIDATE_METADATA_KEY,
      { classType },
      target,
      propertyKey
    );
  };
}

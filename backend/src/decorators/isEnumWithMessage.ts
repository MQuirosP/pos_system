import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsEnumWithMessage(
  values: any[],
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isEnumWithMessage",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be one of the following values: ${values.join(
          ", "
        )}`,
      },
      constraints: [values],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [enumValues] = args.constraints;
          return enumValues.includes(value);
        },
      },
    });
  };
}

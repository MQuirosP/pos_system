import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function IsEnumWithMessage(
  enumObject: object,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    const enumValues = Object.values(enumObject);
    registerDecorator({
      name: "isEnumWithMessage",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be one of the following values: [${enumValues.join(
          ", "
        )}]`,
      },
      constraints: [enumValues],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [enumValues] = args.constraints;
          return enumValues.includes(value);
        },
      },
    });
  };
}

import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

/**
 * Restricción personalizada que implementa la lógica de validación para campos inmutables.
 */

@ValidatorConstraint({ async: false })
class ImmutableConstraint implements ValidatorConstraintInterface {
    validate(value: any, args?: ValidationArguments): boolean {
        return value === undefined || value === null;
    }

    defaultMessage(args?: ValidationArguments): string {
        return `${args?.property} is inmutable and cannot be updated`;
    }
}

/**
 * Decorador personalizado para marcar un campo como inmutable.
 * @param validationOptions Opciones de validación opcionales.
 */
export function Inmutable(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ImmutableConstraint,
        })
    }
}
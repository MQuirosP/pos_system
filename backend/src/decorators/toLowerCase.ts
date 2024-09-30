import "reflect-metadata";

export function ToLowerCase() {
    return function (target: any, propertyName: string) {
        let value: string;

        const getter = function () {
            return value;
        };

        const setter = function (newValue: string) {
            if ( typeof newValue === "string" ) {
                value = newValue.toLowerCase().trim();
            } else {
                value = newValue;
            }
        };

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
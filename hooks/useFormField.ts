import { useState } from "react";

type ValidatorFn<T> = (value: T) => { valid: boolean; message?: string };

/**
 * Custom hook for managing a form field with validation.
 *
 * @template T - the type of the field's value.
 *   - `value` will always be of type T.
 *   - `setValue` only accepts T (or a function returning T).
 *   - `validatorFn` receives a value of type T and returns validity + optional message.
 * This ensures type safety and prevents assigning the wrong type.
 *
 * @param initialValue - the initial value of the field.
 * @param validatorFn - optional function that validates the field value and returns an object:
 *   { valid: boolean; message?: string }
 *   - `valid: true` means the value passes validation.
 *   - `message` will be shown as the error if `valid` is false.
 */
export function useFormField<T>(
    initialValue: T,
    validatorFn?: ValidatorFn<T>
) {
    const [value, setValue] = useState<T>(initialValue);
    const [error, setError] = useState(""); // "" means no error

    function validate(): boolean {
        if (!validatorFn) {
            setError(""); // no error
            return true;
        }

        const result = validatorFn(value);

        if (result.valid) {
            setError(""); // clear error
            return true;
        } else {
            setError(result.message ?? "Invalid value");
            return false;
        }
    }

    return { value, setValue, error, validate };
}

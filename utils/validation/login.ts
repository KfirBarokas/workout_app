import { ValidationResult, INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth";
import { normalizePhone } from "../format/phone";


export function isPhoneNumberValid(phone: string): ValidationResult {
    let normalized = normalizePhone(phone)

    if (!normalized) {
        return { valid: false, message: INVALID_CREDENTIAL_MESSAGES.empty };
    }

    if (!/^05\d{8}$/.test(normalized)) {
        return { valid: false, message: INVALID_CREDENTIAL_MESSAGES.notPhoneNumber };
    }

    return { valid: true, message: "" };//TODO: Change to use validation result type instead of this object
}

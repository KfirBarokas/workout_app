import { ValidationResult } from "@/constants/auth";
import { Bio, ImageUri, BirthDate } from "@/constants/registration";


export function isNicknameValid(nickname: string): ValidationResult {
    const regex = /^[a-zA-Z0-9_]{3,30}$/;

    if (nickname.length == 0) {
        return { valid: false, message: "Nickname cannot be empty" };
    }

    if (!regex.test(nickname)) {
        return { valid: false, message: "Invalid nickname" };
    }

    return { valid: true };
}

export function isBioValid(bio: Bio): ValidationResult {
    // Regex: allow letters, numbers, punctuation, spaces, and emojis
    // Reject control chars (\x00-\x1F, except \n, \r)
    const invalidChars = /[\x00-\x09\x0B-\x1F]/;
    if (invalidChars.test(bio)) {
        return { valid: false, message: "Bio contains invalid characters" };
    }
    return { valid: true };
}

export function isImageUriValid(uri: ImageUri): ValidationResult {
    if (!uri) {
        return { valid: false, message: "Image URI is required" };
    }

    // Accept only local mobile URIs
    const localUriPattern = /^(file|content):\/\/.+\.(jpg|jpeg|png|gif|webp|heic)$/i;

    if (!localUriPattern.test(uri)) {
        return { valid: false, message: "Image URI must be a local file" };
    }

    return { valid: true };
}

export function isBirthDateValid(date: BirthDate): ValidationResult {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return { valid: false, message: "Invalid date" };
    }
    const now = new Date();
    if (date > now) {
        return { valid: false, message: "Birthdate cannot be in the future" };
    }
    return { valid: true };
}
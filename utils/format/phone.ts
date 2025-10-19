export function normalizePhone(phone: string) {
    return phone.replace(/[\s()-]/g, "");
}
export function toE164(phone: string) {
    const normalized = normalizePhone(phone);
    if (normalized.startsWith("0")) return "+972" + normalized.slice(1);
    return normalized;
}
export function formatPhoneNumber(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 10) return digits.slice(0, 3) + "-" + digits.slice(3);
    return digits.slice(0, 3) + "-" + digits.slice(3, 10);
}
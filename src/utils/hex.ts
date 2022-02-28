export function sanitizeHex(hex: string): string {
    return hex.replace(/0x/i, '');
}

export function formatHex(hex: string): string {
    return /^0x/i.test(hex) ? hex : `0x${hex}`;
}

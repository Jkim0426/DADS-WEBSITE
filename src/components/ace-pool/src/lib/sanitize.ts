/**
 * Input sanitization utilities.
 * All user input must be sanitized server-side before processing or storing.
 */

/**
 * Strip HTML tags and dangerous characters from a string.
 * Prevents XSS in email templates and logs.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'&]/g, (c) => {
      const map: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return map[c] ?? c;
    })
    .trim()
    .slice(0, 5000); // hard cap to prevent payload bloat
}

/**
 * Sanitize and validate an email address.
 * Returns the clean email string, or null if invalid.
 */
export function sanitizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.toLowerCase().trim().slice(0, 320);
  const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  return emailRegex.test(email) ? email : null;
}

/**
 * Sanitize a phone number — strip everything except digits, spaces, hyphens, parens, plus.
 * Returns the cleaned string (not validated — just safe for storage/email).
 */
export function sanitizePhone(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[^0-9\s\-().+]/g, "")
    .trim()
    .slice(0, 30);
}

/**
 * Sanitize a chat message — strip HTML, cap length.
 */
export function sanitizeChatMessage(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 2000);
}

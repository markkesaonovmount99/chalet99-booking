import { createHash } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "chalet99_admin_session";

function expectedSessionValue() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(`chalet99:${password}`).digest("hex");
}

export function isValidAdminSession(value: string | undefined) {
  if (!value || !process.env.ADMIN_PASSWORD) return false;
  return value === expectedSessionValue();
}

export function checkAdminPassword(password: string) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD
  );
}

export function createAdminSessionValue() {
  return expectedSessionValue();
}
